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

## Modelo de governança (desde 2026-08-24)

A IA atua como gerente do projeto: decide e implementa diretamente (produto, pedagogia, arquitetura, conteúdo, priorização, ações de alto impacto como commit/push/deploy), sem depender de autorização prévia do usuário. Só recorre ao usuário quando estiver genuinamente em dúvida entre alternativas válidas. Regras de segurança básica (`.ai/rules.md`, seção "Ambientes e segurança") continuam permanentes e não fazem parte dessa autonomia. Detalhes completos em `.ai/workflow.md` e `.ai/rules.md`.

## Foco vigente

Avançar autonomamente pela Fase 2 do roadmap (MVP técnico, `docs/02-ROADMAP.md`) com a Fase 3 pausada (ver abaixo). Roteamento real por URL já foi implementado. O que resta da Fase 2 — Firebase, autenticação, banco de dados, deploy no Render — depende de criação de conta e credenciais, ação que a IA não está autorizada a executar (`.ai/rules.md`); a IA deve preparar o que puder estruturalmente (arquitetura, scaffolding com variáveis de ambiente, regras de segurança em rascunho) e sinalizar claramente ao usuário o que só ele pode fazer.

## Itens pausados

Não retomar sem solicitação explícita do usuário:

- investigação de Cloudflare Workers AI;
- nova pesquisa de TTS;
- Chatterbox;
- Kokoro;
- substituição da narração Faber;
- Fase 3 do roadmap (Academia/conteúdo educacional) por completo, incluindo o pipeline de lições (`scripts/generate-lesson.ts`) e qualquer produção ou revisão de lição — pausada em 2026-08-24 a pedido explícito do usuário.

Retomado em 2026-08-24, a pedido explícito do usuário: geração automática de imagens no pipeline de rascunhos (`docs/09-PADRAO-DE-LICOES.md`), via API Gemini. Continua exigindo revisão humana antes de qualquer imagem virar asset aprovado.

## Decisões aprovadas relevantes

- O produto atende principalmente pequenos empresários brasileiros com pouco conhecimento técnico ou de marketing digital.
- O aprendizado deve levar a ações práticas no negócio.
- O produto não ensina hacks de algoritmo nem promete primeira posição no Google.
- Documentação oficial sustenta afirmações sobre produto, política e ranking; relatos servem apenas como evidência prática ou anedótica.
- Assets aprovados não podem ser substituídos sem autorização explícita.
- Nome comercial: Estrelar. Domínio principal: `estrelar.app`.

## Decisões abertas

As decisões pedagógicas abertas estão registradas em `docs/08-ARQUITETURA-PEDAGOGICA.md`. Entre elas estão currículo, trilhas, módulos, conclusão pedagógica, XP definitivo, persistência, quizzes, modelo definitivo de missão, métricas, voz geral e padrão visual definitivo.

Uma decisão aberta só bloqueia uma tarefa quando essa tarefa depende dela.

## Fontes canônicas relacionadas

- Produto e escopo: `docs/01-PROJETO.md`.
- Arquitetura pedagógica: `docs/08-ARQUITETURA-PEDAGOGICA.md`.
- Produção de lições: `docs/09-PADRAO-DE-LICOES.md`.
- Herança do LocalPulse (funcionalidades já exploradas antes): `docs/10-HERANCA-LOCALPULSE.md`.
- Tecnologias e ambientes: `.ai/stack.md`.
- Fluxo de trabalho: `.ai/workflow.md`.
- Histórico: `docs/07-CHANGELOG.md`.
