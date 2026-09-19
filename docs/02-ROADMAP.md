# Roadmap do Projeto

## Reposicionamento estratégico (decisão fechada em 2026-09-13)

O usuário fechou uma decisão de posicionamento que muda a função de cada parte do produto, a partir de uma análise de viabilidade de mercado que ele mesmo conduziu (mercado de ~24 milhões de pequenos negócios no Brasil, 52% já usando IA no dia a dia, concorrência nacional cobrando de R$197 a R$700/mês por gestão de perfil, e ferramentas internacionais como BrightLocal/Whitespark). Resumo da decisão:

- **O produto deixa de ser vendido como "curso de SEO local com IA"** e passa a ser posicionado como *"o assistente do pequeno negócio para cuidar do Perfil da Empresa no Google"*.
- **Free = Aprender.** As 12 lições, a gamificação, as missões e o QR Code continuam gratuitos — mas deixam de ser o produto final e passam a ser o motor de aquisição e onboarding pedagógico de um SaaS. O currículo ensina o usuário a reconhecer o que precisa de atenção no próprio perfil; a última lição (`choose-your-next-action`) planta a semente de que, no futuro, o Estrelar pode fazer isso automaticamente (ver `docs/07-CHANGELOG.md`).
- **Premium = Fazer.** Um plano pago (referência inicial: R$19,90/mês, 1 negócio por assinatura) que conecta a conta Google do usuário via OAuth e usa as APIs oficiais do Google Business Profile (perfil, avaliações, performance) para diagnosticar o perfil, sugerir melhorias e — sempre com aprovação explícita do usuário antes de publicar qualquer coisa — executar ações reais (responder avaliação, atualizar informação, criar post, preparar foto). Nunca publica nada automaticamente sem esse passo de aprovação, seguindo a política do próprio Google.
- **Risco crítico já conhecido deste projeto, não hipotético:** a versão anterior do produto (LocalPulse) chegou a implementar OAuth e um proxy para dados do Google Business Profile, mas nunca obteve acesso oficial à API — isso foi o principal motivo de a evolução ter parado (ver `docs/10-HERANCA-LOCALPULSE.md`). Por isso, solicitar o acesso à API é tratado como a ação mais urgente de todo este roadmap, não como um detalhe técnico a resolver depois — o processo de aprovação do Google pode levar até 14 dias e depende de justificativa comercial, projeto no Google Cloud e site empresarial válido, tudo isso ação do usuário, fora do que a IA pode fazer sozinha.
- Ver `docs/17-INTEGRACAO-GOOGLE-BUSINESS-PROFILE.md` para o esboço de arquitetura da camada de integração (OAuth, consentimento, desvinculação em até 7 dias úteis, isolamento da API do resto do app).
- **Nicho de entrada (esclarecido em 2026-09-13):** um nicho (ex.: oficinas) pode ser usado como ângulo de apresentação/marketing (landing page, exemplos de mensagem) para a fase de lançamento, mas **não estreita o produto** — o app em si (currículo, missões, Premium) continua abrangente, servindo qualquer tipo de pequeno negócio. Não criar lógica ou conteúdo específico de um segmento no core do produto por causa disso.
- **Moat do Premium (esclarecido em 2026-09-13):** a vantagem competitiva não é uma feature isolada — é o **conjunto de funcionalidades do Premium se somando** para criar uma necessidade recorrente real (economizar tempo do empresário, facilitar a manutenção contínua do perfil). Cada peça do Premium (P1–P3) deve ser projetada pensando em reforçar esse pacote como um todo, não como recursos soltos e independentes.
- **Créditos de IA (esclarecido em 2026-09-13):** o Premium terá um **limite de uso mensal de IA incluso na assinatura**, com **possibilidade de recompra de créditos extras** como fonte de receita adicional além da mensalidade fixa. Ver `docs/17-INTEGRACAO-GOOGLE-BUSINESS-PROFILE.md`, seção 6.
- **B2B2C confirmado como P4:** lançar Free + Premium primeiro; B2B2C (contadores, associações, agências) fica para depois, como atualização futura — não faz parte do lançamento inicial.

## Prioridade atual (P0–P4, definida pelo usuário em 2026-09-13, substitui a lista de 2026-09-12 abaixo)

1. **P0 — Produto Free.** ✅ Currículo (12 lições/12 missões, `docs/13-CURRICULO-MVP.md`), ✅ QR Code/link de avaliações (`docs/12-ESPECIFICACAO-MVP.md`), ✅ onboarding/conta (coleta de nome/segmento, 2026-09-14), ✅ landing page pública (`/` para deslogados, 2026-09-13/14), ✅ narração em áudio nas 48 cenas (MP3, voz única, 2026-09-19) e ✅ deploy real no Firebase Hosting (2026-09-13) concluídos. Resta: aprovação por escuta dos áudios (checklist em `docs/18-SUBSTITUICAO-NARRACAO-COMPLETA.md`) e as dívidas não-técnicas da auditoria editorial (`docs/16-AUDITORIA-EDITORIAL-LICOES.md`) — ver `docs/07-CHANGELOG.md`.
2. **P1 — Monetização.** Assinatura Premium R$19,90/mês (1 negócio); Google OAuth; conexão com o Google Business Profile; tela "Meu Perfil" (resumo + próximas ações, sem "nota de SEO"); avaliações com resposta sugerida por IA (usuário sempre aprova antes de publicar). **Bloqueado até a API do Google ser aprovada** — ação do usuário, ver acima.
3. **P2 — Assistente.** Fotos (melhorar, nunca inventar — o Google exige que fotos representem a realidade), posts, alertas, check-up automático, IA contextual (por tarefa: responder avaliação / melhorar informação / criar post / entender o perfil — não um chat genérico).
4. **P3 — Inteligência.** Performance (buscas, chamadas, rotas, termos de pesquisa via API de Performance) traduzida em linguagem simples pela IA, não em números soltos.
5. **P4 — Escala.** Planos Profissional (3–5 negócios) e Agência (múltiplos perfis) — nunca no plano de R$19,90, que é 1 negócio só, para não quebrar a economia do plano de entrada. Depois disso, oportunidade B2B2C (contadores, associações comerciais, Sebrae local, agências pequenas) para reduzir CAC.

**Gamificação (Fase 4, na numeração de fases abaixo) não é prioridade agora.** O que já existe (XP, níveis, progresso) permanece funcionando como está — não deve ser removido — mas não deve receber novo trabalho (mais mecânicas, conquistas, sequência de dias etc.) até que P0–P1 estejam concluídos ou o usuário mude essa decisão explicitamente.

### Prioridade anterior (2026-09-12, para referência histórica)

1. Currículo/lições (Fase 3) — ✅ concluído em 2026-09-12.
2. QR Code e link para avaliações (Fase 5, adiantada) — ✅ concluído em 2026-09-13.
3. Colocar o app no ar — projeto Firebase real configurado (✅ concluído em 2026-09-12); deploy do front no Firebase Hosting (decisão de 2026-09-13) ✅ concluído em 2026-09-13 (secrets criados, primeiro deploy publicado — ver seção "Decisão de hospedagem" abaixo).

## Decisão de hospedagem (2026-09-13): Firebase Hosting em vez de Render

Nenhum serviço Render chegou a ser criado — `render.yaml` era só um blueprint de rascunho. Decisão fechada: o front (`dist/`) passa a ser hospedado no **Firebase Hosting**, no mesmo projeto Firebase que já hospeda Authentication e Firestore (`estrelar-cc725`), em vez de um provedor separado. `render.yaml` foi marcado como obsoleto (pode ser apagado).

O que já foi preparado no repositório:

- `firebase.json` (public: `dist`, rewrite de SPA para `index.html`) e `.firebaserc` (projeto `estrelar-cc725`).
- `.github/workflows/firebase-hosting-merge.yml` (deploy em push na `main`) e `firebase-hosting-pull-request.yml` (preview automático por Pull Request) — gerados por `firebase init hosting:github`, que também criou a service account `github-action-1325354707` (permissão Firebase Hosting Admin) e já subiu o secret `FIREBASE_SERVICE_ACCOUNT_ESTRELAR_CC725` no GitHub sozinho. Os dois workflows foram ajustados para passar os 6 `VITE_FIREBASE_*` como env vars no passo de build.

O que já foi concluído (2026-09-13, ver `docs/07-CHANGELOG.md`):

- Os 6 secrets `VITE_FIREBASE_*` foram criados no GitHub e o workflow `firebase-hosting-merge.yml` publicou o primeiro deploy — Estrelar FREE no ar.
- Resta, como ação do usuário: adicionar o domínio do Firebase Hosting (e depois `estrelar.app`, quando comprado) à lista de domínios autorizados do Firebase Authentication — sem isso o login com Google falha no domínio novo.

## Fase 0 — Fundação

Objetivo: preparar o projeto para desenvolvimento profissional e assistido por IA.

Entregas:

- Git e GitHub configurados

- Cursor configurado

- documentação inicial criada

- regras para agentes de IA

- Node.js 22 definido no `.nvmrc`

- estrutura inicial do repositório

Status: em andamento. Git, documentação inicial, regras para agentes, Node.js e estrutura do repositório já foram iniciados ou configurados. A documentação operacional para IA está em consolidação.

## Fase 1 — Identidade e Produto

Objetivo: definir claramente o produto antes de desenvolver telas.

Entregas:

- nome comercial definitivo

- posicionamento da marca

- identidade visual

- paleta de cores

- tipografia

- mascote

- estilo das animações

- design system inicial

Status: quase concluída. Nome comercial (Estrelar), posicionamento de marca, identidade visual, paleta, tipografia e mascote foram decididos (ver `docs/01-PROJETO.md` e `docs/06-DESIGN-SYSTEM.md`). Falta apenas o detalhamento do estilo de animações; design system inicial começou a ser aplicado ao código (tokens + componente da mascote), mas ainda não foi migrado para todas as telas do MVP.

## Fase 2 — MVP Técnico

Objetivo: criar a base funcional do webapp.

Entregas:

- React + TypeScript + Vite

- roteamento

- estrutura de layouts

- Firebase

- autenticação

- banco de dados inicial

- deploy no Firebase Hosting (decisão de 2026-09-13; era Render no planejamento original desta fase)

- ambiente de desenvolvimento consistente

Status: concluída. React, TypeScript, Vite, roteamento real por URL (React Router, com `/`, `/aprender`, `/missoes`, `/ferramentas`) e estrutura inicial de interface estão implementados. Login com Google está conectado à interface (`AuthGate` em `src/app/App.tsx`, `docs/07-CHANGELOG.md`, 2026-09-12) e todo o app exige login antes de qualquer rota — exceto a landing page pública em `/`, mostrada a deslogados (2026-09-13/14). **O projeto Firebase real foi criado em 2026-09-12** (`estrelar-cc725`): Authentication (Google) e Firestore (produção, `southamerica-east1`) ativos, regras de segurança publicadas, `.env.local` configurado localmente — login testado e funcionando de verdade. Deploy no **Firebase Hosting** (decisão de 2026-09-13 — ver seção "Decisão de hospedagem" acima) ✅ publicado em 2026-09-13 via workflow automático; cada push em `main` publica de novo.

## Fase 3 — Academia

Objetivo: lançar a primeira experiência educacional.

Entregas:

- trilhas de aprendizado

- microlições

- progresso do usuário

- quizzes

- primeira lição animada

- conclusão de aulas

Status: currículo do MVP concluído. As 12 lições e 12 missões de `docs/13-CURRICULO-MVP.md` (1 trilha, 5 módulos) estão implementadas em texto e com narração em áudio (48 cenas, edge-tts, voz `pt-BR-AntonioNeural`). Produção de áudio nova segue o fluxo simples de `docs/09-PADRAO-DE-LICOES.md` (qualquer IA de voz). O modelo de estado (`src/state/journey.ts`) suporta qualquer número de lições/missões via um currículo derivado do catálogo, em vez de uma lição/missão fixa — acrescentar novas lições não exigiu mudar a lógica de estado. Progresso persistente entre dispositivos, quizzes e "retomar da última cena" continuam planejados ou dependem de decisão. Ver `docs/07-CHANGELOG.md` e `docs/13-CURRICULO-MVP.md`.

## Fase 4 — Gamificação

Objetivo: transformar aprendizado em ações práticas.

Entregas:

- XP

- níveis

- missões

- conquistas

- sequência de dias

- progresso visual

Status: planejado. O modelo definitivo de XP, persistência e validação de missões depende de decisão.

## Fase 5 — Ferramentas Práticas

Objetivo: ajudar o empresário a aplicar o aprendizado no negócio.

Entregas:

- QR Code para avaliações

- link de avaliação

- modelos de solicitação de avaliação

- gerador de respostas

- gerador de postagens

- checklists

Já explorado no protótipo anterior (LocalPulse): QR Code e gerador de respostas a avaliações. Ver `docs/10-HERANCA-LOCALPULSE.md`.

Status: planejado.

## Fase 6 — Mentor IA

Objetivo: disponibilizar um mentor contextualizado.

Entregas:

- chat do mentor

- contexto do negócio do usuário

- respostas por segmento

- recomendações baseadas no estágio do usuário

- limites e segurança de uso

O protótipo anterior explorou um diagnóstico de reputação com IA que pode informar este desenho. Ver `docs/10-HERANCA-LOCALPULSE.md`.

Status: planejado.

## Fase 7 — Integração Google

**Reclassificada em 2026-09-13: esta fase agora é P1 do roadmap de prioridade (ver seção no topo deste documento), não mais uma fase distante.** Ela é a base técnica do plano Premium.

Objetivo: automatizar tarefas quando houver acesso oficial às APIs necessárias.

Possíveis entregas:

- conectar conta Google (OAuth 2.0, com consentimento explícito, revogação e desvinculação em até 7 dias úteis)

- listar empresas administradas pelo usuário

- avaliações (listar, ler, responder — resposta sempre preparada por IA e aprovada pelo usuário antes de publicar, nunca automática)

- respostas

- métricas permitidas (API de Performance — buscas, chamadas, rotas, termos de pesquisa)

- informações do perfil (API do Business Profile)

A integração com Google **continua não sendo requisito para o funcionamento principal da plataforma** — o Free (currículo, missões, QR Code) funciona inteiramente sem ela. Ela é requisito só do Premium.

O protótipo anterior (LocalPulse) chegou a implementar login OAuth e um proxy para dados do Google Business Profile, mas nunca obteve acesso oficial à API — esse foi o principal motivo de a evolução ter parado. Ver `docs/10-HERANCA-LOCALPULSE.md`. **Por isso, solicitar acesso à API (ação do usuário: conta Google, projeto no Google Cloud, justificativa comercial, site empresarial válido — análise de até 14 dias) é a primeira ação prática desta fase**, antes de qualquer código de integração.

Ver `docs/17-INTEGRACAO-GOOGLE-BUSINESS-PROFILE.md` para o esboço de arquitetura (camada isolada, fluxo de OAuth/consentimento, e como isso se conecta ao modelo de créditos de IA do Premium).

Status: em planejamento ativo (P1 do roadmap de prioridade), bloqueada pela aprovação de acesso à API.

## Fase 8 — Comercialização

**Reclassificada em 2026-09-13:** parte desta fase (plano Premium R$19,90/mês, 1 negócio) é P1; planos Profissional/Agência (múltiplos negócios) e o canal B2B2C (contadores, associações comerciais, Sebrae local, agências) são P4, só depois de validar o Premium com os primeiros usuários reais.

Objetivo: transformar o produto em negócio recorrente.

Entregas:

- landing page — ✅ implementada em 2026-09-13/14 (pública em `/` para deslogados, via `AuthGate`; SEO básico + OG em `index.html`); ver `docs/07-CHANGELOG.md`

- planos (Free, Premium R$19,90/1 negócio, e futuramente Profissional/Agência — nunca múltiplos negócios no plano de entrada, para não quebrar a economia dele)

- pagamentos

- onboarding

- analytics (funil completo: cadastro → 1ª lição concluída → QR Code gerado → Google conectado → paywall → assinatura → cancelamento; é a métrica mais importante para validar a tese antes de investir em mais IA)

- programa beta

- primeiros clientes (meta inicial de referência: 20–50 usuários reais no Premium para validar a proposta antes de expandir os recursos de IA)

Status: planejamento ativo — depende do deploy (P0) e da integração Google (P1, Fase 7) estarem prontos antes de abrir cobrança de verdade.
