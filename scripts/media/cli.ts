#!/usr/bin/env node
import { readManifest } from './core.js'
import { PiperNarrationProvider, WhisperCppAlignmentProvider } from './providers.js'
import {
  approveAsset,
  generateAlignment,
  generateNarration,
  integrateAlignment,
  integrateNarration,
  printStatus,
  reviewAsset,
  validateLesson,
} from './pipeline.js'
import type { AssetKind } from './types.js'

const args = process.argv.slice(2)
const narrationProvider = new PiperNarrationProvider()
const alignmentProvider = new WhisperCppAlignmentProvider()

async function main(): Promise<void> {
  const [command, subcommand, lessonId, sceneId, kindValue] = args
  if (!command || command === 'help' || command === '--help') return help()

  if (command === 'status') {
    requireValue(subcommand, 'lesson')
    printStatus(await readManifest(subcommand))
    return
  }
  if (command === 'validate') {
    requireValue(subcommand, 'lesson')
    process.exitCode = await validateLesson(subcommand) ? 0 : 1
    return
  }
  if (command === 'narration' && subcommand === 'generate') {
    requireScene(lessonId, sceneId)
    requireValue(sceneId, 'sceneId')
    await generateNarration(lessonId, sceneId, narrationProvider)
    return
  }
  if (command === 'alignment' && subcommand === 'generate') {
    requireScene(lessonId, sceneId)
    requireValue(sceneId, 'sceneId')
    await generateAlignment(lessonId, sceneId, alignmentProvider)
    return
  }
  if (command === 'prepare') {
    requireScene(subcommand, lessonId)
    requireValue(lessonId, 'sceneId')
    await generateNarration(subcommand, lessonId, narrationProvider)
    if (!(await validateLesson(subcommand))) throw new Error('Narração candidata inválida')
    await generateAlignment(subcommand, lessonId, alignmentProvider)
    process.exitCode = await validateLesson(subcommand) ? 0 : 1
    return
  }
  if (command === 'review') {
    requireScene(subcommand, lessonId)
    requireValue(lessonId, 'sceneId')
    const kind = parseKind(sceneId)
    const accepted = args.includes('--accept')
    const rejected = args.includes('--reject')
    if (accepted === rejected) throw new Error('Use exatamente uma opção: --accept ou --reject')
    await reviewAsset(subcommand, lessonId, kind, accepted, option('--by'), option('--notes', false))
    return
  }
  if (command === 'approve') {
    requireScene(subcommand, lessonId)
    requireValue(lessonId, 'sceneId')
    await approveAsset(subcommand, lessonId, parseKind(sceneId), option('--by'))
    return
  }
  if (command === 'integrate' && kindValue === undefined) {
    requireScene(subcommand, lessonId)
    requireValue(lessonId, 'sceneId')
    if (sceneId === 'narration') await integrateNarration(subcommand, lessonId)
    else if (sceneId === 'alignment') await integrateAlignment(subcommand, lessonId)
    else throw new Error('Tipo deve ser narration ou alignment')
    return
  }
  throw new Error('Comando inválido. Execute npm run media -- help')
}

function parseKind(value?: string): Exclude<AssetKind, 'image'> {
  if (value !== 'narration' && value !== 'alignment') {
    throw new Error('Tipo deve ser narration ou alignment')
  }
  return value
}

function option(name: string, required = true): string {
  const index = args.indexOf(name)
  const value = index >= 0 ? args[index + 1] : undefined
  if (!value && required) throw new Error(`Opção obrigatória: ${name}`)
  return value ?? ''
}

function requireValue(value: string | undefined, label: string): asserts value is string {
  if (!value) throw new Error(`Informe ${label}`)
}

function requireScene(
  lessonId: string | undefined,
  sceneId: string | undefined,
): asserts lessonId is string {
  requireValue(lessonId, 'lessonId')
  requireValue(sceneId, 'sceneId')
}

function help(): void {
  console.log(`Pipeline de mídia

  media status <lesson>
  media validate <lesson>
  media narration generate <lesson> <scene>
  media alignment generate <lesson> <scene>
  media prepare <lesson> <scene>
  media review <lesson> <scene> <narration|alignment> <--accept|--reject> --by <nome>
  media approve <lesson> <scene> <narration|alignment> --by <nome>
  media integrate <lesson> <scene> <narration|alignment>`)
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
})
