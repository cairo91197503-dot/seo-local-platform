#!/usr/bin/env node
// Orquestra a geração de narração + alinhamento para TODAS as cenas com
// narration.script no currículo, ponta a ponta: prepare -> review --accept
// -> approve -> integrate (narração), depois o mesmo para o alinhamento —
// incluindo o passo manual de colar audioSrc/segments no arquivo .ts da
// lição entre as duas chamadas de integrate, que este script automatiza
// chamando scripts/media/apply-audio-field.mjs e recompilando entre elas.
//
// Requer as variáveis de ambiente do Piper e do whisper.cpp já configuradas
// (PIPER_BIN, PIPER_MODEL, WHISPER_CPP_BIN, WHISPER_CPP_MODEL) — rode na VM
// onde essas ferramentas estão instaladas.
//
// Uso:
//   node scripts/media/generate-all.mjs [--by "Nome do revisor"] [--lesson <id>]
//
// Sem --lesson, processa as 12 lições do currículo. Cenas já totalmente
// integradas (narração + alinhamento) são puladas automaticamente — o
// script pode ser interrompido e rodado de novo com segurança.

import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const cliPath = path.join(projectRoot, '.media-build', 'scripts', 'media', 'cli.js')
const manifestDir = path.join(projectRoot, 'media', 'manifests')

const argv = process.argv.slice(2)
const reviewer = optionValue(argv, '--by') ?? 'automação-vm'
const onlyLesson = optionValue(argv, '--lesson')

const lessonScenes = {
  'why-appear-in-local-search': ['intro', 'first-step', 'where', 'action'],
  'profile-represents-your-business': ['intro', 'first-impression', 'control', 'action'],
  'accurate-business-info': ['intro', 'what-matters', 'keep-updated', 'action'],
  'business-hours-matter': ['intro', 'special-hours', 'consequence', 'action'],
  'explain-what-you-offer': ['intro', 'clarity', 'example', 'action'],
  'photos-help-customers-decide': ['intro', 'what-photos-do', 'trust', 'action'],
  'reviews-importance': ['intro', 'trust', 'timing', 'action'],
  'review-request-message': ['intro', 'right-way', 'timing', 'action'],
  'how-to-respond-to-reviews': ['intro', 'why-respond', 'example', 'action'],
  'keep-your-profile-updated': ['intro', 'living-profile', 'consequence', 'action'],
  'first-profile-checkup': ['intro', 'what-it-means', 'purpose', 'action'],
  'choose-your-next-action': ['intro', 'choose', 'example', 'action'],
}

const results = []

async function main() {
  console.log('== Compilando pipeline de mídia ==')
  compile()

  const lessonIds = onlyLesson ? [onlyLesson] : Object.keys(lessonScenes)
  for (const lessonId of lessonIds) {
    const scenes = lessonScenes[lessonId]
    if (!scenes) {
      console.error(`Lição desconhecida: ${lessonId}`)
      continue
    }
    for (const sceneId of scenes) {
      await processScene(lessonId, sceneId)
    }
  }

  console.log('\n== Resumo ==')
  for (const result of results) {
    console.log(`${result.ok ? 'OK  ' : 'FALHOU'} ${result.lessonId}/${result.sceneId} — ${result.message}`)
  }
  const failed = results.filter((result) => !result.ok)
  if (failed.length > 0) {
    console.log(`\n${failed.length} cena(s) com problema. Rode de novo depois de corrigir — cenas já integradas são puladas.`)
    process.exitCode = 1
  } else {
    console.log(`\nTodas as ${results.length} cenas processadas com sucesso.`)
  }
}

async function processScene(lessonId, sceneId) {
  const label = `${lessonId}/${sceneId}`
  try {
    const manifest = readManifest(lessonId)
    const scene = manifest.scenes[sceneId]
    if (!scene) {
      results.push({ lessonId, sceneId, ok: false, message: 'cena sem entrada no manifesto (falta narration.script?)' })
      return
    }
    if (scene.narration.status === 'integrated' && scene.alignment.status === 'integrated') {
      results.push({ lessonId, sceneId, ok: true, message: 'já integrada, pulada' })
      console.log(`-- ${label}: já integrada, pulando`)
      return
    }

    console.log(`\n== ${label} ==`)
    console.log('  prepare (gera narração + alinhamento candidatos e valida)')
    runCli(['prepare', lessonId, sceneId])

    console.log('  review narração --accept')
    runCli(['review', lessonId, sceneId, 'narration', '--accept', '--by', reviewer])
    console.log('  approve narração')
    runCli(['approve', lessonId, sceneId, 'narration', '--by', reviewer])

    console.log('  review alinhamento --accept')
    runCli(['review', lessonId, sceneId, 'alignment', '--accept', '--by', reviewer])
    console.log('  approve alinhamento')
    runCli(['approve', lessonId, sceneId, 'alignment', '--by', reviewer])

    await integrateNarrationWithPatch(lessonId, sceneId)
    await integrateAlignmentWithPatch(lessonId, sceneId)

    results.push({ lessonId, sceneId, ok: true, message: 'narração + alinhamento integrados' })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    results.push({ lessonId, sceneId, ok: false, message })
    console.error(`  ERRO em ${label}: ${message}`)
  }
}

async function integrateNarrationWithPatch(lessonId, sceneId) {
  console.log('  integrate narração (1ª chamada)')
  let output = runCli(['integrate', lessonId, sceneId, 'narration'])
  let manifest = readManifest(lessonId)
  if (manifest.scenes[sceneId].narration.status === 'integrated') return

  const match = output.match(/Atualize audioSrc para '([^']+)'/)
  if (!match) throw new Error(`integrate narração não integrou e não pediu patch — saída: ${output}`)
  const audioSrc = match[1]
  console.log(`  aplicando audioSrc='${audioSrc}' em src/content/lessons/${lessonId}.ts`)
  runNode(['scripts/media/apply-audio-field.mjs', 'set-audio-src', lessonId, sceneId, audioSrc])
  compile()

  console.log('  integrate narração (2ª chamada, finaliza)')
  runCli(['integrate', lessonId, sceneId, 'narration'])
  manifest = readManifest(lessonId)
  if (manifest.scenes[sceneId].narration.status !== 'integrated') {
    throw new Error('narração não ficou "integrated" após a 2ª chamada de integrate')
  }
}

async function integrateAlignmentWithPatch(lessonId, sceneId) {
  console.log('  integrate alinhamento (1ª chamada)')
  let output = runCli(['integrate', lessonId, sceneId, 'alignment'])
  let manifest = readManifest(lessonId)
  if (manifest.scenes[sceneId].alignment.status === 'integrated') return

  const marker = 'Atualize narration.segments com estes offsets e execute integrate novamente:'
  const markerIndex = output.indexOf(marker)
  if (markerIndex === -1) throw new Error(`integrate alinhamento não integrou e não pediu patch — saída: ${output}`)
  const jsonText = output.slice(markerIndex + marker.length).trim()
  const segments = JSON.parse(jsonText)
  console.log(`  aplicando segments (${segments.length} trechos) em src/content/lessons/${lessonId}.ts`)
  runNode(['scripts/media/apply-audio-field.mjs', 'set-segments', lessonId, sceneId, JSON.stringify(segments)])
  compile()

  console.log('  integrate alinhamento (2ª chamada, finaliza)')
  runCli(['integrate', lessonId, sceneId, 'alignment'])
  manifest = readManifest(lessonId)
  if (manifest.scenes[sceneId].alignment.status !== 'integrated') {
    throw new Error('alinhamento não ficou "integrated" após a 2ª chamada de integrate')
  }
}

function compile() {
  execFileSync('npx', ['tsc', '-p', 'tsconfig.media.json'], { cwd: projectRoot, stdio: 'pipe' })
}

function runCli(args) {
  try {
    return execFileSync('node', [cliPath, ...args], { cwd: projectRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
  } catch (error) {
    const stdout = error.stdout ? error.stdout.toString() : ''
    const stderr = error.stderr ? error.stderr.toString() : ''
    throw new Error(`comando 'media ${args.join(' ')}' falhou: ${stderr || stdout || error.message}`, { cause: error })
  }
}

function runNode(args) {
  return execFileSync('node', args, { cwd: projectRoot, encoding: 'utf8' })
}

function readManifest(lessonId) {
  return JSON.parse(readFileSync(path.join(manifestDir, `${lessonId}.json`), 'utf8'))
}

function optionValue(args, name) {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack ?? error.message : String(error))
  process.exitCode = 1
})
