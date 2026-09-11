export const assetStatuses = [
  'pending',
  'generated',
  'validated',
  'reviewed',
  'approved',
  'integrated',
  'failed',
  'rejected',
  'stale',
  'superseded',
] as const

export type AssetStatus = (typeof assetStatuses)[number]
export type AssetKind = 'narration' | 'alignment' | 'image'

export type ProviderDescriptor = {
  id: string
  adapterVersion: string
  engineVersion?: string
  model?: string
  voice?: string
  parameters?: Record<string, string | number | boolean>
}

export type ValidationIssue = {
  severity: 'error' | 'warning'
  code: string
  message: string
}

export type ValidationRecord = {
  status: 'not-run' | 'passed' | 'failed'
  validatedAt?: string
  artifactHash?: string
  issues: ValidationIssue[]
}

export type ReviewRecord = {
  status: 'not-reviewed' | 'accepted' | 'rejected'
  reviewedAt?: string
  reviewedBy?: string
  artifactHash?: string
  notes?: string
}

export type ApprovalRecord = {
  status: 'not-approved' | 'approved'
  approvedAt?: string
  approvedBy?: string
  artifactHash?: string
}

export type ArtifactRecord = {
  workingPath?: string
  publicPath?: string
  sha256?: string
  durationSeconds?: number
  format?: Record<string, string | number>
}

export type MediaAsset = {
  assetVersion: number
  status: AssetStatus
  provider?: ProviderDescriptor
  sourceHash?: string
  artifact?: ArtifactRecord
  validation: ValidationRecord
  review: ReviewRecord
  approval: ApprovalRecord
  error?: string
}

export type TimestampSegment = {
  textStart: number
  textEnd: number
  startSeconds: number
  endSeconds: number
}

export type AlignmentAsset = MediaAsset & {
  source?: { scriptHash: string; audioHash: string }
  timestamps?: TimestampSegment[]
  rawArtifactPath?: string
}

export type SceneMedia = {
  script: { ref: string; sha256: string }
  narration: MediaAsset
  alignment: AlignmentAsset
  narrationCandidate?: MediaAsset
  alignmentCandidate?: AlignmentAsset
  narrationHistory?: MediaAsset[]
  alignmentHistory?: AlignmentAsset[]
  image?: MediaAsset & { prompt?: string }
}

export type AssetManifest = {
  schemaVersion: 1
  lessonId: string
  lessonSource: { module: string }
  scenes: Record<string, SceneMedia>
}

export type LessonSceneSource = {
  lessonId: string
  sceneId: string
  script: string
  currentAudioSrc?: string
  currentSegments?: TimestampSegment[]
}

export type ProviderEnvironment = {
  available: boolean
  version?: string
  reason?: string
}

export type NarrationInput = LessonSceneSource & {
  outputPath: string
  voice?: string
}

export type NarrationResult = {
  artifactPath: string
  provider: ProviderDescriptor
}

export interface NarrationProvider {
  readonly id: string
  inspect(): Promise<ProviderEnvironment>
  fingerprint(input: NarrationInput): Promise<string>
  generate(input: NarrationInput): Promise<NarrationResult>
}

export type AlignmentInput = {
  audioPath: string
  canonicalScript: string
  outputPrefix: string
  language: string
}

export type AlignedToken = {
  text: string
  startSeconds: number
  endSeconds: number
}

export type AlignmentResult = {
  rawArtifactPath: string
  tokens: AlignedToken[]
  provider: ProviderDescriptor
}

export interface AlignmentProvider {
  readonly id: string
  inspect(): Promise<ProviderEnvironment>
  fingerprint(input: AlignmentInput): Promise<string>
  align(input: AlignmentInput): Promise<AlignmentResult>
}

export interface ImageProvider {
  readonly id: string
  inspect(): Promise<ProviderEnvironment>
  generate(input: { prompt: string; outputPath: string }): Promise<{
    artifactPath: string
    provider: ProviderDescriptor
  }>
}
