# Contexto Operacional do Projeto

Este arquivo resume onde o projeto está agora. Ele não substitui as fontes canônicas do produto, não funciona como changelog e não autoriza automaticamente a próxima tarefa.

## Objetivo resumido

Criar uma plataforma brasileira que ajude pequenos empresários a cuidar da presença do negócio no Google por meio de educação prática, missões, gamificação, inteligência artificial e ferramentas para reputação e SEO local.

O núcleo educacional acompanha a evolução:

Ser encontrado → ser entendido → ser escolhido → construir reputação → manter o perfil atualizado.

## Fase atual

O produto está em fase inicial de reconstrução. A estrutura navegável e a primeira experiência educacional começaram a ser implementadas, enquanto produto, pedagogia e operação assistida por IA estão sendo consolidados.

## Último marco aprovado

- A primeira microlição, **“Por que as avaliações importam?”**, possui trabalho audiovisual iniciado.
- A Cena 1 usa atualmente a voz Piper `pt_BR-faber-medium`.
- A narração Faber da Cena 1 foi aprovada e integrada.
- Os timestamps dessa narração foram recalculados.
- A arquitetura pedagógica e o padrão inicial de lições foram definidos documentalmente e estão em consolidação.
- Direção de identidade visual da Fase 1 (paleta, tipografia, conceito de mascote "Estrelo") foi decidida; ver `docs/06-DESIGN-SYSTEM.md`.
- Nome comercial definido: **Estrelar** (domínio principal planejado: `estrelar.app`). Ver `docs/01-PROJETO.md`, seção "Nome", incluindo o risco de marca conhecido e aceito.
- Posicionamento de marca decidido; ver `docs/01-PROJETO.md`, seção "Posicionamento de marca". Fase 1 do roadmap (identidade e produto) está com todos os itens centrais decididos — falta só o detalhamento do estilo de animações.
- Este projeto é uma reconstrução do LocalPulse; funcionalidades já exploradas nos protótipos anteriores (diagnóstico de reputação com IA, conexão Google/GMB, assistente de resposta a avaliações, tarefas diárias, dashboard) estão documentadas em `docs/10-HERANCA-LOCALPULSE.md`.
- O pipeline de rascunhos de lição (`scripts/generate-lesson.ts`) agora gera imagens automaticamente via API Gemini, além de roteiro e narração; ver `docs/09-PADRAO-DE-LICOES.md`. Revisão humana antes de publicar continua obrigatória.
- Os tokens de paleta e tipografia do design system foram aplicados às telas existentes do MVP (Home, Missões, Ferramentas, Aprender), preservando propositalmente as cores escuras da tela imersiva de lição. Ver `docs/06-DESIGN-SYSTEM.md` e `docs/07-CHANGELOG.md`.
- A navegação por abas foi substituída por roteamento real por URL (`react-router-dom`): `/`, `/aprender`, `/missoes`, `/ferramentas`. Ver `docs/02-ROADMAP.md` (Fase 2) e `docs/07-CHANGELOG.md`.
- Arquitetura de Firebase (autenticação só com Google, Firestore, regras de segurança) e deploy no Render preparadas em código e documentação, mas nenhum projeto/conta real foi criado — só o usuário pode fazer isso. Ver `docs/05-BANCO-DE-DADOS.md`, `firestore.rules`, `render.yaml` e `docs/07-CHANGELOG.md`.
- Login com Google conectado à interface em 2026-09-12: todo o app exige login antes de qualquer rota (`AuthGate` em `src/app/App.tsx`). **Projeto Firebase real criado no mesmo dia** (`estrelar-cc725`): Authentication (Google) e Firestore (produção, `southamerica-east1`) ativos, regras de segurança publicadas, `.env.local` configurado no PC do usuário — login testado e funcionando de verdade. Ver `docs/07-CHANGELOG.md` e `docs/05-BANCO-DE-DADOS.md`.
- Roteiros de narração (`narration.script`) escritos para as 48 cenas do currículo (12 lições × 4 cenas) em 2026-09-12. `scripts/media/lesson-source.ts` passou a usar `lessonRegistry` (de `registry.ts`) em vez de registrar só uma lição — o pipeline `npm run media -- ...` agora funciona para as 12 lições. Manifestos iniciais (`media/manifests/<lessonId>.json`) criados para as 11 lições que não tinham. Falta gerar o áudio de verdade (Piper/whisper.cpp na VM do usuário) para 47 das 48 cenas — só a cena `intro` de `reviews-importance` já tem áudio integrado. Ver `docs/07-CHANGELOG.md`.
- Código-fonte dos 4 repositórios anteriores do LocalPulse foi arquivado em `legacy/` em 2026-09-12, como referência (não como dependência do build — `eslint.config.js` o ignora). Ver `legacy/README.md` e `docs/10-HERANCA-LOCALPULSE.md`.
- O MVP local do pipeline de narração e alinhamento foi implementado com providers substituíveis, manifestos, candidatos separados e aprovação explícita.
- O currículo do MVP foi fechado em 2026-09-12 em `docs/13-CURRICULO-MVP.md` (1 trilha, 5 módulos, 12 lições, resolvendo "currículo completo", "quantidade de trilhas", "quantidade de módulos" e "currículo final do MVP", antes `DECISÃO NECESSÁRIA` em `docs/08`) e, na mesma data, todas as 12 lições e 12 missões foram implementadas em texto (as 9 que faltavam foram escritas depois de o usuário confirmar "continuar com as lições"). Só a cena 1 de "Por que as avaliações importam?" tem áudio/imagem aprovados; produção audiovisual das outras 11 segue pendente, lição por lição. O modelo de estado (`src/state/journey.ts`) deixou de ser fixo para uma lição/missão e passou a suportar um currículo com qualquer número de itens, derivado do catálogo de lições — as 9 lições novas não exigiram nenhuma mudança em `journey.ts`; a chave de armazenamento local mudou de `estrelar-journey-v1` para `estrelar-journey-v2`. Ver `docs/07-CHANGELOG.md` e `docs/13-CURRICULO-MVP.md`.
- Também em 2026-09-12, o usuário pediu para criar e implementar as imagens das lições, depois especificando que queria pelo menos 4 imagens por lição (uma por cena), prompts separados e completos. A geração real depende de `GOOGLE_AI_STUDIO_API_KEY` (mesma restrição de credencial já conhecida do Firebase) e não há ferramenta de geração de imagem disponível neste ambiente de IA; o usuário escolheu que a IA preparasse só os prompts de imagem por enquanto — ver `docs/14-PROMPTS-DE-IMAGEM-LICOES.md` (48 prompts, um por cena das 12 lições, 1 já implementada e 47 novos) e `docs/07-CHANGELOG.md`.
- O usuário gerou as imagens das lições 1 a 5 com esses prompts e pediu para colocar todas no projeto até a lição 5, e tirar a narração por enquanto. Feito em 2026-09-12: as 5 lições têm as 4 cenas ilustradas (`public/images/lessons/<id>/cena-0N.jpg`), e a narração/áudio da cena 1 de `reviews-importance` foi removida do conteúdo da lição (o arquivo de áudio continua em `public/`, só não é mais referenciado) — nenhuma lição usa áudio no momento. Ver `docs/13-CURRICULO-MVP.md` e `docs/07-CHANGELOG.md`.
- No mesmo dia, o usuário pediu para retirar a legenda visível (título + texto de cada cena) de todas as 12 lições e deixar só a narração em áudio. Feito: `SceneView` não renderiza mais `title`/`text` na tela (só ilustração + controle de áudio, quando existirem); o texto continua existindo nos dados só como transcript para leitores de tela. Produzir narração para as 12 lições (via Piper na VM Oracle) é o próximo passo pendente para a experiência ficar completa. Ver `docs/09-PADRAO-DE-LICOES.md` e `docs/07-CHANGELOG.md`.
- Em 2026-09-13, o usuário gerou (via Gemini) e pediu para integrar as 27 imagens restantes (lições 6, 8-12 completas, mais as 3 cenas que faltavam da lição 7). Feito: as 12 lições do currículo agora têm imagem nas 4 cenas.
- **Ainda em 2026-09-13, um problema foi encontrado e corrigido:** a integração de imagens acima partiu de uma cópia local desatualizada e sobrescreveu, em 6 lições, os campos `audioSrc`/`segments` que a VM Oracle já tinha integrado (commit próprio dela no GitHub) — o áudio em si não foi apagado, só a referência no `.ts` da lição. Corrigido com merge de três vias, sem perda de nenhum dado. Status real, confirmado contra `origin/main`: **43 das 48 cenas do currículo têm narração em áudio integrada** — faltam só a cena "Agora é sua vez" de `business-hours-matter` e as 4 cenas de `choose-your-next-action` (essas nunca tiveram áudio gerado ainda, não fazem parte do problema). Ver `docs/13-CURRICULO-MVP.md` e `docs/07-CHANGELOG.md`.
- Também em 2026-09-13, o usuário pediu para otimizar o app para Android visando publicar na Google Play. Decidido usar **TWA** (Trusted Web Activity) em vez de Capacitor — mais leve, sem precisar de Android Studio para gerar o pacote, mas exige o app já estar publicado numa URL HTTPS real. O app foi transformado em **PWA instalável** (manifest, ícones gerados a partir do `favicon.svg`, service worker via `vite-plugin-pwa`), pré-requisito técnico do TWA. O passo a passo completo do que falta (deploy no Render, política de privacidade, `bubblewrap init`/`build`, `assetlinks.json`, Play Console) está documentado em `docs/15-PUBLICACAO-ANDROID.md`.
- Ainda em 2026-09-13, implementado o **QR Code e link para avaliações** (`docs/12-ESPECIFICACAO-MVP.md`), fechando a prioridade nº 2 do roadmap. `/ferramentas` deixou de ser placeholder: o usuário cola o link de avaliação (validação só de formato de URL, sem confirmar propriedade/destino), o app gera um QR Code no próprio dispositivo (biblioteca `qrcode`, sem chamar serviço externo) com opção de baixar como PNG e copiar o link. Estado novo em `src/state/reviewLink.ts` (localStorage, mesmo padrão de `journey.ts`). Nenhuma XP é concedida por essa ferramenta. Ver `docs/07-CHANGELOG.md`.
- Ainda em 2026-09-13, decisão: a hospedagem do front **migra de Render para Firebase Hosting** — nenhum serviço Render chegou a ser criado (era só um blueprint de rascunho), e Auth/Firestore já vivem no mesmo projeto Firebase (`estrelar-cc725`), então consolidar tudo lá reduz a operação a um único provedor. Feito: `firebase.json` e `.firebaserc` (projeto `estrelar-cc725`, rewrite de SPA) criados; `render.yaml` marcado como obsoleto (pode ser apagado); workflow `.github/workflows/firebase-hosting-deploy.yml` criado para build + deploy automático a cada push em `main`, equivalente ao que o Render faria. Atualização (mesmo dia): `firebase init hosting:github` rodado com sucesso (após um 404 transitório de propagação do IAM na primeira tentativa, resolvido só repetindo o comando) — criou a service account `github-action-1325354707` com permissão de Firebase Hosting Admin e já subiu o secret `FIREBASE_SERVICE_ACCOUNT_ESTRELAR_CC725` no GitHub sozinho. Isso também gerou dois workflows oficiais, `.github/workflows/firebase-hosting-merge.yml` (deploy em push na `main`) e `firebase-hosting-pull-request.yml` (preview por PR) — o `firebase-hosting-deploy.yml` escrito à mão anteriormente foi removido para não duplicar o deploy a cada push; os dois workflows oficiais foram editados para injetar os 6 `VITE_FIREBASE_*` como env vars no passo de build (o gerador da Firebase não sabia desses valores). Pendente, ação do usuário: criar esses 6 secrets no GitHub (mesmos valores de `.env.local`) e dar o primeiro push depois de tudo commitado. Ver `docs/02-ROADMAP.md`, seção "Decisão de hospedagem".
- Ainda em 2026-09-13, feita a **Auditoria Editorial das 12 lições** que o usuário recomendou como próximo passo antes de produzir lição/imagem nova — documento novo em `docs/16-AUDITORIA-EDITORIAL-LICOES.md`, sem nenhuma alteração de código ou conteúdo. Achados principais: 10 das 48 imagens têm defeito técnico de geração (texto ilegível ou código hex de cor vazado como texto) e precisam ser regeradas; a maioria das imagens tem legenda embutida duplicando a narração (relevante porque `SceneView.tsx` só mostra a ilustração na tela — `title`/`text`/`highlight` são `visually-hidden` — então a legenda embutida é hoje o único texto visível de cada cena); a Lição 1 tem duas frases de certeza indevida a ajustar; o `duration: '1 min'` fixo está incorreto em todas as lições (real: 24 a 44 s). Nenhuma lição precisou de veredito "refazer" no roteiro. Ver `docs/07-CHANGELOG.md`.

## Modelo de governança

A IA pode atuar de forma autônoma na implementação das tarefas já definidas e aprovadas no escopo do projeto, respeitando `.ai/rules.md`, `.ai/workflow.md` e as regras operacionais atuais. Decisões que dependam de criação de contas, credenciais, serviços externos ou escolhas genuinamente abertas continuam dependendo do usuário.

Alterações destrutivas, mudanças de escopo e ações irreversíveis devem seguir as regras de segurança do projeto e o fluxo operacional vigente.

## Reposicionamento estratégico (decisão fechada em 2026-09-13)

O usuário fechou uma mudança de posicionamento do produto, a partir de análise própria de viabilidade de mercado (~24 milhões de pequenos negócios no Brasil, 52% já usando IA, concorrência nacional cobrando R$197–R$700/mês por gestão de perfil). Resumo:

- Produto deixa de ser "curso de SEO local com IA" e passa a ser **"o assistente do pequeno negócio para cuidar do Perfil da Empresa no Google"**.
- **Free = Aprender** (currículo, missões, gamificação, QR Code — continua tudo gratuito, mas agora é o motor de aquisição/onboarding de um SaaS, não o produto final).
- **Premium = Fazer** (assinatura, referência inicial R$19,90/mês por 1 negócio; conecta a conta Google via OAuth e usa as APIs oficiais do Business Profile/Performance/Reviews para diagnosticar, sugerir e — sempre com aprovação explícita do usuário antes de publicar — executar).
- **Risco já conhecido deste projeto, não hipotético:** o LocalPulse (versão anterior) parou de evoluir justamente por nunca ter conseguido acesso oficial à API do Google Business Profile (ver `docs/10-HERANCA-LOCALPULSE.md`) — por isso, pedir esse acesso (ação do usuário: conta Google, projeto no Google Cloud, justificativa comercial, site válido; análise de até 14 dias) é tratado como a ação mais urgente do roadmap, antes de qualquer código de integração.
- Detalhes completos da nova ordem de prioridade (P0–P4) em `docs/02-ROADMAP.md`, seção "Reposicionamento estratégico". Esboço de arquitetura da integração Google em `docs/17-INTEGRACAO-GOOGLE-BUSINESS-PROFILE.md`.
- A Lição 12 (`choose-your-next-action`) passou a plantar a semente do Premium futuro no texto/narração — sem criar nenhum botão ou CTA funcional, já que OAuth/integração Google ainda não existem no código. Ver `docs/07-CHANGELOG.md`.
- **Esclarecimentos do usuário sobre o reposicionamento (2026-09-13):** nicho (ex.: oficinas) é só ângulo de marketing/apresentação — o produto em si continua abrangente para qualquer negócio, sem lógica específica de segmento no core. O moat do Premium não é uma feature isolada, é o conjunto de funcionalidades se somando pra criar necessidade recorrente (poupar tempo, facilitar manutenção contínua). Créditos de IA do Premium: limite mensal incluso na assinatura + recompra de créditos extras como receita adicional (não é só um teto). B2B2C fica confirmado como atualização futura (P4) — o lançamento inicial é só Free + Premium. Detalhes em `docs/02-ROADMAP.md` e `docs/17-INTEGRACAO-GOOGLE-BUSINESS-PROFILE.md`.

## Foco vigente

**Prioridade definida pelo usuário em 2026-09-13, P0–P4** (ver `docs/02-ROADMAP.md`, seção "Prioridade atual (P0–P4...)", para o texto completo — substitui a prioridade de 2026-09-12 listada logo abaixo):

- **P0 — Produto Free:** ✅ currículo (12 lições, 43 das 48 cenas com áudio — faltam 1 cena de `business-hours-matter` e as 4 de `choose-your-next-action`) e ✅ QR Code/link de avaliações concluídos; falta onboarding/conta, landing page e o deploy real (Firebase Hosting, decisão de 2026-09-13 — antes planejado para Render) — **próxima ação prática a atacar**, porque agora também é pré-requisito de P1 e da publicação Android (`docs/15-PUBLICACAO-ANDROID.md`).
- **P1 — Monetização:** assinatura Premium, Google OAuth, conexão ao Business Profile, avaliações com resposta sugerida por IA. **Bloqueado até a API do Google ser aprovada** (ação do usuário, ver acima).
- **P2 — Assistente:** fotos, posts, alertas, check-up automático, IA contextual por tarefa.
- **P3 — Inteligência:** performance (buscas/chamadas/rotas/termos) traduzida em linguagem simples pela IA.
- **P4 — Escala:** planos Profissional/Agência (múltiplos negócios — nunca no plano de R$19,90) e canal B2B2C (contadores, associações, Sebrae local, agências).

**Gamificação (Fase 4) não é prioridade agora.** O que já existe (XP, níveis, progresso) fica como está; não iniciar trabalho novo nela sem pedido explícito.

### Prioridade anterior (2026-09-12, para referência histórica)

1. ✅ currículo/lições (Fase 3) — concluído em 2026-09-12.
2. ✅ QR Code e link para avaliações (Fase 5, adiantada) — concluído em 2026-09-13.
3. colocar o app no ar — projeto Firebase real ✅ concluído em 2026-09-12; deploy migrado de Render para Firebase Hosting (2026-09-13); secrets no GitHub e primeiro deploy ainda pendentes.

Uma auditoria completa do repositório contra `docs/08`, `docs/09`, `docs/11` e `docs/12` foi feita em 2026-09-12 e entregue ao usuário fora do repositório (não commitada) — ela lista com precisão o que está implementado, parcial, ausente ou contraditório em cada uma dessas três frentes, e vale como ponto de partida antes de detalhar qualquer uma delas em tarefas menores.

O MVP do pipeline de mídia está validado na Oracle VM com Node.js, Piper/Faber e whisper.cpp configurados.

Login com Google está conectado à interface (`AuthGate` em `src/app/App.tsx`) e funciona de fato desde 2026-09-12, com o projeto Firebase real criado e configurado — ver `docs/07-CHANGELOG.md`.

Nenhuma geração, aprovação ou substituição de asset está autorizada automaticamente.

## Itens pausados

Não retomar sem solicitação explícita do usuário:

- investigação de Cloudflare Workers AI;
- nova pesquisa de TTS;
- Chatterbox;
- Kokoro;
- substituição da narração Faber.

**Fase 3 (Academia/conteúdo educacional) NÃO está mais pausada.** Havia sido pausada em 2026-08-24 a pedido explícito do usuário; a pausa foi encerrada em 2026-09-12, quando o usuário definiu lições como prioridade nº 1 (ver "Foco vigente" acima). O pipeline de lições (`scripts/generate-lesson.ts`) e a produção/revisão de lições podem ser retomados normalmente.

Retomado em 2026-08-24, a pedido explícito do usuário: geração automática de imagens no pipeline de rascunhos (`docs/09-PADRAO-DE-LICOES.md`), via API Gemini. Continua exigindo revisão humana antes de qualquer imagem virar asset aprovado.

## Decisões aprovadas relevantes

- O produto atende principalmente pequenos empresários brasileiros com pouco conhecimento técnico ou de marketing digital.
- O aprendizado deve levar a ações práticas no negócio.
- O produto não ensina hacks de algoritmo nem promete primeira posição no Google.
- Documentação oficial sustenta afirmações sobre produto, política e ranking; relatos servem apenas como evidência prática ou anedótica.
- Assets aprovados não podem ser substituídos sem autorização explícita.
- Nome comercial: Estrelar. Domínio principal: `estrelar.app`.
- Prioridade de execução (2026-09-12, histórica): 1) lições, 2) QR Code/link de avaliação, 3) colocar o app no ar. Substituída em 2026-09-13 pela prioridade P0–P4 — ver "Foco vigente".
- Posicionamento (2026-09-13): produto é "o assistente do pequeno negócio para cuidar do Perfil da Empresa no Google", não um "curso de SEO local com IA". Free = aprender (currículo/missões/QR Code, motor de aquisição). Premium = fazer (assinatura, referência R$19,90/mês por 1 negócio, conecta ao Google via OAuth, sempre com aprovação do usuário antes de publicar qualquer coisa — nunca automático). Planos com múltiplos negócios (Profissional/Agência) ficam para depois, nunca no plano de entrada. Ver seção "Reposicionamento estratégico" acima e `docs/02-ROADMAP.md`.

## Decisões abertas

As decisões pedagógicas abertas estão registradas em `docs/08-ARQUITETURA-PEDAGOGICA.md`. Currículo, trilhas e módulos foram decididos em 2026-09-12 (`docs/13-CURRICULO-MVP.md`); seguem abertos: conclusão pedagógica, XP definitivo, persistência, quizzes, modelo definitivo de missão, métricas, voz geral e padrão visual definitivo.

Uma decisão aberta só bloqueia uma tarefa quando essa tarefa depende dela.

## Fontes canônicas relacionadas

- Produto e escopo: `docs/01-PROJETO.md`.
- Arquitetura pedagógica: `docs/08-ARQUITETURA-PEDAGOGICA.md`.
- Produção de lições: `docs/09-PADRAO-DE-LICOES.md`.
- Currículo do MVP (trilha, módulos, ordem das 12 lições): `docs/13-CURRICULO-MVP.md`.
- Publicação na Google Play (PWA/TWA): `docs/15-PUBLICACAO-ANDROID.md`.
- Herança do LocalPulse (funcionalidades já exploradas antes): `docs/10-HERANCA-LOCALPULSE.md`.
- Tecnologias e ambientes: `.ai/stack.md`.
- Fluxo de trabalho: `.ai/workflow.md`.
- Histórico: `docs/07-CHANGELOG.md`.
