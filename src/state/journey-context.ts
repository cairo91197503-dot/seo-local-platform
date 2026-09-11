import { createContext } from 'react'
import type { JourneyLevel, JourneyState, NextAction } from './journey'

export type JourneyContextValue = {
  journey: JourneyState
  level: JourneyLevel
  nextAction: NextAction
  completeOnboarding: () => void
  completeLesson: (lessonId: string) => void
  startFirstMission: () => void
  declareFirstMissionAction: () => void
  confirmFirstMission: () => void
}

export const JourneyContext = createContext<JourneyContextValue | undefined>(
  undefined,
)
