import { copyFile, mkdir, readFile } from 'node:fs/promises'
import { constants } from 'node:fs'
import path from 'node:path'
import {
  assertInside,
  assertTransition,
  getScene,
  hashFile,
  pathExists,
  projectRoot,
  readManifest,
  resolveProjectPath,
  sha256,
  workDirectory,
  writeManifest,
} from './core.js'
import { readLessonScene } from './lesson-source.js'
import type {
  AlignmentAsset,
  AssetKind,
  AssetManifest,
  MediaAsset,
  NarrationProvider,
  AlignmentProvider,
  TimestampSegment,
} from './types.js'
import { validateAsset, validateManifest, validationRecord } from './validators.js'

export async function generateNarration(
  lessonId: string,
  sceneId: string,
  provider: NarrationProvider,
): Promise<void> {
  const manifest = await readManifest(lessonId)
  const scene = getScene(manifest, sceneId)
  const source = readLessonScene(lessonId, sceneId)
  const environment = await provider.inspect()
  if (!environment.available) throw new Error(environment.reason)
  const provisionalOutput = path.join(workDirectory, 'cache', provider.id, 'pending.wav')
  const fingerprint = await provider.fingerprint({ ...source, outputPath: provisionalOutput })
  const outputPath = path.join(workDirectory, 'cache', provider.id, fingerprint, 'narration.wav')
  const result = await provider.generate({ ...source, outputPath })
  const wav = await readWav(result.artifactPath)
  scene.narrationCandidate = freshAsset(scene.narration.assetVersion + 1, {
    workingPath: path.relative(projectRoot, result.artifactPath),
    sha256: await hashFile(result.artifactPath),
    durationSeconds: wav.durationSeconds,
    format: wav.format,
  }, result.provider, fingerprint)
  scene.script.sha256 = sha256(source.script)
  await writeManifest(manifest)
  console.log(`Narração gerada como candidata: ${lessonId}/${sceneId}`)
}

export async function generateAlignment(
  lessonId: string,
  sceneId: string,
  provider: AlignmentProvider,
): Promise<void> {
  const manifest = await readManifest(lessonId)
  const scene = getScene(manifest, sceneId)
  const source = readLessonScene(lessonId, sceneId)
  const narration = scene.narrationCandidate ?? scene.narration
  const audioPathValue = narration.artifact?.workingPath ?? narration.artifact?.publicPath
  if (!audioPathValue || !narration.artifact?.sha256) throw new Error('Narração sem artefato válido')
  const audioPath = resolveProjectPath(audioPathValue)
  const environment = await provider.inspect()
  if (!environment.available) throw new Error(environment.reason)
  const provisionalPrefix = path.join(workDirectory, 'cache', provider.id, 'pending', 'alignment')
  const input = { audioPath, canonicalScript: source.script, outputPrefix: provisionalPrefix, language: 'pt' }
  const fingerprint = await provider.fingerprint(input)
  const outputPrefix = path.join(workDirectory, 'cache', provider.id, fingerprint, 'alignment')
  const result = await provider.align({ ...input, outputPrefix })
  const timestamps = deriveCanonicalSegments(source.script, result.tokens)
  const candidate: AlignmentAsset = {
    ...freshAsset(scene.alignment.assetVersion + 1, undefined, result.provider, fingerprint),
    source: { scriptHash: sha256(source.script), audioHash: narration.artifact.sha256 },
    rawArtifactPath: path.relative(projectRoot, result.rawArtifactPath),
    timestamps,
  }
  scene.alignmentCandidate = candidate
  await writeManifest(manifest)
  console.log(`Timestamps gerados como candidatos: ${lessonId}/${sceneId}`)
}

export async function validateLesson(lessonId: string): Promise<boolean> {
  const manifest = await readManifest(lessonId)
  for (const [sceneId, scene] of Object.entries(manifest.scenes)) {
    if (scene.narrationCandidate) {
      const issues = await validateAsset(scene.narrationCandidate, 'narration-candidate')
      scene.narrationCandidate.validation = validationRecord(issues, scene.narrationCandidate.artifact?.sha256)
      if (scene.narrationCandidate.validation.status === 'passed' && scene.narrationCandidate.status === 'generated') {
        scene.narrationCandidate.status = 'validated'
      }
    }
    if (scene.alignmentCandidate) {
      const candidateManifest: AssetManifest = { ...manifest, scenes: { [sceneId]: {
        ...scene,
        narration: scene.narrationCandidate ?? scene.narration,
        alignment: scene.alignmentCandidate,
      } } }
      const issues = await validateManifest(candidateManifest)
      scene.alignmentCandidate.validation = validationRecord(issues)
      if (scene.alignmentCandidate.validation.status === 'passed' && scene.alignmentCandidate.status === 'generated') {
        scene.alignmentCandidate.status = 'validated'
      }
    }
  }
  await writeManifest(manifest)
  const issues = await validateManifest(manifest)
  for (const issue of issues) console.log(`${issue.severity.toUpperCase()} ${issue.code}: ${issue.message}`)
  return !issues.some((issue) => issue.severity === 'error')
}

export async function reviewAsset(
  lessonId: string,
  sceneId: string,
  kind: Exclude<AssetKind, 'image'>,
  accepted: boolean,
  reviewer: string,
  notes?: string,
): Promise<void> {
  const manifest = await readManifest(lessonId)
  const candidate = candidateFor(getScene(manifest, sceneId), kind)
  if (candidate.status !== 'validated') throw new Error('Somente um candidato validado pode ser revisado')
  candidate.review = {
    status: accepted ? 'accepted' : 'rejected',
    reviewedAt: new Date().toISOString(),
    reviewedBy: reviewer,
    artifactHash: candidate.artifact?.sha256 ?? candidate.sourceHash,
    notes,
  }
  candidate.status = accepted ? 'reviewed' : 'rejected'
  await writeManifest(manifest)
}

export async function approveAsset(
  lessonId: string,
  sceneId: string,
  kind: Exclude<AssetKind, 'image'>,
  approver: string,
): Promise<void> {
  const manifest = await readManifest(lessonId)
  const candidate = candidateFor(getScene(manifest, sceneId), kind)
  if (candidate.status !== 'reviewed' || candidate.review.status !== 'accepted') {
    throw new Error('Somente um candidato revisado e aceito pode ser aprovado')
  }
  const artifactHash = candidate.artifact?.sha256 ?? candidate.sourceHash
  if (!artifactHash || candidate.review.artifactHash !== artifactHash) {
    throw new Error('O candidato mudou depois da revisão')
  }
  assertTransition(candidate.status, 'approved')
  candidate.status = 'approved'
  candidate.approval = {
    status: 'approved', approvedAt: new Date().toISOString(), approvedBy: approver, artifactHash,
  }
  await writeManifest(manifest)
}

export async function integrateNarration(lessonId: string, sceneId: string): Promise<void> {
  const manifest = await readManifest(lessonId)
  const scene = getScene(manifest, sceneId)
  const candidate = scene.narrationCandidate
  if (!candidate || candidate.status !== 'approved') throw new Error('Não há narração candidata aprovada')
  const sourcePathValue = candidate.artifact?.workingPath
  if (!sourcePathValue || !candidate.artifact?.sha256) throw new Error('Candidato sem WAV ou hash')
  const publicPath = candidate.artifact.publicPath ??
    `/audio/lessons/${lessonId}/${sceneId}/narration-v${String(candidate.assetVersion).padStart(3, '0')}.wav`
  const sourcePath = resolveProjectPath(sourcePathValue)
  const destinationPath = resolveProjectPath(publicPath)
  assertInside(path.join(projectRoot, 'public'), destinationPath)
  await mkdir(path.dirname(destinationPath), { recursive: true })
  if (await pathExists(destinationPath)) {
    if (await hashFile(destinationPath) !== candidate.artifact.sha256) {
      throw new Error(`Destino existente possui outro conteúdo: ${publicPath}`)
    }
  } else {
    await copyFile(sourcePath, destinationPath, constants.COPYFILE_EXCL)
  }
  candidate.artifact.publicPath = publicPath
  const lessonSource = readLessonScene(lessonId, sceneId)
  if (lessonSource.currentAudioSrc !== publicPath) {
    await writeManifest(manifest)
    console.log(`WAV copiado sem substituir o atual. Atualize audioSrc para '${publicPath}' e execute integrate novamente.`)
    return
  }
  assertTransition(candidate.status, 'integrated')
  candidate.status = 'integrated'
  scene.narrationHistory = [...(scene.narrationHistory ?? []), scene.narration]
  scene.narration = candidate
  delete scene.narrationCandidate
  await writeManifest(manifest)
}

export async function integrateAlignment(lessonId: string, sceneId: string): Promise<void> {
  const manifest = await readManifest(lessonId)
  const scene = getScene(manifest, sceneId)
  const candidate = scene.alignmentCandidate
  if (!candidate || candidate.status !== 'approved' || !candidate.timestamps) {
    throw new Error('Não há alinhamento candidato aprovado')
  }
  const lessonSource = readLessonScene(lessonId, sceneId)
  if (JSON.stringify(lessonSource.currentSegments) !== JSON.stringify(candidate.timestamps)) {
    console.log('Atualize narration.segments com estes offsets e execute integrate novamente:')
    console.log(JSON.stringify(candidate.timestamps, null, 2))
    return
  }
  assertTransition(candidate.status, 'integrated')
  candidate.status = 'integrated'
  scene.alignmentHistory = [...(scene.alignmentHistory ?? []), scene.alignment]
  scene.alignment = candidate
  delete scene.alignmentCandidate
  await writeManifest(manifest)
}

export function printStatus(manifest: AssetManifest): void {
  console.log(`${manifest.lessonId} (schema ${manifest.schemaVersion})`)
  for (const [sceneId, scene] of Object.entries(manifest.scenes)) {
    console.log(`  ${sceneId}: narração=${scene.narration.status}` +
      `${scene.narrationCandidate ? ` candidato=${scene.narrationCandidate.status}` : ''}; ` +
      `timestamps=${scene.alignment.status}` +
      `${scene.alignmentCandidate ? ` candidato=${scene.alignmentCandidate.status}` : ''}`)
  }
}

function freshAsset(
  assetVersion: number,
  artifact: MediaAsset['artifact'],
  provider: NonNullable<MediaAsset['provider']>,
  sourceHash: string,
): MediaAsset {
  return {
    assetVersion,
    status: 'generated',
    provider,
    sourceHash,
    artifact,
    validation: { status: 'not-run', issues: [] },
    review: { status: 'not-reviewed' },
    approval: { status: 'not-approved' },
  }
}

function candidateFor(
  scene: ReturnType<typeof getScene>,
  kind: Exclude<AssetKind, 'image'>,
): MediaAsset {
  const candidate = kind === 'narration' ? scene.narrationCandidate : scene.alignmentCandidate
  if (!candidate) throw new Error(`Não há candidato para ${kind}`)
  return candidate
}

function deriveCanonicalSegments(
  script: string,
  tokens: { startSeconds: number; endSeconds: number }[],
): TimestampSegment[] {
  const ranges = sentenceRanges(script)
  let previousLastIndex = -1
  return ranges.map(({ start, end }) => {
    const proportionalFirst = Math.floor((start / script.length) * tokens.length)
    // Cada frase precisa começar num token depois do último usado pela frase anterior,
    // senão a fronteira entre frases arredonda para o mesmo índice e os timestamps
    // resultantes se sobrepõem (start da próxima < end da anterior).
    const firstIndex = Math.min(tokens.length - 1, Math.max(previousLastIndex + 1, proportionalFirst))
    const proportionalLast = Math.ceil((end / script.length) * tokens.length) - 1
    const lastIndex = Math.min(tokens.length - 1, Math.max(firstIndex, proportionalLast))
    const first = tokens[firstIndex]
    const last = tokens[lastIndex]
    if (!first || !last) throw new Error('Alinhamento sem tokens suficientes')
    previousLastIndex = lastIndex
    return { textStart: start, textEnd: end, startSeconds: first.startSeconds, endSeconds: last.endSeconds }
  })
}

function sentenceRanges(script: string): { start: number; end: number }[] {
  const ranges: { start: number; end: number }[] = []
  const expression = /[^.!?]+[.!?]+(?:\s+|$)|.+$/g
  for (const match of script.matchAll(expression)) {
    const start = match.index ?? 0
    ranges.push({ start, end: start + match[0].length })
  }
  return ranges
}

async function readWav(filePath: string): Promise<{
  durationSeconds: number
  format: Record<string, string | number>
}> {
  const buffer = await readFile(filePath)
  if (buffer.length < 44 || buffer.toString('ascii', 0, 4) !== 'RIFF') throw new Error('WAV inválido')
  const byteRate = buffer.readUInt32LE(28)
  const dataSize = buffer.readUInt32LE(40)
  return {
    durationSeconds: dataSize / byteRate,
    format: {
      container: 'wav',
      channels: buffer.readUInt16LE(22),
      sampleRateHz: buffer.readUInt32LE(24),
      bitsPerSample: buffer.readUInt16LE(34),
    },
  }
}
