# Currículo do MVP

Este documento fecha, para o P0, as decisões que `docs/08-ARQUITETURA-PEDAGOGICA.md` listava como `DECISÃO NECESSÁRIA`: currículo completo, quantidade de trilhas, quantidade de módulos e currículo final do MVP. Decidido pelo usuário em 2026-09-12, a partir de uma proposta de currículo trazida por ele e avaliada contra `docs/08`, `docs/09` e `docs/12`.

Este documento não substitui `docs/08-ARQUITETURA-PEDAGOGICA.md` (princípios, jornada pedagógica, fatos oficiais e regras de evidência continuam lá) nem `docs/09-PADRAO-DE-LICOES.md` (padrão de produção de cada lição). Ele define **quais lições existem, em que ordem e com que objetivo** — o "mapa", não o "como escrever cada cena".

## Objetivo pedagógico

O Estrelar não ensina SEO local como disciplina. Ensina, uma ação de cada vez, como o pequeno empresário cuida da própria presença no Google — alinhado ao princípio central de `docs/08`: "não basta ser encontrado, o perfil precisa ajudar o cliente a entender, confiar e escolher o negócio."

Regra de curadoria para qualquer lição nova, deste ou de currículos futuros: **se o conceito não muda uma decisão ou ação do empresário, ele não vira lição.** Teoria abstrata (ex.: "como funciona o algoritmo de ranking") só entra quando sustenta uma ação concreta, e sempre a partir dos fatos oficiais listados em `docs/08`.

## Trilha

O MVP tem **uma única trilha**: *Presença Local na Prática*. Múltiplas trilhas continuam em aberto para depois do MVP (P1/P2) — não inferir quantidade ou nomes sem novo pedido do usuário.

## Módulos

A trilha tem 5 módulos, mapeados aos dez pilares de `docs/08` (não são pilares novos, são um agrupamento didático deles):

1. **Comece pelo básico** — pilares Existir, Ser Encontrado, Ser Entendido.
2. **Faça o cliente entender seu negócio** — pilar Ser Escolhido / Mostrar o Negócio Real.
3. **Transforme experiência em confiança** — pilares Entregar uma Boa Experiência e Transformar Experiência em Reputação.
4. **Mantenha seu negócio atualizado** — pilar Manter Tudo Atualizado.
5. **Descubra o que melhorar** — pilares Medir e Melhorar e Repetir.

## Regras gerais válidas para todas as lições abaixo

- Cenas: quantidade **não é fixa**. Cada lição usa quantas cenas seu objetivo pedagógico exigir (`docs/09`), seguindo a função Contexto → Problema/Conceito → Exemplo → Consequência → Ação onde fizer sentido, sem forçar todas as etapas.
- XP: 20 por lição concluída, 40 por missão concluída (mesmo esquema já usado desde o currículo mínimo; ver `docs/12-ESPECIFICACAO-MVP.md`, seção "XP"). Bônus de 10 XP de "jornada inicial" é concedido uma vez, ao concluir a primeira missão do currículo — `src/state/journey.ts` deriva qual é essa missão de `CURRICULUM[0]` (hoje `discover-search-presence`, lição 1), então isso segue correto automaticamente se o currículo for reordenado de novo.
- Critério de conclusão da lição: todas as cenas obrigatórias vistas até o fim (`docs/12`); nenhuma lição deste currículo tem quiz obrigatório — quiz continua `DECISÃO NECESSÁRIA` em `docs/08` e só entra se for pedido depois.
- Toda afirmação factual sobre Google/ranking/políticas deve vir da lista "Fatos oficiais do Google" de `docs/08` — nunca inventar fator de ranking ou prometer posição.
- Nenhuma lição ou missão deste currículo pede nota específica, oferece incentivo por avaliação ou sugere seleção enganosa de quem pode avaliar (`docs/09`).
- Áudio/ilustração: das 12 lições implementadas, só a lição 7 (`reviews-importance`) tem uma cena com áudio/imagem aprovados (a cena 1). As outras 11 são só texto por enquanto — produção audiovisual é trabalho separado, via `scripts/generate-lesson.ts` (`docs/09`), lição por lição.

## Currículo completo (12 lições)

| # | Módulo | Lição (id) | Objetivo da lição | Pré-requisito | Missão (id) | Resultado esperado da missão | Status |
|---|---|---|---|---|---|---|---|
| 1 | 1. Comece pelo básico | Por que aparecer nas buscas locais importa (`why-appear-in-local-search`) | O empresário entende que buscas locais já representam uma necessidade concreta de um cliente por perto, e que aparecer nessas buscas é o primeiro passo da jornada de `docs/08`. | — (primeira lição do currículo) | Descubra como seu negócio aparece nas buscas (`discover-search-presence`) | O usuário pesquisa o próprio negócio no Google e observa o que aparece hoje (nome, se há Perfil da Empresa, informações visíveis). | **Implementada** (texto; sem áudio/imagem) |
| 2 | 1. Comece pelo básico | Seu perfil representa seu negócio (`profile-represents-your-business`) | Entender que o Perfil da Empresa é a representação do negócio real para quem pesquisa — não um formulário isolado. | Lição 1 | Faça um check-up básico do seu perfil (`basic-profile-checkup`) | O usuário abre o próprio Perfil da Empresa e observa, de forma geral, se as informações principais existem e fazem sentido. | **Implementada** (texto; sem áudio/imagem) |
| 3 | 1. Comece pelo básico | Informações corretas ajudam o cliente a entender o negócio (`accurate-business-info`) | Entender que nome, endereço, telefone, categoria e horário corretos ajudam o Google a entender o negócio — sem prometer posição específica. | Lição 2 | Revise uma informação essencial do negócio (`review-business-info`) | O usuário confere e, se necessário, atualiza telefone ou horário no Perfil real. | **Implementada** (texto; sem áudio/imagem) |
| 4 | 1. Comece pelo básico | Horários também fazem parte da experiência (`business-hours-matter`) | Aprofundar especificamente horários especiais (feriados, fechamentos temporários) — diferente da lição 3, que trata telefone/horário de forma genérica. | Lição 3 | Confira seus horários de funcionamento (`review-business-hours`) | O usuário revisa horários, incluindo eventuais exceções/feriados, e atualiza se necessário. | **Implementada** (texto; sem áudio/imagem) |
| 5 | 2. Faça o cliente entender seu negócio | Faça o cliente entender o que você oferece (`explain-what-you-offer`) | Entender que descrever serviços/produtos com clareza ajuda o cliente a decidir antes mesmo de entrar em contato. | Lição 4 | Revise a lista de serviços do seu perfil (`review-services`) | O usuário revisa se os serviços/produtos listados no perfil real refletem o que o negócio oferece hoje. | **Implementada** (texto; sem áudio/imagem) |
| 6 | 2. Faça o cliente entender seu negócio | Fotos ajudam o cliente a decidir (`photos-help-customers-decide`) | Entender que fotos reais (ambiente, produtos, resultado do trabalho) ajudam o cliente a se sentir seguro antes de escolher — informação para o cliente, não "truque" para o Google. | Lição 5 | Revise ou adicione fotos reais do seu negócio (`review-photos`) | O usuário confere as fotos atuais do perfil e adiciona/atualiza pelo menos uma foto real. | **Implementada** (texto; sem áudio/imagem) |
| 7 | 3. Transforme experiência em confiança | Por que as avaliações importam? (`reviews-importance`) | Entender que avaliações reais ajudam outras pessoas a confiar no negócio antes de escolher. | Lição 6 | Peça sua primeira avaliação (`request-first-review`) | O usuário pede uma avaliação genuína a um cliente real após uma boa experiência. | **Implementada** (cena 1 com áudio/imagem aprovados; demais cenas em texto) |
| 8 | 3. Transforme experiência em confiança | Como fazer um pedido de avaliação genuíno (`review-request-message`) | Diferenciar um pedido genuíno (educado, sem nota sugerida, sem troca) de um pedido que viola as políticas do Google. | Lição 7 | Prepare uma mensagem de solicitação respeitosa (`prepare-request-message`) | O usuário escreve a própria mensagem de pedido de avaliação, sem pedir nota específica nem oferecer nada em troca. | **Implementada** (texto; sem áudio/imagem) |
| 9 | 3. Transforme experiência em confiança | Como responder avaliações (`how-to-respond-to-reviews`) | Entender por que responder avaliações importa (o Google recomenda) e a diferença entre responder bem uma avaliação positiva e uma negativa, sem se justificar de forma hostil. | Lição 8 | Responda a uma avaliação recebida (`respond-to-a-review`) | O usuário responde a pelo menos uma avaliação real do seu negócio (positiva ou negativa). | **Implementada** (texto; sem áudio/imagem; missão sem exemplo de mensagem pronto — respostas a avaliações negativas variam demais para um modelo único) |
| 10 | 4. Mantenha seu negócio atualizado | Seu perfil precisa continuar atualizado (`keep-your-profile-updated`) | Entender que o perfil é uma representação viva do negócio, não uma configuração única — atualizar após qualquer mudança real. | Lição 9 | Faça uma revisão rápida do seu perfil (`quick-profile-review`) | O usuário passa pelo perfil e atualiza qualquer informação que tiver mudado desde a última revisão. | **Implementada** (texto; sem áudio/imagem) |
| 11 | 5. Descubra o que melhorar | Faça seu primeiro check-up completo (`first-profile-checkup`) | Consolidar tudo que foi aprendido em um olhar completo sobre o próprio perfil, identificando lacunas. | Lição 10 | Identifique 3 melhorias possíveis (`identify-three-improvements`) | O usuário lista 3 pontos do próprio perfil que podem melhorar, com base no que aprendeu no currículo. | **Implementada** (texto; sem áudio/imagem) |
| 12 | 5. Descubra o que melhorar | Escolha sua próxima ação (`choose-your-next-action`) | Fechar o currículo mínimo transformando reflexão em rotina: escolher e executar uma melhoria concreta. | Lição 11 | Execute uma melhoria escolhida (`execute-one-improvement`) | O usuário executa uma das 3 melhorias identificadas na missão anterior. | **Implementada** (texto; sem áudio/imagem) |

**As 12 lições e 12 missões do currículo estão implementadas** (texto; produção audiovisual segue pendente, lição por lição, exceto a cena 1 da lição 7). Próximo passo pedagógico: revisão humana do texto de cada lição nova antes de iniciar produção de áudio/imagem, e as prioridades nº 2 (QR Code) e nº 3 (app no ar) do roadmap.

## Fatos oficiais de referência por lição (resumo)

Todos vêm da lista completa em `docs/08-ARQUITETURA-PEDAGOGICA.md`, seção "Fatos oficiais do Google que podem sustentar as lições" — esta tabela só indica quais se aplicam a cada lição, não substitui a leitura da lista completa nem autoriza fato novo.

- **Lições 1-3:** resultados locais aparecem na Pesquisa e no Maps; informações completas e corretas ajudam o Google a entender o negócio; ranking local é baseado principalmente em relevância, distância e destaque; não existe forma de pagar por posição orgânica.
- **Lição 4:** horários podem e devem ser atualizados, inclusive em situações especiais.
- **Lição 6:** fotos e vídeos ajudam clientes a conhecer o negócio e podem destacar características da empresa.
- **Lições 7-8:** avaliações aparecem no Perfil da Empresa; o Google permite solicitar avaliações por link/QR code; avaliações devem refletir experiências genuínas; oferecer benefício em troca de avaliação viola as políticas.
- **Lição 9:** o Google recomenda responder às avaliações e tratar o feedback com atenção.
- **Lição 10:** mesmos fatos da lição 4 (horários), mais os fatos gerais de informações completas/corretas — aplicados como rotina, não como configuração única.
- **Lições 11-12:** nenhum fato novo — consolidação do que já foi ensinado; não introduzir métricas ou diagnóstico automatizado aqui (isso é P1, ver abaixo).

## Fora deste currículo (P1/P2 — não iniciar sem pedido explícito)

Mantendo o que já está registrado em `docs/02-ROADMAP.md` e `docs/08` ("Medir e Melhorar" tem métricas de sucesso como `DECISÃO NECESSÁRIA`, e streak/IA já estão fora do P0 em `docs/12`):

- **P1 — Crescimento:** diagnóstico de perfil mais estruturado, métricas, comparação com negócios semelhantes, sugestões de melhoria mais personalizadas, rotina de manutenção assistida.
- **P2 — Mentor IA:** IA contextual proativa (ex.: observar que o perfil está há muito tempo sem atualização e sugerir uma ação) — depende da Fase 6 (`docs/02-ROADMAP.md`) e de decisões de privacidade/limites ainda não tomadas.

QR Code (prioridade nº 2 do roadmap atual) é um eixo de **desenvolvimento** independente deste currículo — nada aqui muda a ordem de prioridade já definida em `docs/02-ROADMAP.md`. Quando o QR Code estiver pronto, ele deve ser referenciado como ferramenta de apoio nas lições 7-8 (pedido de avaliação), sem virar lição própria.

## Decisões que este documento resolve (atualizar `docs/08`)

Este documento resolve, para o P0, os seguintes itens antes listados como `DECISÃO NECESSÁRIA` em `docs/08-ARQUITETURA-PEDAGOGICA.md`: currículo completo, quantidade de trilhas (1), quantidade de módulos (5) e currículo final do MVP. Os demais itens da lista de `docs/08` (sistema definitivo de XP além do já usado, persistência entre dispositivos, formato de quizzes, modelo definitivo de missão além do já implementado, métricas de sucesso, voz padrão, padrão visual definitivo) **continuam em aberto** e não devem ser inferidos a partir deste documento.
