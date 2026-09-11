import { useState } from 'react'

const STORAGE_KEY = 'lesson-progress'

type LessonProgress = Record<string, boolean>

function readProgress(): LessonProgress {
  try {
    const storedProgress = localStorage.getItem(STORAGE_KEY)
    return storedProgress ? (JSON.parse(storedProgress) as LessonProgress) : {}
  } catch {
    return {}
  }
}

export function useLessonProgress(lessonId: string) {
  const [progress, setProgress] = useState<LessonProgress>(readProgress)

  const markAsCompleted = () => {
    setProgress((currentProgress) => {
      const nextProgress = { ...currentProgress, [lessonId]: true }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress))
      } catch {
        // O estado em memória mantém a experiência quando o armazenamento falha.
      }
      return nextProgress
    })
  }

  return {
    isCompleted: progress[lessonId] === true,
    markAsCompleted,
  }
}
