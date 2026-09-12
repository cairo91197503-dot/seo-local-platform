import { lessonRegistry } from '../../src/content/lessons/registry.js'
import type { LessonSceneSource } from './types.js'

export function readLessonScene(lessonId: string, sceneId: string): LessonSceneSource {
  const lesson = lessonRegistry[lessonId]
  if (!lesson) throw new Error(`Lição não encontrada: ${lessonId}`)
  const scene = lesson.scenes.find((candidate) => candidate.id === sceneId)
  if (!scene) throw new Error(`Cena não encontrada: ${lessonId}/${sceneId}`)
  const script = scene.narration?.script
  if (!script) throw new Error(`Cena sem roteiro de narração: ${lessonId}/${sceneId}`)
  return { lessonId, sceneId, script, currentAudioSrc: scene.narration?.audioSrc, currentSegments: scene.narration?.segments }
}

export function listLessonScenes(lessonId: string): LessonSceneSource[] {
  const lesson = lessonRegistry[lessonId]
  if (!lesson) throw new Error(`Lição não encontrada: ${lessonId}`)
  return lesson.scenes
    .filter((scene) => scene.narration?.script)
    .map((scene) => readLessonScene(lessonId, scene.id))
}
