import { readFile } from 'node:fs/promises'
import { hashFile, pathExists, resolveProjectPath, sha256 } from './core.js'
import { readLessonScene } from './lesson-source.js'
import type {
  AssetManifest,
  MediaAsset,
  TimestampSegment,
  ValidationIssue,
  ValidationRecord,
} from './types.js'

export async function validateManifest(manifest: AssetManifest): Promise<ValidationIssue[]> {
  const issues: ValidationIssue[] = []
  for (const [sceneId, scene] of Object.entries(manifest.scenes)) {
    let source
    try {
      source = readLessonScene(manifest.lessonId, sceneId)
    } catch (error) {
      issues.push(errorIssue('source.missing', messageOf(error)))
      continue
    }
    const currentScriptHash = sha256(source.script)
    if (currentScriptHash !== scene.script.sha256) {
      issues.push(errorIssue('script.stale', `${manifest.lessonId}/${sceneId}: roteiro alterado`))
    }
    issues.push(...await validateAsset(scene.narration, 'narration'))
    if (scene.narrationCandidate) {
      issues.push(...await validateAsset(scene.narrationCandidate, 'narration-candidate'))
    }
    if (scene.alignment.source) {
      if (scene.alignment.source.scriptHash !== currentScriptHash) {
        issues.push(errorIssue('alignment.script-stale', `${sceneId}: timestamps usam outro roteiro`))
      }
      if (scene.narration.artifact?.sha256 &&
          scene.alignment.source.audioHash !== scene.narration.artifact.sha256) {
        issues.push(errorIssue('alignment.audio-stale', `${sceneId}: timestamps usam outro WAV`))
      }
    }
    if (scene.alignment.timestamps) {
      issues.push(...validateTimestamps(scene.alignment.timestamps, source.script,
        scene.narration.artifact?.durationSeconds))
    }
  }
  return issues
}

export async function validateAsset(
  asset: MediaAsset,
  kind: string,
): Promise<ValidationIssue[]> {
  const issues: ValidationIssue[] = []
  const artifactPath = asset.artifact?.workingPath ?? asset.artifact?.publicPath
  if (!artifactPath) {
    if (asset.status !== 'pending') issues.push(errorIssue('artifact.path', `${kind}: caminho ausente`))
    return issues
  }
  const resolved = resolveProjectPath(artifactPath)
  if (!(await pathExists(resolved))) {
    issues.push(errorIssue('artifact.missing', `${kind}: arquivo não encontrado: ${artifactPath}`))
    return issues
  }
  const actualHash = await hashFile(resolved)
  if (asset.artifact?.sha256 && asset.artifact.sha256 !== actualHash) {
    issues.push(errorIssue('artifact.hash', `${kind}: hash do arquivo diverge do manifesto`))
  }
  if (kind.startsWith('narration') && resolved.endsWith('.wav')) {
    issues.push(...await validateWav(resolved, asset.artifact?.durationSeconds))
  }
  return issues
}

export function validationRecord(issues: ValidationIssue[], artifactHash?: string): ValidationRecord {
  return {
    status: issues.some((issue) => issue.severity === 'error') ? 'failed' : 'passed',
    validatedAt: new Date().toISOString(),
    artifactHash,
    issues,
  }
}

async function validateWav(filePath: string, expectedDuration?: number): Promise<ValidationIssue[]> {
  const buffer = await readFile(filePath)
  if (buffer.length < 44 || buffer.toString('ascii', 0, 4) !== 'RIFF' ||
      buffer.toString('ascii', 8, 12) !== 'WAVE') {
    return [errorIssue('wav.header', 'Cabeçalho RIFF/WAVE inválido')]
  }
  const channels = buffer.readUInt16LE(22)
  const sampleRate = buffer.readUInt32LE(24)
  const byteRate = buffer.readUInt32LE(28)
  const dataSize = findDataSize(buffer)
  if (!byteRate || dataSize === undefined) return [errorIssue('wav.structure', 'WAV sem duração calculável')]
  const duration = dataSize / byteRate
  const issues: ValidationIssue[] = []
  if (channels !== 1) issues.push(warningIssue('wav.channels', `WAV possui ${channels} canais`))
  if (sampleRate < 16000) issues.push(warningIssue('wav.sample-rate', `Sample rate baixo: ${sampleRate} Hz`))
  if (duration <= 0 || !Number.isFinite(duration)) issues.push(errorIssue('wav.duration', 'Duração inválida'))
  if (expectedDuration !== undefined && Math.abs(duration - expectedDuration) > 0.05) {
    issues.push(errorIssue('wav.duration-stale', `Duração ${duration.toFixed(3)} diverge do manifesto`))
  }
  return issues
}

function findDataSize(buffer: Buffer): number | undefined {
  let offset = 12
  while (offset + 8 <= buffer.length) {
    const id = buffer.toString('ascii', offset, offset + 4)
    const size = buffer.readUInt32LE(offset + 4)
    if (id === 'data') return size
    offset += 8 + size + (size % 2)
  }
  return undefined
}

function validateTimestamps(
  segments: TimestampSegment[],
  script: string,
  duration?: number,
): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  let previousTextEnd = 0
  let previousTimeEnd = 0
  for (const segment of segments) {
    if (segment.textStart !== previousTextEnd || segment.textEnd <= segment.textStart) {
      issues.push(errorIssue('timestamps.text-coverage', 'Segmentos não cobrem o roteiro continuamente'))
    }
    if (segment.startSeconds < previousTimeEnd || segment.endSeconds <= segment.startSeconds) {
      issues.push(errorIssue('timestamps.order', 'Timestamps sobrepostos ou fora de ordem'))
    }
    previousTextEnd = segment.textEnd
    previousTimeEnd = segment.endSeconds
  }
  if (previousTextEnd !== script.length) {
    issues.push(errorIssue('timestamps.script-coverage', 'Timestamps não cobrem todo o roteiro'))
  }
  if (duration !== undefined && previousTimeEnd > duration + 0.05) {
    issues.push(errorIssue('timestamps.duration', 'Timestamp excede a duração do WAV'))
  }
  return issues
}

function errorIssue(code: string, message: string): ValidationIssue {
  return { severity: 'error', code, message }
}
function warningIssue(code: string, message: string): ValidationIssue {
  return { severity: 'warning', code, message }
}
function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}
