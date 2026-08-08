export type LessonScene = {
  id: string
  title: string
  text: string
  highlight?: string
  mascot?: string
  illustration?: string
  animation?: string
  audio?: string
}

export type Lesson = {
  id: string
  title: string
  duration: string
  level: string
  futureReward: string
  scenes: LessonScene[]
}
