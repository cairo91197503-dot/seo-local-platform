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
- `title` é o título visível da cena. `text` é o texto visual padrão; `highlight`, quando presente, compõe o transcript acessível de uma cena sem `narration.script`.
- `illustration.src` é passado diretamente ao elemento `img`; a lição 1 usa uma URL pública absoluta, `/images/lessons/reviews-importance/cena-01.png`. `illustration.alt` é o texto alternativo da imagem.
- `narration.audioSrc` é passado diretamente ao elemento `audio`; a lição 1 usa `/audio/lessons/reviews-importance/cena-01.wav`.
- `narration.script` é o transcript acessível completo. Ele não precisa ser idêntico a cada legenda resumida: na cena 1 atual, o transcript aprovado e os textos dos segmentos têm redações diferentes.
- `narration.segments` controla a legenda sincronizada. Um segmento fica ativo quando `currentTime >= startSeconds` e `currentTime < endSeconds`. Sem segmentos, a interface exibe `scene.text`; com segmentos, pode haver um intervalo sem legenda se nenhum segmento cobrir o tempo corrente.
- `estimatedDurationSeconds` registra a duração estimada da cena; a interface atual não usa esse campo para controlar o áudio.
- `mascot` e `animation` fazem parte do tipo, mas ainda não são consumidos por `SceneView`.

Na primeira lição, somente a cena `intro` possui atualmente ilustração, áudio, transcript, segmentos e duração. As outras três cenas demonstram que esses campos são opcionais. A pipeline gera esses artefatos para todas as cenas do novo rascunho, sem alterar essa lição aprovada.

## Pipeline assistida para rascunhos

O comando fica fora do app React e não publica conteúdo:

```bash
npm run generate:lesson -- \
  --lesson-id horario-especial \
  --topic "Horário especial no Perfil da Empresa" \
  --outline "Explique quando revisar e atualizar o horário especial." \
  --piper-model /caminho/local/pt_BR-voz-medium.onnx
```

Antes de executar, defina `GOOGLE_AI_STUDIO_API_KEY` somente no ambiente local. O executável pode ser configurado por `PIPER_BIN` e o modelo de texto por `GEMINI_MODEL`; o modelo padrão é `gemini-2.5-flash`. O arquivo de voz Piper é obrigatório em cada execução porque uma voz global para as lições ainda não foi aprovada.

O CLI usa adapters separados para:

1. gerar o roteiro textual estruturado com Gemini;
2. gerar um WAV por cena com o Piper local;
3. ler a duração do WAV e distribuir proporcionalmente as legendas na linha do tempo;
4. redigir com Gemini um prompt textual por cena para uso manual no Meta AI.

A distribuição proporcional gera timestamps iniciais de edição, não alinhamento fonético ou por palavra. A revisão humana deve ouvir o áudio e corrigir `startSeconds` e `endSeconds` quando necessário.

Cada execução cria `content-drafts/<lesson-id>/` com:

```text
README.md
script.json
audio-timings.json
lesson.json
audio/cena-01.wav
image-prompts/cena-01.txt
images/                    # destino das imagens baixadas manualmente
```

O número de arquivos por cena varia conforme o roteiro. O diretório `content-drafts/` é ignorado pelo Git para evitar publicação acidental. O comando recusa sobrescrever uma pasta de rascunho existente.

### Fluxo de revisão e publicação

```text
gerar rascunho
→ revisar roteiro
→ ouvir áudio e revisar timestamps/cenas
→ colar cada prompt manualmente no Meta AI
→ baixar e salvar cada PNG com o nome indicado no README do rascunho
→ realizar revisão humana final
→ copiar manualmente os assets aprovados para public/
→ converter/revisar lesson.json como conteúdo TypeScript
→ publicar manualmente no catálogo
```

O CLI não chama API de geração de imagem, não copia arquivos para `public/` e não altera catálogo, páginas, componentes ou rotas. Os caminhos `/images/lessons/<lesson-id>/...` e `/audio/lessons/<lesson-id>/...` em `lesson.json` representam os destinos públicos esperados apenas para a etapa manual posterior.

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
