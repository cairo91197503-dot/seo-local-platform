# Regras para Agentes de IA

## Antes de qualquer alteração

1. Leia:

   - `.ai/context.md`

   - `.ai/stack.md`

   - `docs/01-PROJETO.md`

   - `docs/03-ARQUITETURA.md`

   - `docs/04-REGRAS.md`

2. Entenda o objetivo da tarefa antes de escrever código.

3. Se houver dúvida sobre arquitetura, regra de negócio ou tecnologia, não invente.

   Explique a dúvida antes de alterar o projeto.

## Código

1. Todo código deve usar TypeScript.

2. Evite `any`.

3. Prefira componentes pequenos e reutilizáveis.

4. Não duplique componentes ou lógica existente.

5. Mantenha lógica de negócio separada da interface.

6. Integrações externas devem ficar em serviços próprios.

7. Nunca exponha chaves, tokens ou segredos no frontend.

8. Variáveis sensíveis devem usar arquivos de ambiente.

9. Não instale bibliotecas sem explicar:

   - por que são necessárias;

   - qual problema resolvem;

   - se existe alternativa já presente no projeto.

## Alterações

1. Faça mudanças pequenas e rastreáveis.

2. Não refatore partes não relacionadas à tarefa atual.

3. Não apague código sem entender sua função.

4. Antes de substituir uma solução existente, explique o motivo.

5. Preserve compatibilidade com funcionalidades já aprovadas.

## Qualidade

Antes de considerar uma tarefa concluída:

1. Verifique erros de TypeScript.

2. Execute lint quando estiver configurado.

3. Execute testes relacionados quando existirem.

4. Verifique se o build continua funcionando.

5. Informe claramente qualquer limitação conhecida.

## Produto

1. O público principal é brasileiro.

2. A interface deve usar português do Brasil.

3. O usuário não deve precisar dominar marketing digital ou tecnologia.

4. Simplicidade e praticidade têm prioridade.

5. Gamificação deve gerar ações úteis para o negócio real.

6. A IA deve atuar como mentor contextualizado.

7. O produto não deve depender exclusivamente de APIs externas.

## Segurança

1. Nunca grave senhas, tokens, chaves privadas ou credenciais no repositório.

2. Nunca envie arquivos `.env` com segredos para o GitHub.

3. Pratique o princípio do menor privilégio em integrações.

4. Não altere regras de segurança do Firebase sem justificar.

## Git

Use commits claros, preferencialmente no padrão:

- `feat:` nova funcionalidade

- `fix:` correção

- `docs:` documentação

- `refactor:` refatoração

- `test:` testes

- `chore:` infraestrutura/configuração

## Regra principal

Não apenas produza código.

Primeiro entenda o produto, depois proponha a solução, então implemente.