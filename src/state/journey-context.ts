import { createContext } from 'react'
import type { CurrentMissionState, JourneyLevel, JourneyState, NextAction } from './journey'

export type JourneyContextValue = {
  journey: JourneyState
  level: JourneyLevel
  nextAction: NextAction
  currentMissionState: CurrentMissionState
  completeOnboarding: () => void
  completeLesson: (lessonId: string) => void
  startMission: (missionId: string) => void
  declareMissionAction: (missionId: string) => void
  confirmMission: (missionId: string) => void
}

export const JourneyContext = createContext<JourneyContextValue | undefined>(
  undefined,
)
