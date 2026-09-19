# Prompts de imagem para as lições (rascunho para geração manual)

Este documento reúne prompts prontos para colar direto no Gemini (API ou Google AI Studio — "Nano Banana") e gerar as ilustrações das 12 lições do currículo do MVP (`docs/13-CURRICULO-MVP.md`). Cada lição tem 4 cenas (`intro`, e mais 3 específicas de cada uma) e cada cena ganha um prompt de imagem próprio — **4 imagens por lição, 48 no total**, das quais 1 já existe e está aprovada (`reviews-importance`, cena 1).

**Isto não é geração automática.** Nenhuma imagem foi gerada e nenhum asset aprovado foi tocado — são só prompts escritos à mão, prontos para alguém rodar manualmente (você, ou a VM Oracle) contra a API Gemini. Cada prompt abaixo é **completo e independente**: pode ser copiado e colado sozinho, sem precisar consultar o resto do documento.

Depois de gerar cada imagem, o fluxo de revisão e publicação continua o mesmo de sempre:

```text
gerar imagem (usando o prompt correspondente)
→ revisar a imagem gerada; ajustar o prompt e regenerar se necessário
→ revisão humana final
→ copiar manualmente para public/images/lessons/<lesson-id>/cena-0N.png
→ editar a lição em src/content/lessons/<lesson-id>.ts, adicionando o campo `illustration` na cena correspondente
```

O `alt` sugerido em cada bloco é só um ponto de partida — ajuste se a imagem final ficar diferente do prompt.

## Observação sobre `reviews-importance`

A cena 1 dessa lição já tem imagem aprovada (`cena-01.png`) e **não deve ser regenerada ou substituída** — ver `docs/09-PADRAO-DE-LICOES.md`, "Assets e produção audiovisual". Ela usa um ícone azul (busca) que foge um pouco da paleta de `docs/06-DESIGN-SYSTEM.md` (que evita azul/cinza corporativo); os prompts novos abaixo restringem a paleta só às cores aprovadas, para ficar mais alinhado ao design system a partir daqui — isso não é uma proposta de alterar a cena 1 aprovada, só uma observação para quando o padrão visual definitivo for fechado. Por isso, para essa lição, este documento só traz prompts para as cenas 2, 3 e 4.

---

# 1. `why-appear-in-local-search` — "Por que aparecer nas buscas locais importa"

## Cena 1 — `intro` ("Uma busca já é uma necessidade concreta")

- Destino: `public/images/lessons/why-appear-in-local-search/cena-01.png`
- `alt` sugerido: "Pessoa pesquisando no celular por um negócio perto de casa, com vários resultados locais no mapa."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF (bege claro quase branco)
- traços e texto principal: #2A2420 (marrom bem escuro, quase preto)
- destaque âmbar/dourado (estrela, avaliação, conquista): #E3A23C
- destaque verde (ação, confirmação, crescimento): #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), roupa casual de trabalho, expressão calorosa e humana (não corporativa, não genérica de stock photo). Cartões/balões de texto com cantos arredondados, tipografia arredondada e amigável, texto em português correto e completo. Composição limpa, sem poluição visual, adequada para ilustrar uma cena de microlição de 1 minuto.

Cena: uma pessoa está em casa ou na rua, segurando o celular, digitando uma busca no Google como "padaria perto de mim". Na tela do celular aparece um mapa estilizado com 3 ou 4 pinos de localização representando negócios próximos, e uma pequena lista de resultados abaixo. Ao lado, um balão de texto com cantos arredondados traz a frase: "Antes de ser escolhido, o negócio precisa ser encontrado." Expressão da pessoa: focada, resolvendo uma necessidade real. Tom geral: essa busca já é o primeiro passo de uma decisão de compra.
```

## Cena 2 — `first-step` ("O primeiro passo antes de ser escolhido")

- Destino: `public/images/lessons/why-appear-in-local-search/cena-02.png`
- `alt` sugerido: "Caminho em dois degraus mostrando primeiro 'ser encontrado' e depois 'ser escolhido'."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF (bege claro quase branco)
- traços e texto principal: #2A2420 (marrom bem escuro, quase preto)
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia arredondada e amigável, texto em português correto e completo. Composição limpa, sem poluição visual.

Cena: um caminho simples em dois degraus, como uma escadinha curta. No primeiro degrau (mais baixo), um ícone de pino de mapa com a legenda "Ser encontrado". No segundo degrau (mais alto), um ícone de uma mão apontando/escolhendo entre opções, com a legenda "Ser escolhido". Uma pequena seta ligando os dois degraus reforça a ordem. Um cartão com cantos arredondados traz a frase: "Antes de ser escolhido, o negócio precisa ser encontrado." Tom geral: sequência lógica simples, sem pressa.
```

## Cena 3 — `where` ("Onde essas buscas aparecem")

- Destino: `public/images/lessons/why-appear-in-local-search/cena-03.png`
- `alt` sugerido: "Celular dividido mostrando um resultado na Pesquisa Google de um lado e o mesmo negócio no Google Maps do outro."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF (bege claro quase branco)
- traços e texto principal: #2A2420 (marrom bem escuro, quase preto)
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia arredondada e amigável, texto em português correto e completo. Composição limpa, sem poluição visual.

Cena: um celular ao centro, com a tela dividida ao meio por uma linha sutil. Do lado esquerdo, uma lista de resultados de busca do Google com o nome de um pequeno negócio em destaque. Do lado direito, a mesma tela mostrando um mapa estilizado com um único pino grande destacado, representando o Google Maps. Acima das duas metades, pequenos rótulos: "Pesquisa Google" e "Google Maps". Tom geral: mostrar que é o mesmo negócio aparecendo nos dois lugares.
```

## Cena 4 — `action` ("Agora é sua vez")

- Destino: `public/images/lessons/why-appear-in-local-search/cena-04.png`
- `alt` sugerido: "Empresário com lupa olhando para o próprio perfil no celular, curioso para descobrir como o negócio aparece hoje."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF (bege claro quase branco)
- traços e texto principal: #2A2420 (marrom bem escuro, quase preto)
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), roupa casual de trabalho, expressão calorosa e curiosa. Cartões com cantos arredondados, tipografia arredondada e amigável, texto em português correto e completo.

Cena: o empresário segura uma lupa estilizada (redonda, cantos suaves) sobre o próprio celular, que mostra o Perfil da Empresa dele mesmo no Google. Expressão de curiosidade motivada, como quem está prestes a descobrir algo sobre o próprio negócio. Um botão verde (#4E9E6E) com cantos arredondados escrito "Ver meu perfil" aparece em destaque na tela do celular. Tom geral: convite a agir agora, sem pressão.
```

---

# 2. `profile-represents-your-business` — "Seu perfil representa seu negócio"

## Cena 1 — `intro` ("O primeiro contato, antes da visita")

- Destino: `public/images/lessons/profile-represents-your-business/cena-01.png`
- `alt` sugerido: "Celular mostrando o perfil de um negócio no Google ao lado da fachada real da loja."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia arredondada e amigável, texto em português correto e completo. Composição limpa.

Cena: composição dividida. De um lado, a fachada real e calorosa de um pequeno negócio (loja, café ou salão). Do outro lado, um celular mostrando o Perfil da Empresa desse mesmo negócio no Google — nome, foto de capa e descrição curta. Uma pessoa (cliente em potencial) olha para o celular, ainda sem ter visitado o local pessoalmente. Um cartão com cantos arredondados traz a frase: "O perfil representa o negócio para quem ainda não o conhece." Tom geral: o perfil é a primeira impressão, antes da visita real.
```

## Cena 2 — `first-impression` ("Cada informação forma uma impressão")

- Destino: `public/images/lessons/profile-represents-your-business/cena-02.png`
- `alt` sugerido: "Dois retratos lado a lado do mesmo negócio: um perfil desatualizado e triste, outro atualizado e caloroso."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia arredondada e amigável, texto em português correto e completo. Composição limpa.

Cena: dois pequenos "retratos" (como duas molduras arredondadas lado a lado) do mesmo negócio fictício. À esquerda, um perfil desatualizado — foto antiga meio apagada, descrição incompleta, aparência sem cuidado. À direita, o mesmo negócio representado com um perfil cuidado — foto nítida e atual, descrição completa. Entre as duas molduras, uma pequena seta ou sinal de igual riscado, sugerindo que é o MESMO negócio real por trás dos dois perfis. Um cartão com cantos arredondados traz a frase: "O perfil representa o negócio real para quem ainda não o conhece." Tom geral: contraste claro entre as duas impressões possíveis.
```

## Cena 3 — `control` ("Isso está sob o seu controle")

- Destino: `public/images/lessons/profile-represents-your-business/cena-03.png`
- `alt` sugerido: "Empresário ajustando com confiança as informações do próprio perfil no celular."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), roupa casual de trabalho, expressão confiante. Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário segura o celular e toca com o dedo num ícone de edição (lápis, estilo arredondado) ao lado de um campo do perfil, como quem ajusta algo que está sob seu controle. Pequenos ícones ao redor (foto, nome, descrição) sugerem que tudo pode ser revisado quando ele quiser. Expressão tranquila e no comando da situação. Um cartão com cantos arredondados traz a frase: "Você pode revisar e ajustar seu perfil sempre que quiser." Tom geral: autonomia, sem burocracia.
```

## Cena 4 — `action` ("Agora é sua vez")

- Destino: `public/images/lessons/profile-represents-your-business/cena-04.png`
- `alt` sugerido: "Empresário abrindo pela primeira vez o próprio perfil para dar uma olhada geral."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), roupa casual de trabalho, expressão curiosa e aberta. Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário está sentado, abrindo o próprio Perfil da Empresa no celular pela primeira vez com atenção, como quem vai dar uma olhada geral. A tela mostra o perfil completo visível ao fundo (silhueta simplificada de nome, foto e informações). Expressão de curiosidade tranquila, sem ansiedade. Um botão verde (#4E9E6E) com cantos arredondados escrito "Ver meu perfil" em destaque. Tom geral: primeiro passo simples e acessível.
```

---

# 3. `accurate-business-info` — "Informações corretas ajudam o cliente a entender o negócio"

## Cena 1 — `intro` ("O Google precisa entender seu negócio")

- Destino: `public/images/lessons/accurate-business-info/cena-01.png`
- `alt` sugerido: "Empresário revisando no celular os campos de nome, endereço, telefone e horário do perfil do negócio."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), roupa casual de trabalho, expressão atenta. Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: um pequeno empresário, sentado ao balcão do próprio negócio, revisa no celular os campos do Perfil da Empresa: nome, endereço, telefone, categoria e horário de funcionamento, cada um com um ícone pequeno e um sinal de check verde (#4E9E6E) ao lado, indicando que estão corretos. Um cartão com cantos arredondados traz a frase: "Informações completas ajudam o Google a entender seu negócio." Tom geral: cuidado e atenção aos detalhes, sem parecer burocrático.
```

## Cena 2 — `what-matters` ("O que faz diferença")

- Destino: `public/images/lessons/accurate-business-info/cena-02.png`
- `alt` sugerido: "Cinco ícones de informações do perfil conectados a um símbolo de entendimento, com aviso de que isso não garante posição."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo. Composição limpa, sem poluição visual.

Cena: cinco pequenos ícones em círculo, representando nome (etiqueta), endereço (pino), telefone (fone), categoria (etiqueta com estrela pequena) e horário (relógio), cada um ligado por uma linha fina a um símbolo central amigável (uma lupa ou bússola estilizada, sem parecer logotipo de marca) representando "o Google entendendo o negócio". Um pequeno cartão secundário, com texto discreto em #8C8478, traz a frase: "Isso não garante uma posição específica nos resultados." Um cartão principal com cantos arredondados traz: "Informações completas ajudam o Google a entender seu negócio." Tom geral: clareza, sem prometer ranking.
```

## Cena 3 — `keep-updated` ("O trabalho não termina na primeira configuração")

- Destino: `public/images/lessons/accurate-business-info/cena-03.png`
- `alt` sugerido: "Empresário atualizando o telefone no perfil logo depois de uma mudança real no negócio."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), roupa casual de trabalho. Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: dois momentos numa única composição, ligados por uma seta curva. No primeiro momento, o empresário troca o número de telefone anotado numa agenda de papel do negócio (mudança real). No segundo momento, o mesmo empresário atualiza o mesmo dado no celular, no Perfil da Empresa, com o dedo tocando o campo de telefone. Um cartão com cantos arredondados traz a frase: "Sempre que algo mudar, atualize o quanto antes." Tom geral: rotina simples de acompanhar mudanças reais.
```

## Cena 4 — `action` ("Agora é sua vez")

- Destino: `public/images/lessons/accurate-business-info/cena-04.png`
- `alt` sugerido: "Empresário conferindo especificamente o telefone ou horário no próprio perfil."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), expressão atenta e focada. Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário olha de perto para o celular, com o dedo tocando especificamente o campo de telefone ou horário de funcionamento no Perfil da Empresa, prestes a confirmar que está correto. Um pequeno selo verde (#4E9E6E) de "conferido" aparece ao lado do campo. Tom geral: ação simples e rápida, sem complicação.
```

---

# 4. `business-hours-matter` — "Horários também fazem parte da experiência"

## Cena 1 — `intro` ("Uma porta fechada é uma má primeira experiência")

- Destino: `public/images/lessons/business-hours-matter/cena-01.png`
- `alt` sugerido: "Cliente em frente a uma loja fechada, enquanto o celular mostra o perfil informando que o negócio está aberto."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: um cliente chega a pé em frente a uma pequena loja e encontra a porta fechada, com uma plaquinha pendurada escrito "Fechado". Ao lado, em destaque, o celular do cliente mostra o Perfil da Empresa no Google dizendo "Aberto agora" — o contraste entre os dois é o ponto central da imagem. Expressão do cliente: confusão e leve frustração, sem exagero. Um cartão com cantos arredondados traz a frase: "Um horário errado pode virar uma porta fechada." Tom geral: consequência real e simples de um dado desatualizado.
```

## Cena 2 — `special-hours` ("Situações especiais também contam")

- Destino: `public/images/lessons/business-hours-matter/cena-02.png`
- `alt` sugerido: "Calendário com um feriado marcado e um banner de horário especial sendo adicionado ao perfil."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: um calendário de parede estilizado com um dia marcado com um pequeno ícone de feriado (por exemplo, uma bandeirinha ou estrela âmbar). Ao lado, um celular mostra uma tela simples do Perfil da Empresa com um banner sendo adicionado, escrito "Horário especial: Fechado no feriado". Um dedo toca o botão de salvar, verde (#4E9E6E). Um cartão com cantos arredondados traz a frase: "Horários especiais também podem e devem ser atualizados." Tom geral: cuidado com exceções, não só a rotina comum.
```

## Cena 3 — `consequence` ("O que isso causa na prática")

- Destino: `public/images/lessons/business-hours-matter/cena-03.png`
- `alt` sugerido: "Sequência mostrando o celular indicando aberto num feriado e depois o mesmo cliente encontrando a porta fechada."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: composição em dois quadros ligados por uma seta. Quadro 1: um cliente olha o celular, que mostra "Aberto" num dia de feriado (pequeno ícone de feriado visível no canto). Quadro 2: o mesmo cliente, agora na porta da loja, encontra uma placa "Fechado", com expressão de decepção e confiança abalada — mesmo sem culpa do negócio. Um cartão com cantos arredondados traz a frase: "Isso pode fazer o cliente perder confiança, mesmo sem culpa do negócio." Tom geral: mostrar a consequência real de forma gentil, não alarmista.
```

## Cena 4 — `action` ("Agora é sua vez")

- Destino: `public/images/lessons/business-hours-matter/cena-04.png`
- `alt` sugerido: "Empresário conferindo no calendário os horários e os próximos feriados no perfil."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), expressão atenta. Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário olha para o celular, revisando o calendário de horários especiais do próprio perfil, com o dedo tocando um dia futuro marcado como feriado. Um pequeno check verde (#4E9E6E) confirma que o horário está correto. Tom geral: ação prática e rápida, revisão tranquila.
```

---

# 5. `explain-what-you-offer` — "Faça o cliente entender o que você oferece"

## Cena 1 — `intro` ("O cliente quer entender rápido")

- Destino: `public/images/lessons/explain-what-you-offer/cena-01.png`
- `alt` sugerido: "Cliente lendo no celular uma lista clara dos serviços oferecidos por um pequeno negócio."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: um cliente olha para o celular, lendo uma lista curta e clara de serviços num salão de beleza (por exemplo: "Corte de cabelo", "Barba", "Sobrancelha"), no Perfil da Empresa. Acima da lista, um pequeno ícone de balão de pensamento com uma interrogação sendo substituída por um sinal de check verde (#4E9E6E), indicando que a dúvida foi resolvida rapidamente. Um cartão com cantos arredondados traz a frase: "Clareza ajuda o cliente a decidir." Tom geral: entendimento rápido e sem fricção.
```

## Cena 2 — `clarity` ("Clareza evita mal-entendido")

- Destino: `public/images/lessons/explain-what-you-offer/cena-02.png`
- `alt` sugerido: "Pergunta do cliente sendo respondida diretamente por uma lista clara de serviços no perfil, sem precisar perguntar antes."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: um balão de pergunta de um cliente ("Vocês fazem manutenção de ar-condicionado?") aponta para uma lista de serviços clara no Perfil da Empresa, que já contém a resposta visível. Um pequeno ícone de check verde (#4E9E6E) aparece ao lado, como se a pergunta já estivesse respondida antes mesmo de ser feita por mensagem. Um cartão com cantos arredondados traz a frase: "Coloque porque o cliente precisa, não porque o Google gosta." Tom geral: economia de tempo e clareza direta.
```

## Cena 3 — `example` ("O que muda na prática")

- Destino: `public/images/lessons/explain-what-you-offer/cena-03.png`
- `alt` sugerido: "Empresário organizando cartões de serviços em ordem clara, cliente satisfeito ao lado."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a). Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário organiza pequenos cartões retangulares com nomes de serviços numa ordem clara sobre uma prancheta ou tela, como quem monta uma lista organizada. Ao lado, um cliente sorri satisfeito, com um pequeno relógio estilizado mostrando "tempo economizado" perto dele. Um cartão com cantos arredondados traz a frase: "Uma lista clara economiza tempo e evita expectativa errada." Tom geral: organização simples trazendo benefício direto.
```

## Cena 4 — `action` ("Agora é sua vez")

- Destino: `public/images/lessons/explain-what-you-offer/cena-04.png`
- `alt` sugerido: "Empresário editando a lista de serviços no próprio perfil."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), expressão atenta. Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário está editando a lista de serviços do próprio perfil no celular, adicionando um novo item com o dedo, ícone de "+" verde (#4E9E6E) visível. Tom geral: ação simples, revisão do que já existe.
```

---

# 6. `photos-help-customers-decide` — "Fotos ajudam o cliente a decidir"

## Cena 1 — `intro` ("A primeira coisa que se olha")

- Destino: `public/images/lessons/photos-help-customers-decide/cena-01.png`
- `alt` sugerido: "Cliente passando o dedo por fotos reais de um negócio no perfil, antes de ler qualquer texto."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: um celular em primeiro plano mostrando uma galeria de fotos reais e calorosas de um pequeno negócio — a fachada, um produto ou prato, o ambiente interno — organizadas lado a lado como num carrossel do Perfil da Empresa. Um dedo está no gesto de deslizar (swipe) para ver a próxima foto. Nenhum texto de descrição aparece ainda. Um cartão com cantos arredondados traz a frase: "Fotos reais ajudam o cliente a decidir." Tom geral: as fotos mostram a verdade do negócio.
```

## Cena 2 — `what-photos-do` ("O que as fotos mostram de verdade")

- Destino: `public/images/lessons/photos-help-customers-decide/cena-02.png`
- `alt` sugerido: "Três fotos reais lado a lado: ambiente, produto e resultado do trabalho de um negócio."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: três pequenas fotos emolduradas lado a lado, cada uma com uma legenda curta abaixo: "Ambiente" (mostrando o interior calmo de um pequeno negócio), "Produto" (mostrando um item real à venda) e "Resultado" (mostrando um trabalho já concluído, como um corte de cabelo pronto ou um prato servido). Um cartão com cantos arredondados traz a frase: "Use fotos reais — não é sobre bonito, é sobre mostrar a verdade." Tom geral: autenticidade, não produção de estúdio.
```

## Cena 3 — `trust` ("O efeito na confiança")

- Destino: `public/images/lessons/photos-help-customers-decide/cena-03.png`
- `alt` sugerido: "Comparação entre um perfil sem fotos e um perfil com fotos reais recentes, mostrando a diferença na confiança do cliente."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: comparação lado a lado. À esquerda, um perfil com um ícone cinza genérico no lugar de foto, e um cliente pequeno com expressão de dúvida/incerteza olhando para ele. À direita, o mesmo tipo de perfil mas com fotos reais e nítidas visíveis, e um cliente com expressão confiante e tranquila. Um cartão com cantos arredondados traz a frase: "Fotos reais e recentes passam mais segurança." Tom geral: contraste simples e direto.
```

## Cena 4 — `action` ("Agora é sua vez")

- Destino: `public/images/lessons/photos-help-customers-decide/cena-04.png`
- `alt` sugerido: "Empresário comparando uma foto antiga com uma foto nova antes de decidir atualizar o perfil."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a). Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário segura o celular, comparando uma foto antiga e desbotada guardada na galeria com uma foto nova que acabou de tirar do próprio negócio, decidindo qual usar no perfil. Um pequeno ícone verde (#4E9E6E) de "atualizar" aparece perto da foto nova. Tom geral: revisão simples e prática.
```

---

# 7. `reviews-importance` — "Por que as avaliações importam?"

**A cena 1 já está aprovada e implementada (`public/images/lessons/reviews-importance/cena-01.png`) — não regenerar.** Os prompts abaixo cobrem só as cenas 2, 3 e 4, que ainda estão só em texto.

## Cena 2 — `trust` ("Avaliações ajudam a gerar confiança")

- Destino: `public/images/lessons/reviews-importance/cena-02.png`
- `alt` sugerido: "Várias pessoas pequenas ao redor de um símbolo de confiança formado por avaliações com estrelas."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: várias pessoas pequenas e estilizadas (clientes diferentes) ao redor de um símbolo central acolhedor — um coração simples ou um aperto de mão — formado a partir de pequenos balões de avaliação com estrelas âmbar (#E3A23C). Um cartão com cantos arredondados traz a frase: "Experiências reais ajudam outras pessoas a se sentirem mais seguras." Tom geral: comunidade e confiança genuína, não números de ranking.
```

## Cena 3 — `timing` ("Quando pedir uma avaliação?")

- Destino: `public/images/lessons/reviews-importance/cena-03.png`
- `alt` sugerido: "Empresário se despedindo com um aperto de mão de um cliente satisfeito, convidando-o gentilmente a deixar uma avaliação sincera."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagens: pequeno empresário ou empresária brasileiro(a) e um cliente, ambos com expressão satisfeita. Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário se despede de um cliente com um aperto de mão caloroso, logo depois de um bom atendimento. Um balão de fala simples do empresário traz um convite gentil, sem qualquer menção a nota ou estrelas específicas — algo como "Se puder, compartilhe sua opinião sincera 🙂". Um cartão com cantos arredondados reforça: "Peça uma opinião sincera. Não peça uma nota específica." Tom geral: gentileza genuína, sem pressão nem controle do resultado.
```

## Cena 4 — `action` ("Agora é sua vez")

- Destino: `public/images/lessons/reviews-importance/cena-04.png`
- `alt` sugerido: "Empresário confiante se preparando para colocar em prática o que aprendeu sobre avaliações."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), expressão confiante e motivada. Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário está em pé, no próprio negócio, com uma postura pronta e confiante, celular na mão, como quem está prestes a colocar em prática o que aprendeu. Um pequeno ícone de estrela âmbar (#E3A23C) brilha suavemente perto dele, sem formar um número ou nota. Tom geral: prontidão tranquila, próximo passo natural.
```

---

# 8. `review-request-message` — "Como fazer um pedido de avaliação genuíno"

## Cena 1 — `intro` ("Pedir do jeito certo faz diferença")

- Destino: `public/images/lessons/review-request-message/cena-01.png`
- `alt` sugerido: "Empresário enviando uma mensagem educada pedindo avaliação a um cliente, logo após um bom atendimento."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), expressão simpática e tranquila. Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário envia pelo celular uma mensagem de texto (estilo balão de conversa) para um cliente, logo depois de um atendimento. O balão de mensagem enviada mostra um texto curto e educado, algo como: "Foi um prazer atender você hoje! Se puder, deixe sua opinião sincera no Google 🙂" — sem qualquer menção a nota, desconto ou troca. Um cartão com cantos arredondados reforça: "Pedir com respeito faz diferença." Tom geral: gentileza genuína, sem pressão.
```

## Cena 2 — `right-way` ("O que é um pedido genuíno")

- Destino: `public/images/lessons/review-request-message/cena-02.png`
- `alt` sugerido: "Comparação entre uma mensagem correta e educada e uma mensagem errada oferecendo troca por avaliação."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: dois balões de mensagem lado a lado. À esquerda, um balão verde (#4E9E6E) com um pequeno check, mostrando um pedido correto e sincero de avaliação. À direita, um balão riscado com um X sutil em cima, mostrando um exemplo do que NÃO fazer: algo como "Deixe 5 estrelas e ganhe 10% de desconto!" com uma linha diagonal de "proibido" sobre o texto. Um cartão com cantos arredondados traz a frase: "Nunca peça uma nota específica nem ofereça troca." Tom geral: contraste claro e didático, sem tom de repreensão.
```

## Cena 3 — `timing` ("O momento certo")

- Destino: `public/images/lessons/review-request-message/cena-03.png`
- `alt` sugerido: "Linha do tempo mostrando o pedido de avaliação sendo feito logo após uma experiência positiva."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: uma linha do tempo simples e curta, com dois pontos. No primeiro ponto, um cliente saindo satisfeito de um atendimento (sorriso, postura leve). No segundo ponto, logo em seguida na mesma linha, o pedido de avaliação sendo enviado. Um pequeno relógio estilizado ao lado reforça "agora, enquanto está fresco na memória". Um cartão com cantos arredondados traz a frase: "O melhor momento é logo depois de uma experiência positiva real." Tom geral: naturalidade, sem atraso nem demora.
```

## Cena 4 — `action` ("Agora é sua vez")

- Destino: `public/images/lessons/review-request-message/cena-04.png`
- `alt` sugerido: "Empresário escrevendo sua própria mensagem de pedido de avaliação no celular."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), expressão concentrada e tranquila. Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário digita no celular sua própria mensagem de pedido de avaliação, com um balão de rascunho sendo composto, cursor piscando no fim do texto. Tom geral: ação pessoal, mensagem sendo criada com cuidado.
```

---

# 9. `how-to-respond-to-reviews` — "Como responder avaliações"

## Cena 1 — `intro` ("Responder também faz parte")

- Destino: `public/images/lessons/how-to-respond-to-reviews/cena-01.png`
- `alt` sugerido: "Empresário digitando uma resposta cuidadosa a uma avaliação de cliente no celular."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), expressão atenta e cuidadosa. Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário está sentado com o celular nas mãos, digitando uma resposta a uma avaliação. Na tela, dois cartões pequenos de avaliação ficam visíveis: um com 5 estrelas amareladas (#E3A23C) e um comentário positivo curto, outro com menos estrelas e um comentário construtivo — e abaixo de cada um, o começo de uma resposta educada sendo digitada. Um cartão com cantos arredondados traz a frase: "Responder também faz parte de cuidar da reputação." Tom geral: profissionalismo tranquilo.
```

## Cena 2 — `why-respond` ("Por que vale a pena responder")

- Destino: `public/images/lessons/how-to-respond-to-reviews/cena-02.png`
- `alt` sugerido: "Duas respostas lado a lado: uma calorosa de agradecimento e outra respeitosa reconhecendo um problema."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: dois balões de resposta lado a lado, ambos com tom gentil e nenhum hostil. À esquerda, um balão verde (#4E9E6E) de agradecimento caloroso a uma avaliação positiva. À direita, um balão em tom neutro/âmbar suave, respeitoso, reconhecendo um problema apontado numa avaliação, sem defensividade. Um cartão com cantos arredondados traz a frase: "Responder bem agradece — e mostra que você se importa, sem hostilidade." Tom geral: equilíbrio e respeito nos dois casos.
```

## Cena 3 — `example` ("Positiva x negativa")

- Destino: `public/images/lessons/how-to-respond-to-reviews/cena-03.png`
- `alt` sugerido: "Dois cartões de avaliação completos, um positivo com resposta específica e outro negativo com resposta empática."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: dois cartões de avaliação completos lado a lado. Cartão verde (#4E9E6E), avaliação positiva com estrelas âmbar, e abaixo uma resposta curta e específica de agradecimento. Cartão em tom neutro com borda suave, avaliação negativa, e abaixo uma resposta empática reconhecendo o problema e mostrando disposição para resolver — sem se justificar ou discutir. Um cartão com cantos arredondados traz a frase: "Reconhecer o problema vale mais do que se justificar." Tom geral: exemplo prático e sereno.
```

## Cena 4 — `action` ("Agora é sua vez")

- Destino: `public/images/lessons/how-to-respond-to-reviews/cena-04.png`
- `alt` sugerido: "Empresário prestes a enviar uma resposta real a uma avaliação, com expressão confiante."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), expressão confiante e tranquila. Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário tem o dedo prestes a tocar o botão verde (#4E9E6E) de "Enviar resposta" no celular, depois de escrever uma resposta real a uma avaliação. Tom geral: ação concreta, sem hesitação, tranquilidade.
```

---

# 10. `keep-your-profile-updated` — "Seu perfil precisa continuar atualizado"

## Cena 1 — `intro` ("Configurar não é o fim")

- Destino: `public/images/lessons/keep-your-profile-updated/cena-01.png`
- `alt` sugerido: "Empresário atualizando o perfil do negócio no celular, com um calendário ao fundo sugerindo rotina."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a). Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: um pequeno empresário mexe no celular, editando informações do Perfil da Empresa (um ícone de "editar"/lápis visível perto de um campo de texto). Ao fundo, sutilmente, um calendário de parede com algumas datas marcadas sugere que essa é uma rotina, não uma tarefa única. Um cartão com cantos arredondados traz a frase: "O perfil é uma representação viva do negócio." Tom geral: manutenção tranquila e contínua.
```

## Cena 2 — `living-profile` ("Um retrato vivo do negócio")

- Destino: `public/images/lessons/keep-your-profile-updated/cena-02.png`
- `alt` sugerido: "Ícones de horário, serviço e endereço girando organicamente ao redor de um perfil, sugerindo que ele está sempre vivo."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: um ícone central e amigável representando o perfil do negócio (como um pequeno cartão com nome e foto), ao redor do qual giram suavemente três pequenos ícones — relógio (horário), etiqueta de serviço, e pino de endereço — como se estivessem sempre em movimento leve, orgânico e caloroso (não mecânico ou frio). Um cartão com cantos arredondados traz a frase: "O perfil não é uma configuração única; é uma representação viva do negócio." Tom geral: vida e continuidade.
```

## Cena 3 — `consequence` ("O que um perfil parado transmite")

- Destino: `public/images/lessons/keep-your-profile-updated/cena-03.png`
- `alt` sugerido: "Negócio real vibrante ao fundo, mas o celular mostra um perfil desatualizado, deixando o cliente em dúvida."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: ao fundo, um pequeno negócio real, vibrante e bem cuidado. Em primeiro plano, um celular mostra o perfil desse mesmo negócio, mas visivelmente parado no tempo — um ícone de relógio com teia de aranha sutil e discreta perto da última atualização. Um cliente pequeno olha para o celular com expressão de dúvida. Um cartão com cantos arredondados traz a frase: "Um perfil parado pode fazer o cliente confiar menos, mesmo com o negócio ótimo." Tom geral: contraste gentil entre a realidade e o perfil desatualizado, sem tom alarmista.
```

## Cena 4 — `action` ("Agora é sua vez")

- Destino: `public/images/lessons/keep-your-profile-updated/cena-04.png`
- `alt` sugerido: "Empresário prestes a abrir o próprio perfil para uma revisão rápida."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), expressão tranquila e disposta. Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário segura o celular, prestes a abrir o próprio perfil, com um pequeno relógio estilizado ao lado mostrando "poucos minutos", reforçando que é rápido. Tom geral: ação leve, sem peso.
```

---

# 11. `first-profile-checkup` — "Faça seu primeiro check-up completo"

## Cena 1 — `intro` ("Olhando para o todo")

- Destino: `public/images/lessons/first-profile-checkup/cena-01.png`
- `alt` sugerido: "Empresário olhando para um resumo completo do perfil do negócio, reunindo informações, horários, fotos e avaliações."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a). Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: um pequeno empresário observa o celular mostrando uma tela de resumo do Perfil da Empresa, com pequenos blocos ou ícones lado a lado representando diferentes partes já revisadas: informações básicas, horários, fotos, avaliações — cada bloco com um sinal de check verde (#4E9E6E) pequeno. Um cartão com cantos arredondados traz a frase: "Um check-up completo, tudo junto." Tom geral: clareza e organização.
```

## Cena 2 — `what-it-means` ("O que é esse check-up")

- Destino: `public/images/lessons/first-profile-checkup/cena-02.png`
- `alt` sugerido: "Cinco ícones do perfil convergindo para uma prancheta única segurada pelo empresário, como um raio-x completo."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a). Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: cinco pequenos ícones (informações, horário, serviços, fotos, avaliações) convergindo visualmente, por linhas finas, para uma prancheta única que o empresário segura, como um resumo organizado de tudo. Expressão de foco tranquilo. Um cartão com cantos arredondados traz a frase: "Junta tudo o que você já revisou num único olhar." Tom geral: organização, não sobrecarga.
```

## Cena 3 — `purpose` ("O que esse check-up não é")

- Destino: `public/images/lessons/first-profile-checkup/cena-03.png`
- `alt` sugerido: "Símbolo de nota ou ranking riscado, substituído por uma lupa apontando pequenos ajustes concretos."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: de um lado, um ícone de número/nota ou pódio de ranking com um traço discreto de "não é sobre isso" (sem usar um X vermelho agressivo, algo sutil e elegante). Do outro lado, uma lupa amigável apontando para pequenos itens concretos de melhoria (um ícone de foto, um ícone de horário), reforçando o foco certo. Um cartão com cantos arredondados traz a frase: "É sobre identificar o que pode representar melhor o seu negócio real." Tom geral: reorientação gentil de expectativa.
```

## Cena 4 — `action` ("Agora é sua vez")

- Destino: `public/images/lessons/first-profile-checkup/cena-04.png`
- `alt` sugerido: "Empresário circulando com caneta uma pequena lista de itens identificados para melhorar."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), expressão de clareza e foco. Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário segura uma pequena lista com 2 ou 3 itens escritos à mão, circulando um deles com uma caneta, como quem acabou de identificar o que pode melhorar. Tom geral: clareza conquistada, próximo passo natural.
```

---

# 12. `choose-your-next-action` — "Escolha sua próxima ação"

## Cena 1 — `intro` ("O fim do currículo, não da jornada")

- Destino: `public/images/lessons/choose-your-next-action/cena-01.png`
- `alt` sugerido: "Empresário confiante escolhendo qual ação praticar a seguir, com três opções representadas à frente."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), postura confiante e tranquila (não é uma cena de formatura ou comemoração exagerada). Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário está em pé, à frente de três pequenos cartões flutuantes com cantos arredondados representando três ações possíveis (ícones simples: informações, fotos, avaliações), apontando ou escolhendo um deles. Um cartão maior com cantos arredondados traz a frase: "Continue cuidando do seu negócio, uma ação de cada vez." Tom geral: continuidade e autonomia, não conclusão de curso.
```

## Cena 2 — `choose` ("Escolha uma ação concreta")

- Destino: `public/images/lessons/choose-your-next-action/cena-02.png`
- `alt` sugerido: "Empresário apontando decidido para um dos três cartões de melhoria, com um caminho contínuo ao fundo."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), expressão decidida. Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário aponta decidido para um dos três cartões de melhoria à sua frente. Ao fundo, um caminho simples e contínuo se estende (sem linha de chegada), simbolizando uma rotina contínua, não um destino final. Um cartão com cantos arredondados traz a frase: "O objetivo é saber cuidar do negócio no Google, de forma contínua." Tom geral: escolha ativa, sem fim definido.
```

## Cena 3 — `example` ("De onde escolher")

- Destino: `public/images/lessons/choose-your-next-action/cena-03.png`
- `alt` sugerido: "Três cartões de melhoria lado a lado — informações, fotos e avaliações — com um deles destacado em verde."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: três cartões lado a lado, cada um com um ícone simples — informações, fotos, avaliações — representando as três melhorias identificadas. Um deles tem uma borda verde (#4E9E6E) de destaque, como se estivesse selecionado, mas os outros dois seguem igualmente válidos e visíveis. Um cartão com cantos arredondados traz a frase: "Pode ser qualquer uma — o importante é escolher uma e executar." Tom geral: liberdade de escolha, sem hierarquia entre as opções.
```

## Cena 4 — `action` ("Agora é sua vez")

- Destino: `public/images/lessons/choose-your-next-action/cena-04.png`
- `alt` sugerido: "Empresário já em ação, editando no celular a melhoria escolhida agora mesmo."

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários a cuidar do perfil do negócio no Google. Paleta de cores restrita a estes tons (não usar azul nem cinza corporativo, não usar gradientes):
- fundo: #FAF6EF
- traços e texto principal: #2A2420
- destaque âmbar/dourado: #E3A23C
- destaque verde: #4E9E6E
- texto secundário: #8C8478
- linhas e cartões: #E7E1D6
Personagem: pequeno empresário ou empresária brasileiro(a), expressão de "mãos à obra". Cartões com cantos arredondados, tipografia amigável, texto em português correto e completo.

Cena: o empresário já está com o dedo no celular, editando ou confirmando a melhoria escolhida agora mesmo, com um pequeno ícone verde (#4E9E6E) de "em andamento" ou "salvando" visível. Tom geral: ação imediata, sem adiamento.
```

---

# Regeneração das imagens com defeito técnico (lote 2026-09-19)

Lote de regeneração a partir de `docs/16-AUDITORIA-EDITORIAL-LICOES.md` (seções 1.2, 1.3 e vereditos REFAZER). Escopo: só defeito técnico visível (texto ilegível/sem sentido ou código de cor vazado como texto) — nenhuma mudança de composição, roteiro ou legenda além do necessário para remover o defeito.

**Divergência de contagem, registrada de propósito:** a auditoria resume "10 das 48 imagens", mas a recontagem file a file em 2026-09-19 (com conferência visual por amostragem: `first-profile-checkup/cena-01`, `how-to-respond-to-reviews/cena-01`, `business-hours-matter/cena-01` e `explain-what-you-offer/cena-01` — defeitos confirmados) encontra **11 arquivos distintos** com defeito técnico visível: 9 com veredito REFAZER + 2 com vazamento de código de cor classificados como AJUSTAR (`business-hours-matter/cena-01`, com `8C8478` visível na base do mockup do celular; `explain-what-you-offer/cena-01`, com `8C8478` no lugar da contagem de avaliações e `(E3)` após as estrelas). O lote abaixo cobre as 11.

**Causa raiz (por que regerar com prompt diferente, não só "de novo"):** os 48 prompts originais acima descrevem a paleta com códigos hexadecimais literais (`#FAF6EF`, `#2A2420`, `#E3A23C`, `#4E9E6E`, `#8C8478`, `#E7E1D6`) — o modelo de imagem renderizou esses códigos como texto visível dentro da cena. Os prompts deste lote descrevem as mesmas cores **por extenso, sem nenhum código hexadecimal**, e trazem uma lista fechada dos únicos textos em português permitidos em cada imagem.

**Regras válidas para os 11 prompts (já embutidas em cada um, repetidas para cada prompt continuar independente):**

- Cores por extenso: fundo creme quente quase branco; traços e texto principal em marrom bem escuro quase preto; amarelo-dourado para estrelas e destaques; verde-folha para checks e sucesso; bege-claro para cartões. Nunca azul, nunca cinza corporativo, nunca gradientes.
- Renderizar **somente** os textos em português listados em cada prompt, com a grafia exata. Nenhum outro texto, número, código, rótulo de aba, endereço, horário ou placeholder — onde o prompt original pedia um dado qualquer, este lote manda usar barras/campos cinzentos vazios (formas, sem letras).
- Proibido: texto em inglês, palavras inventadas, texto espelhado/de cabeça para baixo, códigos de cor ou qualquer sequência alfanumérica solta.
- Proporção: `1408x768` (paisagem) salvo indicação contrária; `explain-what-you-offer` cenas 1 e 2 são `843x1264` (retrato) — manter a orientação do arquivo atual.

Fluxo após gerar: o mesmo da seção inicial deste documento (revisar em zoom antes de aprovar → revisão humana → copiar para `public/images/lessons/<lesson-id>/cena-0N.jpg`, mesmo nome e pasta, sobrescrevendo o arquivo com defeito → sem mudança no `.ts` da lição, que já referencia esse caminho).

## R1 — `why-appear-in-local-search/cena-03.jpg` (`where`)

- Substitui o arquivo atual (parágrafo em inglês sem sentido + placar de estrelas com texto solto).
- Orientação: paisagem `1408x768`.

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários. Cores: fundo creme quente quase branco; traços e textos em marrom bem escuro quase preto; detalhes em amarelo-dourado; sem azul, sem cinza corporativo, sem gradientes, sem códigos de cor escritos em lugar nenhum. Cartões com cantos arredondados, tipografia arredondada e amigável. Proporção paisagem.

Cena: um celular ao centro com a tela dividida ao meio por uma linha sutil. Lado esquerdo: lista de resultados de busca com o nome "Café da Esquina" em destaque e, abaixo dele, apenas uma fileira de estrelas douradas como formas (sem números, sem texto) e duas barras cinzentas vazias representando linhas de texto. Lado direito: mapa estilizado com um único pino grande destacado, sem nomes de ruas e sem nenhum texto dentro do mapa. Acima das duas metades, os rótulos "Pesquisa Google" e "Google Maps".

Textos permitidos nesta imagem, com grafia exata, e nenhum outro: "Café da Esquina", "Pesquisa Google", "Google Maps". Todo o resto que pareceria texto (linhas da lista, nomes de ruas) deve ser barra ou forma vazia, sem letras. Proibido inglês, palavras inventadas, texto espelhado e códigos alfanuméricos.
```

## R2 — `profile-represents-your-business/cena-03.jpg` (`control`)

- Substitui o arquivo atual (parágrafo sem sentido + "Descripção" com erro de grafia).
- Orientação: paisagem `1408x768`.

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários. Cores: fundo creme quente quase branco; traços e textos em marrom bem escuro quase preto; detalhes em amarelo-dourado e verde-folha; sem azul, sem cinza corporativo, sem gradientes, sem códigos de cor escritos em lugar nenhum. Personagem: pequeno empresário brasileiro, roupa casual de trabalho, expressão confiante. Cartões com cantos arredondados, tipografia amigável. Proporção paisagem.

Cena: o empresário segura o celular e toca com o dedo num ícone de lápis arredondado ao lado de um campo do perfil. Ao redor, três ícones simples sem texto (câmera para foto, silhueta para nome, linhas para descrição). Um cartão com cantos arredondados traz a frase: "Você pode revisar e ajustar seu perfil sempre que quiser."

Textos permitidos nesta imagem, com grafia exata, e nenhum outro: "Você pode revisar e ajustar seu perfil sempre que quiser." Nenhum parágrafo, nenhuma descrição longa, nenhum rótulo nos ícones. Proibido inglês, palavras inventadas e códigos alfanuméricos.
```

## R3 — `accurate-business-info/cena-03.jpg` (`keep-updated`)

- Substitui o arquivo atual (texto "Secondary information labels" em inglês vazado de instrução de design + bloco de texto espelhado).
- Orientação: paisagem `1408x768`.

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários. Cores: fundo creme quente quase branco; traços e textos em marrom bem escuro quase preto; detalhes em amarelo-dourado e verde-folha; sem azul, sem cinza corporativo, sem gradientes, sem códigos de cor escritos em lugar nenhum. Personagem: pequeno empresário brasileiro, roupa casual de trabalho. Cartões com cantos arredondados, tipografia amigável. Proporção paisagem.

Cena: dois momentos ligados por uma seta curva. Primeiro momento: o empresário risca com caneta o telefone antigo numa agenda de papel aberta (a agenda mostra só linhas vazias e um número riscado, sem palavras). Segundo momento: o mesmo empresário toca com o dedo o campo de telefone no celular, que mostra o rótulo "Telefone" e o número "(11) 98765-4321". Um cartão com cantos arredondados traz a frase: "Sempre que algo mudar, atualize o quanto antes."

Textos permitidos nesta imagem, com grafia exata, e nenhum outro: "Telefone", "(11) 98765-4321", "Sempre que algo mudar, atualize o quanto antes." Proibido inglês, texto espelhado, rótulos de instrução de design e códigos alfanuméricos.
```

## R4 — `business-hours-matter/cena-01.jpg` (`intro`)

- Substitui o arquivo atual (código `8C8478` visível na base do mockup do celular; composição aprovada, só remover o vazamento).
- Orientação: paisagem `1408x768`.

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários. Cores: fundo creme quente quase branco; traços e textos em marrom bem escuro quase preto; detalhes em amarelo-dourado e verde-folha; sem azul, sem cinza corporativo, sem gradientes, sem códigos de cor escritos em lugar nenhum. Proporção paisagem.

Cena: um cliente chega a pé em frente a uma pequena loja e encontra a porta fechada, com uma plaquinha pendurada escrito "Fechado". Ao lado, o celular do cliente mostra o Perfil da Empresa: cabeçalho "Perfil da Empresa", nome "Padaria Central", fileira de estrelas douradas como formas (sem números), duas barras cinzentas vazias abaixo das estrelas (sem texto) e um selo em destaque escrito "ABERTO AGORA". Expressão do cliente: confusão leve, sem exagero. Um cartão com cantos arredondados traz a frase: "Um horário errado pode virar uma porta fechada."

Textos permitidos nesta imagem, com grafia exata, e nenhum outro: "Fechado", "Perfil da Empresa", "Padaria Central", "ABERTO AGORA", "Um horário errado pode virar uma porta fechada." Proibido qualquer número, contagem, código ou texto além desses.
```

## R5 — `explain-what-you-offer/cena-01.jpg` (`intro`)

- Substitui o arquivo atual (código `8C8478` no lugar da contagem de avaliações + `(E3)` após as estrelas; composição aprovada).
- Orientação: retrato `843x1264` (manter a orientação do arquivo atual).

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários. Cores: fundo creme quente quase branco; traços e textos em marrom bem escuro quase preto; detalhes em amarelo-dourado e verde-folha; sem azul, sem cinza corporativo, sem gradientes, sem códigos de cor escritos em lugar nenhum. Proporção retrato (vertical).

Cena: um cliente olha para o celular, que mostra o perfil de um salão de beleza: nome "Salão Belíssima", fileira de estrelas douradas como formas (sem números, sem letras após as estrelas), a palavra "Local" sozinha abaixo das estrelas, e a lista "Nossos Serviços" com três itens: "Corte de cabelo", "Barba", "Sobrancelha". Um balão de pensamento pequeno mostra um ponto de interrogação se transformando em um check verde (símbolos, sem letras). Um cartão com cantos arredondados traz a frase: "Clareza ajuda o cliente a decidir."

Textos permitidos nesta imagem, com grafia exata, e nenhum outro: "Salão Belíssima", "Local", "Nossos Serviços", "Corte de cabelo", "Barba", "Sobrancelha", "Clareza ajuda o cliente a decidir." Proibido qualquer código, sigla entre parênteses ou texto além desses.
```

## R6 — `explain-what-you-offer/cena-02.jpg` (`clarity`)

- Substitui o arquivo atual (parágrafo "Comena com manutenção de logal e ar-condicionado." sem sentido).
- Orientação: retrato `843x1264` (manter a orientação do arquivo atual).

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários. Cores: fundo creme quente quase branco; traços e textos em marrom bem escuro quase preto; detalhes em amarelo-dourado e verde-folha; sem azul, sem cinza corporativo, sem gradientes, sem códigos de cor escritos em lugar nenhum. Proporção retrato (vertical).

Cena: um balão de pergunta de um cliente com o texto "Vocês fazem manutenção de ar-condicionado?" aponta para uma lista curta de serviços no Perfil da Empresa contendo exatamente estes itens: "Manutenção de ar-condicionado", "Instalação", "Limpeza de filtro". Um check verde ao lado da lista indica pergunta já respondida. Um cartão com cantos arredondados traz a frase: "Coloque porque o cliente precisa, não porque o Google gosta."

Textos permitidos nesta imagem, com grafia exata, e nenhum outro: "Vocês fazem manutenção de ar-condicionado?", "Manutenção de ar-condicionado", "Instalação", "Limpeza de filtro", "Coloque porque o cliente precisa, não porque o Google gosta." Nenhum parágrafo corrido além dessas frases. Proibido inglês, palavras inventadas e códigos alfanuméricos.
```

## R7 — `photos-help-customers-decide/cena-04.jpg` (`action`)

- Substitui o arquivo atual (três códigos de cor vazados como texto).
- Orientação: paisagem `1408x768`.

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários. Cores: fundo creme quente quase branco; traços em marrom bem escuro quase preto; detalhes em amarelo-dourado e verde-folha; sem azul, sem cinza corporativo, sem gradientes, sem códigos de cor escritos em lugar nenhum. Personagem: pequeno empresário brasileiro. Proporção paisagem.

Cena: o empresário segura o celular comparando duas fotos do próprio negócio lado a lado: à esquerda uma foto antiga desbotada marcada com o rótulo "Antes", à direita uma foto nova nítida marcada com o rótulo "Depois" e um pequeno ícone verde de atualizar ao lado dela.

Textos permitidos nesta imagem, com grafia exata, e nenhum outro: "Antes", "Depois". Nenhum código, número ou texto além desses dois rótulos.
```

## R8 — `how-to-respond-to-reviews/cena-01.jpg` (`intro`)

- Substitui o arquivo atual (um terço da imagem ocupado por texto sem sentido + código `#2A24E0` + "Ana SIlva" com erro de caixa).
- Orientação: paisagem `1408x768`.

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários. Cores: fundo creme quente quase branco; traços e textos em marrom bem escuro quase preto; detalhes em amarelo-dourado e verde-folha; sem azul, sem cinza corporativo, sem gradientes, sem códigos de cor escritos em lugar nenhum. Personagem: pequena empresária brasileira, expressão atenta e cuidadosa, sentada com o celular nas mãos. Proporção paisagem.

Cena: à esquerda, apenas a ilustração da empresária na loja (sem nenhum título ou bloco de texto grande ao lado dela). À direita, dois cartões pequenos de avaliação: o primeiro com 5 estrelas douradas como formas, o nome "Ana Silva", o comentário "Adorei o atendimento!" e abaixo o início de resposta "Obrigada, Ana!"; o segundo com 3 estrelas douradas como formas, o nome "Carlos Mendes", o comentário "Espaço bom, voltarei!" e abaixo o início de resposta "Obrigado, Carlos!". Abaixo dos cartões, um cartão com cantos arredondados traz a frase: "Responder também faz parte de cuidar da reputação."

Textos permitidos nesta imagem, com grafia exata, e nenhum outro: "Ana Silva", "Adorei o atendimento!", "Obrigada, Ana!", "Carlos Mendes", "Espaço bom, voltarei!", "Obrigado, Carlos!", "Responder também faz parte de cuidar da reputação." Proibido inglês, palavras inventadas e códigos alfanuméricos.
```

## R9 — `keep-your-profile-updated/cena-04.jpg` (`action`)

- Substitui o arquivo atual (várias linhas sem sentido + "Artesansto" e "Clla" com erro de grafia).
- Orientação: paisagem `1408x768`.

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários. Cores: fundo creme quente quase branco; traços em marrom bem escuro quase preto; detalhes em amarelo-dourado e verde-folha; sem azul, sem cinza corporativo, sem gradientes, sem códigos de cor escritos em lugar nenhum. Personagem: pequeno empresário brasileiro, expressão tranquila e disposta, segurando o celular prestes a abrir o próprio perfil. Proporção paisagem.

Cena: o empresário segura o celular mostrando apenas ícones de aplicativo como formas (sem palavras na tela). Ao lado, um pequeno relógio estilizado de mostrador liso, com ponteiros e sem numerais, reforçando que a revisão é rápida.

Textos permitidos nesta imagem: nenhum. Não incluir nenhuma letra, palavra, número ou código em lugar nenhum da imagem — apenas formas, ícones e o relógio sem numerais.
```

## R10 — `first-profile-checkup/cena-01.jpg` (`intro`)

- Substitui o arquivo atual (a imagem com mais defeitos do currículo: abas ilegíveis, endereço/horário sem sentido, quatro códigos de cor vazados).
- Orientação: paisagem `1408x768`.

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários. Cores: fundo creme quente quase branco; traços e textos em marrom bem escuro quase preto; detalhes em amarelo-dourado e verde-folha; sem azul, sem cinza corporativo, sem gradientes, sem códigos de cor escritos em lugar nenhum. Personagem: pequeno empresário brasileiro atrás de um balcão de loja de artesanato. Proporção paisagem.

Cena: um celular grande mostra a tela de resumo do Perfil da Empresa com o cabeçalho "Artesanato Dona Cila" e, abaixo, quatro blocos lado a lado, cada um com um ícone simples e um check verde pequeno: "Informações básicas", "Horários", "Fotos", "Avaliações". Abaixo do nome do negócio, apenas uma fileira de estrelas douradas como formas e duas barras cinzentas vazias (sem endereço, sem horário, sem nenhum texto). Um cartão com cantos arredondados traz a frase: "Um check-up completo, tudo junto."

Textos permitidos nesta imagem, com grafia exata, e nenhum outro: "Artesanato Dona Cila", "Resumo do Check-up", "Informações básicas", "Horários", "Fotos", "Avaliações", "Um check-up completo, tudo junto." Nenhuma aba com texto, nenhum endereço, nenhum horário escrito. Proibido inglês, palavras inventadas e códigos alfanuméricos.
```

## R11 — `choose-your-next-action/cena-01.jpg` (`intro`)

- Substitui o arquivo atual (três códigos de cor vazados como texto).
- Orientação: paisagem `1408x768`.

```text
Ilustração vetorial plana (flat illustration), estilo caloroso e acolhedor, para um app brasileiro que ajuda pequenos empresários. Cores: fundo creme quente quase branco; traços e textos em marrom bem escuro quase preto; detalhes em amarelo-dourado e verde-folha; sem azul, sem cinza corporativo, sem gradientes, sem códigos de cor escritos em lugar nenhum. Personagem: pequeno empresário brasileiro, postura confiante e tranquila (cena de continuidade, não de formatura). Proporção paisagem.

Cena: o empresário está em pé diante de três pequenos cartões flutuantes com cantos arredondados, cada um com apenas um ícone simples e sem texto (lápis para informações, câmera para fotos, estrela para avaliações), apontando para um deles. Um cartão maior com cantos arredondados traz a frase: "Continue cuidando do seu negócio, uma ação de cada vez."

Textos permitidos nesta imagem, com grafia exata, e nenhum outro: "Continue cuidando do seu negócio, uma ação de cada vez." Nenhum texto nos três cartões pequenos. Proibido inglês, palavras inventadas e códigos alfanuméricos.
```
