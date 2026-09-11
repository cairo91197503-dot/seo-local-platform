export const JOURNEY_STORAGE_KEY = 'estrelar-journey-v1'
export const REVIEWS_IMPORTANCE_LESSON_ID = 'reviews-importance'
export const FIRST_MISSION_ID = 'request-first-review'

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
  version: 1
  onboardingCompleted: boolean
  completedLessonIds: string[]
  missionStatus: MissionStatus
  xp: number
  awardedMilestoneIds: string[]
}

export type NextAction = {
  title: string
  description: string
  to: string
  label: string
}

const INITIAL_JOURNEY_STATE: JourneyState = {
  version: 1,
  onboardingCompleted: false,
  completedLessonIds: [],
  missionStatus: 'locked',
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

function isJourneyState(value: unknown): value is JourneyState {
  if (!value || typeof value !== 'object') {
    return false
  }

  const state = value as Partial<JourneyState>
  return (
    state.version === 1 &&
    typeof state.onboardingCompleted === 'boolean' &&
    isStringArray(state.completedLessonIds) &&
    isMissionStatus(state.missionStatus) &&
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
    awardedMilestoneIds: [],
  }
}

export function readJourney(): JourneyState {
  if (typeof window === 'undefined') {
    return getInitialJourneyState()
  }

  try {
    const storedJourney = window.localStorage.getItem(JOURNEY_STORAGE_KEY)
    if (!storedJourney) {
      return getInitialJourneyState()
    }

    const parsedJourney: unknown = JSON.parse(storedJourney)
    return isJourneyState(parsedJourney) ? parsedJourney : getInitialJourneyState()
  } catch {
    return getInitialJourneyState()
  }
}

export function persistJourney(journey: JourneyState): boolean {
  try {
    window.localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(journey))
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
  if (xp >= 70) {
    return 'Em evolução'
  }

  if (xp >= 40) {
    return 'Em prática'
  }

  if (xp >= 20) {
    return 'Fundamentos'
  }

  return 'Início'
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

  if (!isLessonCompleted(journey, REVIEWS_IMPORTANCE_LESSON_ID)) {
    return {
      title: 'Aprenda por que as avaliações importam',
      description: 'Faça sua primeira lição e prepare-se para uma ação prática.',
      to: `/licao/${REVIEWS_IMPORTANCE_LESSON_ID}`,
      label: 'Começar lição',
    }
  }

  if (journey.missionStatus === 'available') {
    return {
      title: 'Peça sua primeira avaliação',
      description: 'Aplique o que você acabou de aprender.',
      to: '/missoes',
      label: 'Ver missão',
    }
  }

  if (journey.missionStatus === 'in_progress') {
    return {
      title: 'Coloque a missão em prática',
      description: 'Faça a ação com um cliente que teve uma boa experiência.',
      to: '/missoes',
      label: 'Continuar missão',
    }
  }

  if (journey.missionStatus === 'action_completed') {
    return {
      title: 'Confirme sua missão',
      description: 'Registre que a ação foi realizada.',
      to: '/missoes',
      label: 'Confirmar',
    }
  }

  if (journey.missionStatus === 'completed') {
    return {
      title: 'Próximo passo',
      description: 'Continue aprendendo e aplicando novas ações no seu negócio.',
      to: '/aprender',
      label: 'Aprender mais',
    }
  }

  return {
    title: 'Próxima ação',
    description: 'Continue sua jornada no Estrelar.',
    to: '/aprender',
    label: 'Continuar',
  }
}

export function completeOnboarding(journey: JourneyState): JourneyState {
  return journey.onboardingCompleted
    ? journey
    : { ...journey, onboardingCompleted: true }
}

export function isLessonCompleted(journey: JourneyState, lessonId: string): boolean {
  return journey.completedLessonIds.includes(lessonId)
}

export function completeLesson(journey: JourneyState, lessonId: string): JourneyState {
  if (isLessonCompleted(journey, lessonId)) {
    return journey
  }

  const withCompletedLesson = {
    ...journey,
    completedLessonIds: [...journey.completedLessonIds, lessonId],
    missionStatus:
      lessonId === REVIEWS_IMPORTANCE_LESSON_ID && journey.missionStatus === 'locked'
        ? 'available'
        : journey.missionStatus,
  }

  return grantMilestone(
    withCompletedLesson,
    `lesson:${lessonId}:completed`,
    LESSON_COMPLETION_XP,
  )
}

export function startFirstMission(journey: JourneyState): JourneyState {
  return journey.missionStatus === 'available'
    ? { ...journey, missionStatus: 'in_progress' }
    : journey
}

export function declareFirstMissionAction(journey: JourneyState): JourneyState {
  return journey.missionStatus === 'in_progress'
    ? { ...journey, missionStatus: 'action_completed' }
    : journey
}

export function confirmFirstMission(journey: JourneyState): JourneyState {
  if (journey.missionStatus !== 'action_completed') {
    return journey
  }

  const withMissionCompleted = grantMilestone(
    { ...journey, missionStatus: 'completed' },
    `mission:${FIRST_MISSION_ID}:completed`,
    MISSION_COMPLETION_XP,
  )

  return grantMilestone(
    withMissionCompleted,
    'journey:initial:completed',
    INITIAL_JOURNEY_BONUS_XP,
  )
}

