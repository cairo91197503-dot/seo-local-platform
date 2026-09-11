import { writeFile } from 'node:fs/promises'
import type {
  ImageGenerator,
  ImagePromptGenerator,
  ScriptDraft,
  ScriptGenerator,
} from './types.ts'

type GeminiPart = {
  text?: string
  inlineData?: { mimeType?: string; data?: string }
}

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: GeminiPart[] }
    finishReason?: string
  }>
  error?: { message?: string }
  promptFeedback?: { blockReason?: string }
}

const scriptSchema = {
  type: 'object',
  properties: {
    lesson: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        duration: { type: 'string' },
        level: { type: 'string' },
        futureReward: { type: 'string' },
      },
      required: ['id', 'title', 'duration', 'level', 'futureReward'],
    },
    scenes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          text: { type: 'string' },
          highlight: { type: 'string' },
          narrationScript: { type: 'string' },
          captionSegments: { type: 'array', items: { type: 'string' } },
          sceneDescription: { type: 'string' },
          imageAlt: { type: 'string' },
        },
        required: [
          'id',
          'title',
          'text',
          'narrationScript',
          'captionSegments',
          'sceneDescription',
          'imageAlt',
        ],
      },
    },
  },
  required: ['lesson', 'scenes'],
} as const

export class GeminiAdapter
  implements ScriptGenerator, ImagePromptGenerator, ImageGenerator
{
  private readonly apiKey: string
  private readonly model: string
  private readonly imageModel: string

  constructor(
    apiKey: string,
    model = 'gemini-2.5-flash',
    imageModel = 'gemini-3.1-flash-image',
  ) {
    this.apiKey = apiKey
    this.model = model
    this.imageModel = imageModel
  }

  async generateScript(
    topic: string,
    outline: string,
    lessonId: string,
  ): Promise<ScriptDraft> {
    const prompt = `Crie o roteiro de uma microlição em português do Brasil para pequenos empresários brasileiros.

Tema: ${topic}
Outline fornecido pelo editor: ${outline}
ID obrigatório da lição: ${lessonId}

Siga estas regras:
- ensine um conceito simples, sua importância e uma ação prática, sem inventar validação de missão;
- use linguagem simples, sem jargão, hacks de algoritmo, promessas de ranking ou resultado garantido;
- não invente fatos. Trate o outline como a única fonte factual específica;
- defina quantas cenas forem pedagogicamente necessárias; não existe quantidade fixa aprovada;
- lesson.id deve ser exatamente o ID obrigatório;
- duration deve ser uma estimativa legível, como "2 min"; level deve ser "Iniciante"; futureReward deve ser "A definir";
- cada id de cena deve ser único, curto, em kebab-case e sem acentos;
- text é o texto visual resumido da cena;
- narrationScript é o transcript completo que será narrado;
- captionSegments contém frases curtas que, em conjunto e na mesma ordem, representam a narração para legendas;
- sceneDescription descreve apenas a comunicação visual necessária, sem fixar um estilo visual global;
- imageAlt descreve de forma acessível a imagem pretendida;
- omita highlight quando ele não for necessário.`

    const result = await this.requestJson<ScriptDraft>(prompt, scriptSchema)
    validateScriptDraft(result, lessonId)
    return result
  }

  async generateImagePrompt(sceneDescription: string): Promise<string> {
    const prompt = `Redija somente um prompt em português do Brasil, para gerar uma ilustração educacional com um modelo de geração de imagem.

Descrição da cena: ${sceneDescription}

O prompt deve pedir uma imagem sem texto legível, sem logotipos e sem marcas. Não inclua explicações, título, Markdown ou variações — apenas o prompt em si.`

    return this.requestText(prompt)
  }

  async generateImage(prompt: string, outputFile: string): Promise<void> {
    const body = await this.postGenerateContent(this.imageModel, prompt, {
      responseModalities: ['TEXT', 'IMAGE'],
    })

    const imagePart = body.candidates?.[0]?.content?.parts?.find(
      (part) => part.inlineData?.data,
    )

    if (!imagePart?.inlineData?.data) {
      const reason =
        body.promptFeedback?.blockReason ??
        body.candidates?.[0]?.finishReason ??
        'nenhuma imagem retornada'
      throw new Error(`O Gemini não retornou uma imagem: ${reason}`)
    }

    await writeFile(outputFile, Buffer.from(imagePart.inlineData.data, 'base64'))
  }

  private async requestJson<T>(prompt: string, schema: object): Promise<T> {
    const text = await this.request(prompt, {
      responseMimeType: 'application/json',
      responseSchema: schema,
    })

    try {
      return JSON.parse(text) as T
    } catch (error) {
      throw new Error(
        `O Gemini retornou JSON inválido: ${error instanceof Error ? error.message : String(error)}`,
        { cause: error },
      )
    }
  }

  private requestText(prompt: string): Promise<string> {
    return this.request(prompt)
  }

  private async request(
    prompt: string,
    generationConfig?: Record<string, unknown>,
  ): Promise<string> {
    const body = await this.postGenerateContent(this.model, prompt, generationConfig)

    const text = body.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? '')
      .join('')
      .trim()

    if (!text) {
      const reason =
        body.promptFeedback?.blockReason ??
        body.candidates?.[0]?.finishReason ??
        'resposta vazia'
      throw new Error(`O Gemini não retornou conteúdo utilizável: ${reason}`)
    }

    return text
  }

  private async postGenerateContent(
    model: string,
    prompt: string,
    generationConfig?: Record<string, unknown>,
  ): Promise<GeminiResponse> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`
    let response: Response

    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          ...(generationConfig ? { generationConfig } : {}),
        }),
      })
    } catch (error) {
      throw new Error(
        `Não foi possível acessar a API Gemini: ${error instanceof Error ? error.message : String(error)}`,
        { cause: error },
      )
    }

    const body = (await response.json()) as GeminiResponse
    if (!response.ok) {
      throw new Error(
        `A API Gemini respondeu com HTTP ${response.status}: ${body.error?.message ?? 'erro não detalhado'}`,
      )
    }

    return body
  }
}

function validateScriptDraft(draft: ScriptDraft, lessonId: string): void {
  if (draft.lesson?.id !== lessonId) {
    throw new Error(`O roteiro retornou lesson.id diferente de "${lessonId}".`)
  }

  if (!Array.isArray(draft.scenes) || draft.scenes.length === 0) {
    throw new Error('O roteiro retornado não contém cenas.')
  }

  const sceneIds = new Set<string>()
  for (const scene of draft.scenes) {
    if (!scene.id || sceneIds.has(scene.id)) {
      throw new Error(`O roteiro contém id de cena vazio ou duplicado: "${scene.id}".`)
    }
    sceneIds.add(scene.id)

    if (!scene.narrationScript?.trim() || !scene.captionSegments?.length) {
      throw new Error(`A cena "${scene.id}" não contém narração e legendas válidas.`)
    }
  }
}
