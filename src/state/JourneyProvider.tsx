import { type ReactNode, useCallback, useMemo, useState } from 'react'
import {
  completeLesson,
  completeOnboarding,
  confirmFirstMission,
  declareFirstMissionAction,
  getJourneyLevel,
  getNextAction,
  persistJourney,
  readJourney,
  startFirstMission,
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
      completeOnboarding: () => updateJourney(completeOnboarding),
      completeLesson: (lessonId) =>
        updateJourney((currentJourney) => completeLesson(currentJourney, lessonId)),
      startFirstMission: () => updateJourney(startFirstMission),
      declareFirstMissionAction: () => updateJourney(declareFirstMissionAction),
      confirmFirstMission: () => updateJourney(confirmFirstMission),
    }),
    [journey, updateJourney],
  )

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
}
