# Substituição completa da narração (lote N1–N48)

Decisão do usuário em 2026-09-19: substituir **todos** os áudios das 12 lições (os 43 WAVs gerados pelo pipeline antigo + as 5 cenas que nunca tiveram áudio) por narrações novas feitas em qualquer IA de voz, seguindo o fluxo simples de `docs/09-PADRAO-DE-LICOES.md`.

Os 48 scripts abaixo foram extraídos diretamente dos `narration.script` em `src/content/lessons/` — são os roteiros oficiais, sem alteração. Cada bloco é completo e independente: colar o prompt universal de voz + o script na IA, gerar, baixar em MP3 e salvar no caminho indicado.

## Prompt universal de voz (colar uma vez, vale para os 48)

```text
Narração em português do Brasil para um app que ajuda pequenos empresários. Voz masculina adulta, brasileira, calorosa e natural — tom de parceiro de confiança, não de locutor de rádio nem de professor. Ritmo pausado e claro, sem pressa, sem dramatização. Pronúncia natural das palavras, sem soletrar nada. Grave exatamente o texto abaixo, palavra por palavra, sem acrescentar, remover ou improvisar nada:
```

## Regras do lote

- Uma voz só para os 48 (não trocar de voz no meio do lote).
- Revisão humana obrigatória: ouvir cada áudio conferindo palavra trocada, cortada ou com pronúncia estranha; regenerar se preciso — nunca editar o `script` para acompanhar um áudio errado.
- Destino: mesmo pasta do `.wav` atual, com o nome indicado (`.mp3`). A única exceção é `reviews-importance/intro`, que usa o nome plano histórico (`cena-01.mp3`).
- **Lote concluído em 2026-09-19** (commit externo `1e2db6d`): 48 MP3s gerados via edge-tts (voz `pt-BR-AntonioNeural`), 48 `audioSrc` atualizados, 43 `.wav` apagados. Ver `docs/07-CHANGELOG.md`. Resta a aprovação por escuta abaixo.

## N1 - accurate-business-info / intro

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/accurate-business-info/intro/narration-v001.mp3 (substitui o .wav atual)

> Quando as informações do seu Perfil da Empresa estão corretas e completas, o Google entende melhor o seu negócio — e pode mostrá-lo para mais pessoas que procuram por ele.

## N2 - accurate-business-info / what-matters

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/accurate-business-info/what-matters/narration-v001.mp3 (substitui o .wav atual)

> Nome, endereço, telefone, categoria e horário de funcionamento estão entre as informações que ajudam o Google a relacionar o seu negócio a buscas relevantes. Vale lembrar: informações completas e corretas ajudam o Google a entender seu negócio, mas isso não garante uma posição específica nos resultados.

## N3 - accurate-business-info / keep-updated

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/accurate-business-info/keep-updated/narration-v001.mp3 (substitui o .wav atual)

> O trabalho não termina na primeira configuração. Sempre que algo mudar — um novo horário, um novo telefone, um novo endereço — atualize o quanto antes, porque um perfil desatualizado pode confundir seus clientes.

## N4 - accurate-business-info / action

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/accurate-business-info/action/narration-v001.mp3 (substitui o .wav atual)

> Você já sabe por que manter as informações corretas importa. A próxima missão é revisar uma informação essencial do seu negócio.

## N5 - business-hours-matter / intro

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/business-hours-matter/intro/narration-v001.mp3 (substitui o .wav atual)

> Um horário errado pode fazer um cliente ir até o seu negócio e encontrar a porta fechada — e isso já é uma má primeira experiência.

## N6 - business-hours-matter / special-hours

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/business-hours-matter/special-hours/narration-v001.mp3 (substitui o .wav atual)

> Além do horário normal, o Google permite informar horários especiais, como feriados e fechamentos temporários. Esses horários podem e devem ser atualizados sempre que mudarem — não só no dia a dia comum, mas também nessas situações especiais.

## N7 - business-hours-matter / consequence

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/business-hours-matter/consequence/narration-v001.mp3 (substitui o .wav atual)

> Na prática, um cliente que vê "aberto" no perfil, vai até lá num feriado e encontra tudo fechado, acaba perdendo confiança — mesmo sem culpa do negócio em si.

## N8 - business-hours-matter / action

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/business-hours-matter/action/narration-v001.mp3 (cena sem áudio até hoje)

> Agora é sua vez: confira se o horário do seu perfil está correto, incluindo os próximos feriados ou exceções que você já souber.

## N9 - choose-your-next-action / intro

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/choose-your-next-action/intro/narration-v001.mp3 (cena sem áudio até hoje)

> Você chegou ao fim do currículo, mas não ao fim da jornada. Cuidar da presença do seu negócio no Google é uma rotina contínua.

## N10 - choose-your-next-action / choose

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/choose-your-next-action/choose/narration-v001.mp3 (cena sem áudio até hoje)

> De tudo que você aprendeu, escolha uma ação concreta para fazer agora. O objetivo não é terminar o curso do Estrelar — é saber cuidar do seu negócio no Google, de forma contínua.

## N11 - choose-your-next-action / example

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/choose-your-next-action/example/narration-v001.mp3 (cena sem áudio até hoje)

> Pode ser qualquer uma das três melhorias que você identificou na missão anterior — o importante é escolher uma e executar.

## N12 - choose-your-next-action / action

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/choose-your-next-action/action/narration-v001.mp3 (cena sem áudio até hoje)

> Escolha uma das melhorias que você identificou e coloque em prática agora. Você já sabe cuidar disso sozinho — e, no futuro, o Estrelar vai poder ajudar a fazer parte disso por você, sempre com a sua aprovação antes de qualquer mudança.

## N13 - explain-what-you-offer / intro

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/explain-what-you-offer/intro/narration-v001.mp3 (substitui o .wav atual)

> Antes de entrar em contato, o cliente quer entender rapidamente o que o seu negócio oferece.

## N14 - explain-what-you-offer / clarity

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/explain-what-you-offer/clarity/narration-v001.mp3 (substitui o .wav atual)

> Descrever com clareza os serviços ou produtos ajuda o cliente a decidir sem precisar perguntar o básico primeiro. E o critério aqui é simples: não coloque uma informação porque o Google gosta dela. Coloque porque o cliente precisa dela para decidir.

## N15 - explain-what-you-offer / example

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/explain-what-you-offer/example/narration-v001.mp3 (substitui o .wav atual)

> Na prática, uma lista de serviços clara e atualizada economiza tempo seu e do cliente, e evita expectativas erradas.

## N16 - explain-what-you-offer / action

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/explain-what-you-offer/action/narration-v001.mp3 (substitui o .wav atual)

> Você já sabe por que isso importa. A próxima missão é revisar como o seu negócio descreve o que oferece.

## N17 - first-profile-checkup / intro

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/first-profile-checkup/intro/narration-v001.mp3 (substitui o .wav atual)

> Você já aprendeu várias partes do seu perfil, uma de cada vez. Agora é hora de olhar para ele como um todo.

## N18 - first-profile-checkup / what-it-means

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/first-profile-checkup/what-it-means/narration-v001.mp3 (substitui o .wav atual)

> Esse check-up completo junta tudo o que você já revisou — informações, horários, serviços, fotos, avaliações — num único olhar.

## N19 - first-profile-checkup / purpose

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/first-profile-checkup/purpose/narration-v001.mp3 (substitui o .wav atual)

> Mas esse olhar não é sobre nota ou posição no Google. É sobre identificar o que ainda pode representar melhor o seu negócio real.

## N20 - first-profile-checkup / action

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/first-profile-checkup/action/narration-v001.mp3 (substitui o .wav atual)

> Agora é sua vez: faça esse olhar completo e identifique o que ainda pode melhorar.

## N21 - how-to-respond-to-reviews / intro

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/how-to-respond-to-reviews/intro/narration-v001.mp3 (substitui o .wav atual)

> Receber uma avaliação é só metade do caminho. Responder também faz parte de cuidar da reputação do seu negócio.

## N22 - how-to-respond-to-reviews / why-respond

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/how-to-respond-to-reviews/why-respond/narration-v001.mp3 (substitui o .wav atual)

> O Google recomenda responder às avaliações e tratar o feedback dos clientes com atenção. Responder bem a uma avaliação positiva agradece; responder bem a uma negativa mostra que você se importa, sem hostilidade.

## N23 - how-to-respond-to-reviews / example

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/how-to-respond-to-reviews/example/narration-v001.mp3 (substitui o .wav atual)

> Numa avaliação positiva, um agradecimento simples e específico já ajuda. Numa negativa, reconhecer o problema e mostrar disposição para resolver vale muito mais do que se justificar ou discutir.

## N24 - how-to-respond-to-reviews / action

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/how-to-respond-to-reviews/action/narration-v001.mp3 (substitui o .wav atual)

> Você já sabe como pensar sobre isso. A próxima missão é responder a uma avaliação de verdade.

## N25 - keep-your-profile-updated / intro

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/keep-your-profile-updated/intro/narration-v001.mp3 (substitui o .wav atual)

> Configurar o perfil uma vez não é o fim do trabalho — é só o começo.

## N26 - keep-your-profile-updated / living-profile

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/keep-your-profile-updated/living-profile/narration-v001.mp3 (substitui o .wav atual)

> Sempre que algo mudar no seu negócio — horário, serviço, endereço — o perfil deve mudar junto. Ele não é uma configuração feita uma única vez; é uma representação viva do seu negócio.

## N27 - keep-your-profile-updated / consequence

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/keep-your-profile-updated/consequence/narration-v001.mp3 (substitui o .wav atual)

> Um perfil desatualizado pode fazer o cliente confiar menos, mesmo que o negócio em si esteja ótimo.

## N28 - keep-your-profile-updated / action

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/keep-your-profile-updated/action/narration-v001.mp3 (substitui o .wav atual)

> Você já entende por que isso é uma rotina, não uma tarefa única. A próxima missão é fazer uma revisão rápida agora.

## N29 - photos-help-customers-decide / intro

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/photos-help-customers-decide/intro/narration-v001.mp3 (substitui o .wav atual)

> Fotos são, muitas vezes, a primeira coisa que uma pessoa olha — antes mesmo de ler qualquer texto sobre o negócio.

## N30 - photos-help-customers-decide / what-photos-do

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/photos-help-customers-decide/what-photos-do/narration-v001.mp3 (substitui o .wav atual)

> Fotos e vídeos ajudam o cliente a conhecer o que o negócio oferece, e podem destacar características da empresa. O importante é usar fotos reais — do ambiente, dos produtos, do resultado do seu trabalho. Não é sobre ter fotos bonitas, é sobre mostrar a verdade.

## N31 - photos-help-customers-decide / trust

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/photos-help-customers-decide/trust/narration-v001.mp3 (substitui o .wav atual)

> Isso tem efeito direto na confiança: um cliente que vê fotos reais e recentes se sente mais seguro do que quando não vê nenhuma foto, ou vê fotos antigas e genéricas.

## N32 - photos-help-customers-decide / action

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/photos-help-customers-decide/action/narration-v001.mp3 (substitui o .wav atual)

> Agora é sua vez: dê uma olhada nas fotos do seu perfil e veja se elas ainda representam o seu negócio hoje.

## N33 - profile-represents-your-business / intro

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/profile-represents-your-business/intro/narration-v001.mp3 (substitui o .wav atual)

> O Perfil da Empresa no Google costuma ser o primeiro contato de alguém com o seu negócio — muitas vezes antes mesmo de visitar ou ligar.

## N34 - profile-represents-your-business / first-impression

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/profile-represents-your-business/first-impression/narration-v001.mp3 (substitui o .wav atual)

> Nome, fotos e descrição ajudam a formar essa primeira impressão. Um perfil desatualizado pode passar a impressão errada, mesmo quando o negócio real é ótimo. O perfil não substitui o negócio — ele representa o negócio para quem ainda não o conhece.

## N35 - profile-represents-your-business / control

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/profile-represents-your-business/control/narration-v001.mp3 (substitui o .wav atual)

> A boa notícia é que isso está sob o seu controle: você pode revisar e ajustar as informações do perfil sempre que quiser, para que ele reflita melhor o negócio de verdade.

## N36 - profile-represents-your-business / action

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/profile-represents-your-business/action/narration-v001.mp3 (substitui o .wav atual)

> Você já entende o papel do perfil. Agora, a próxima missão é dar uma olhada geral nele.

## N37 - review-request-message / intro

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/review-request-message/intro/narration-v001.mp3 (substitui o .wav atual)

> Pedir uma avaliação é normal, e ajuda o seu negócio a ser conhecido. Mas a forma como você pede também importa.

## N38 - review-request-message / right-way

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/review-request-message/right-way/narration-v001.mp3 (substitui o .wav atual)

> Um pedido genuíno é educado e sincero: você convida a pessoa a compartilhar a opinião real dela, sem tentar controlar o resultado. Por isso, nunca peça uma nota específica, nem ofereça desconto, brinde ou qualquer troca por uma avaliação.

## N39 - review-request-message / timing

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/review-request-message/timing/narration-v001.mp3 (substitui o .wav atual)

> O melhor momento para pedir é logo depois de uma experiência positiva real, quando a lembrança ainda está fresca para o cliente.

## N40 - review-request-message / action

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/review-request-message/action/narration-v001.mp3 (substitui o .wav atual)

> Você já sabe como pedir avaliações de forma genuína. A próxima missão é preparar a sua própria mensagem de solicitação.

## N41 - reviews-importance / intro

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/reviews-importance/cena-01.mp3 (substitui o .wav atual)

> Antes de escolher uma empresa, muitas pessoas pesquisam no Google. Nesse momento, as avaliações mostram como foi a experiência de outros clientes. E ajudam quem está pesquisando a conhecer melhor o seu negócio.

## N42 - reviews-importance / trust

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/reviews-importance/trust/narration-v001.mp3 (substitui o .wav atual)

> Avaliações também ajudam a gerar confiança: experiências reais compartilhadas por clientes podem ajudar outras pessoas a se sentirem mais seguras ao conhecer o seu negócio.

## N43 - reviews-importance / timing

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/reviews-importance/timing/narration-v001.mp3 (substitui o .wav atual)

> O melhor momento para pedir uma avaliação é depois de um atendimento ou experiência real — você pode convidar o cliente a compartilhar espontaneamente a opinião dele. E o importante é pedir uma opinião sincera, nunca uma nota específica.

## N44 - reviews-importance / action

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/reviews-importance/action/narration-v001.mp3 (substitui o .wav atual)

> Você já sabe por que avaliações autênticas são importantes. O próximo passo é colocar isso em prática.

## N45 - why-appear-in-local-search / intro

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/why-appear-in-local-search/intro/narration-v001.mp3 (substitui o .wav atual)

> Quando alguém precisa de algo perto de casa ou do trabalho, a primeira coisa que costuma fazer é pesquisar no Google. Essa busca já representa uma necessidade concreta, acontecendo naquele exato momento.

## N46 - why-appear-in-local-search / first-step

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/why-appear-in-local-search/first-step/narration-v001.mp3 (substitui o .wav atual)

> Essa pessoa não está só curiosa: ela já está tentando resolver algo agora. E aparecer nessas buscas é o primeiro passo — antes de ser escolhido, o negócio precisa ser encontrado.

## N47 - why-appear-in-local-search / where

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/why-appear-in-local-search/where/narration-v001.mp3 (substitui o .wav atual)

> Esses resultados locais aparecem em mais de um lugar: tanto na Pesquisa Google quanto no Google Maps.

## N48 - why-appear-in-local-search / action

Gerar com: prompt universal de voz + o script abaixo.
Salvar como: public/audio/lessons/why-appear-in-local-search/action/narration-v001.mp3 (substitui o .wav atual)

> Você já entende por que aparecer nas buscas locais importa. Agora, a próxima missão é descobrir como o seu negócio aparece hoje.

---

## Aprovação por escuta (checklist, 2026-09-19)

Os 48 arquivos existem e tocam, mas máquina não avalia pronúncia. Ouvir cada cena com o roteiro (blocos N1–N48 acima) ao lado e marcar. Critérios de reprovação: palavra trocada/omitida, corte no início ou fim, pronúncia estranha em nome próprio/número/sigla, ruído ou volume muito diferente das demais. Reprovada → regenerar só aquela cena (mesmo prompt universal + script) e avisar a IA para integrar.

- [ ] Lição 1 `why-appear-in-local-search` (intro, first-step, where, action) — atenção: "Café da Esquina" não é narrado aqui, só conferir fluidez
- [ ] Lição 2 `profile-represents-your-business` (intro, first-impression, control, action)
- [ ] Lição 3 `accurate-business-info` (intro, what-matters, keep-updated, action) — atenção: número de telefone em keep-updated
- [ ] Lição 4 `business-hours-matter` (intro, special-hours, consequence, action) — atenção: "Padaria Central", feriados
- [ ] Lição 5 `explain-what-you-offer` (intro, clarity, example, action) — atenção: "Salão Belíssima"
- [ ] Lição 6 `photos-help-customers-decide` (intro, what-photos-do, trust, action)
- [ ] Lição 7 `reviews-importance` (intro, trust, timing, action)
- [ ] Lição 8 `review-request-message` (intro, right-way, timing, action)
- [ ] Lição 9 `how-to-respond-to-reviews` (intro, why-respond, example, action) — atenção: nomes "Ana Silva" e "Carlos Mendes"
- [ ] Lição 10 `keep-your-profile-updated` (intro, living-profile, consequence, action)
- [ ] Lição 11 `first-profile-checkup` (intro, what-it-means, purpose, action) — atenção: "Artesanato Dona Cila" (fala-se "Dona Sila"? deve soar "Cila" com C)
- [ ] Lição 12 `choose-your-next-action` (intro, choose, example, action)

Quando as 12 estiverem marcadas (ou com a lista das reprovadas), a IA registra a aprovação no changelog e o áudio sai de "pendente".
