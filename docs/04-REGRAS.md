# Regras do Projeto

## Produto

1. O produto deve ser simples para usuários sem conhecimento técnico.

2. Toda funcionalidade deve ter utilidade prática.

3. A gamificação deve incentivar ações que melhorem o negócio real do usuário.

4. O mentor de IA deve orientar, não apenas responder perguntas.

5. O produto deve funcionar mesmo sem integração com APIs externas.

## Interface

1. Todo texto destinado ao usuário deve estar em português do Brasil.

2. Evitar linguagem técnica desnecessária.

3. Priorizar experiência mobile.

4. Manter consistência visual entre telas.

5. Não criar telas complexas quando uma solução simples resolver o problema.

## Código

1. Usar TypeScript.

2. Evitar `any`.

3. Preferir componentes pequenos e reutilizáveis.

4. Separar interface, regra de negócio e integrações.

5. Evitar duplicação de lógica.

6. Não instalar bibliotecas sem necessidade clara.

7. Não criar abstrações antes de existir um problema real.

## Segurança

1. Nunca colocar segredos no repositório.

2. Nunca expor chaves privadas no frontend.

3. Usar variáveis de ambiente para credenciais.

4. Aplicar o princípio do menor privilégio em integrações.

5. Revisar regras de segurança do Firebase antes de produção.

## Git

Usar commits claros.

Padrões:

- `feat:` nova funcionalidade

- `fix:` correção

- `docs:` documentação

- `refactor:` refatoração

- `test:` testes

- `chore:` configuração ou infraestrutura

## Inteligência Artificial

`AGENTS.md` é a única fonte da ordem global de leitura. Os limites permanentes do agente estão em `.ai/rules.md` e o fluxo operacional está em `.ai/workflow.md`.

Se houver dúvida sobre requisito, arquitetura ou regra de negócio necessária à tarefa, o agente deve perguntar antes de assumir.

## Regra principal

Primeiro entender.

Depois propor.

Só então implementar.
