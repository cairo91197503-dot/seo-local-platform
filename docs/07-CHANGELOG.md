# Changelog

## 2026-09-13 — Imagens implementadas nas lições 6 a 12, completando as 12 lições (Fase 3)

A pedido do usuário ("o restante das imagens estao na pasta! coloca elas no app"), integradas as 27 imagens restantes do currículo — as 4 cenas das lições 6, 8, 9, 10, 11 e 12, mais as 3 cenas que faltavam da lição 7 (a cena 1 já estava implementada desde 2026-09-12). Com isso, as 12 lições do currículo passam a ter imagem nas 4 cenas.

**Imagens identificadas e integradas:** como nas lições 1 a 5, os arquivos vieram do Gemini com nomes genéricos (ex.: `Gemini_Generated_Image_kx013ykx013ykx01.jpg`), agrupados em `OneDrive\Imagens\seo\Nova pasta (6)` até `Nova pasta (12)` (uma pasta por lição). Cada uma das 27 imagens foi aberta e comparada ao texto em português presente na própria imagem e à descrição de cena em `docs/14-PROMPTS-DE-IMAGEM-LICOES.md` para determinar a correspondência correta antes de copiar. Copiadas para `public/images/lessons/<lesson-id>/cena-0N.jpg` e referenciadas no campo `illustration` de cada cena em `src/content/lessons/{photos-help-customers-decide,reviews-importance,review-request-message,how-to-respond-to-reviews,keep-your-profile-updated,first-profile-checkup,choose-your-next-action}.ts`.

Restaram 6 arquivos na raiz de `OneDrive\Imagens\seo` (fora de qualquer pasta "Nova pasta") sem correspondência clara a nenhuma cena — não foram usados; vale perguntar ao usuário o que são.

`docs/13-CURRICULO-MVP.md` atualizado: tabela do currículo e parágrafo de resumo revisados para refletir que as 12 lições têm imagem completa, enquanto o status de integração de áudio (roteiro escrito para as 12, mas geração/integração ainda em andamento entre a VM Oracle e o restante do projeto) permanece descrito como "a confirmar" por lição, evitando afirmar um status que ainda não foi verificado ponta a ponta. Validado com `npm run lint` e `npm run build` (ambos limpos).

## 2026-09-12 — Roteiros de narração escritos para as 48 cenas; pipeline de áudio habilitado para todas as lições (Fase 3)

A pedido do usuário ("agora preciso do comando para gerar os áudios e subir pro GitHub", confirmando o escopo via pergunta: "roteiro para as 4 cenas de todas as 12 lições"), foi escrito o campo `narration.script` em cada uma das 48 cenas do currículo (12 lições × 4 cenas). Cada roteiro é uma paráfrase falada natural do `title`/`text`/`highlight` da cena — não necessariamente idêntica ao texto visual, como já previsto em `docs/09-PADRAO-DE-LICOES.md`.

**Pipeline de mídia (`scripts/media/`) habilitado para as 12 lições:** antes, `scripts/media/lesson-source.ts` só registrava manualmente `reviewsImportanceLesson`, deixando as outras 11 lições inutilizáveis pelo CLI (`npm run media -- ...`). Trocado para importar `lessonRegistry` de `src/content/lessons/registry.ts` (já existia e registra as 12 lições), eliminando a lista manual duplicada.

**Bug encontrado e corrigido:** `src/content/lessons/registry.ts` importava os módulos de lição sem a extensão `.js` exigida pelo `moduleResolution: "NodeNext"` do projeto — isso quebrava `npm run build` (`tsc -b`) assim que o arquivo passou a ser usado pelo pipeline de mídia. Corrigido adicionando `.js` em todos os 12 imports, seguindo o mesmo padrão já usado nos outros arquivos de lição.

**Manifestos do pipeline criados:** `npm run media -- status <lição>` e os demais comandos exigem um arquivo `media/manifests/<lessonId>.json` pré-existente (não há criação automática). Criado um manifesto inicial (status `pending` em todas as cenas) para as 11 lições que ainda não tinham um, com o hash do roteiro de cada cena já calculado — assim os comandos `narration generate`/`alignment generate`/`prepare` já funcionam de primeira, sem passo manual extra.

**Áudio já existente restaurado:** a cena `intro` de `reviews-importance` já tinha narração gerada, validada, revisada, aprovada e integrada num momento anterior (registrado em `media/manifests/reviews-importance.json`, com o arquivo `public/audio/lessons/reviews-importance/cena-01.wav` ainda presente no projeto) — só o campo `audioSrc`/`segments` no `.ts` da lição tinha sido removido quando a narração foi tirada temporariamente. Como o roteiro reescrito bateu exatamente com o hash já registrado no manifesto (confirmado por SHA-256), `audioSrc` e `segments` foram restaurados nessa cena sem precisar gerar áudio de novo.

Validado com `npm run lint`, `npm run build` (incluindo `tsc -p tsconfig.media.json`) e `npm run media -- status <lição>`/`validate` para lições novas e a já integrada — todos limpos.

**Orquestrador criado para gerar as 47 cenas restantes sem trabalho manual repetitivo:** o fluxo do pipeline (`prepare` → `review --accept` → `approve` → `integrate`, duas vezes para narração e duas para alinhamento, com edição manual do `.ts` da lição entre as duas chamadas de `integrate`) exigiria dezenas de passos manuais por cena. Criado `scripts/media/generate-all.mjs` (roda com `npm run media:generate-all -- [--by "Nome"] [--lesson <id>]`), que percorre as 12 lições/48 cenas, roda o pipeline completo cena a cena, faz o parsing da saída de `integrate` para extrair o `audioSrc`/`segments` gerados e aplica a edição automaticamente no `.ts` da lição via um novo `scripts/media/apply-audio-field.mjs`, recompilando entre as chamadas. Cenas já integradas são puladas (idempotente — pode ser interrompido e rodado de novo). Falha em uma cena não interrompe as demais; um resumo final lista o que deu certo e o que falhou. Testado neste ambiente (sem Piper/whisper.cpp instalados) até o ponto em que o provedor de narração é chamado — confirma que a orquestração, o parsing e a aplicação de patch funcionam; a geração de áudio de verdade só roda na VM do usuário, onde Piper e whisper.cpp estão configurados.

Também corrigido: o manifesto `media/manifests/reviews-importance.json` só tinha a cena `intro` (criado antes desta sessão) — adicionadas as cenas `trust`, `timing` e `action` que faltavam.

## 2026-09-12 — Legenda visível removida de todas as lições; só narração (Fase 3)

A pedido do usuário ("quero retirar as legendas das lições e deixar apenas narração"), `SceneView` (`src/components/learn/SceneView.tsx`) deixou de renderizar `title` e o texto/legenda da cena na tela. A experiência visual de uma cena passa a ser só a ilustração (quando existir) mais o controle de áudio de narração (quando existir) — nada de texto sobreposto.

Esclarecido com o usuário antes de mexer no código: "legenda" aqui significa o texto visível de cada cena (título + texto), não a legenda sincronizada com áudio palavra por palavra. Ele confirmou explicitamente que queria a mudança em todas as 12 lições imediatamente, mesmo sabendo que **nenhuma lição tem narração agora** (a única que tinha, a cena 1 de `reviews-importance`, teve o áudio removido momentos antes, também a pedido dele) — então, até haver áudio, a maioria das cenas fica sem nenhum conteúdo perceptível na tela além da imagem (quando existir).

**O que mudou no código:**
- `title` passou a usar a classe `.visually-hidden` em vez de `.lesson-scene__title` (deixa de aparecer sobreposto à imagem, mas continua existindo como heading para leitores de tela).
- O bloco de legenda visível (`.lesson-scene__caption`, incluindo a legenda sincronizada por `narration.segments`) foi removido inteiramente de `SceneView.tsx`.
- `accessibleTranscript` (já existente, renderizado como `.visually-hidden`) continua cobrindo `title`/`text`/`highlight`/`narration.script` para acessibilidade — remover a legenda visível não removeu o conteúdo para quem usa leitor de tela.
- Código morto removido: `currentTime`, `activeSegment`, `activeSegmentText`, `captionText` e o handler `onTimeUpdate` (só existiam para calcular a legenda sincronizada, que não é mais exibida).
- CSS morto removido de `src/styles/index.css`: `.lesson-scene__title` (estilo de sobreposição visual), `.lesson-scene__caption`, `.lesson-scene__text`, `.lesson-scene__segment`, `.lesson-scene__segment--active`, e as regras de mídia associadas.

`docs/09-PADRAO-DE-LICOES.md` e `docs/13-CURRICULO-MVP.md` atualizados para descrever o novo comportamento (texto/legenda não é mais renderizado; `narration.segments` deixou de ter efeito visual; produzir narração em áudio para as 12 lições passa a ser o próximo passo pendente para a experiência ficar completa de novo). Validado com `npm run lint` e `npm run build`, ambos limpos.

## 2026-09-12 — Projeto Firebase real criado; login com Google funcionando (Fase 2)

O usuário criou o projeto Firebase real "Estrelar" (`estrelar-cc725`) no console, resolvendo a dependência de credencial/conta que só ele podia resolver (mesma restrição já documentada para o Gemini). Passos feitos manualmente pelo usuário no console, guiados passo a passo:

- **Authentication:** provedor Google ativado em "Método de login".
- **Firestore Database:** criado em modo produção, região `southamerica-east1` (São Paulo).
- **Regras de segurança:** o conteúdo de `firestore.rules` (negar por padrão; cada usuário só lê/escreve o próprio documento em `/users/{userId}`) foi colado e publicado no console.
- **App Web registrado:** "Estrelar Web", gerando a config do SDK (`apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`).

Com os 6 valores da config, criado `.env.local` na raiz do projeto (só localmente no PC do usuário — arquivo já coberto por `.gitignore`, nunca commitado). O `measurementId` do Firebase Analytics veio no config copiado do console, mas foi deixado de fora: o código atual (`src/lib/firebase.ts`) só inicializa Auth e Firestore, Analytics não faz parte do escopo decidido até agora.

**Login com Google testado pelo usuário e confirmado funcionando de verdade** — antes disso o app rodava só com a interface pronta, mostrando aviso de configuração ausente. `docs/02-ROADMAP.md`, `docs/05-BANCO-DE-DADOS.md` e `.ai/context.md` atualizados para refletir que a Fase 2 está quase concluída — falta só o deploy real no Render (depende de o usuário criar a conta/serviço lá; `render.yaml` já está pronto).

## 2026-09-12 — Imagens implementadas nas lições 1 a 5; narração removida da lição 7 (Fase 3)

O usuário gerou manualmente (via Gemini, usando os prompts de `docs/14-PROMPTS-DE-IMAGEM-LICOES.md`) as 4 imagens de cada uma das lições 1 a 5 do currículo (`why-appear-in-local-search`, `profile-represents-your-business`, `accurate-business-info`, `business-hours-matter`, `explain-what-you-offer`) e conectou a pasta com os arquivos (`OneDrive\Imagens\seo`, subpastas "Nova pasta" a "Nova pasta (5)", 4 imagens cada). Pediu para colocar todas no projeto até a lição 5, e para tirar a narração por enquanto.

**Imagens identificadas e integradas:** como os arquivos vinham com nomes genéricos do Gemini (sem indicar a cena), cada uma das 20 imagens foi aberta e comparada ao conteúdo real de cada cena para determinar a correspondência correta antes de copiar. Copiadas para `public/images/lessons/<lesson-id>/cena-0N.jpg` (formato JPEG, mantido como veio — as imagens anteriores usavam PNG, mas não há motivo técnico para converter) e referenciadas no campo `illustration` de cada cena em `src/content/lessons/{why-appear-in-local-search,profile-represents-your-business,accurate-business-info,business-hours-matter,explain-what-you-offer}.ts`. As 5 lições passam a ter as 4 cenas ilustradas, seguindo a paleta de `docs/06-DESIGN-SYSTEM.md`.

**Qualidade:** a maioria das imagens saiu fiel ao prompt e ao estilo esperado; algumas têm pequenos defeitos de texto típicos de geração por IA (uma palavra cortada, um símbolo de cor tipo "#8C8478" aparecendo como texto literal em vez de virar cor, um número de estrelas ilegível) — nada que comprometa o uso, mas vale uma olhada do usuário com calma depois.

**Narração removida da lição 7 (`reviews-importance`):** a pedido explícito do usuário ("vamos tirar a narração por enquanto"), o campo `narration` (script, áudio, segmentos) e `estimatedDurationSeconds` foram removidos da cena `intro`, mantendo a `illustration` já aprovada (`cena-01.png`). O arquivo de áudio (`public/audio/lessons/reviews-importance/cena-01.wav`) não foi apagado, só deixou de ser referenciado — nenhuma lição usa áudio no momento.

`docs/13-CURRICULO-MVP.md` atualizado para refletir o novo status de cada lição na tabela do currículo. Validado com `npm run lint` e `npm run build` (ambos limpos).

## 2026-09-12 — Prompts de imagem para as 4 cenas de todas as 12 lições (`docs/14-PROMPTS-DE-IMAGEM-LICOES.md`)

O usuário pediu para criar e implementar as imagens das lições no app. Isso esbarra na mesma restrição já conhecida do Firebase: gerar as imagens reais depende de `GOOGLE_AI_STUDIO_API_KEY` (pipeline em `scripts/generate-lesson.ts`, `docs/09-PADRAO-DE-LICOES.md`), que não está configurada neste ambiente e que a IA não pode criar ou obter sozinha; também não há nenhuma ferramenta de geração de imagem disponível nesta sessão. Diante disso, o usuário escolheu (via pergunta explícita) que eu preparasse os prompts de imagem, para gerar/rodar depois manualmente ou na VM Oracle — e, num segundo pedido, pediu explicitamente cobertura completa: pelo menos 4 imagens por lição (uma por cena), prompts separados e completos, lição por lição.

`docs/14-PROMPTS-DE-IMAGEM-LICOES.md` foi expandido para cobrir as 4 cenas de todas as 12 lições — 48 prompts no total, um por cena, cada um completo e independente (pode ser colado sozinho no Gemini sem precisar consultar o resto do documento). Das 48, 1 já está aprovada e implementada (`reviews-importance`, cena 1) e não é regenerada; as outras 47 são novas. Cada prompt usa a paleta de `docs/06-DESIGN-SYSTEM.md` (evitando azul/cinza corporativo, ao contrário do ícone de busca azul já presente em `cena-01.png`, que permanece como está — asset aprovado não é alterado) e descreve uma composição específica alinhada ao conteúdo real de cada cena. O documento também registra o fluxo manual de revisão e publicação esperado depois que uma imagem for gerada.

**Nenhuma imagem foi gerada, nenhum asset aprovado foi tocado, nenhuma lição foi alterada** — este é só o material de apoio para quando a geração puder ser feita (por conta do usuário, ou fornecendo a chave de API).

## 2026-09-12 — As 12 lições e 12 missões do currículo do MVP implementadas (Fase 3)

Produzidas as 9 lições/missões que faltavam de `docs/13-CURRICULO-MVP.md` (entrada anterior deste changelog), completando o currículo do MVP inteiro — 12 lições, 12 missões, 1 trilha, 5 módulos.

**Lições novas** (`src/content/lessons/`, todas em texto, sem áudio/imagem, registradas em `registry.ts`): `why-appear-in-local-search`, `profile-represents-your-business`, `business-hours-matter`, `explain-what-you-offer`, `photos-help-customers-decide`, `how-to-respond-to-reviews`, `keep-your-profile-updated`, `first-profile-checkup`, `choose-your-next-action`. Cada uma segue o mesmo padrão de 4 cenas (contexto → conceito/destaque → exemplo/consequência → ação) já usado nas lições anteriores, com afirmações factuais limitadas à lista "Fatos oficiais do Google" de `docs/08-ARQUITETURA-PEDAGOGICA.md`.

**Missões novas** (`src/content/missions/catalog.ts`): `discover-search-presence`, `basic-profile-checkup`, `review-business-hours`, `review-services`, `review-photos`, `respond-to-a-review`, `quick-profile-review`, `identify-three-improvements`, `execute-one-improvement`. Nenhuma pede nota específica, oferece incentivo por avaliação ou sugere seleção de quem pode avaliar (`docs/09-PADRAO-DE-LICOES.md`). A missão de responder avaliações (`respond-to-a-review`) não tem exemplo de mensagem pronto — respostas a avaliações negativas variam caso a caso demais para um modelo único ser uma boa ideia.

**Todas as 12 lições em `src/content/lessons/catalog.ts` agora têm `status: 'disponivel'`** (as 9 novas estavam como `em-breve`). Nenhuma mudança foi necessária em `src/state/journey.ts` além da correção de bug já feita na entrega anterior (bônus inicial derivado de `CURRICULUM[0]`) — o currículo se expandiu inteiramente a partir do catálogo, confirmando que a generalização do modelo de estado feita mais cedo cumpriu o que se propôs.

Validado com `npm run lint`, `npm run build`, e um novo teste que percorre `CURRICULUM` programaticamente do início ao fim (em vez de encadear cada lição manualmente) — 62 verificações, incluindo XP final (730 = 12×20 + 12×40 + 10 de bônus), 25 marcos únicos em `awardedMilestoneIds`, e uma checagem textual simples de que nenhuma missão sugere nota específica ou troca por avaliação. Teste pelo navegador real segue bloqueado neste ambiente pela mesma razão de sempre: login Google real exigido, sem projeto Firebase configurado aqui.

**Com esta entrega, a prioridade nº 1 do usuário (lições) está concluída em sua forma ampliada** (currículo de 12, não mais o mínimo de 3). Próximo passo: prioridade nº 2 (QR Code e link para avaliações).

## 2026-09-12 — Currículo do MVP fechado: 1 trilha, 5 módulos, 12 lições (`docs/13-CURRICULO-MVP.md`)

O usuário trouxe uma proposta de currículo completo (avaliada contra `docs/08`, `docs/09` e `docs/12`) e decidiu adotá-la, criando `docs/13-CURRICULO-MVP.md`. Esse documento fecha, para o P0, quatro itens que `docs/08-ARQUITETURA-PEDAGOGICA.md` listava como `DECISÃO NECESSÁRIA`: currículo completo, quantidade de trilhas (1), quantidade de módulos (5) e currículo final do MVP (12 lições) — marcados como resolvidos em `docs/08`, seção "Decisões ainda abertas".

**O currículo mínimo de 3 lições/missões entregue nesta mesma data (ver entradas abaixo) passa a ocupar novas posições** dentro do currículo de 12 — nenhum conteúdo já escrito foi descartado, só reordenado:

| Antes | Depois | Lição |
| --- | --- | --- |
| 1ª | 3ª (módulo 1) | Informações corretas ajudam o cliente a entender o negócio (`accurate-business-info`) |
| 2ª | 7ª (módulo 3) | Por que as avaliações importam? (`reviews-importance`) |
| 3ª | 8ª (módulo 3) | Como fazer um pedido de avaliação genuíno (`review-request-message`) |

As outras 9 lições do currículo (módulos 1, 2, 4 e 5) foram adicionadas a `src/content/lessons/catalog.ts` com status `em-breve` — aparecem em "Aprender" como planejadas, mas sem conteúdo ainda; produção lição a lição continua sendo o próximo trabalho.

**Bug encontrado e corrigido durante a reordenação:** o bônus de 10 XP de "jornada inicial" (`docs/12-ESPECIFICACAO-MVP.md`, "após concluir a primeira lição e a primeira missão") estava implementado em `journey.ts` como um id fixo (`FIRST_MISSION_ID = 'request-first-review'`). Ao reordenar o currículo, `request-first-review` deixou de ser a primeira missão — o bônus teria ficado preso na missão errada. Corrigido: `FIRST_MISSION_ID` agora é derivado de `CURRICULUM[0]`, sempre a missão que efetivamente é a primeira do currículo vigente, e não pode mais ficar dessincronizado se o currículo for reordenado de novo no futuro. Também removida a constante `REVIEWS_IMPORTANCE_LESSON_ID`, que ficou sem uso depois que `getNextAction` passou a percorrer `CURRICULUM` (entrega anterior).

Validado com `npm run lint`, `npm run build`, e o teste da máquina de estados (agora 38 verificações), reescrito para a nova ordem do currículo e para confirmar que o bônus inicial segue a missão certa após a reordenação.

## 2026-09-12 — Lição 3 e missão 3: currículo mínimo completo (Fase 3)

Terceira e última lição/missão do currículo mínimo de `docs/12-ESPECIFICACAO-MVP.md`:

- `src/content/lessons/accurate-business-info.ts`: lição 3, "Informações corretas ajudam o cliente a entender o negócio" (4 cenas, texto apenas — sem áudio/ilustração, mesmo padrão da lição 2). Baseada nos princípios "SER ENCONTRADO" e "MANTER TUDO ATUALIZADO" de `docs/08-ARQUITETURA-PEDAGOGICA.md`; o destaque da cena 2 evita prometer posição específica nos resultados de busca, conforme a regra de não fazer promessa de ranking.
- Missão 3, "Revise uma informação essencial do negócio", adicionada a `src/content/missions/catalog.ts`: pede para o usuário conferir e, se preciso, atualizar telefone ou horário de funcionamento no Perfil da Empresa real — ações citadas como exemplo em `docs/08-ARQUITETURA-PEDAGOGICA.md` ("conferir horário", "conferir telefone").

**Generalização adicional em `src/content/missions/types.ts` e `MissionsPage.tsx`:** as missões 1 e 2 giram em torno de uma mensagem para um cliente, mas a missão 3 não — ela é uma autoconferência. `messageExample`/`messageExampleNote` viraram opcionais (a seção "Ajuda prática" só aparece quando a missão define um exemplo), e a pergunta final antes de declarar a ação passou a vir do catálogo (`confirmationPrompt`) em vez de um texto fixo sobre "cliente".

Graças à generalização do modelo de estado feita na entrega anterior, `src/state/journey.ts` não precisou de nenhuma alteração para suportar a terceira lição/missão — o currículo (`CURRICULUM`) é derivado automaticamente do catálogo de lições.

**Com esta entrega, as 3 lições e 3 missões do currículo mínimo de `docs/12-ESPECIFICACAO-MVP.md` estão implementadas**, fechando a prioridade nº 1 definida pelo usuário em 2026-09-12 (ver entrada "Prioridade de execução redefinida" abaixo). A prioridade nº 2 (QR Code/link de avaliações) é o próximo passo.

Validado com `npm run lint`, `npm run build`, e o mesmo teste da máquina de estados usado na entrega anterior, estendido para cobrir o ciclo completo das 3 lições/missões (35 verificações, todas passando) — incluindo o caso da missão sem exemplo de mensagem. Teste pelo navegador real segue bloqueado neste ambiente pela mesma razão já registrada: login Google real exigido, sem projeto Firebase configurado aqui.

## 2026-09-12 — Lição 2 e missão 2 do currículo mínimo; modelo de estado generalizado (Fase 3)

Primeira entrega da prioridade nº 1 definida pelo usuário (ver entrada anterior deste changelog). O currículo mínimo de `docs/12-ESPECIFICACAO-MVP.md` tinha só 1 de 3 lições; agora tem 2.

**O que foi adicionado:**

- `src/content/lessons/review-request-message.ts`: conteúdo da lição 2, "Como fazer um pedido de avaliação genuíno" (4 cenas, sem áudio/ilustração ainda — o pipeline de mídia em `scripts/generate-lesson.ts` roda separadamente, na Oracle VM). Segue as regras de `docs/09-PADRAO-DE-LICOES.md`: não pede nota específica, não sugere incentivo/troca por avaliação, linguagem simples em pt-BR.
- `src/content/lessons/registry.ts`: mapa `id → Lesson`, usado por `LessonPage` para carregar qualquer lição do catálogo (antes, `LessonPage` importava diretamente `reviewsImportanceLesson`, hardcoded).
- `src/content/missions/types.ts` e `src/content/missions/catalog.ts`: a missão "Peça sua primeira avaliação" (antes hardcoded dentro de `MissionsPage.tsx`) foi extraída para um catálogo, e a missão 2, "Prepare uma mensagem de solicitação respeitosa", foi adicionada — ela é desbloqueada ao concluir a lição 2.
- `src/content/lessons/catalog.ts`: ganhou o campo `missionId`, ligando cada lição à missão que ela desbloqueia.

**O que foi generalizado (`src/state/journey.ts`, `journey-context.ts`, `JourneyProvider.tsx`):** o modelo de estado só suportava uma lição e uma missão fixas. Agora:

- `missionStatus` (um valor único) virou `missionStatuses` (um mapa `missionId → status`), permitindo qualquer número de missões.
- `CURRICULUM`, derivado do catálogo de lições, define a ordem lição→missão a percorrer.
- `startFirstMission`/`declareFirstMissionAction`/`confirmFirstMission` viraram `startMission`/`declareMissionAction`/`confirmMission`, todas recebendo `missionId` — a mesma lógica agora serve qualquer missão do currículo, não só a primeira.
- Nova função `getCurrentMissionState`: devolve o ponto atual do usuário no currículo (lição bloqueada, missão em algum estado, ou "todas concluídas"), usada por `MissionsPage` para decidir o que mostrar sem precisar conhecer o currículo inteiro.
- O bônus de "jornada inicial" (10 XP) continua exclusivo da primeira missão (`request-first-review`), como já era.
- Chave do `localStorage` mudou de `estrelar-journey-v1` para `estrelar-journey-v2` (com `version: 2`), já que o formato do estado salvo mudou; jornadas antigas salvas localmente são descartadas e recomeçadas — aceitável nesta fase (nenhum usuário real ainda).

**O que foi corrigido de passagem (bug encontrado na auditoria de 2026-09-12, item "duas fontes de verdade para lição concluída"):** `LessonPage.tsx` e `LearnPage.tsx` usavam **dois** armazenamentos independentes para saber se uma lição foi concluída — o hook `useLessonProgress` (chave `lesson-progress`) e `journey.completedLessonIds` (chave `estrelar-journey-v1`), que podiam divergir. `src/hooks/useLessonProgress.ts` foi removido; agora `journey.completedLessonIds` é a única fonte de verdade.

**Também ajustado (achado da mesma auditoria, item "confirmação manual sem aviso"):** a tela de confirmação de missão agora exibe o texto "Esta confirmação é manual: o sistema registra sua declaração, mas não verifica a ação de forma externa.", conforme exigido por `docs/12-ESPECIFICACAO-MVP.md` ("o sistema registra que se trata de confirmação manual, não de verificação externa").

**Fora do escopo desta entrega, propositalmente:** lição 3 do currículo mínimo; persistir a cena em que o usuário parou dentro de uma lição ("retomar de onde parou"); a divergência entre os limiares de XP por nível no código (20/40/70) e em `docs/12` (20/60/100), ambas já sinalizadas na auditoria e ainda pendentes de decisão do usuário; a sequência de dias falsa ("Sequência: 0 dias") na Home.

Validado com `npm run lint`, `npm run build` (`tsc -b` limpo em todo o projeto) e um teste funcional da máquina de estados (`journey.ts`) fora da interface, cobrindo o fluxo completo — onboarding → lição 1 → missão 1 → lição 2 → missão 2 → currículo concluído —, idempotência de cada ação e XP final. O percurso pela interface via navegador não pôde ser testado ponta a ponta neste ambiente pelo mesmo motivo já registrado na entrega de login: o app exige login Google real antes de qualquer rota, e nenhum projeto Firebase real está configurado aqui.

## 2026-09-12 — Prioridade de execução redefinida; Fase 3 volta a ser retomável

O usuário definiu explicitamente a ordem de prioridade do trabalho daqui pra frente, registrada em `docs/02-ROADMAP.md` (seção "Prioridade atual") e em `.ai/context.md` ("Foco vigente"):

1. currículo/lições (Fase 3) — concluir as lições 2 e 3 do currículo mínimo (`docs/12-ESPECIFICACAO-MVP.md`);
2. QR Code e link para avaliações (Fase 5, adiantada na prioridade em relação à Fase 4);
3. colocar o app no ar (finalizar a parte de Fase 2 que depende do usuário: projeto Firebase real, variáveis de ambiente, deploy no Render).

**Gamificação (Fase 4) deixou de ser prioridade.** O que já existe (XP, níveis, progresso) continua funcionando como está, mas não deve receber trabalho novo até as três prioridades acima estarem concluídas ou o usuário mudar essa decisão.

Como consequência direta, a pausa da Fase 3 registrada em `.ai/context.md` em 2026-08-24 está encerrada — o pipeline de lições (`scripts/generate-lesson.ts`) e a produção/revisão de conteúdo pedagógico podem ser retomados.

Essa decisão veio logo após uma auditoria completa do repositório contra `docs/08`, `docs/09`, `docs/11` e `docs/12` (entregue ao usuário fora do repositório, não commitada), que mostrou, entre outros pontos, que só 1 das 3 lições do currículo mínimo existe e que a ferramenta de QR Code/link ainda não tem nenhuma linha de código.

## 2026-09-12 — Login com Google conectado à interface (Fase 2)

A pedido do usuário, a autenticação com Google — que já tinha arquitetura e código prontos desde 24/08 (`src/lib/auth/AuthContext.tsx`), mas não estava conectada a nenhuma tela — passou a ser exigida antes de qualquer rota do app, conforme o fluxo já definido em `docs/12-ESPECIFICACAO-MVP.md` ("Login Google → Onboarding → Home → ..."). A funcionalidade foi resgatada como referência do protótipo anterior mais evoluído (`legacy/web-localpulse-v2/src/pages/Login.tsx`), adaptada à identidade visual do Estrelar e à decisão já tomada de login **só com Google** (sem e-mail/senha, diferente do protótipo original).

**O que foi adicionado:**

- `src/pages/LoginPage.tsx`: tela de login com a mascote, texto de boas-vindas e botão "Entrar com o Google", usando `useAuth().signInWithGoogle`.
- `src/app/App.tsx`: novo `AuthGate`, um portão no topo da árvore de rotas (mesmo padrão do `OnboardingGuard` já existente) que trata três estados — configuração do Firebase ausente, carregando, ou não autenticado — antes de liberar `/onboarding` e o resto do app.
- `src/lib/auth/AuthContext.tsx`: `AuthProvider` agora expõe `configError` (mensagem clara quando `VITE_FIREBASE_*` não está definido, em vez de deixar o app quebrar com uma tela em branco); a checagem de configuração foi movida para fora do `useEffect` para não violar a regra de lint `react-hooks/set-state-in-effect`.
- `src/lib/auth/userProfile.ts`: grava/atualiza `users/{uid}` (identidade e perfil básico, conforme `docs/05-BANCO-DE-DADOS.md`) a cada login — `createdAt` só na primeira vez.
- `src/components/layout/AppShell.tsx`: cabeçalho ganhou saudação com o primeiro nome do usuário e botão "Sair".

**Continua bloqueado, depende do usuário:** login só funciona de verdade depois que um projeto Firebase real existir, o provedor Google estiver habilitado e as variáveis `VITE_FIREBASE_*` estiverem preenchidas (`.env.example`) — nenhuma dessas ações pôde ser feita pela IA. Sem isso, o app mostra a tela "Firebase ainda não configurado" em vez de travar.

Validado com `npm run lint`, `npm run build` e teste funcional via Playwright (Chromium headless): sem configuração, a tela de aviso aparece corretamente, sem erros de console; com variáveis de teste locais (nunca reais, nunca commitadas), a tela de login renderiza e o botão fica pronto para o fluxo real do Google — o popup de login do Google em si não pôde ser testado neste ambiente por depender de um projeto Firebase real.

Também corrigido neste commit: `eslint.config.js` passou a ignorar `legacy/` (arquivado em 2026-09-12), que não segue os padrões de lint deste projeto e estava quebrando `npm run lint` para o repositório inteiro.

## 2026-08-24 — Arquitetura de Firebase (auth, dados, deploy) preparada (Fase 2)

Com o roteamento real já implementado, a IA avançou no que restava da Fase 2 que não depende de criar contas: arquitetura e scaffolding de código para Firebase, Firestore e deploy no Render, mantendo o limite de nunca criar contas/credenciais (`.ai/rules.md`) e de não inferir decisões pedagógicas marcadas `DECISÃO NECESSÁRIA` (`docs/08-ARQUITETURA-PEDAGOGICA.md`).

**Decisão de produto:** autenticação apenas com conta Google (Firebase Authentication, sem e-mail/senha), pelo menor atrito para o público-alvo e por já haver dependência do ecossistema Google. Racional completo em `src/lib/auth/AuthContext.tsx`.

**Código adicionado** (nada disso está conectado a nenhuma tela ainda — é infraestrutura, não integração de UI):

- `src/lib/firebase.ts`: inicialização do Firebase App/Auth/Firestore lendo configuração só de variáveis de ambiente (`VITE_FIREBASE_*`); lança um erro claro listando as variáveis faltando em vez de falhar silenciosamente.
- `src/lib/auth/auth-context.ts`, `AuthContext.tsx`, `useAuth.ts`: contexto de autenticação (usuário atual, `signInWithGoogle`, `signOut`), separado em três arquivos para respeitar a regra do ESLint sobre Fast Refresh (`react-refresh/only-export-components`).
- `firestore.rules`: regras de segurança em rascunho — cada usuário só lê/escreve o próprio documento em `users/{uid}`; qualquer outro caminho é bloqueado por padrão (menor privilégio, `docs/04-REGRAS.md`).
- `render.yaml`: blueprint de deploy em rascunho para site estático, incluindo a regra de rewrite de SPA (`/* → /index.html`, necessária por causa do roteamento real) e variáveis de ambiente do Firebase declaradas com `sync: false` (nunca vão para o repositório).
- `.env.example`: adicionada a seção de variáveis `VITE_FIREBASE_*`, com nota explicando que a config web do Firebase não é secreta por natureza, mas segue o mesmo padrão de variável de ambiente do projeto.
- `docs/05-BANCO-DE-DADOS.md`: preenchido pela primeira vez — coleção `users/{uid}` com identidade/perfil básico definida; progresso, XP, missões e lições explicitamente listados como bloqueados pelas decisões pedagógicas pendentes, para não serem inferidos por engano depois.
- `firebase` foi adicionado a `package.json`/`package-lock.json` (SDK oficial). Como em ciclos anteriores, os metadados `libc` de pacotes opcionais não relacionados — removidos incidentalmente pela versão de npm deste ambiente a cada instalação — foram restaurados manualmente para manter o diff do lockfile limitado à mudança real.

Validado com `npm run build`, `npm run lint`, `npm ci` limpo, e dois testes de fumaça funcionais via `vite` (`ssrLoadModule`, aplicando a substituição real de `import.meta.env`): sem variáveis de ambiente configuradas, `src/lib/firebase.ts` lança o erro esperado listando exatamente o que falta; com variáveis de teste locais (nunca reais, nunca commitadas), App/Auth/Firestore inicializam corretamente. Nenhuma chamada de rede real ao Firebase foi feita — e não seria possível a partir deste ambiente de qualquer forma.

**Continua bloqueado, depende do usuário:** criar o projeto Firebase de fato, habilitar o provedor de login Google, criar o banco Firestore, publicar `firestore.rules` nele, criar a conta/serviço no Render e preencher as variáveis de ambiente reais (no Render e/ou em `.env.local` local). Nenhuma dessas ações foi ou pode ser feita pela IA (`.ai/rules.md`).

## 2026-08-24 — Roteamento real por URL (Fase 2)

Com a Fase 3 pausada e a migração visual concluída, a IA avançou autonomamente para a Fase 2 do roadmap (MVP técnico). O que a navegação por abas fazia com `useState` (sem URL própria, sem suporte a voltar do navegador, sem deep link) foi substituído por roteamento real com `react-router-dom`: `/` (Início), `/aprender`, `/missoes` e `/ferramentas`, com fallback de rota desconhecida redirecionando para `/`. `BottomNav` passou a usar `NavLink` (marcando a rota ativa automaticamente via `aria-current`), e `HomePage`/`LearnPage` passaram a navegar com `useNavigate` em vez de receber um callback `onNavigate` repassado manualmente por toda a árvore de componentes.

Essa é uma mudança de infraestrutura de navegação, não de conteúdo — nenhum texto, lógica ou estrutura pedagógica da lição em `LearnPage` foi alterado, respeitando a pausa da Fase 3.

`package-lock.json` foi atualizado para incluir a nova dependência (`react-router-dom` e suas transitivas `react-router`, `cookie`, `set-cookie-parser`); os metadados `libc` de pacotes opcionais não relacionados, que a versão de npm deste ambiente remove incidentalmente a cada instalação, foram restaurados manualmente para manter o diff limitado à mudança real, como em ciclos anteriores.

Validado com `npm run build`, `npm run lint`, `npm ci` limpo (lockfile íntegro) e verificação funcional com Playwright: navegação por clique nos 4 links do menu inferior, link direto/deep link com reload em `/aprender`, e botão "voltar" do navegador — todos funcionando corretamente, sem regressão visual nas capturas de tela.

Deploy real (Fase 2: Firebase, autenticação, banco de dados, deploy no Render) continua bloqueado por depender de criação de contas e credenciais, ação que a IA não está autorizada a executar; ver `.ai/rules.md`. Ao deployar como site estático, será necessário configurar uma regra de rewrite (todas as rotas para `/index.html`) para o roteamento funcionar em produção — anotado em `docs/02-ROADMAP.md`.

## 2026-08-24 — Design system aplicado às telas existentes; Fase 3 (Academia) pausada

A pedido do usuário, a Fase 3 do roadmap (conteúdo educacional/Academia, incluindo o pipeline de lições) foi pausada por completo — nenhum item dessa fase deve ser retomado sem solicitação explícita. Ver `.ai/context.md`, seção "Itens pausados".

Em seguida, a IA aplicou os tokens de paleta e tipografia já decididos (`docs/06-DESIGN-SYSTEM.md`) às telas existentes do MVP em `src/styles/index.css`: fundo, texto principal, texto secundário, linhas/cartões e as duas cores de acento (estrela/dourado para avaliação-XP-conquista, verde-crescimento para CTA/confirmação) foram tokenizados em `body`, cabeçalhos, navegação inferior, cartões da Home, missões, ferramentas e lista de lições; tipografia (Fredoka para títulos/conquistas, Work Sans para corpo) foi aplicada de forma universal, inclusive dentro da tela imersiva escura de lição. O botão primário de ação (`.home-block__button`, usado em todo o app) foi separado do botão secundário de atalho (`.quick-access__button`, específico da Home) para que só o primário use a cor de ação verde — o secundário permanece neutro.

Decisão consciente de escopo: as cores de fundo/overlay da tela imersiva escura de lição (`.learn-page--lesson`) foram **propositalmente mantidas** com suas cores literais originais, por ser um modo visual distinto (imersivo/escuro) e não uma tela "padrão" do app; apenas a tipografia foi unificada lá. Superfícies elevadas como cartões (`.home-block`, `.bottom-nav`) mantêm `#fff` literal, por representar um papel de "superfície elevada" acima do fundo tokenizado, não uma cor de marca.

Validado com `npm run build` (bundle CSS cresceu de 9.03 kB para 10.18 kB, gzip 2.26→2.45 kB), `npm run lint` e `git diff --check`. Verificação visual adicional feita com Playwright (Chromium headless, viewport 390×844) capturando as telas Home, lista de Missões, missão ativa e lista de Aprender contra um build local (`vite preview`); as quatro capturas foram revisadas e não mostraram quebra de layout, contraste ou legibilidade.

## 2026-08-24 — Geração de imagens do pipeline de lições passa a ser automática

A pedido do usuário, o pipeline assistido de rascunhos (`scripts/generate-lesson.ts`) deixou de exigir colar prompts manualmente no Meta AI para gerar as imagens de cada cena. `GeminiAdapter` ganhou um método `generateImage`, usando o mesmo modelo de imagem da família "Nano Banana" (`gemini-3.1-flash-image` por padrão, configurável por `GEMINI_IMAGE_MODEL`) e a mesma chave já usada para texto (`GOOGLE_AI_STUDIO_API_KEY`) — nenhuma credencial nova foi introduzida. Essa foi uma retomada explícita e pontual do item "geração definitiva de imagens", que estava pausado em `.ai/context.md` desde 2026-08-09; a investigação de Cloudflare Workers AI (outro item pausado, não usado aqui) continua pausada.

O CLI agora gera e salva o PNG de cada cena automaticamente dentro de `content-drafts/<lesson-id>/images/`, mas essas imagens continuam sendo rascunho — a revisão humana antes de promover qualquer asset para `public/` continua obrigatória, sem exceção. Cada execução completa do comando consome cota paga da API Gemini (1 chamada de roteiro + 1 de prompt e 1 de imagem por cena); isso só acontece quando um humano roda o comando localmente. Validado com `tsc --noEmit` (via `npm run lint`), `npm run build` e um teste de fumaça do CLI sem credenciais reais — a chamada de rede real não pôde ser testada neste ambiente (a API do Gemini não está na allowlist de rede do sandbox usado pela IA) e depende de teste manual do usuário com sua própria chave. Detalhes em `docs/09-PADRAO-DE-LICOES.md`.

## 2026-08-24 — Posicionamento de marca decidido; Fase 1 do roadmap praticamente concluída

Posicionamento de marca redigido e registrado em `docs/01-PROJETO.md` (seção "Posicionamento de marca"): público, promessa central, diferencial frente a cursos/consultorias de SEO genéricos, e tom de voz (parceiro caloroso e honesto, não vendedor nem professor de cima para baixo). Com isso, a Fase 1 do roadmap fica com todos os itens centrais decididos — falta apenas o detalhamento do estilo de animações e a migração de telas existentes para os novos tokens visuais.

## 2026-08-24 — Nome comercial definido e herança do LocalPulse documentada

Nome comercial decidido em conversa com o usuário: **Estrelar** (domínio principal planejado: `estrelar.app`). Entre as opções levantadas (Estrelar, Estrelo, Brilha, Bairrista), o usuário escolheu Estrelar. Uma checagem informal por busca identificou uma empresa de outro ramo (provedor de internet no Rio de Janeiro) já usando "Estrelar Web"/`estrelarweb.com.br`; o risco foi levado ao usuário e aceito conscientemente por serem mercados diferentes. Nenhuma checagem formal de marca (INPI) ou de disponibilidade de domínio foi feita ainda. Detalhes em `docs/01-PROJETO.md`, seção "Nome".

O usuário informou que este projeto é uma reconstrução do produto anterior **LocalPulse** (4 repositórios: `LocalPulse`, `LocalPulse-WEB`, `LocalPulse-WEB-V2`, `LocalPulse-v2.0`), que tinha funcionalidades além do módulo educacional e não evoluiu principalmente por falta de acesso oficial à API do Google Business Profile. Essas funcionalidades foram levantadas e documentadas em `docs/10-HERANCA-LOCALPULSE.md`, com referências cruzadas nas fases 5, 6 e 7 de `docs/02-ROADMAP.md`. Nenhuma delas foi aprovada para implementação só por ter existido antes.

## 2026-08-24 — IA passa a atuar como gerente do projeto

A pedido do usuário, `.ai/workflow.md` e `.ai/rules.md` foram reescritos: a IA passa a decidir e executar diretamente produto, pedagogia, arquitetura, conteúdo, priorização e ações antes classificadas como sensíveis (`git commit`, `git push`, deploy, uso de cota paga, sobrescrita de asset aprovado, alteração de credenciais/infraestrutura), sem depender de autorização prévia do usuário. A IA só recorre ao usuário quando estiver genuinamente em dúvida entre alternativas válidas.

Regras permanentes de segurança (nunca gravar segredos no repositório, nunca expor segredos no frontend, menor privilégio) não fazem parte dessa autonomia e continuam valendo sem exceção. Uma instrução explícita do usuário durante uma conversa continua prevalecendo sobre esses documentos.

Consulte `.ai/context.md` para o resumo do modelo de governança vigente.

## 2026-08-24 — Direção de identidade visual (Fase 1)

Primeira decisão da IA sob o novo modelo de governança: paleta de cores, tipografia e conceito de mascote ("Estrelo", uma estrela de avaliação antropomorfizada) para a plataforma, ainda sem nome comercial definitivo. Duas alternativas de baixa fidelidade (mascote-tucano; selo minimalista sem mascote) foram exploradas e descartadas por enquanto. Detalhes e racional em `docs/06-DESIGN-SYSTEM.md`; canvas de referência publicado em https://claude.ai/code/artifact/c979ad0e-cb41-43ad-84d3-5a1eae4c13a1.

Nome comercial, posicionamento formal de marca e estilo detalhado de animações continuam em aberto — não fazem parte desta decisão.

## 2026-08-09 — Pipeline audiovisual da primeira microlição

### Narração da Cena 1

A Cena 1 da lição **“Por que as avaliações importam?”** usa a voz Piper `pt_BR-faber-medium`. A narração Faber foi aprovada, o novo áudio foi integrado ao projeto e os timestamps foram recalculados para essa gravação.

A integração foi validada com:

- `npm run build`;
- `npm run lint`;
- `git diff --check`.

A narração da Cena 1 é considerada concluída por enquanto. No futuro, ela poderá ser substituída por uma ferramenta TTS paga sem mudar a arquitetura atual; nesse caso, deverão ser substituídos o áudio e os timestamps correspondentes.

### Geração de imagens

Foi feita a pré-validação de uma geração experimental para a imagem da Cena 1 com o modelo `gpt-image-2`. A geração não foi executada porque `OPENAI_API_KEY` não está configurada, e foi decidido não prosseguir com uma solução paga neste momento.

A próxima alternativa a investigar é o **Cloudflare Workers AI**, buscando uma solução gratuita ou com franquia gratuita para gerar as imagens das cenas. Nenhuma configuração Cloudflare foi realizada e nenhuma imagem foi gerada por esse serviço.

O fluxo a preservar para geração de imagens é:

Codex → geração externa → PNG de teste fora do projeto → validação → avaliação e aprovação manual → integração no projeto.

Assets aprovados não devem ser sobrescritos durante testes.

### Conceito visual da Cena 1

O conceito definido mostra uma pessoa pesquisando empresas locais antes de escolher um negócio, com:

- pessoa adulta pesquisando no celular;
- interface genérica de busca e avaliações;
- cartões de empresas;
- estrelas de avaliação;
- sinais de reputação e confiança;
- tomada de decisão;
- comunicação visual que não dependa de texto dentro da imagem;
- ausência do logotipo do Google;
- estilo editorial moderno, profissional, limpo e educacional.

A proporção estudada foi `1536x1024` (`3:2`). Antes de gerar uma imagem com outro modelo, deve-se confirmar se dimensão e proporção continuam adequadas.

### Próximo passo previsto naquele momento

Naquele momento, o próximo passo previsto era começar pela investigação do Cloudflare Workers AI para geração de imagens. A pesquisa de TTS, os testes com Chatterbox/Kokoro e alterações na narração Faber aprovada não deveriam ser retomados.

Antes de qualquer geração:

1. consultar a documentação oficial atual;
2. verificar plano e franquia gratuita;
3. verificar modelos de text-to-image disponíveis;
4. verificar requisitos de conta e token;
5. verificar o custo em Neurons por geração;
6. escolher o modelo mais adequado para a Cena 1;
7. preparar uma única geração experimental;
8. parar antes de gerar ou consumir cota e pedir autorização.

Posteriormente, a investigação do Cloudflare Workers AI e a geração definitiva de imagens foram **PAUSADAS**. Este changelog preserva o histórico e não define a tarefa vigente. Consulte `.ai/context.md` para o estado operacional atual e não retome itens pausados sem solicitação explícita.

## 2026-08-13 — MVP do pipeline reproduzível de mídia

Foi implementada a primeira arquitetura local do pipeline de narração e alinhamento, com:

- `MediaPipeline` em TypeScript;
- interfaces substituíveis para narração, alinhamento e imagem;
- adapters iniciais para Piper e whisper.cpp;
- manifesto por lição com hashes, versões e estados;
- separação entre asset corrente e candidato;
- fluxo explícito de geração, validação, revisão, aprovação e integração;
- workspace experimental `.media/` separado de `public/`;
- proteção contra sobrescrita de asset público com hash diferente;
- cache por fingerprint do provider, modelo, parâmetros e entradas;
- legendas derivadas do roteiro canônico por offsets, sem cópia textual divergente.

O WAV e o PNG aprovados da Cena 1 não foram alterados. Os assets existentes foram importados no manifesto como legado aprovado e integrado.

A validação confirmou hashes, estrutura e duração do WAV, cobertura dos timestamps e preservação dos assets. Depois da instalação local do Node.js 22 e das dependências travadas, `npm run build`, `npm run lint`, a compilação da CLI, `media:status` e `media:validate` passaram. Piper/Faber e whisper.cpp com modelo tiny e suporte DTW também foram confirmados na VM, sem executar geração ou alinhamento.
