import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../lib/auth/useAuth'
import {
  completeLesson,
  completeOnboarding,
  confirmMission,
  declareMissionAction,
  getCurrentMissionState,
  getInitialJourneyState,
  getJourneyLevel,
  getNextAction,
  persistJourney,
  readJourney,
  readLegacyJourney,
  readStoredJourney,
  startMission,
  type JourneyState,
} from './journey'
import { fetchJourneyProgress, saveJourneyProgress } from './journeyRemote'
import { JourneyContext, type JourneyContextValue } from './journey-context'

/**
 * Fonte de verdade do progresso: Firestore, por conta (`users/{uid}/progress/journey`,
 * ver `src/state/journeyRemote.ts` e `docs/05-BANCO-DE-DADOS.md`). O cache
 * local (`src/state/journey.ts`) só existe para a primeira renderização ser
 * instantânea e para uso offline — nunca é a fonte definitiva quando há uma
 * conta logada.
 *
 * `hydratedUid` guarda o uid cujo progresso já foi carregado do Firestore
 * (com sucesso ou falha tratada) para o estado atual. Enquanto uma conta
 * ainda não está "hidratada", ações continuam atualizando a tela normalmente
 * (`setJourney` sempre aplica a transição), mas não são persistidas — nem
 * local nem remotamente — para nunca arriscar sobrescrever, com um estado
 * parcial/inicial, um progresso remoto que ainda está sendo buscado.
 */
export function JourneyProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const uid = user?.uid ?? null

  const [journey, setJourney] = useState<JourneyState>(getInitialJourneyState)
  const [hydratedUid, setHydratedUid] = useState<string | null>(null)

  // Espelha `uid` em estado para detectar a troca de conta (login, logout ou
  // troca de usuário) e resetar `journey`/`hydratedUid` durante a própria
  // renderização — padrão recomendado pelo React para "ajustar estado quando
  // uma prop/dependência muda" (evita chamar setState ou mexer em refs no
  // corpo de um efeito, que o lint do projeto rejeita por poder causar
  // renders em cascata; mesmo cuidado já documentado em `AuthContext.tsx`).
  const [syncedUid, setSyncedUid] = useState<string | null>(uid)
  if (uid !== syncedUid) {
    setSyncedUid(uid)
    setHydratedUid(null)
    // Hidratação instantânea com o cache local desta conta neste dispositivo
    // (se existir), enquanto o Firestore ainda não respondeu; sem conta
    // (logout), volta ao estado inicial.
    setJourney(uid ? readJourney(uid) : getInitialJourneyState())
  }

  useEffect(() => {
    if (!uid) {
      return
    }

    let cancelled = false

    fetchJourneyProgress(uid)
      .then((remoteJourney) => {
        if (cancelled) return

        if (remoteJourney) {
          setJourney(remoteJourney)
          persistJourney(uid, remoteJourney)
          setHydratedUid(uid)
          return
        }

        // Conta sem progresso salvo no Firestore ainda: migra o que já
        // existir localmente para esta conta neste dispositivo ou, na falta
        // disso, a chave global antiga (anterior a esta funcionalidade),
        // em vez de simplesmente começar do zero.
        const seedJourney =
          readStoredJourney(uid) ?? readLegacyJourney() ?? getInitialJourneyState()
        setJourney(seedJourney)
        persistJourney(uid, seedJourney)
        saveJourneyProgress(uid, seedJourney).catch((error) => {
          console.error('Falha ao inicializar o progresso da conta no Firestore:', error)
        })
        setHydratedUid(uid)
      })
      .catch((error) => {
        if (cancelled) return
        console.error('Falha ao carregar o progresso da conta do Firestore:', error)
        // Sem Firestore disponível agora (ex.: offline): segue com o cache
        // local já aplicado durante a renderização acima, mas não marca como
        // hidratado — ações vão atualizar a tela normalmente, só não serão
        // persistidas até uma tentativa futura (próximo login/recarregamento)
        // conseguir ler o Firestore, para nunca arriscar sobrescrever um
        // progresso remoto que não pôde ser confirmado.
      })

    return () => {
      cancelled = true
    }
  }, [uid])

  const updateJourney = useCallback(
    (transition: (current: JourneyState) => JourneyState) => {
      setJourney((currentJourney) => {
        const nextJourney = transition(currentJourney)
        if (nextJourney === currentJourney) {
          return currentJourney
        }

        if (uid && hydratedUid === uid) {
          persistJourney(uid, nextJourney)
          saveJourneyProgress(uid, nextJourney).catch((error) => {
            console.error('Falha ao salvar o progresso da conta no Firestore:', error)
          })
        }

        return nextJourney
      })
    },
    [uid, hydratedUid],
  )

  const value = useMemo<JourneyContextValue>(
    () => ({
      journey,
      level: getJourneyLevel(journey.xp),
      nextAction: getNextAction(journey),
      currentMissionState: getCurrentMissionState(journey),
      completeOnboarding: () => updateJourney(completeOnboarding),
      completeLesson: (lessonId) =>
        updateJourney((currentJourney) => completeLesson(currentJourney, lessonId)),
      startMission: (missionId) =>
        updateJourney((currentJourney) => startMission(currentJourney, missionId)),
      declareMissionAction: (missionId) =>
        updateJourney((currentJourney) => declareMissionAction(currentJourney, missionId)),
      confirmMission: (missionId) =>
        updateJourney((currentJourney) => confirmMission(currentJourney, missionId)),
    }),
    [journey, updateJourney],
  )

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
}
