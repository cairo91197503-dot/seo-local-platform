# Especificação do MVP

## Escopo e princípio

O MVP do Estrelar é um treinador prático para pequenos empresários brasileiros. Seu núcleo é ensinar algo curto, orientar uma ação real e registrar a evolução de modo transparente. Ele não promete posição, clientes, vendas ou uma nota oficial do Google.

O MVP funciona sem API do Google Business Profile. Login Google identifica o usuário e mantém sua sessão; não implica acesso, leitura ou verificação de um Perfil da Empresa.

## Fluxo inicial

```text
Login Google
↓
Onboarding
↓
Home
↓
Lição
↓
Missão
↓
Ação real
↓
Confirmação
↓
XP
↓
Progresso
↓
Próxima etapa
```

- **Login Google:** o usuário entra com sua conta Google. Uma sessão persistida permite retomar a jornada sem novo login enquanto ela for válida.
- **Onboarding:** o usuário informa o mínimo sobre o negócio para contextualizar a jornada e configura, se já possuir, o link de solicitação de avaliação. A ausência do link não impede o aprendizado.
- **Home:** mostra uma única próxima ação prioritária e o resumo honesto de progresso, XP e nível.
- **Lição:** apresenta o conceito necessário para a ação em microcenas curtas.
- **Missão:** transforma o aprendizado em uma tarefa prática, com objetivo, instruções e recurso de link/QR quando aplicável.
- **Ação real:** ocorre fora do aplicativo ou com uma ferramenta dele; abrir a ferramenta não comprova a ação.
- **Confirmação:** o usuário declara manualmente que realizou a ação. O sistema registra que se trata de confirmação manual, não de verificação externa.
- **XP e progresso:** são concedidos ou atualizados somente após marcos definidos e sem duplicidade.
- **Próxima etapa:** após a conclusão, a Home aponta a próxima lição ou missão disponível.

## Onboarding curto e configurável

O onboarding é obrigatório antes da jornada, mas curto: os campos podem ser configurados no produto sem alterar a sequência pedagógica. No P0, solicita apenas:

| Dado | Necessidade |
| --- | --- |
| Nome do negócio | Personaliza a experiência e identifica o contexto mostrado ao usuário. |
| Categoria ou tipo de atividade | Ajuda a apresentar linguagem e exemplos minimamente pertinentes; não é diagnóstico. |
| Cidade ou área principal de atendimento | Contextualiza a realidade local sem exigir uma integração externa. |
| Link para solicitar avaliação (opcional) | Permite gerar e compartilhar QR Code/link; o usuário pode configurá-lo depois. |

O link é opcional para evitar bloquear a primeira lição. Quando não existir, a Home e a missão explicam que o usuário pode configurá-lo para usar o QR Code; não alegam que o sistema encontrou ou validou um perfil externo.

## Modelo de lição

Uma lição ensina; uma missão aplica. A primeira lição é **“Por que as avaliações importam?”** e explica como avaliações genuínas ajudam outras pessoas a conhecer experiências reais e decidir com mais confiança.

- **Entrada:** a Home abre a lição disponível ou o usuário a seleciona em Aprender. A tela informa título, objetivo e duração curta.
- **Cenas:** cada cena cumpre uma função pedagógica: contexto, situação real, explicação simples, exemplo, consequência prática e convite à ação. A quantidade de cenas não é fixa.
- **Navegação:** avançar e voltar muda apenas a cena visualizada. O usuário pode retomar da última cena efetivamente concluída; rever cenas já concluídas não gera XP.
- **Quiz opcional:** quando existir, é uma checagem breve de entendimento. Não é obrigatório para introduzir o MVP, e uma resposta errada oferece revisão sem punição.
- **Conclusão:** a lição fica concluída quando todas as cenas obrigatórias forem exibidas até o final e, se houver quiz obrigatório naquela lição, o critério documentado do quiz for atendido. Apenas abrir, avançar diretamente ou deixar uma cena antes do fim não conclui a lição.
- **Saída e retomada:** sair antes do término conserva a última cena concluída; não concede XP de conclusão e não libera a missão vinculada até os critérios serem atendidos.
- **Conexão com missão:** ao concluir, a tela apresenta a missão vinculada e explica o próximo passo prático. A conclusão não confirma que a ação real ocorreu.

## Modelo de missão

Cada missão contém título, objetivo, por que importa, instruções, recurso aplicável, confirmação e regra de recompensa. A primeira é **“Peça sua primeira avaliação”**.

### Estados

| Estado | Significado |
| --- | --- |
| disponível | A lição necessária foi concluída e a missão pode começar. |
| em andamento | O usuário iniciou a leitura ou preparação da missão. |
| ação realizada | O usuário informou que executou a ação real; aguarda registro da confirmação. |
| aguardando confirmação | A interface apresenta a confirmação final e seus limites antes do registro. |
| concluída | A confirmação manual foi registrada e a recompensa elegível foi concedida uma única vez. |
| abandonada | O usuário escolheu sair da missão; ela pode ser retomada sem perda do aprendizado. |

### Comportamento

- **Início:** uma missão disponível passa a `em andamento` quando o usuário escolhe iniciá-la.
- **Objetivo e instruções:** a primeira missão orienta a convidar clientes após uma experiência real, usando linguagem respeitosa e o link ou QR Code configurado quando disponível.
- **Ação real:** o usuário solicita uma avaliação a um cliente real. Abrir, copiar, imprimir, compartilhar link/QR ou navegar para outro aplicativo são meios de executar a tarefa, não evidência de que ela ocorreu.
- **Confirmação:** após declarar a ação, o usuário confirma uma afirmação clara de execução manual. O estado passa por `ação realizada` e `aguardando confirmação` antes de `concluída`.
- **Conclusão:** ocorre uma vez por missão elegível quando a confirmação é persistida com sucesso. A missão concluída pode ser consultada e suas instruções podem ser revistas.
- **Abandono e retomada:** abandonar não apaga a lição nem concede XP. Retomar volta a `em andamento` e preserva as instruções; a ação deve ser confirmada novamente apenas se ainda não houve conclusão.
- **Repetição:** o usuário pode repetir a prática no mundo real, mas a mesma instância da missão não volta a conceder XP. Novas missões equivalentes só podem oferecer XP se forem marcos distintos previamente definidos no currículo.

### Avaliações genuínas

A missão ensina uma solicitação ampla e legítima, sem manipular o resultado. É proibido selecionar somente clientes satisfeitos, oferecer recompensa em troca de avaliação, sugerir nota específica, impedir avaliações negativas ou pedir avaliação apenas quando a experiência foi positiva. A orientação é pedir uma opinião sincera de clientes após experiências reais, sem pressão para publicar, alterar ou remover conteúdo.

## XP

XP reforça marcos pedagógicos e práticos; não mede ranking, reputação oficial ou qualidade do negócio. A concessão deve ser atômica e registrada com um identificador único do marco para impedir duplicidade.

| Evento | XP | Momento | Repetição |
| --- | ---: | --- | --- |
| Concluir a primeira lição | 20 | Após todos os critérios objetivos da lição | Uma vez para essa lição |
| Concluir a primeira missão por confirmação manual | 40 | Após persistir a confirmação final | Uma vez para essa missão |
| Concluir uma próxima lição curricular distinta | 20 | Após seus critérios objetivos | Uma vez por lição |
| Concluir uma próxima missão curricular distinta | 40 | Após sua confirmação elegível | Uma vez por missão |
| Bônus de jornada inicial | 10 | Após concluir a primeira lição e a primeira missão | Uma vez por usuário e jornada |

Não geram XP: login, abertura de tela, clique, troca de cena, visualização, copiar link, gerar/baixar/imprimir/compartilhar QR Code, iniciar ou abandonar missão, retomar conteúdo, alterar dados do negócio, resposta errada em quiz ou repetir conteúdo concluído. Não há penalidades de XP no P0: corrigir ou abandonar uma ação não reduz o que foi legitimamente conquistado.

## Níveis

Os níveis representam estágio de prática no currículo, não uma classificação do negócio.

| Nível | Faixa de XP | Função pedagógica | Efeito na jornada |
| --- | ---: | --- | --- |
| Início | 0–19 | Preparar o contexto e iniciar o aprendizado | Apresenta a primeira lição. |
| Fundamentos | 20–59 | Demonstrar compreensão do conceito inicial | Libera e destaca a primeira missão. |
| Em prática | 60–99 | Registrar a primeira ação real confirmada | Mostra a próxima etapa curricular. |
| Em evolução | 100+ | Sustentar novos ciclos de aprendizado e ação | Prioriza o próximo marco disponível, sem prometer resultado externo. |

## Três estados distintos

| Conceito | O que representa | Exemplo |
| --- | --- | --- |
| Progresso pedagógico | O que foi aprendido e as etapas educacionais concluídas | Cenas obrigatórias e lição de avaliações concluídas. |
| Gamificação | XP, nível e recompensas de progresso | 60 XP e nível Em prática. |
| Estado da jornada | Onde o usuário está na sequência prática atual | Missão “Peça sua primeira avaliação” aguardando confirmação. |

Um estado não substitui outro: ter XP não prova compreensão adicional, concluir a lição não prova a ação externa, e iniciar uma missão não altera o nível por si só.

## Currículo mínimo

O MVP valida poucos ciclos completos antes de ampliar o conteúdo:

1. **Lição:** Por que as avaliações importam? **Missão:** Peça sua primeira avaliação.
2. **Lição:** Como fazer um pedido de avaliação genuíno. **Missão:** Prepare uma mensagem de solicitação respeitosa.
3. **Lição:** Informações corretas ajudam o cliente a entender o negócio. **Missão:** Revise uma informação essencial do negócio.

As lições 2 e 3 são a sequência mínima proposta após a primeira jornada; sua produção detalhada só ocorre em etapa própria e seguindo o padrão de lições. O P0 é validado pelo primeiro ciclo completo, não pela criação de dezenas de conteúdos.

## Link e QR Code para avaliações

QR Code é P0 e deriva de um link informado ou atualizado pelo usuário.

- **Configuração:** o usuário cola o link de solicitação de avaliação no onboarding ou em Ferramentas.
- **Validação básica:** o sistema verifica somente presença e formato de URL válido. Isso não confirma propriedade, perfil associado, destino final ou vínculo com o Google.
- **Visualização e geração:** com URL válida, o usuário visualiza o link e gera o QR Code correspondente.
- **Uso:** o QR Code pode ser impresso, baixado e compartilhado; o link também pode ser copiado e compartilhado.
- **Atualização:** alterar o link substitui a configuração atual e gera um novo QR Code para o novo destino. Registros futuros devem referenciar a versão de configuração usada, sem alegar validação externa.
- **Ausência ou configuração incompleta:** sem URL válida, o recurso não gera QR Code e explica como configurar o link; a lição e a missão continuam acessíveis, com instruções sem esse recurso.

## Persistência conceitual

Sem definir collections, schemas ou campos de Firestore, o MVP precisa persistir de forma determinística informações conceituais sobre:

- usuário e sessão;
- negócio e dados de onboarding;
- estado da jornada atual;
- progresso de lições e cenas;
- progresso e estado de missões;
- eventos de recompensa e concessões de XP;
- XP acumulado e nível derivado;
- configuração e versão do link/QR para avaliações.

Cada conclusão e recompensa deve ter chave idempotente vinculada ao usuário, à jornada e ao marco curricular. Repetir uma solicitação não cria uma segunda recompensa para a mesma chave. O estado só muda após persistência bem-sucedida; falhas devem manter ou recuperar o último estado confirmado para evitar progresso falso.

## Repetição e duplicidade

- Lições e instruções podem ser revistas livremente, sem XP adicional depois da primeira conclusão.
- Missões abandonadas podem ser retomadas; não recebem XP até sua primeira conclusão elegível.
- Uma missão concluída pode ser consultada ou praticada novamente, mas não muda XP, nível ou seu marco de conclusão.
- Atualizar link/QR pode alterar a configuração disponível, mas não confirma que uma avaliação foi solicitada nem concede XP.
- Eventos concorrentes ou reenvios de confirmação usam a mesma chave idempotente e resultam em uma única conclusão e recompensa.
- A confirmação manual registra apenas a declaração do usuário; não simula verificação do Google ou de um cliente.

## Fora do P0: streak e IA

**Streak** está fora do P0. Pode entrar em P1 somente se reforçar uma rotina útil, sem pressão artificial para acesso diário.

A hierarquia de IA é:

- **P1:** gerador de resposta para avaliações;
- **P2:** check-up ou diagnóstico personalizado;
- **P2:** mentor contextual.

IA auxilia o usuário e não substitui a metodologia, o julgamento humano ou a ação real. O primeiro vertical slice não necessita de IA.

## Primeiro vertical slice

O primeiro vertical slice deve demonstrar, de ponta a ponta:

```text
Login Google
→ onboarding
→ Home
→ primeira lição
→ conclusão
→ missão
→ configuração/uso do link ou QR
→ ação real
→ confirmação manual
→ XP
→ progresso persistido
→ próxima etapa
```

Ele funciona sem API do Google Business Profile e sem alegar que confirmou automaticamente a ação ou o destino do link.

## Critérios de Aceitação

- O usuário consegue entrar por Login Google e recuperar uma sessão persistida válida.
- O onboarding obrigatório coleta apenas nome do negócio, categoria/tipo, cidade/área de atendimento e, opcionalmente, link de avaliação; ao final, direciona à Home.
- A Home exibe a próxima ação única e o resumo separado de progresso pedagógico, estado da jornada e gamificação.
- A primeira lição apresenta suas cenas em sequência, permite voltar e retomar a última cena concluída.
- A lição só é concluída após todas as cenas obrigatórias chegarem ao fim e após eventual critério obrigatório de quiz; abrir ou pular conteúdo não a conclui.
- A conclusão da lição libera a missão “Peça sua primeira avaliação”, mas não declara que o usuário realizou uma ação externa.
- A missão expõe objetivo, instruções, estados e confirmação manual de uma ação real.
- A confirmação é marcada como manual e gera conclusão e XP uma única vez; reenvios, cliques, aberturas, cópias, visualizações e retomadas não geram XP.
- XP, nível e progresso persistem e a próxima etapa aparece depois da primeira missão concluída.
- Com URL válida informada pelo usuário, o sistema permite visualizar, gerar, baixar/imprimir e compartilhar QR Code/link; uma alteração de URL atualiza a configuração.
- Sem link ou com URL inválida, o QR Code não é gerado e a configuração é orientada sem bloquear a jornada pedagógica.
- O sistema opera sem API do Google Business Profile e não alega ter verificado perfil, propriedade, avaliação solicitada ou destino externo quando isso não ocorreu.
- Conteúdo e missão exigem avaliações genuínas: não há seleção de clientes satisfeitos, incentivo, nota sugerida, review gating ou bloqueio de opiniões negativas.
- Nenhuma tela, lição, missão, XP ou nível promete ranking, primeira posição, clientes, vendas ou resultado garantido.

## Princípios do produto

1. Estrelar é um treinador prático.
2. O aprendizado deve levar a uma ação real.
3. Gamificação é reforço, não objetivo.
4. IA é assistente.
5. A API do Google é futura e opcional.
6. O produto deve funcionar sem integração automática.
7. Não existem promessas de ranking.
8. Não existe nota oficial inventada.
9. Avaliações devem ser genuínas.
10. O produto deve continuar útil mesmo sem automação externa.
