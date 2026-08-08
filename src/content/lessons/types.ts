export type SceneIllustration = {
  src: string
  alt: string
}

export type SceneNarration = {
  script: string
  audioSrc?: string
}

export type LessonScene = {
  id: string
  title: string
  text: string
  highlight?: string
  mascot?: string
  illustration?: SceneIllustration
  animation?: string
  narration?: SceneNarration
  estimatedDurationSeconds?: number
}

export type Lesson = {
  id: string
  title: string
  duration: string
  level: string
  futureReward: string
  scenes: LessonScene[]
}
