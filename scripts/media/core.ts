import { createHash } from 'node:crypto'
import { access, mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { AssetManifest, AssetStatus, SceneMedia } from './types.js'

export const projectRoot = process.cwd()
export const manifestDirectory = path.join(projectRoot, 'media', 'manifests')
export const workDirectory = path.resolve(
  process.env.MEDIA_WORKDIR ?? path.join(projectRoot, '.media'),
)

export function sha256(value: string | Buffer): string {
  return createHash('sha256').update(value).digest('hex')
}

export async function hashFile(filePath: string): Promise<string> {
  return sha256(await readFile(filePath))
}

export async function pathExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

export function resolveProjectPath(filePath: string): string {
  return path.resolve(projectRoot, filePath.replace(/^\//, 'public/'))
}

export function assertInside(parent: string, candidate: string): void {
  const relative = path.relative(parent, candidate)
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Caminho fora do diretório permitido: ${candidate}`)
  }
}

export async function readManifest(lessonId: string): Promise<AssetManifest> {
  const manifestPath = path.join(manifestDirectory, `${lessonId}.json`)
  const parsed: unknown = JSON.parse(await readFile(manifestPath, 'utf8'))
  if (!isManifest(parsed)) throw new Error(`Manifesto inválido: ${manifestPath}`)
  return parsed
}

export async function writeManifest(manifest: AssetManifest): Promise<void> {
  await mkdir(manifestDirectory, { recursive: true })
  const manifestPath = path.join(manifestDirectory, `${manifest.lessonId}.json`)
  const temporaryPath = `${manifestPath}.tmp`
  await writeFile(temporaryPath, `${JSON.stringify(manifest, null, 2)}\n`)
  await rename(temporaryPath, manifestPath)
}

export function getScene(manifest: AssetManifest, sceneId: string): SceneMedia {
  const scene = manifest.scenes[sceneId]
  if (!scene) throw new Error(`Cena não encontrada no manifesto: ${sceneId}`)
  return scene
}

export function assertTransition(from: AssetStatus, to: AssetStatus): void {
  const allowed: Record<AssetStatus, readonly AssetStatus[]> = {
    pending: ['generated', 'failed'],
    generated: ['validated', 'failed', 'stale'],
    validated: ['reviewed', 'stale'],
    reviewed: ['approved', 'rejected', 'stale'],
    approved: ['integrated', 'superseded', 'stale'],
    integrated: ['superseded', 'stale'],
    failed: ['generated'],
    rejected: ['generated'],
    stale: ['generated'],
    superseded: [],
  }
  if (!allowed[from].includes(to)) {
    throw new Error(`Transição inválida: ${from} → ${to}`)
  }
}

function isManifest(value: unknown): value is AssetManifest {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>
  return record.schemaVersion === 1 && typeof record.lessonId === 'string' &&
    typeof record.lessonSource === 'object' && typeof record.scenes === 'object' &&
    record.scenes !== null
}
