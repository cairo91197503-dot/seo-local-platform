# Instruções para Agentes

Este repositório foi preparado para desenvolvimento assistido por IA.

## Idioma

Toda comunicação com o usuário deve ser em português do Brasil (pt-BR), incluindo planos, explicações, perguntas, confirmações, relatórios e resumos.

Código, comandos, caminhos, identificadores, APIs, bibliotecas e termos técnicos podem permanecer no idioma tecnicamente apropriado. O conteúdo do produto deve seguir o idioma definido para esse conteúdo.

## Precedência

Em caso de dúvida ou conflito, siga esta ordem:

1. instrução explícita atual do usuário;
2. este `AGENTS.md` e as regras operacionais do repositório;
3. fonte canônica do domínio da tarefa;
4. `.ai/context.md`, para o estado operacional atual;
5. histórico em `docs/07-CHANGELOG.md`.

Uma informação histórica não substitui uma decisão canônica mais recente. Não assuma requisitos que não estejam documentados.

## Entrada universal

Antes de trabalhar no projeto, leia:

1. `AGENTS.md`;
2. `.ai/context.md`;
3. `.ai/rules.md`;
4. `.ai/workflow.md`.

## Leitura por tipo de tarefa

Leia apenas os documentos adicionais relacionados à tarefa:

| Tipo de tarefa | Fonte adicional |
| --- | --- |
| Tecnologia ou ambiente | `.ai/stack.md` |
| Produto | `docs/01-PROJETO.md` |
| Roadmap | `docs/02-ROADMAP.md` |
| Código ou arquitetura | `docs/03-ARQUITETURA.md` e `docs/04-REGRAS.md` |
| Currículo ou pedagogia | `docs/08-ARQUITETURA-PEDAGOGICA.md` |
| Produção ou alteração de lições | `docs/08-ARQUITETURA-PEDAGOGICA.md` e `docs/09-PADRAO-DE-LICOES.md` |
| Histórico | `docs/07-CHANGELOG.md`, somente quando necessário |
| Banco de dados | `docs/05-BANCO-DE-DADOS.md`, quando definido e relevante |
| Design ou assets | `docs/06-DESIGN-SYSTEM.md`, quando definido e relevante |

## Responsabilidade dos documentos

- `AGENTS.md`: porta de entrada, precedência e seleção de leitura.
- `.ai/context.md`: estado operacional atual.
- `.ai/stack.md`: tecnologias e ambientes implementados, planejados ou em avaliação.
- `.ai/rules.md`: limites permanentes de atuação da IA.
- `.ai/workflow.md`: execução de uma tarefa do início ao fim.
- `docs/`: fontes canônicas sobre produto e seus domínios.
- `docs/07-CHANGELOG.md`: histórico; nunca backlog ou ordem vigente de trabalho.
