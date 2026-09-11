import { spawn } from 'node:child_process'
import { mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { hashFile, pathExists, sha256 } from './core.js'
import type {
  AlignedToken,
  AlignmentInput,
  AlignmentProvider,
  AlignmentResult,
  NarrationInput,
  NarrationProvider,
  NarrationResult,
  ProviderEnvironment,
} from './types.js'

function requiredEnvironment(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Variável obrigatória não configurada: ${name}`)
  return value
}

function parseExtraArgs(name: string): string[] {
  const raw = process.env[name]
  if (!raw) return []
  const parsed: unknown = JSON.parse(raw)
  if (!Array.isArray(parsed) || !parsed.every((value) => typeof value === 'string')) {
    throw new Error(`${name} deve ser um array JSON de strings`)
  }
  return parsed
}

async function run(
  executable: string,
  args: string[],
  standardInput?: string,
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(executable, args, { stdio: ['pipe', 'pipe', 'pipe'] })
    let stdout = ''
    let stderr = ''
    child.stdout.setEncoding('utf8').on('data', (chunk: string) => { stdout += chunk })
    child.stderr.setEncoding('utf8').on('data', (chunk: string) => { stderr += chunk })
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) resolve({ stdout, stderr })
      else reject(new Error(`${executable} encerrou com código ${String(code)}: ${stderr.trim()}`))
    })
    child.stdin.end(standardInput)
  })
}

async function inspectExecutable(executable?: string): Promise<ProviderEnvironment> {
  if (!executable) return { available: false, reason: 'Executável não configurado' }
  if (!(await pathExists(executable))) return { available: false, reason: `Executável não encontrado: ${executable}` }
  try {
    const result = await run(executable, ['--version'])
    return { available: true, version: (result.stdout || result.stderr).trim().split('\n')[0] }
  } catch {
    return { available: true, reason: 'Versão não identificada' }
  }
}

export class PiperNarrationProvider implements NarrationProvider {
  readonly id = 'piper'

  inspect(): Promise<ProviderEnvironment> {
    return inspectExecutable(process.env.PIPER_BIN)
  }

  async fingerprint(input: NarrationInput): Promise<string> {
    const model = requiredEnvironment('PIPER_MODEL')
    return sha256(JSON.stringify({
      provider: this.id,
      adapterVersion: '1',
      script: input.script,
      modelHash: await hashFile(model),
      voice: input.voice,
      args: parseExtraArgs('PIPER_EXTRA_ARGS_JSON'),
    }))
  }

  async generate(input: NarrationInput): Promise<NarrationResult> {
    const executable = requiredEnvironment('PIPER_BIN')
    const model = requiredEnvironment('PIPER_MODEL')
    await mkdir(path.dirname(input.outputPath), { recursive: true })
    await run(executable, [
      '--model', model,
      '--output_file', input.outputPath,
      ...parseExtraArgs('PIPER_EXTRA_ARGS_JSON'),
    ], input.script)
    return {
      artifactPath: input.outputPath,
      provider: {
        id: this.id,
        adapterVersion: '1',
        model: path.basename(model),
        voice: input.voice ?? 'pt_BR-faber-medium',
      },
    }
  }
}

export class WhisperCppAlignmentProvider implements AlignmentProvider {
  readonly id = 'whisper-cpp-dtw'

  inspect(): Promise<ProviderEnvironment> {
    return inspectExecutable(process.env.WHISPER_CPP_BIN)
  }

  async fingerprint(input: AlignmentInput): Promise<string> {
    const model = requiredEnvironment('WHISPER_CPP_MODEL')
    return sha256(JSON.stringify({
      provider: this.id,
      adapterVersion: '1',
      audioHash: await hashFile(input.audioPath),
      script: input.canonicalScript,
      modelHash: await hashFile(model),
      args: parseExtraArgs('WHISPER_CPP_EXTRA_ARGS_JSON'),
    }))
  }

  async align(input: AlignmentInput): Promise<AlignmentResult> {
    const executable = requiredEnvironment('WHISPER_CPP_BIN')
    const model = requiredEnvironment('WHISPER_CPP_MODEL')
    await mkdir(path.dirname(input.outputPrefix), { recursive: true })
    await run(executable, [
      '-m', model,
      '-f', input.audioPath,
      '-l', input.language,
      '-ojf',
      '-of', input.outputPrefix,
      ...parseExtraArgs('WHISPER_CPP_EXTRA_ARGS_JSON'),
    ])
    const rawArtifactPath = `${input.outputPrefix}.json`
    const parsed: unknown = JSON.parse(await readFile(rawArtifactPath, 'utf8'))
    const tokens = parseWhisperTokens(parsed)
    if (tokens.length === 0) throw new Error('whisper.cpp não produziu timestamps utilizáveis')
    return {
      rawArtifactPath,
      tokens,
      provider: { id: this.id, adapterVersion: '1', model: path.basename(model) },
    }
  }
}

function parseWhisperTokens(value: unknown): AlignedToken[] {
  if (!value || typeof value !== 'object') return []
  const record = value as Record<string, unknown>
  if (Array.isArray(record.tokens)) return record.tokens.flatMap(parseToken)
  if (!Array.isArray(record.transcription)) return []
  return record.transcription.flatMap((segment) => {
    if (!segment || typeof segment !== 'object') return []
    const item = segment as Record<string, unknown>
    if (Array.isArray(item.tokens)) return item.tokens.flatMap(parseToken)
    const offsets = item.offsets as Record<string, unknown> | undefined
    const text = typeof item.text === 'string' ? item.text : ''
    const from = offsets?.from
    const to = offsets?.to
    if (typeof from !== 'number' || typeof to !== 'number' || !text) return []
    return [{ text, startSeconds: from / 1000, endSeconds: to / 1000 }]
  })
}

function parseToken(value: unknown): AlignedToken[] {
  if (!value || typeof value !== 'object') return []
  const item = value as Record<string, unknown>
  const text = typeof item.text === 'string' ? item.text :
    typeof item.token === 'string' ? item.token : ''
  if (typeof item.startSeconds === 'number' && typeof item.endSeconds === 'number') {
    return [{ text, startSeconds: item.startSeconds, endSeconds: item.endSeconds }]
  }
  const offsets = item.offsets as Record<string, unknown> | undefined
  const start = offsets?.from
  const end = offsets?.to
  if (!text || typeof start !== 'number' || typeof end !== 'number') return []
  return [{ text, startSeconds: start / 1000, endSeconds: end / 1000 }]
}
