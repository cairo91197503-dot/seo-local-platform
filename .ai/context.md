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
- Código-fonte dos 4 repositórios anteriores do LocalPulse foi arquivado em `legacy/` em 2026-09-12, como referência (não como dependência do build — `eslint.config.js` o ignora). Ver `legacy/README.md` e `docs/10-HERANCA-LOCALPULSE.md`.
- O MVP local do pipeline de narração e alinhamento foi implementado com providers substituíveis, manifestos, candidatos separados e aprovação explícita.
- O currículo do MVP foi fechado em 2026-09-12 em `docs/13-CURRICULO-MVP.md` (1 trilha, 5 módulos, 12 lições, resolvendo "currículo completo", "quantidade de trilhas", "quantidade de módulos" e "currículo final do MVP", antes `DECISÃO NECESSÁRIA` em `docs/08`) e, na mesma data, todas as 12 lições e 12 missões foram implementadas em texto (as 9 que faltavam foram escritas depois de o usuário confirmar "continuar com as lições"). Só a cena 1 de "Por que as avaliações importam?" tem áudio/imagem aprovados; produção audiovisual das outras 11 segue pendente, lição por lição. O modelo de estado (`src/state/journey.ts`) deixou de ser fixo para uma lição/missão e passou a suportar um currículo com qualquer número de itens, derivado do catálogo de lições — as 9 lições novas não exigiram nenhuma mudança em `journey.ts`; a chave de armazenamento local mudou de `estrelar-journey-v1` para `estrelar-journey-v2`. Ver `docs/07-CHANGELOG.md` e `docs/13-CURRICULO-MVP.md`.
- Também em 2026-09-12, o usuário pediu para criar e implementar as imagens das lições, depois especificando que queria pelo menos 4 imagens por lição (uma por cena), prompts separados e completos. A geração real depende de `GOOGLE_AI_STUDIO_API_KEY` (mesma restrição de credencial já conhecida do Firebase) e não há ferramenta de geração de imagem disponível neste ambiente de IA; o usuário escolheu que a IA preparasse só os prompts de imagem por enquanto — ver `docs/14-PROMPTS-DE-IMAGEM-LICOES.md` (48 prompts, um por cena das 12 lições, 1 já implementada e 47 novos) e `docs/07-CHANGELOG.md`.
- O usuário gerou as imagens das lições 1 a 5 com esses prompts e pediu para colocar todas no projeto até a lição 5, e tirar a narração por enquanto. Feito em 2026-09-12: as 5 lições têm as 4 cenas ilustradas (`public/images/lessons/<id>/cena-0N.jpg`), e a narração/áudio da cena 1 de `reviews-importance` foi removida do conteúdo da lição (o arquivo de áudio continua em `public/`, só não é mais referenciado) — nenhuma lição usa áudio no momento. Lições 6 e 8 a 12 seguem sem imagem. Ver `docs/13-CURRICULO-MVP.md` e `docs/07-CHANGELOG.md`.
- No mesmo dia, o usuário pediu para retirar a legenda visível (título + texto de cada cena) de todas as 12 lições e deixar só a narração em áudio. Feito: `SceneView` não renderiza mais `title`/`text` na tela (só ilustração + controle de áudio, quando existirem); o texto continua existindo nos dados só como transcript para leitores de tela. Como nenhuma lição tem áudio no momento, a maioria das cenas ficou sem nenhum conteúdo perceptível além da imagem — decisão explícita do usuário, avisado do trade-off antes de eu mexer no código. Produzir narração para as 12 lições (via Piper na VM Oracle) é o próximo passo pendente para a experiência ficar completa. Ver `docs/09-PADRAO-DE-LICOES.md` e `docs/07-CHANGELOG.md`.

## Modelo de governança

A IA pode atuar de forma autônoma na implementação das tarefas já definidas e aprovadas no escopo do projeto, respeitando `.ai/rules.md`, `.ai/workflow.md` e as regras operacionais atuais. Decisões que dependam de criação de contas, credenciais, serviços externos ou escolhas genuinamente abertas continuam dependendo do usuário.

Alterações destrutivas, mudanças de escopo e ações irreversíveis devem seguir as regras de segurança do projeto e o fluxo operacional vigente.

## Foco vigente

**Prioridade definida pelo usuário em 2026-09-12** (ver `docs/02-ROADMAP.md`, seção "Prioridade atual", para o texto completo): nesta ordem,

1. ✅ currículo/lições (Fase 3) — concluído em 2026-09-12: as 12 lições e 12 missões do currículo do MVP (`docs/13-CURRICULO-MVP.md`) estão implementadas em texto. Produção audiovisual de cada lição (exceto a já feita) é trabalho separado, sem prioridade definida — não iniciar sem pedido explícito;
2. QR Code e link para avaliações (Fase 5, adiantada) — **próxima prioridade a atacar**;
3. colocar o app no ar (concluir a parte de Fase 2 que depende do usuário: projeto Firebase real ✅ concluído em 2026-09-12, variáveis de ambiente, deploy no Render — ainda pendente).

**Gamificação (Fase 4) não é prioridade agora.** O que já existe (XP, níveis, progresso) fica como está; não iniciar trabalho novo nela sem pedido explícito.

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
- Prioridade de execução (2026-09-12): 1) lições, 2) QR Code/link de avaliação, 3) colocar o app no ar. Gamificação não é prioridade — ver "Foco vigente".

## Decisões abertas

As decisões pedagógicas abertas estão registradas em `docs/08-ARQUITETURA-PEDAGOGICA.md`. Currículo, trilhas e módulos foram decididos em 2026-09-12 (`docs/13-CURRICULO-MVP.md`); seguem abertos: conclusão pedagógica, XP definitivo, persistência, quizzes, modelo definitivo de missão, métricas, voz geral e padrão visual definitivo.

Uma decisão aberta só bloqueia uma tarefa quando essa tarefa depende dela.

## Fontes canônicas relacionadas

- Produto e escopo: `docs/01-PROJETO.md`.
- Arquitetura pedagógica: `docs/08-ARQUITETURA-PEDAGOGICA.md`.
- Produção de lições: `docs/09-PADRAO-DE-LICOES.md`.
- Currículo do MVP (trilha, módulos, ordem das 12 lições): `docs/13-CURRICULO-MVP.md`.
- Herança do LocalPulse (funcionalidades já exploradas antes): `docs/10-HERANCA-LOCALPULSE.md`.
- Tecnologias e ambientes: `.ai/stack.md`.
- Fluxo de trabalho: `.ai/workflow.md`.
- Histórico: `docs/07-CHANGELOG.md`.
