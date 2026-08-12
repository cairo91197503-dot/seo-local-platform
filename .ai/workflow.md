# Workflow Operacional para Agentes

## 1. Objetivo

Este documento define como uma IA executa tarefas neste repositório. A visão do produto, a arquitetura técnica e o currículo pertencem às fontes canônicas indicadas em `AGENTS.md`.

## 2. Ciclo padrão

```text
Pedido do usuário
→ classificar a autorização
→ identificar o ambiente
→ selecionar documentação relevante
→ inspecionar estado atual
→ pesquisar somente se necessário
→ definir a menor alteração adequada
→ pedir autorização quando necessário
→ implementar somente o escopo autorizado
→ validar proporcionalmente
→ registrar decisões quando aplicável
→ relatar exatamente o que mudou
→ parar
```

## 3. Classificação da tarefa

- **LEITURA / CONSULTA:** somente leitura.
- **DIAGNÓSTICO:** somente leitura, salvo autorização explícita para corrigir.
- **PESQUISA:** pesquisar e relatar; não implementar automaticamente.
- **PROPOSTA / PLANO:** produzir uma proposta; não modificar arquivos.
- **IMPLEMENTAÇÃO:** um pedido explícito de alteração autoriza mudanças somente dentro do escopo solicitado.
- **OPERAÇÃO SENSÍVEL:** exige autorização explícita.

## 4. Operações sensíveis

Exigem autorização explícita:

- `git commit`;
- `git push`;
- deploy;
- exclusão destrutiva;
- sobrescrita de assets aprovados;
- alteração de infraestrutura;
- uso ou consumo de serviço pago;
- geração que consuma cota paga;
- alteração de credenciais;
- expansão material do escopo.

Execute `git add` apenas como parte de uma tarefa Git explicitamente autorizada e somente para os caminhos aprovados. Nunca use staging indiscriminado.

## 5. Identificação do ambiente

Antes de usar caminhos específicos de máquina ou realizar operações Git sensíveis, verifique o ambiente real. Quando aplicável, use:

```text
pwd
git status --short
git branch --show-current
git remote -v
```

Nunca presuma que um arquivo existente no PC também existe na VM, que VM e PC estão sincronizados por usarem o mesmo repositório ou que um caminho é igual em duas máquinas.

## 6. Ambientes do projeto

### PC principal

- ambiente principal de desenvolvimento local;
- possui recursos locais próprios;
- caminhos devem ser verificados na sessão.

### Oracle VM

- ambiente remoto real atualmente utilizado;
- pode possuir clone, dependências e ferramentas diferentes do PC;
- não presumir sincronização automática.

### GitHub

- repositório remoto e mecanismo de versionamento e sincronização;
- não é ambiente de execução.

### Celular / Termux

- utilizado como terminal de acesso remoto;
- não presumir instalação local do projeto ou das dependências;
- confirmar o destino da sessão SSH antes de executar comandos.

Não registre credenciais, IPs privados, tokens, chaves ou segredos. Não invente caminhos não confirmados.

## 7. Worktree e alterações preexistentes

Antes de editar:

- verifique `git status --short`;
- identifique mudanças preexistentes;
- preserve o trabalho existente;
- não reverta arquivos fora do escopo;
- não formate arquivos não relacionados;
- não inclua mudanças alheias em commits;
- se houver sobreposição incerta, pare e peça orientação.

## 8. Pesquisa

Não repita pesquisa já consolidada na documentação sem necessidade. Pesquise novamente quando:

- o usuário solicitar;
- a informação puder ter mudado;
- faltar evidência;
- uma decisão depender de informação externa atual.

Para afirmações sobre Google Business Profile, ranking, políticas e funcionamento do Google, priorize documentação oficial atual. Relatos de usuários podem ilustrar experiência prática, mas não comprovam fatores de ranking. Nunca transforme hipótese ou relato em fato.

## 9. Decisões

Use, quando houver risco de confusão:

- `FATO CONFIRMADO`;
- `DECISÃO APROVADA`;
- `DECISÃO NECESSÁRIA`;
- `HIPÓTESE`;
- `SUGESTÃO`;
- `IMPLEMENTADO`;
- `PAUSADO`;
- `HISTÓRICO`.

Não é necessário rotular toda frase. Uma `DECISÃO NECESSÁRIA` só bloqueia a tarefa que realmente depende dela. Não reabra uma `DECISÃO APROVADA` sem solicitação do usuário, evidência nova relevante ou incompatibilidade técnica demonstrada.

## 10. Registro de novas decisões

Quando uma decisão for aprovada:

1. identifique a fonte canônica daquele domínio;
2. atualize essa fonte;
3. atualize ou remova a `DECISÃO NECESSÁRIA` correspondente;
4. registre no changelog apenas o acontecimento histórico, quando relevante;
5. atualize `.ai/context.md` somente se o estado operacional tiver mudado;
6. não duplique a decisão completa em vários documentos.

## 11. Validação

A validação deve ser proporcional à alteração.

- **Documentação:** execute no mínimo `git diff --check`.
- **Código:** consulte `package.json` e use os scripts existentes relacionados à mudança; não instale dependências apenas para validar sem autorização.
- **Assets:** valide o arquivo experimental sem sobrescrever o aprovado antes da aprovação.

Sempre informe o que foi validado, o que não foi validado e por quê.

## 12. Encerramento

Ao terminar:

- informe arquivos alterados e criados;
- informe validações;
- informe decisões registradas;
- informe limitações;
- informe operações deliberadamente não executadas;
- pare.

Não inicie espontaneamente a próxima tarefa.
