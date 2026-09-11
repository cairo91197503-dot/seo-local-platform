import { reviewsImportanceLesson } from '../../src/content/lessons/reviews-importance.js'
import type { Lesson } from '../../src/content/lessons/types.js'
import type { LessonSceneSource } from './types.js'

const lessons: Record<string, Lesson> = {
  [reviewsImportanceLesson.id]: reviewsImportanceLesson,
}

export function readLessonScene(lessonId: string, sceneId: string): LessonSceneSource {
  const lesson = lessons[lessonId]
  if (!lesson) throw new Error(`Lição não encontrada: ${lessonId}`)
  const scene = lesson.scenes.find((candidate) => candidate.id === sceneId)
  if (!scene) throw new Error(`Cena não encontrada: ${lessonId}/${sceneId}`)
  const script = scene.narration?.script
  if (!script) throw new Error(`Cena sem roteiro de narração: ${lessonId}/${sceneId}`)
  return { lessonId, sceneId, script, currentAudioSrc: scene.narration?.audioSrc, currentSegments: scene.narration?.segments }
}

export function listLessonScenes(lessonId: string): LessonSceneSource[] {
  const lesson = lessons[lessonId]
  if (!lesson) throw new Error(`Lição não encontrada: ${lessonId}`)
  return lesson.scenes
    .filter((scene) => scene.narration?.script)
    .map((scene) => readLessonScene(lessonId, scene.id))
}
