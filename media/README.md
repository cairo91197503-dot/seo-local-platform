# Pipeline de mídia

Este diretório contém os manifestos versionados do pipeline de mídia. O conteúdo editorial continua em `src/content/lessons/`; o manifesto registra referências, hashes, providers, artefatos, validações e aprovações.

## Separação de assets

- `.media/`: cache e artefatos experimentais, fora do Git.
- `media/manifests/`: estado operacional versionado.
- `public/`: somente assets aprovados e integrados.

Uma geração cria um candidato e nunca substitui o asset corrente. A sequência obrigatória é:

```text
generate → validate → review → approve → integrate
```

## Configuração local

Os caminhos são configurados por ambiente e não devem ser commitados:

- `MEDIA_WORKDIR` — workspace opcional; padrão `.media/`.
- `PIPER_BIN` — executável Piper.
- `PIPER_MODEL` — arquivo do modelo Piper.
- `PIPER_EXTRA_ARGS_JSON` — argumentos adicionais em array JSON.
- `WHISPER_CPP_BIN` — executável do whisper.cpp.
- `WHISPER_CPP_MODEL` — arquivo do modelo Whisper.
- `WHISPER_CPP_EXTRA_ARGS_JSON` — argumentos adicionais, inclusive a configuração DTW usada no ambiente, em array JSON.

Exemplo conceitual:

```bash
export PIPER_EXTRA_ARGS_JSON='[]'
export WHISPER_CPP_EXTRA_ARGS_JSON='["--dtw", "modelo-dtw"]'
```

Os executáveis, modelos e flags reais devem ser confirmados em cada PC, VM ou CI.

## Comandos

```text
npm run media:status -- <lesson>
npm run media:validate -- <lesson>
npm run media:narration -- <lesson> <scene>
npm run media:timestamps -- <lesson> <scene>
npm run media:prepare -- <lesson> <scene>

npm run media -- review <lesson> <scene> narration --accept --by <nome>
npm run media -- approve <lesson> <scene> narration --by <nome>
npm run media -- integrate <lesson> <scene> narration
```

`prepare` gera e valida narração e alinhamento, mas para antes de revisão, aprovação e integração.

A integração de narração copia o candidato aprovado para um caminho público versionado. Se `lesson.ts` ainda não referenciar esse caminho, o comando para sem promover o candidato; após a referência ser revisada, uma segunda execução conclui a promoção. Para timestamps, o comando exibe os offsets aprovados e só promove o candidato depois que os mesmos offsets estiverem presentes na lição.

## Fonte do texto

`narration.script` em `lesson.ts` é a fonte oficial do roteiro. O manifesto guarda apenas `ref` e `sha256`. Os segmentos usam offsets `textStart`/`textEnd`; a legenda é derivada do próprio roteiro. A transcrição bruta do alinhador permanece em `.media/` como diagnóstico e nunca substitui automaticamente o texto editorial.
