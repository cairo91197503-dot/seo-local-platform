#!/usr/bin/env node

import { access, mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { GeminiAdapter } from './lesson-generator/gemini-adapter.ts'
import { PiperCliAdapter } from './lesson-generator/piper-adapter.ts'
import { ProportionalSceneStructureGenerator } from './lesson-generator/scene-generator.ts'

type CliOptions = {
  lessonId: string
  topic: string
  outline: string
  piperModel: string
  outputRoot: string
}

const HELP = `Gera um rascunho audiovisual de microlição sem publicar no catálogo.

Uso:
  npm run generate:lesson -- --lesson-id <id> --topic <tema> --outline <texto> --piper-model <arquivo.onnx>

Opções:
  --lesson-id       ID em kebab-case da lição
  --topic           Tema da microlição
  --outline         Outline textual (use aspas quando houver espaços)
  --piper-model     Caminho do modelo Piper .onnx
  --output-root     Pasta raiz dos rascunhos (padrão: content-drafts)
  --help            Exibe esta ajuda

Ambiente obrigatório:
  GOOGLE_AI_STUDIO_API_KEY

Ambiente opcional:
  GEMINI_MODEL      Padrão: gemini-2.5-flash
  PIPER_BIN         Padrão: piper`

async function main(): Promise<void> {
  if (process.argv.includes('--help')) {
    console.log(HELP)
    return
  }

  const options = parseArguments(process.argv.slice(2))
  const apiKey = process.env.GOOGLE_AI_STUDIO_API_KEY?.trim()
  if (!apiKey) {
    throw new Error(
      'A variável de ambiente GOOGLE_AI_STUDIO_API_KEY não está definida. Crie sua chave no Google AI Studio e exporte-a somente no ambiente local.',
    )
  }

  await access(resolve(options.piperModel)).catch(() => {
    throw new Error(`Modelo Piper não encontrado: ${resolve(options.piperModel)}`)
  })

  const draftDirectory = resolve(options.outputRoot, options.lessonId)
  await assertDirectoryDoesNotExist(draftDirectory)

  const gemini = new GeminiAdapter(
    apiKey,
    process.env.GEMINI_MODEL?.trim() || 'gemini-2.5-flash',
  )
  const piper = new PiperCliAdapter(
    resolve(options.piperModel),
    process.env.PIPER_BIN?.trim() || 'piper',
  )
  const sceneGenerator = new ProportionalSceneStructureGenerator()

  console.log('1/4 Gerando roteiro com Gemini...')
  const script = await gemini.generateScript(
    options.topic,
    options.outline,
    options.lessonId,
  )

  const audioDirectory = resolve(draftDirectory, 'audio')
  const promptDirectory = resolve(draftDirectory, 'image-prompts')
  const imageDirectory = resolve(draftDirectory, 'images')
  await Promise.all([
    mkdir(audioDirectory, { recursive: true }),
    mkdir(promptDirectory, { recursive: true }),
    mkdir(imageDirectory, { recursive: true }),
  ])
  await writeJson(resolve(draftDirectory, 'script.json'), script)

  console.log('2/4 Gerando narrações com Piper...')
  const audioTimings = await piper.generateNarration(script, audioDirectory)
  await writeJson(resolve(draftDirectory, 'audio-timings.json'), audioTimings)

  console.log('3/4 Montando cenas e timestamps...')
  const lesson = sceneGenerator.generateSceneStructure(script, audioTimings)
  await writeJson(resolve(draftDirectory, 'lesson.json'), lesson)

  console.log('4/4 Redigindo prompts de imagem com Gemini...')
  const expectedImages: string[] = []
  for (const [index, scene] of script.scenes.entries()) {
    const number = String(index + 1).padStart(2, '0')
    const prompt = await gemini.generateImagePrompt(scene.sceneDescription)
    await writeFile(
      resolve(promptDirectory, `cena-${number}.txt`),
      `${prompt.trim()}\n`,
      'utf8',
    )
    expectedImages.push(`images/cena-${number}.png`)
  }

  await writeFile(
    resolve(draftDirectory, 'README.md'),
    buildReadme(options.lessonId, expectedImages),
    'utf8',
  )

  console.log(`Rascunho criado em ${draftDirectory}`)
  console.log('Nenhum conteúdo foi publicado no catálogo.')
}

function parseArguments(args: string[]): CliOptions {
  const values = new Map<string, string>()
  const knownOptions = new Set([
    '--lesson-id',
    '--topic',
    '--outline',
    '--piper-model',
    '--output-root',
  ])

  for (let index = 0; index < args.length; index += 2) {
    const option = args[index]
    const value = args[index + 1]
    if (!knownOptions.has(option) || !value || value.startsWith('--')) {
      throw new Error(`Argumento inválido ou sem valor: ${option ?? '(vazio)'}\n\n${HELP}`)
    }
    values.set(option, value)
  }

  const lessonId = required(values, '--lesson-id')
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(lessonId)) {
    throw new Error('--lesson-id deve estar em kebab-case, sem espaços ou acentos.')
  }

  return {
    lessonId,
    topic: required(values, '--topic'),
    outline: required(values, '--outline'),
    piperModel: required(values, '--piper-model'),
    outputRoot: values.get('--output-root') ?? 'content-drafts',
  }
}

function required(values: Map<string, string>, name: string): string {
  const value = values.get(name)?.trim()
  if (!value) {
    throw new Error(`A opção obrigatória ${name} não foi informada.\n\n${HELP}`)
  }
  return value
}

async function assertDirectoryDoesNotExist(directory: string): Promise<void> {
  try {
    await access(directory)
  } catch {
    return
  }
  throw new Error(
    `A pasta de rascunho já existe: ${directory}. Escolha outro --lesson-id ou mova a pasta existente após revisá-la.`,
  )
}

function writeJson(filePath: string, value: unknown): Promise<void> {
  return writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function buildReadme(lessonId: string, expectedImages: string[]): string {
  const imageSteps = expectedImages
    .map(
      (image, index) =>
        `- Cole \`image-prompts/cena-${String(index + 1).padStart(2, '0')}.txt\` no Meta AI, baixe a imagem e salve como \`${image}\` nesta pasta.`,
    )
    .join('\n')

  return `# Rascunho da lição ${lessonId}

Este diretório é um rascunho local e não foi publicado no catálogo.

## Revisão obrigatória

1. Revise o roteiro em \`script.json\`.
2. Ouça todos os arquivos em \`audio/\` e confira \`audio-timings.json\`.
3. Revise o contrato final de cenas e timestamps em \`lesson.json\`.
4. Gere cada imagem manualmente:

${imageSteps}

5. Faça a revisão humana final de texto, áudio, legendas, acessibilidade e imagens.
6. Somente depois da aprovação, copie os assets para os caminhos públicos registrados em \`lesson.json\` e publique a lição manualmente no catálogo. Ajuste o conteúdo TypeScript conforme o contrato documentado; este CLI nunca publica automaticamente.
`
}

main().catch((error: unknown) => {
  console.error(`Erro: ${error instanceof Error ? error.message : String(error)}`)
  process.exitCode = 1
})
