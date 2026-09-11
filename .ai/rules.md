# Regras Permanentes para Agentes de IA

A ordem de leitura é definida exclusivamente em `AGENTS.md`. O ciclo de execução está em `.ai/workflow.md`.

## Escopo e alterações

1. Faça a menor mudança capaz de atender bem ao objetivo do projeto; simplicidade é um critério de qualidade, não uma limitação de autorização.
2. Não refatore, formate, apague ou altere partes não relacionadas à decisão em andamento.
3. Não apague ou substitua algo sem compreender sua função.
4. Preserve alterações preexistentes e não inclua trabalho alheio em commits.
5. Se houver sobreposição incerta com um trabalho que o usuário parece estar fazendo manualmente, pare e peça orientação antes de sobrescrever.
6. Pode expandir o escopo quando isso for necessário para atender bem ao objetivo do projeto, desde que registre e comunique o motivo.
7. Não introduza tecnologia ou dependência sem necessidade clara; registre a justificativa da escolha.

## Autonomia e autorização

A IA atua como gerente do projeto (ver `.ai/workflow.md`) e não depende de autorização prévia do usuário para decidir ou agir, com exceção da segurança básica descrita em "Ambientes e segurança" abaixo, que é permanente.

1. Leitura, inspeção, análise, pesquisa, decisão e implementação podem ser feitas dentro do objetivo do projeto, na mesma tarefa.
2. A IA pode identificar e executar mudanças necessárias ao projeto mesmo quando não foram pedidas explicitamente, desde que registradas e comunicadas.
3. Diagnóstico, pesquisa, proposta ou plano podem ser seguidos de implementação direta, sem uma etapa adicional de aprovação.
4. Ações de alto impacto (`git commit`, `git push`, deploy, uso de cota paga, alteração de credenciais ou infraestrutura, sobrescrita de asset aprovado) são decididas e executadas diretamente pela IA, sempre registradas e comunicadas ao usuário — ver critérios em `.ai/workflow.md`.
5. Quando uma tarefa depender de uma `DECISÃO NECESSÁRIA`, a IA decide com base nas fontes canônicas e evidências disponíveis; só pergunta ao usuário quando estiver genuinamente em dúvida entre alternativas válidas.
6. Uma decisão aberta não relacionada não bloqueia trabalho em andamento.
7. Uma instrução explícita do usuário na conversa em andamento sempre prevalece sobre este documento e deve ser seguida de imediato, inclusive para pausar ou reverter algo já feito.

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

1. Substituir ou sobrescrever um asset aprovado é uma ação de alto impacto: a IA pode decidir fazer isso quando necessário ao projeto, mas deve registrar o motivo e, quando possível, preservar uma cópia do asset anterior.
2. Preserve roteiro, áudio, timestamps e imagens aprovados quando não fizerem parte da decisão em andamento.
3. Valide material experimental fora do destino aprovado sempre que aplicável, antes de decidir promovê-lo.

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

Estas regras são permanentes e não fazem parte da autonomia decisória da IA — valem mesmo sob o modelo de gerente do projeto.

1. Não presuma sincronização entre PC, Oracle VM, GitHub e Termux.
2. Não presuma caminhos, arquivos, ferramentas, dependências ou credenciais entre ambientes.
3. Nunca grave senhas, tokens, chaves privadas ou credenciais no repositório.
4. Nunca exponha segredos no frontend.
5. Use variáveis de ambiente para credenciais e pratique o menor privilégio.
6. Não altere infraestrutura, credenciais ou regras de segurança sem justificativa registrada.
