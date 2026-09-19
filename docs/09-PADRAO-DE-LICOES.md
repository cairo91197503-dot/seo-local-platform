# Padrão de Lições

Este documento é a fonte operacional para criar, revisar ou alterar lições. Os princípios pedagógicos que orientam este padrão estão em `docs/08-ARQUITETURA-PEDAGOGICA.md`.

## Estrutura geral

Uma lição deve:

- ensinar um conceito simples;
- mostrar por que ele importa;
- conectar o conceito com uma situação real do cliente;
- terminar em uma ação prática quando aplicável.

O conteúdo deve ajudar o pequeno empresário a tomar uma decisão ou executar uma ação útil, sem exigir formação técnica em SEO.

## Regra de linguagem

- usar português do Brasil;
- usar linguagem simples;
- evitar jargão de marketing;
- explicar SEO apenas quando necessário;
- não prometer “primeiro lugar no Google”;
- não usar linguagem de hack de algoritmo;
- falar do benefício comercial de forma concreta;
- diferenciar fatos oficiais, orientações práticas e exemplos.

## Pergunta de validação de conteúdo

Toda recomendação deve responder a pelo menos uma destas perguntas:

> Isso ajuda o cliente a encontrar, entender, confiar, escolher ou entrar em contato com o negócio?

Se não responder e for apenas um suposto hack de algoritmo, não deve entrar na lição sem evidência oficial.

## Estrutura pedagógica recomendada

O padrão inicial é:

```text
Contexto
→ Problema / situação real
→ Explicação simples
→ Exemplo
→ Consequência prática
→ Ação / missão
```

Essa sequência descreve funções pedagógicas, não um número obrigatório de cenas. A quantidade fixa de cenas permanece como `DECISÃO NECESSÁRIA`.

## Relação com missão

Sempre que possível:

- a lição ensina;
- a missão faz o usuário aplicar o aprendizado no próprio negócio.

Não devem ser inventados critérios de validação de missão. O modelo definitivo de missão e seus critérios permanecem como `DECISÃO NECESSÁRIA`.

## Avaliações

Princípio aprovado:

> Depois de proporcionar uma boa experiência, peça ao cliente que compartilhe uma avaliação genuína. Essa experiência real pode ajudar o próximo cliente a decidir com mais confiança.

As lições devem:

- priorizar opinião sincera;
- ensinar que avaliações devem refletir experiências genuínas;
- permitir a solicitação legítima por link ou QR code quando aplicável;
- recomendar respostas úteis e respeitosas às avaliações.

As lições não devem:

- incentivar avaliações falsas;
- oferecer benefícios em troca de avaliação;
- ensinar review gating ou seleção enganosa de quem pode avaliar;
- solicitar nota específica;
- pressionar o cliente a publicar, alterar ou remover uma avaliação.

## Fotos

Fotos devem ser ensinadas pela utilidade para o cliente:

- a fachada ajuda a reconhecer o local;
- o produto mostra o que será comprado;
- o serviço ou resultado ajuda a entender o trabalho;
- o ambiente reduz incerteza antes da visita.

As fotos devem representar o negócio real. Não ensinar “publique fotos porque o algoritmo gosta de fotos” como afirmação factual sem fonte oficial.

## Postagens

Postagens podem ser ensinadas como meio de comunicar:

- novidades;
- ofertas;
- eventos;
- atualizações;
- informações úteis.

Não ensinar “postar toda semana melhora o ranking” como fato. Frequência editorial e rotina de postagens podem ser propostas por utilidade ao cliente, mas não apresentadas como fator de ranking sem evidência oficial.

## Atualização do perfil

> O perfil não é uma configuração feita uma única vez; é uma representação viva do negócio.

As lições devem incentivar uma rotina de manutenção, especialmente quando horários, contatos, serviços, produtos, fotos ou outras informações mudarem.

## Busca e intenção

- muitas buscas locais acontecem quando a pessoa já tem uma necessidade;
- isso pode indicar intenção comercial alta;
- nem toda busca local representa necessariamente um cliente pronto para comprar;
- não se deve afirmar que busca local é compra, contato ou contratação garantida.

## Evidência e precisão

- afirmações sobre funcionamento do Perfil da Empresa, políticas e ranking devem usar documentação oficial do Google;
- relatos podem ilustrar dificuldades ou situações reais, mas não provar fatores de ranking;
- não transformar correlação ou experiência isolada em regra de algoritmo;
- não prometer posição, tráfego, contatos ou vendas;
- quando faltar uma decisão ou evidência, registrar `DECISÃO NECESSÁRIA` em vez de completar por inferência.

## Assets e produção audiovisual

- não gerar, substituir ou sobrescrever assets aprovados sem autorização;
- não tratar uma voz aprovada para uma cena como padrão de todas as lições;
- não tratar um conceito visual de uma cena como padrão visual definitivo;
- preservar roteiro, áudio e timestamps aprovados quando a tarefa não autorizar sua alteração.

## Contrato técnico atual da microlição

O contrato implementado está definido pelos tipos em `src/content/lessons/types.ts`, pela primeira lição em `src/content/lessons/reviews-importance.ts` e pelo consumo em `src/pages/LearnPage.tsx` e `src/components/learn/SceneView.tsx`. A pipeline de rascunhos deve gerar `lesson.json` com esta mesma forma:

```ts
type Lesson = {
  id: string
  title: string
  duration: string
  level: string
  futureReward: string
  scenes: LessonScene[]
}

type LessonScene = {
  id: string
  title: string
  text: string
  highlight?: string
  mascot?: string
  illustration?: {
    src: string
    alt: string
  }
  animation?: string
  narration?: {
    script: string
    audioSrc?: string
    segments?: Array<{
      text: string
      startSeconds: number
      endSeconds: number
    }>
  }
  estimatedDurationSeconds?: number
}
```

### Semântica consumida pela interface

- `Lesson.scenes` define a ordem de navegação. `LessonScene.id` também é usado como `key` da cena e deve ser único na lição.
- **Desde 2026-09-12, `title` e `text` não aparecem mais na tela.** A pedido do usuário ("retirar as legendas e deixar apenas narração"), `SceneView` deixou de renderizar o título e o texto da cena como legenda visível — a experiência visual passou a ser só ilustração (quando existir) + áudio de narração (quando existir). `title`, `text` e `highlight` continuam existindo nos dados e compõem o `accessibleTranscript`, renderizado como texto visualmente oculto (`.visually-hidden`) para leitores de tela — sem eles, uma cena sem `narration.script` ficaria sem nenhuma alternativa textual para acessibilidade.
- `illustration.src` é passado diretamente ao elemento `img`; a lição 1 usa uma URL pública absoluta, `/images/lessons/reviews-importance/cena-01.png`. `illustration.alt` é o texto alternativo da imagem.
- `narration.audioSrc` é passado diretamente ao elemento `audio`.
- `narration.script`, quando presente, substitui `[text, highlight]` como transcript acessível completo.
- `narration.segments` (legenda sincronizada) e `estimatedDurationSeconds` continuam fazendo parte do tipo, mas não têm mais efeito visual nenhum — a interface não exibe legenda sincronizada nem estática. Novo conteúdo não precisa mais gerar `segments`.
- `mascot` e `animation` fazem parte do tipo, mas ainda não são consumidos por `SceneView`.

43 das 48 cenas do currículo têm narração integrada; faltam 5 (ver lista em "Produção de narração (fluxo simples)" acima), geráveis em qualquer IA de voz sem depender de pipeline. Enquanto uma cena não tiver áudio, ela aparece só com a ilustração — sem texto visível nem audível, já que a legenda visível foi removida da interface em 2026-09-12 (ver `docs/07-CHANGELOG.md`).

## Produção de narração (fluxo simples, 2026-09-19)

Decisão: a narração de cada cena é **um arquivo de áudio comum + uma linha no `.ts` da lição**. Nada de Piper, whisper.cpp, manifestos, alinhamento por palavra, VM ou CLI — qualquer IA com voz em português resolve (Gemini TTS, ElevenLabs, ChatGPT com voz, etc.).

Por que isso basta: a interface (`SceneView`) consome só `narration.script` (transcript acessível) e `narration.audioSrc` (o `<audio>`). `segments` e `estimatedDurationSeconds` continuam no tipo como legado opcional, mas não têm efeito visual nenhum — produzir narração nova **não** exige gerá-los.

### Prompt universal de voz (colar uma vez, vale para todas as cenas)

```text
Narração em português do Brasil para um app que ajuda pequenos empresários. Voz masculina adulta, brasileira, calorosa e natural — tom de parceiro de confiança, não de locutor de rádio nem de professor. Ritmo pausado e claro, sem pressa, sem dramatização. Pronúncia natural das palavras, sem soletrar nada. Grave exatamente o texto abaixo, palavra por palavra, sem acrescentar, remover ou improvisar nada:
```

### Passo a passo por cena

```text
1. copiar o `narration.script` da cena (está no `.ts` da lição, em `src/content/lessons/`)
2. colar o prompt de voz acima + o script na IA de voz e gerar
3. baixar o áudio (de preferência MP3 — ocupa ~10x menos que WAV; os 43 WAVs atuais somam 14,9 MB no precache do PWA)
4. salvar em `public/audio/lessons/<lesson-id>/<scene-id>/narration-v001.mp3`
5. no `.ts` da lição, dentro do `narration` da cena, adicionar:
   audioSrc: '/audio/lessons/<lesson-id>/<scene-id>/narration-v001.mp3',
6. `npm run lint` + `npm run build`
```

Revisão humana continua obrigatória antes de publicar: ouvir o áudio conferindo que não há palavra trocada, cortada ou com pronúncia estranha (nome próprio, número, sigla). Se houver, regenerar — nunca editar o `script` para "acompanhar" um áudio errado; o `script` é a fonte canônica do roteiro.

### As 5 cenas sem áudio (prontas para gerar hoje)

Destino e script de cada uma — é só colar o prompt universal + o script:

1. `business-hours-matter` / `action` → `public/audio/lessons/business-hours-matter/action/narration-v001.mp3`
   > Agora é sua vez: confira se o horário do seu perfil está correto, incluindo os próximos feriados ou exceções que você já souber.
2. `choose-your-next-action` / `intro` → `public/audio/lessons/choose-your-next-action/intro/narration-v001.mp3`
   > Você chegou ao fim do currículo, mas não ao fim da jornada. Cuidar da presença do seu negócio no Google é uma rotina contínua.
3. `choose-your-next-action` / `choose` → `public/audio/lessons/choose-your-next-action/choose/narration-v001.mp3`
   > De tudo que você aprendeu, escolha uma ação concreta para fazer agora. O objetivo não é terminar o curso do Estrelar — é saber cuidar do seu negócio no Google, de forma contínua.
4. `choose-your-next-action` / `example` → `public/audio/lessons/choose-your-next-action/example/narration-v001.mp3`
   > Pode ser qualquer uma das três melhorias que você identificou na missão anterior — o importante é escolher uma e executar.
5. `choose-your-next-action` / `action` → `public/audio/lessons/choose-your-next-action/action/narration-v001.mp3`
   > Escolha uma das melhorias que você identificou e coloque em prática agora. Você já sabe cuidar disso sozinho — e, no futuro, o Estrelar vai poder ajudar a fazer parte disso por você, sempre com a sua aprovação antes de qualquer mudança.

Depois de gerar as 5, a integração (adicionar os 5 `audioSrc`) é feita pela IA em seguida.

## Pipeline assistida para rascunhos (LEGADO/PAUSADO para áudio desde 2026-09-19)

O comando fica fora do app React e não publica conteúdo. **Parte de áudio (Piper local, WAV por cena, `audio-timings.json`) está pausada desde 2026-09-19** — ver "Produção de narração (fluxo simples)" acima, que substitui esse caminho. O restante (roteiro textual + prompts de imagem via Gemini) continua válido como rascunho:

```bash
npm run generate:lesson -- \
  --lesson-id horario-especial \
  --topic "Horário especial no Perfil da Empresa" \
  --outline "Explique quando revisar e atualizar o horário especial." \
  --piper-model /caminho/local/pt_BR-voz-medium.onnx
```

Antes de executar, defina `GOOGLE_AI_STUDIO_API_KEY` somente no ambiente local. O executável Piper pode ser configurado por `PIPER_BIN`, o modelo de texto por `GEMINI_MODEL` (padrão `gemini-2.5-flash`) e o modelo de imagem por `GEMINI_IMAGE_MODEL` (padrão `gemini-3.1-flash-image`, a versão atual do "Nano Banana"). O arquivo de voz Piper é obrigatório em cada execução porque uma voz global para as lições ainda não foi aprovada.

**Desde 2026-08-24 o pipeline é ponta a ponta automático até a geração dos artefatos de rascunho**, incluindo as imagens — deixou de exigir colar prompts manualmente no Meta AI. O CLI usa adapters separados para:

1. gerar o roteiro textual estruturado com Gemini;
2. gerar um WAV por cena com o Piper local;
3. ler a duração do WAV e distribuir proporcionalmente as legendas na linha do tempo;
4. redigir com Gemini um prompt de imagem por cena e, na sequência, chamar a própria API Gemini (`GeminiAdapter.generateImage`) para gerar e salvar o PNG de cada cena automaticamente.

Cada chamada de geração de imagem consome a cota paga da chave `GOOGLE_AI_STUDIO_API_KEY` configurada localmente — isso só acontece quando um humano roda o comando, nunca de forma agendada ou automática pela IA.

A distribuição proporcional gera timestamps iniciais de edição, não alinhamento fonético ou por palavra. A revisão humana deve ouvir o áudio e corrigir `startSeconds` e `endSeconds` quando necessário. As imagens geradas também não são aprovadas automaticamente — são um rascunho a revisar, como o resto do conteúdo.

Cada execução cria `content-drafts/<lesson-id>/` com:

```text
README.md
script.json
audio-timings.json
lesson.json
audio/cena-01.wav
image-prompts/cena-01.txt
images/cena-01.png         # já gerada automaticamente; ainda não revisada
```

O número de arquivos por cena varia conforme o roteiro. O diretório `content-drafts/` é ignorado pelo Git para evitar publicação acidental. O comando recusa sobrescrever uma pasta de rascunho existente.

### Fluxo de revisão e publicação

```text
gerar rascunho (roteiro + áudio + imagens, tudo automático)
→ revisar roteiro
→ ouvir áudio e revisar timestamps/cenas
→ revisar cada imagem gerada; ajustar o prompt e regenerar a cena se necessário
→ realizar revisão humana final
→ copiar manualmente os assets aprovados para public/
→ converter/revisar lesson.json como conteúdo TypeScript
→ publicar manualmente no catálogo
```

O CLI não copia arquivos para `public/` e não altera catálogo, páginas, componentes ou rotas — isso continua manual e depende de aprovação humana. Os caminhos `/images/lessons/<lesson-id>/...` e `/audio/lessons/<lesson-id>/...` em `lesson.json` representam os destinos públicos esperados apenas para a etapa manual posterior à aprovação.

A voz padrão para todas as lições e o padrão visual definitivo permanecem como `DECISÃO NECESSÁRIA`.

## Decisões ainda abertas

As decisões estruturais completas são mantidas em `docs/08-ARQUITETURA-PEDAGOGICA.md`. Para a produção de lições, permanecem especialmente abertas:

- **DECISÃO NECESSÁRIA:** quantidade fixa de cenas;
- **DECISÃO NECESSÁRIA:** critérios de conclusão pedagógica;
- **DECISÃO NECESSÁRIA:** sistema definitivo de XP;
- **DECISÃO NECESSÁRIA:** persistência de progresso;
- **DECISÃO NECESSÁRIA:** formato e regras de quizzes;
- **DECISÃO NECESSÁRIA:** modelo definitivo de missão;
- **DECISÃO NECESSÁRIA:** voz padrão para todas as lições;
- **DECISÃO NECESSÁRIA:** padrão visual definitivo.

## Fonte canônica de roteiro e legendas

O campo `narration.script` da cena é a fonte oficial do roteiro narrado. Desde 2026-09-19, ele também é o texto a colar na IA de voz (ver "Produção de narração (fluxo simples)" acima) — o roteiro escrito à mão e o texto narrado são o mesmo, sem camada intermediária.

`segments` e `estimatedDurationSeconds` são legado do pipeline antigo (Piper + whisper.cpp, `scripts/media/`, pausado): continuam nos arquivos das 43 cenas já integradas por registro histórico, mas não são consumidos pela interface e **não precisam ser produzidos para narração nova**. Os manifestos em `media/manifests/` ficam como registro do que foi gerado por aquele pipeline, não como etapa do fluxo atual.

Alterar o roteiro invalida a narração dependente dele. Regenerar o áudio nunca altera o roteiro.
