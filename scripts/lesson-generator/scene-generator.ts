import type {
  AudioTiming,
  LessonDraft,
  NarrationSegment,
  SceneStructureGenerator,
  ScriptDraft,
} from './types.ts'

export class ProportionalSceneStructureGenerator
  implements SceneStructureGenerator
{
  generateSceneStructure(
    script: ScriptDraft,
    audioTimestamps: AudioTiming[],
  ): LessonDraft {
    const timingByScene = new Map(
      audioTimestamps.map((timing) => [timing.sceneId, timing]),
    )

    return {
      ...script.lesson,
      scenes: script.scenes.map((scene, index) => {
        const timing = timingByScene.get(scene.id)
        if (!timing) {
          throw new Error(`Não há timing de áudio para a cena "${scene.id}".`)
        }

        return {
          id: scene.id,
          title: scene.title,
          text: scene.text,
          ...(scene.highlight ? { highlight: scene.highlight } : {}),
          illustration: {
            src: `/images/lessons/${script.lesson.id}/cena-${String(index + 1).padStart(2, '0')}.png`,
            alt: scene.imageAlt,
          },
          narration: {
            script: scene.narrationScript,
            audioSrc: `/audio/lessons/${script.lesson.id}/${timing.audioFile}`,
            segments: distributeSegments(
              scene.captionSegments,
              timing.durationSeconds,
            ),
          },
          estimatedDurationSeconds: timing.durationSeconds,
        }
      }),
    }
  }
}

function distributeSegments(
  texts: string[],
  durationSeconds: number,
): NarrationSegment[] {
  const weights = texts.map((text) => Math.max([...text.trim()].length, 1))
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
  let elapsed = 0

  return texts.map((text, index) => {
    const startSeconds = roundSeconds(elapsed)
    elapsed += (durationSeconds * weights[index]) / totalWeight
    const endSeconds =
      index === texts.length - 1 ? durationSeconds : roundSeconds(elapsed)
    return { text: text.trim(), startSeconds, endSeconds }
  })
}

function roundSeconds(value: number): number {
  return Math.round(value * 100) / 100
}
