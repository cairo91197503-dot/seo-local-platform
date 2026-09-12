#!/usr/bin/env node
// Patches src/content/lessons/<lessonId>.ts in place to set a scene's
// narration.audioSrc or narration.segments field, after the media pipeline
// has generated+approved a narration/alignment candidate and printed the
// value that needs to land in the lesson source before `integrate` can
// finalize. See scripts/media/generate-all.mjs, which calls this between
// two `integrate` calls.
//
// Usage:
//   node scripts/media/apply-audio-field.mjs set-audio-src <lessonId> <sceneId> <audioSrc>
//   node scripts/media/apply-audio-field.mjs set-segments <lessonId> <sceneId> '<json-array>'

import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const [, , mode, lessonId, sceneId, value] = process.argv

if (!mode || !lessonId || !sceneId || value === undefined) {
  console.error('Uso: apply-audio-field.mjs <set-audio-src|set-segments> <lessonId> <sceneId> <valor>')
  process.exit(1)
}

const filePath = path.join(process.cwd(), 'src', 'content', 'lessons', `${lessonId}.ts`)
const original = readFileSync(filePath, 'utf8')

const sceneBlockPattern = new RegExp(
  `( {4}\\{\\n {6}id: '${escapeRegex(sceneId)}',[\\s\\S]*?\\n {4}\\},\\n)`,
)
const sceneMatch = original.match(sceneBlockPattern)
if (!sceneMatch) {
  console.error(`Cena '${sceneId}' não encontrada em ${filePath}`)
  process.exit(1)
}
const sceneBlock = sceneMatch[1]

const narrationBlockPattern = / {6}narration: \{[\s\S]*?\n {6}\},\n/
const narrationMatch = sceneBlock.match(narrationBlockPattern)
if (!narrationMatch) {
  console.error(`Cena '${sceneId}' não tem bloco narration: {} em ${filePath}`)
  process.exit(1)
}
const narrationBlock = narrationMatch[0]

let newNarrationBlock
if (mode === 'set-audio-src') {
  const audioSrcLine = `        audioSrc: '${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',\n`
  if (/ {8}audioSrc: /.test(narrationBlock)) {
    newNarrationBlock = narrationBlock.replace(/ {8}audioSrc: .*\n/, audioSrcLine)
  } else {
    // Insere logo após o campo script (linha única ou multilinha).
    newNarrationBlock = narrationBlock.replace(
      /( {8}script:[\s\S]*?',\n)/,
      `$1${audioSrcLine}`,
    )
  }
} else if (mode === 'set-segments') {
  const segments = JSON.parse(value)
  const segmentsLines = segments
    .map(
      (segment) =>
        `          { textStart: ${segment.textStart}, textEnd: ${segment.textEnd}, startSeconds: ${segment.startSeconds}, endSeconds: ${segment.endSeconds} },`,
    )
    .join('\n')
  const segmentsBlock = `        segments: [\n${segmentsLines}\n        ],\n`
  if (/ {8}segments: \[/.test(narrationBlock)) {
    newNarrationBlock = narrationBlock.replace(/ {8}segments: \[[\s\S]*?\n {8}\],\n/, segmentsBlock)
  } else if (/ {8}audioSrc: /.test(narrationBlock)) {
    newNarrationBlock = narrationBlock.replace(/( {8}audioSrc: .*\n)/, `$1${segmentsBlock}`)
  } else {
    newNarrationBlock = narrationBlock.replace(
      /( {8}script:[\s\S]*?',\n)/,
      `$1${segmentsBlock}`,
    )
  }
} else {
  console.error(`Modo desconhecido: ${mode}`)
  process.exit(1)
}

const newSceneBlock = sceneBlock.replace(narrationBlock, newNarrationBlock)
const newContent = original.replace(sceneBlock, newSceneBlock)

if (newContent === original) {
  console.error('Nenhuma alteração foi feita — verifique lessonId/sceneId/modo.')
  process.exit(1)
}

writeFileSync(filePath, newContent)
console.log(`OK: ${lessonId}/${sceneId} atualizado (${mode}).`)

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
