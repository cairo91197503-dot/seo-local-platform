import { spawn } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type {
  AudioTiming,
  NarrationGenerator,
  ScriptDraft,
} from './types.ts'

export class PiperCliAdapter implements NarrationGenerator {
  private readonly modelPath: string
  private readonly executable: string

  constructor(modelPath: string, executable = 'piper') {
    this.modelPath = modelPath
    this.executable = executable
  }

  async generateNarration(
    script: ScriptDraft,
    outputDirectory: string,
  ): Promise<AudioTiming[]> {
    const timings: AudioTiming[] = []

    for (const [index, scene] of script.scenes.entries()) {
      const fileName = `cena-${String(index + 1).padStart(2, '0')}.wav`
      const outputFile = join(outputDirectory, fileName)
      await runPiper(
        this.executable,
        this.modelPath,
        outputFile,
        scene.narrationScript,
      )
      const durationSeconds = await readWavDuration(outputFile)
      timings.push({ sceneId: scene.id, audioFile: fileName, durationSeconds })
    }

    return timings
  }
}

function runPiper(
  executable: string,
  modelPath: string,
  outputFile: string,
  text: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const process = spawn(
      executable,
      ['--model', modelPath, '--output_file', outputFile],
      { stdio: ['pipe', 'ignore', 'pipe'] },
    )
    let stderr = ''

    process.stderr.setEncoding('utf8')
    process.stderr.on('data', (chunk: string) => {
      stderr += chunk
    })
    process.on('error', (error) => {
      reject(
        new Error(
          `Não foi possível executar o Piper em "${executable}": ${error.message}`,
        ),
      )
    })
    process.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }
      reject(
        new Error(
          `O Piper terminou com código ${code ?? 'desconhecido'}${stderr.trim() ? `: ${stderr.trim()}` : '.'}`,
        ),
      )
    })

    process.stdin.end(`${text}\n`)
  })
}

async function readWavDuration(filePath: string): Promise<number> {
  const wav = await readFile(filePath)
  if (wav.toString('ascii', 0, 4) !== 'RIFF' || wav.toString('ascii', 8, 12) !== 'WAVE') {
    throw new Error(`O Piper não produziu um WAV válido em ${filePath}.`)
  }

  let offset = 12
  let byteRate: number | undefined
  let dataSize: number | undefined

  while (offset + 8 <= wav.length) {
    const chunkId = wav.toString('ascii', offset, offset + 4)
    const chunkSize = wav.readUInt32LE(offset + 4)
    const dataOffset = offset + 8
    if (chunkId === 'fmt ' && chunkSize >= 12) {
      byteRate = wav.readUInt32LE(dataOffset + 8)
    }
    if (chunkId === 'data') {
      dataSize = chunkSize
    }
    offset = dataOffset + chunkSize + (chunkSize % 2)
  }

  if (!byteRate || dataSize === undefined) {
    throw new Error(`Não foi possível calcular a duração do WAV ${filePath}.`)
  }

  return roundSeconds(dataSize / byteRate)
}

function roundSeconds(value: number): number {
  return Math.round(value * 100) / 100
}
