import { type ReactNode, useCallback, useMemo, useState } from 'react'
import {
  completeLesson,
  completeOnboarding,
  confirmMission,
  declareMissionAction,
  getCurrentMissionState,
  getJourneyLevel,
  getNextAction,
  persistJourney,
  readJourney,
  startMission,
  type JourneyState,
} from './journey'
import { JourneyContext, type JourneyContextValue } from './journey-context'

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [journey, setJourney] = useState(readJourney)

  const updateJourney = useCallback(
    (transition: (current: JourneyState) => JourneyState) => {
      setJourney((currentJourney) => {
        const nextJourney = transition(currentJourney)
        if (nextJourney !== currentJourney && persistJourney(nextJourney)) {
          return nextJourney
        }
        return currentJourney
      })
    },
    [],
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
