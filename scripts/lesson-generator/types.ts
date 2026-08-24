export type ScriptScene = {
  id: string
  title: string
  text: string
  highlight?: string
  narrationScript: string
  captionSegments: string[]
  sceneDescription: string
  imageAlt: string
}

export type ScriptDraft = {
  lesson: {
    id: string
    title: string
    duration: string
    level: string
    futureReward: string
  }
  scenes: ScriptScene[]
}

export type AudioTiming = {
  sceneId: string
  audioFile: string
  durationSeconds: number
}

export type NarrationSegment = {
  text: string
  startSeconds: number
  endSeconds: number
}

export type LessonScene = {
  id: string
  title: string
  text: string
  highlight?: string
  illustration: {
    src: string
    alt: string
  }
  narration: {
    script: string
    audioSrc: string
    segments: NarrationSegment[]
  }
  estimatedDurationSeconds: number
}

export type LessonDraft = ScriptDraft['lesson'] & {
  scenes: LessonScene[]
}

export interface ScriptGenerator {
  generateScript(topic: string, outline: string, lessonId: string): Promise<ScriptDraft>
}

export interface NarrationGenerator {
  generateNarration(script: ScriptDraft, outputDirectory: string): Promise<AudioTiming[]>
}

export interface SceneStructureGenerator {
  generateSceneStructure(script: ScriptDraft, audioTimestamps: AudioTiming[]): LessonDraft
}

export interface ImagePromptGenerator {
  generateImagePrompt(sceneDescription: string): Promise<string>
}

export interface ImageGenerator {
  /** Gera a imagem a partir do prompt e grava o PNG em outputFile. */
  generateImage(prompt: string, outputFile: string): Promise<void>
}
