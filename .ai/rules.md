# Regras Permanentes para Agentes de IA

A ordem de leitura é definida exclusivamente em `AGENTS.md`. O ciclo de execução está em `.ai/workflow.md`.

## Escopo e alterações

1. Faça a menor mudança capaz de atender ao objetivo autorizado.
2. Não refatore, formate, apague ou altere partes não relacionadas.
3. Não apague ou substitua algo sem compreender sua função.
4. Preserve alterações preexistentes e não inclua trabalho alheio em commits.
5. Se houver sobreposição incerta com trabalho existente, pare e peça orientação.
6. Não expanda materialmente o escopo sem autorização.
7. Não introduza tecnologia ou dependência sem necessidade clara e autorização adequada.

## Autonomia e autorização

1. Leitura, inspeção, análise e pesquisa necessária podem ser feitas dentro do escopo solicitado.
2. Um pedido explícito de alteração autoriza somente as mudanças abrangidas pelo pedido.
3. Diagnóstico, pesquisa, proposta ou plano não autorizam implementação automática.
4. Não execute operações sensíveis sem autorização explícita, conforme `.ai/workflow.md`.
5. Não implemente uma `DECISÃO NECESSÁRIA` quando a tarefa depender dela.
6. Uma decisão aberta não relacionada não bloqueia trabalho autorizado.

## Código e arquitetura

1. Todo código novo deve usar TypeScript.
2. Evite `any`.
3. Prefira componentes pequenos e reutilizáveis.
4. Não duplique componentes ou lógica existente.
5. Separe interface, regras de negócio e integrações.
6. Mantenha integrações externas em serviços próprios.
7. Não altere arquitetura relevante sem decisão aprovada.

## Produto e conteúdo

1. O público principal é brasileiro e a interface deve usar português do Brasil.
2. Priorize simplicidade, praticidade e ações úteis no negócio real.
3. Não invente fatos, requisitos, currículo ou decisões de produto.
4. Não invente fatores de ranking nem prometa posição ou resultado garantido no Google.
5. Não transforme correlação, hipótese ou relato de usuário em evidência causal.
6. Não reabra uma `DECISÃO APROVADA` sem solicitação do usuário, evidência nova relevante ou incompatibilidade técnica demonstrada.
7. Consulte as fontes pedagógicas indicadas em `AGENTS.md` antes de criar currículo ou lições.

## Assets

1. Não gere, substitua ou sobrescreva asset aprovado sem autorização explícita.
2. Preserve roteiro, áudio, timestamps e imagens aprovados quando não fizerem parte do escopo.
3. Valide material experimental fora do destino aprovado sempre que aplicável.

## Pesquisa e evidência

1. Não repita pesquisa já consolidada sem necessidade.
2. Para afirmações sobre Google Business Profile, políticas, ranking ou funcionamento do Google, priorize documentação oficial atual.
3. Relatos de usuários e profissionais podem ilustrar experiências, dificuldades e hábitos, mas não comprovam fatores de ranking.
4. Diferencie fato, decisão, hipótese, sugestão, implementação e histórico quando houver risco de confusão.

## Documentação

1. Use a fonte canônica do domínio; não crie documentação duplicada se um documento existente puder receber a informação.
2. Não use `docs/07-CHANGELOG.md` como backlog ou ordem vigente de trabalho.
3. Registre decisões novas conforme `.ai/workflow.md`.
4. Não use `.ai/context.md` como changelog.

## Ambientes e segurança

1. Não presuma sincronização entre PC, Oracle VM, GitHub e Termux.
2. Não presuma caminhos, arquivos, ferramentas, dependências ou credenciais entre ambientes.
3. Nunca grave senhas, tokens, chaves privadas ou credenciais no repositório.
4. Nunca exponha segredos no frontend.
5. Use variáveis de ambiente para credenciais e pratique o menor privilégio.
6. Não altere infraestrutura, credenciais ou regras de segurança sem autorização e justificativa.
