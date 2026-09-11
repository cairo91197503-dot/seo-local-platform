# Herança do LocalPulse

Este projeto (nome técnico `seo-local-platform`, nome comercial "Estrelar" — ver `docs/01-PROJETO.md`) é uma reconstrução do zero de um produto anterior chamado **LocalPulse**. Este documento registra o que existia nos protótipos anteriores, para que essas ideias não precisem ser redescobertas nem sejam tratadas como hipotéticas quando já foram exploradas.

## Repositórios anteriores

- [`LocalPulse`](https://github.com/cairo91197503-dot/LocalPulse) — app nativo Android (Kotlin), a versão mais completa em funcionalidades.
- [`LocalPulse-WEB`](https://github.com/cairo91197503-dot/LocalPulse-WEB) — reescrita web (React, gerado via Google AI Studio).
- [`LocalPulse-WEB-V2`](https://github.com/cairo91197503-dot/LocalPulse-WEB-V2) — evolução da versão web, com Firebase, login Google e mais integrações.
- [`LocalPulse-v2.0`](https://github.com/cairo91197503-dot/LocalPulse-v2.0) — tentativa de reunificação Android + web; a parte web ficou incompleta.

Nenhum código, decisão de arquitetura, dependência ou padrão de UI desses repositórios é herdado automaticamente. Cada funcionalidade abaixo deve ser reavaliada dentro do modelo pedagógico e de produto atual (`docs/01-PROJETO.md`, `docs/08-ARQUITETURA-PEDAGOGICA.md`) antes de ser reimplementada.

## Funcionalidades já exploradas

Além do módulo educacional (curso em módulos e lições, equivalente ao conceito atual de trilhas/microlições), os protótipos anteriores chegaram a implementar ou esboçar:

- **Diagnóstico de reputação com IA**: análise do perfil do negócio via Gemini, com uma tela de resultado dedicada.
- **Conexão com conta Google**: login OAuth do Google e uma camada de proxy para dados do Google Business Profile (GMB), incluindo diagnóstico de erros de conexão com a API.
- **QR Code para avaliações**: geração de QR Code apontando para a tela de avaliação do negócio no Google — este item já está listado na Fase 5 do roadmap atual.
- **Assistente de resposta a avaliações**: gerador assistido por IA de respostas a avaliações de clientes.
- **Tarefas diárias com notificação**: um sistema de tarefas do dia com lembrete via notificação push (mecânica de sequência/hábito, distinta do modelo de missões atual).
- **Dashboard com pontuação de reputação**: painel com métricas, gráficos e exportação em PDF.
- **"Dicas PRO"**: conteúdo de dicas adicionais, sugerindo um possível patamar pago ou avançado.
- **Onboarding guiado**: tour interativo de primeiro uso (`intro.js`, `react-joyride`) e formulário de cadastro do negócio.

## Por que não evoluiu

O ponto de bloqueio identificado nos protótipos foi a dependência de **acesso oficial à API do Google Business Profile**, que nunca foi obtido — sem ele, a conexão real com a conta Google do usuário (diagnóstico automático, leitura de avaliações, métricas) não funciona de forma confiável. Os repositórios não documentam outros motivos formais de descontinuação.

Essa é exatamente a razão pela qual `docs/02-ROADMAP.md` trata a Fase 7 (Integração Google) como opcional e tardia, e afirma explicitamente que "a integração com Google não deve ser requisito para o funcionamento principal da plataforma" (`docs/01-PROJETO.md`, seção "Dependência de APIs externas"). O produto atual é desenhado para entregar valor real mesmo sem essa API — o usuário aprende e executa ações manualmente (ex.: pede a avaliação, gera o QR Code, cola a resposta sugerida) em vez de depender de automação via API oficial.

## Relação com o roadmap atual

As ideias acima já são evidência de que fazem sentido para o público-alvo, não apenas hipóteses. Ficam como candidatas para as fases correspondentes de `docs/02-ROADMAP.md`, a decidir quando essas fases forem abertas:

- Fase 5 (Ferramentas Práticas): QR Code (já listado), gerador de respostas a avaliações.
- Fase 6 (Mentor IA): diagnóstico de reputação com IA pode informar o desenho do mentor.
- Fase 7 (Integração Google): conexão OAuth e leitura de dados do Google Business Profile, condicionada à obtenção de acesso oficial à API.

Nenhuma dessas funcionalidades está aprovada para implementação só por ter existido antes; a aprovação segue o processo normal descrito em `.ai/workflow.md`.
