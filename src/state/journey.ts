import { lessonCatalog } from '../content/lessons/catalog'

/**
 * Prefixo da chave de cache local por conta (ver `docs/05-BANCO-DE-DADOS.md`,
 * seção "Progresso da jornada"): cada usuário autenticado tem sua própria
 * chave (`estrelar-journey-v2:{uid}`), para que o navegador possa guardar um
 * cache offline/instantâneo sem misturar o progresso de contas Google
 * diferentes no mesmo dispositivo. O Firestore (`users/{uid}/progress/journey`)
 * é a fonte de verdade; este cache local só acelera a primeira renderização
 * e permite uso offline — ver `src/state/journeyRemote.ts` e
 * `src/state/JourneyProvider.tsx`.
 */
const JOURNEY_STORAGE_KEY_PREFIX = 'estrelar-journey-v2'

/**
 * Chave legada (anterior a esta conta ter progresso salvo no Firestore): um
 * único valor global, sem separar por usuário. Mantida só para migrar, no
 * primeiro login de cada dispositivo, um progresso local que já existia
 * antes desta funcionalidade — ver `readLegacyJourney` e
 * `src/state/JourneyProvider.tsx`.
 */
const LEGACY_JOURNEY_STORAGE_KEY = 'estrelar-journey-v2'

function getJourneyStorageKey(uid: string): string {
  return `${JOURNEY_STORAGE_KEY_PREFIX}:${uid}`
}

const LESSON_COMPLETION_XP = 20
const MISSION_COMPLETION_XP = 40
const INITIAL_JOURNEY_BONUS_XP = 10

export type MissionStatus =
  | 'locked'
  | 'available'
  | 'in_progress'
  | 'action_completed'
  | 'completed'

export type JourneyLevel = 'Início' | 'Fundamentos' | 'Em prática' | 'Em evolução'

export type JourneyState = {
  version: 2
  onboardingCompleted: boolean
  completedLessonIds: string[]
  missionStatuses: Record<string, MissionStatus>
  xp: number
  awardedMilestoneIds: string[]
}

export type NextAction = {
  title: string
  description: string
  to: string
  label: string
}

export type CurriculumItem = {
  lessonId: string
  missionId: string
}

/**
 * O currículo é derivado do catálogo de lições: cada lição disponível está
 * associada a uma missão (via `missionId`). Isso permite acrescentar novas
 * lições/missões sem alterar a lógica de estado — basta editar o catálogo.
 */
export const CURRICULUM: CurriculumItem[] = lessonCatalog
  .filter((lesson) => lesson.status === 'disponivel')
  .map((lesson) => ({ lessonId: lesson.id, missionId: lesson.missionId }))

/**
 * A missão associada à primeira lição disponível do currículo (não um id
 * fixo): é ela que recebe o bônus de "jornada inicial" (ver
 * `confirmMission`). Derivar de `CURRICULUM[0]` em vez de fixar um id evita
 * que reordenar o currículo (`docs/13-CURRICULO-MVP.md`) deixe o bônus preso
 * numa missão que passou a ser a segunda, terceira etc.
 */
const FIRST_MISSION_ID: string | undefined = CURRICULUM[0]?.missionId

export type CurrentMissionState =
  | { kind: 'locked'; lessonId: string }
  | { kind: 'mission'; missionId: string; status: MissionStatus }
  | { kind: 'all-done' }

const INITIAL_JOURNEY_STATE: JourneyState = {
  version: 2,
  onboardingCompleted: false,
  completedLessonIds: [],
  missionStatuses: {},
  xp: 0,
  awardedMilestoneIds: [],
}

function isMissionStatus(value: unknown): value is MissionStatus {
  return (
    value === 'locked' ||
    value === 'available' ||
    value === 'in_progress' ||
    value === 'action_completed' ||
    value === 'completed'
  )
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function isMissionStatusRecord(value: unknown): value is Record<string, MissionStatus> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }

  return Object.values(value as Record<string, unknown>).every(isMissionStatus)
}

export function isJourneyState(value: unknown): value is JourneyState {
  if (!value || typeof value !== 'object') {
    return false
  }

  const state = value as Partial<JourneyState>
  return (
    state.version === 2 &&
    typeof state.onboardingCompleted === 'boolean' &&
    isStringArray(state.completedLessonIds) &&
    isMissionStatusRecord(state.missionStatuses) &&
    typeof state.xp === 'number' &&
    Number.isFinite(state.xp) &&
    state.xp >= 0 &&
    isStringArray(state.awardedMilestoneIds)
  )
}

export function getInitialJourneyState(): JourneyState {
  return {
    ...INITIAL_JOURNEY_STATE,
    completedLessonIds: [],
    missionStatuses: {},
    awardedMilestoneIds: [],
  }
}

function readJourneyFromKey(key: string): JourneyState | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const storedJourney = window.localStorage.getItem(key)
    if (!storedJourney) {
      return null
    }

    const parsedJourney: unknown = JSON.parse(storedJourney)
    return isJourneyState(parsedJourney) ? parsedJourney : null
  } catch {
    return null
  }
}

/** Lê o cache local do progresso de uma conta (`uid` do Firebase Authentication). */
export function readJourney(uid: string): JourneyState {
  return readJourneyFromKey(getJourneyStorageKey(uid)) ?? getInitialJourneyState()
}

/**
 * Como `readJourney`, mas retorna `null` (em vez de um estado inicial) quando
 * não há nada salvo para esta conta neste dispositivo — usado só para saber
 * se existe progresso local a migrar (ver `src/state/JourneyProvider.tsx`).
 */
export function readStoredJourney(uid: string): JourneyState | null {
  return readJourneyFromKey(getJourneyStorageKey(uid))
}

/**
 * Lê a chave global antiga (anterior ao progresso ser salvo por conta), só
 * para migração pontual no primeiro login de um dispositivo — ver
 * `src/state/JourneyProvider.tsx`.
 */
export function readLegacyJourney(): JourneyState | null {
  return readJourneyFromKey(LEGACY_JOURNEY_STORAGE_KEY)
}

/** Grava o cache local do progresso de uma conta (`uid` do Firebase Authentication). */
export function persistJourney(uid: string, journey: JourneyState): boolean {
  try {
    window.localStorage.setItem(getJourneyStorageKey(uid), JSON.stringify(journey))
    return true
  } catch {
    return false
  }
}

function grantMilestone(
  journey: JourneyState,
  milestoneId: string,
  xp: number,
): JourneyState {
  if (journey.awardedMilestoneIds.includes(milestoneId)) {
    return journey
  }

  return {
    ...journey,
    xp: journey.xp + xp,
    awardedMilestoneIds: [...journey.awardedMilestoneIds, milestoneId],
  }
}

export function getJourneyLevel(xp: number): JourneyLevel {
  if (xp >= 100) {
    return 'Em evolução'
  }

  if (xp >= 60) {
    return 'Em prática'
  }

  if (xp >= 20) {
    return 'Fundamentos'
  }

  return 'Início'
}

export function isLessonCompleted(journey: JourneyState, lessonId: string): boolean {
  return journey.completedLessonIds.includes(lessonId)
}

export function getMissionStatus(journey: JourneyState, missionId: string): MissionStatus {
  return journey.missionStatuses[missionId] ?? 'locked'
}

/**
 * Retorna o "ponto atual" do usuário no currículo: a próxima lição bloqueada
 * por falta de conclusão, ou a missão associada à última lição concluída,
 * ou `all-done` quando todo o currículo disponível foi concluído.
 */
export function getCurrentMissionState(journey: JourneyState): CurrentMissionState {
  for (const item of CURRICULUM) {
    if (!isLessonCompleted(journey, item.lessonId)) {
      return { kind: 'locked', lessonId: item.lessonId }
    }

    const status = getMissionStatus(journey, item.missionId)
    if (status !== 'completed') {
      return { kind: 'mission', missionId: item.missionId, status }
    }
  }

  return { kind: 'all-done' }
}

export function getNextAction(journey: JourneyState): NextAction {
  if (!journey.onboardingCompleted) {
    return {
      title: 'Comece sua jornada',
      description: 'Conheça o Estrelar e dê o primeiro passo.',
      to: '/onboarding',
      label: 'Começar',
    }
  }

  for (const item of CURRICULUM) {
    if (!isLessonCompleted(journey, item.lessonId)) {
      const lesson = lessonCatalog.find((catalogItem) => catalogItem.id === item.lessonId)
      return {
        title: lesson?.title ?? 'Continue aprendendo',
        description:
          lesson?.description ?? 'Faça a próxima lição e prepare-se para uma ação prática.',
        to: `/licao/${item.lessonId}`,
        label: 'Começar lição',
      }
    }

    const missionStatus = getMissionStatus(journey, item.missionId)

    if (missionStatus === 'available') {
      return {
        title: 'Coloque em prática o que aprendeu',
        description: 'Aplique o que você acabou de aprender.',
        to: '/missoes',
        label: 'Ver missão',
      }
    }

    if (missionStatus === 'in_progress') {
      return {
        title: 'Coloque a missão em prática',
        description: 'Faça a ação com um cliente que teve uma boa experiência.',
        to: '/missoes',
        label: 'Continuar missão',
      }
    }

    if (missionStatus === 'action_completed') {
      return {
        title: 'Confirme sua missão',
        description: 'Registre que a ação foi realizada.',
        to: '/missoes',
        label: 'Confirmar',
      }
    }

    // 'completed' (ou, defensivamente, 'locked') segue para o próximo item do currículo.
  }

  return {
    title: 'Você concluiu o currículo disponível',
    description: 'Continue aplicando o que aprendeu no seu negócio. Em breve, novas lições.',
    to: '/aprender',
    label: 'Rever lições',
  }
}

export function completeOnboarding(journey: JourneyState): JourneyState {
  return journey.onboardingCompleted
    ? journey
    : { ...journey, onboardingCompleted: true }
}

export function completeLesson(journey: JourneyState, lessonId: string): JourneyState {
  if (isLessonCompleted(journey, lessonId)) {
    return journey
  }

  const curriculumItem = CURRICULUM.find((item) => item.lessonId === lessonId)
  const shouldUnlockMission =
    curriculumItem !== undefined &&
    getMissionStatus(journey, curriculumItem.missionId) === 'locked'

  const withCompletedLesson: JourneyState = {
    ...journey,
    completedLessonIds: [...journey.completedLessonIds, lessonId],
    missionStatuses:
      shouldUnlockMission && curriculumItem
        ? { ...journey.missionStatuses, [curriculumItem.missionId]: 'available' }
        : journey.missionStatuses,
  }

  return grantMilestone(
    withCompletedLesson,
    `lesson:${lessonId}:completed`,
    LESSON_COMPLETION_XP,
  )
}

export function startMission(journey: JourneyState, missionId: string): JourneyState {
  return getMissionStatus(journey, missionId) === 'available'
    ? {
        ...journey,
        missionStatuses: { ...journey.missionStatuses, [missionId]: 'in_progress' },
      }
    : journey
}

export function declareMissionAction(journey: JourneyState, missionId: string): JourneyState {
  return getMissionStatus(journey, missionId) === 'in_progress'
    ? {
        ...journey,
        missionStatuses: { ...journey.missionStatuses, [missionId]: 'action_completed' },
      }
    : journey
}

export function confirmMission(journey: JourneyState, missionId: string): JourneyState {
  if (getMissionStatus(journey, missionId) !== 'action_completed') {
    return journey
  }

  const withMissionCompleted = grantMilestone(
    {
      ...journey,
      missionStatuses: { ...journey.missionStatuses, [missionId]: 'completed' },
    },
    `mission:${missionId}:completed`,
    MISSION_COMPLETION_XP,
  )

  // O bônus de jornada inicial é exclusivo da primeira missão do currículo.
  return missionId === FIRST_MISSION_ID
    ? grantMilestone(withMissionCompleted, 'journey:initial:completed', INITIAL_JOURNEY_BONUS_XP)
    : withMissionCompleted
}
