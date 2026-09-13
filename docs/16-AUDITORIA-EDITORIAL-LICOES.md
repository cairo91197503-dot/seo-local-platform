# Auditoria Editorial das 12 Lições

Auditoria solicitada pelo usuário em 2026-09-13, como próximo passo antes de produzir qualquer lição ou imagem nova. Escopo: reler os 12 roteiros de narração na íntegra, visualizar e classificar as 48 imagens (4 por lição), conferir a duração real do áudio contra o campo `duration` exibido, e verificar o alinhamento lição → missão. **Nenhum código ou conteúdo foi alterado nesta auditoria** — é um documento de diagnóstico. Todas as citações de texto abaixo são literais, copiadas dos arquivos em `src/content/lessons/`.

Verificação de origem: os 48 arquivos de imagem em `public/images/lessons/` conferem, byte a byte, com o que está publicado em `origin/main` (GitHub). Os roteiros de narração citados abaixo também conferem com `origin/main`. As durações reais de áudio (seção 3) foram recalculadas a partir do estado atual do GitHub, não do clone local desta sessão (que estava desatualizado em relação a 5 lições no momento desta auditoria).

---

## 1. Achados recorrentes (antes de entrar lição por lição)

Estes padrões aparecem em várias lições e vale corrigi-los como uma classe única de problema, não lição por lição.

### 1.1 A tela da lição hoje só mostra a imagem — nada de texto visível

Conferido em `src/components/learn/SceneView.tsx`: `title`, `text` e `highlight` são renderizados como `visually-hidden` (só para leitor de tela). **A única coisa visível na tela, além do botão de áudio, é a ilustração.** Isso significa que qualquer texto embutido na própria imagem passa a ser o único texto que a pessoa realmente vê naquela cena — não é uma legenda "a mais" ao lado de um texto já visível, é o texto de fato, só que fora do controle do app e sujeito aos erros de geração de imagem por IA (itens 1.2 e 1.3). Isso reforça o ponto do usuário: com a legenda visível removida da interface, texto pedagógico dentro da imagem deixou de ser redundância — passou a ser a legenda de fato, só que não revisável como texto.

### 1.2 Bug recorrente: códigos hexadecimais de cor "vazando" para dentro da imagem como texto visível

Em pelo menos 8 imagens, um código de cor (ex.: `#E3A23C`, `#8C8478`, `#2A2420`, `#4E9E6E`, `#8C2420`) aparece como texto literal desenhado dentro da cena — claramente um resquício do prompt de geração (a referência de cor do design system) que o modelo renderizou como se fosse um rótulo da interface. Ocorre em:
- `business-hours-matter/cena-01.jpg` (`8C8478` no canto inferior direito do celular)
- `explain-what-you-offer/cena-01.jpg` (`8C8478` ao lado do nome do salão)
- `photos-help-customers-decide/cena-04.jpg` (`#8C8478` e `#2A2420` — duas vezes)
- `first-profile-checkup/cena-01.jpg` (`#4E9E6E` e `#E3A23C` — três vezes)
- `choose-your-next-action/cena-01.jpg` (`#8C2420`, `#E3A23C`, `#8C8478` — três vezes)

**Recomendação:** ao gerar ou regerar imagens, revisar o prompt para não incluir valores hexadecimais como texto de referência dentro da cena, e sempre inspecionar a imagem final em zoom antes de aprovar.

### 1.3 Bug recorrente: texto ilegível/sem sentido ("gibberish") gerado pela IA

Texto que devia ser uma frase de exemplo saiu como uma sequência de palavras inventadas, sem sentido, ou misturando português com inglês quebrado. Isso é diferente de erro de digitação pontual (ver 1.4) — é o modelo "alucinando" caracteres onde devia haver texto legível. Ocorre em:
- `why-appear-in-local-search/cena-03.jpg` — "Brazilian coffee shop, té um com nela não tez desribam a…"
- `profile-represents-your-business/cena-03.jpg` — "Carefully curasado desceé do, bakeria bakeria rantios de qualita dosces da negócio, e escento, é quaiado como conheces."
- `accurate-business-info/cena-03.jpg` — texto solto em inglês "Secondary information labels" (claramente uma instrução de design vazada, não conteúdo) e um texto espelhado/invertido no bloco à esquerda
- `explain-what-you-offer/cena-02.jpg` — "Comena com manutenção de logal e ar-condicionado."
- `how-to-respond-to-reviews/cena-01.jpg` — bloco inteiro à esquerda: "Loja de Artesaro petielas business par / Google busines" (o pior caso: ocupa um terço da imagem)
- `keep-your-profile-updated/cena-04.jpg` — várias linhas: "Adintcec: Coija, Artecondis Dona Cila", "Gorsttap Ploulo s - Sitro eo 15.20 - 1 500", "Geete: S3 á Nln"
- `first-profile-checkup/cena-01.jpg` — abas do app ("Adimtsss", "Neles", "Ferolments", "Compate") e endereço/horário completamente ilegíveis

**Recomendação:** essas 7 imagens precisam ser regeradas (classificação REFAZER) — não são questão de gosto editorial, são defeitos técnicos visíveis para qualquer usuário.

### 1.4 Erros de digitação/gramática pontuais em texto que devia estar correto

- "Descripção" → deveria ser "Descrição" (`profile-represents-your-business/cena-03.jpg`)
- "Cametóriet" → deveria ser "Categorias" (`profile-represents-your-business/cena-04.jpg`)
- "Phono" / "Direição" → deveria ser "Ligar" / "Direção" (`profile-represents-your-business/cena-02.jpg`)
- "Rescha resultados" → não é uma palavra em português, provavelmente deveria ser "Resultados da busca" (`why-appear-in-local-search/cena-01.jpg`)
- "Profile" em inglês onde o resto do app está em português → deveria ser "Perfil" (`accurate-business-info/cena-04.jpg`)
- "Padaia" → deveria ser "Padaria" (`keep-your-profile-updated/cena-03.jpg`)
- "Artesansto" e "Clla" → deveriam ser "Artesanato" e "Cila" (`keep-your-profile-updated/cena-04.jpg`)
- "[Problema Mencionada]" → erro de concordância, deveria ser "[Problema Mencionado]" (`how-to-respond-to-reviews/cena-02.jpg`)
- "Ana SIlva" → "I" maiúsculo no meio do sobrenome (`how-to-respond-to-reviews/cena-01.jpg`)

### 1.5 Legenda embutida na imagem duplicando a narração quase palavra por palavra

Este é o achado mais frequente — presente em praticamente todas as 48 imagens, em algum grau. A grande maioria das imagens tem uma caixa de texto grande com uma frase que repete (às vezes literalmente) o `narration.script` ou o `highlight` daquela cena. Como visto em 1.1, esse texto agora É a legenda visível — então a pergunta não é "isso é redundante com outro texto na tela" (não há mais outro texto na tela), e sim "essa frase deveria estar fixada como pixel dentro da imagem, sem poder ser corrigida depois sem regerar a imagem inteira". A lista completa está na seção 4, lição por lição; como regra geral, recomendo tratar essas caixas de texto como **opcionais e reduzíveis**, preferindo ilustrações que comuniquem a ideia visualmente (como já acontece bem em algumas cenas, ex. `first-profile-checkup/cena-03.jpg` ou `choose-your-next-action/cena-03.jpg`, onde a "legenda" é curta e funciona mais como rótulo de diagrama do que como frase repetida).

### 1.6 Legenda da imagem desalinhada com a narração atual ("texto fantasma" de um roteiro anterior)

Em pelo menos 5 imagens, a frase escrita dentro da imagem **não corresponde** ao `narration.script` atual daquela cena — sugerindo que a imagem foi gerada a partir de uma versão anterior do roteiro, que depois mudou. Isso é mais sério que a duplicação simples (1.5), porque cria uma pequena incoerência entre o que a pessoa vê e o que ouve:
- `reviews-importance/cena-01.png` — caixa amarela inferior ("Avaliações são conversas que acontecem mesmo quando você não está presente…") não existe em nenhuma forma no roteiro atual
- `reviews-importance/cena-04.jpg` — "Tudo pronto para destacar seu negócio no Google. Seu próximo passo é natural." não corresponde a "Você já sabe por que avaliações autênticas são importantes…"
- `how-to-respond-to-reviews/cena-04.jpg` — "Sua resposta, seu cuidado. Para mais confiança e conexão." não corresponde a "Você já sabe como pensar sobre isso…"
- `keep-your-profile-updated/cena-04.jpg` — "Cuidar do seu perfil no Google é rápido e fácil…" não corresponde a "Você já entende por que isso é uma rotina…"
- `choose-your-next-action/cena-04.jpg` — "A melhoria escolhida é a ação realizada agora. Sem adiamento, seu negócio avança." é uma frase inventada, não está no roteiro

### 1.7 Áudio pendente (bloqueio conhecido, não é achado novo)

No GitHub hoje: **11 das 12 lições já têm áudio completo** (4 cenas cada). Faltam apenas: a cena `action` de "Horários também fazem parte da experiência" (business-hours-matter) e as 4 cenas de "Escolha sua próxima ação" (choose-your-next-action) — 5 cenas no total. Enquanto isso não for gerado pela VM, essas cenas aparecem no app só com a imagem, sem botão de áudio e sem nenhum texto visível (por causa do item 1.1) — uma tela estática e muda. Recomendo priorizar a geração dessas 5 cenas.

### 1.8 Alinhamento lição → missão: sem problemas

Conferi as 12 lições contra as 12 missões em `src/content/missions/catalog.ts`. Todas as 12 missões correspondem diretamente à ação prática da lição que as libera (ex.: "accurate-business-info" ensina a manter informações corretas → a missão "review-business-info" pede exatamente isso). Nenhuma lição está desalinhada da sua missão.

---

## 2. Duração real do áudio vs. "1 min" exibido

Todas as 12 lições têm o campo `duration: '1 min'` fixo no arquivo `.ts`, mas a duração real da narração (soma do último `endSeconds` de cada cena) é sempre menor — em geral entre 24 e 44 segundos:

| Lição | Duração real (áudio já gerado) |
|---|---|
| Por que aparecer nas buscas locais importa | 32,0 s |
| Seu perfil representa seu negócio | 34,1 s |
| Informações corretas ajudam o cliente a entender o negócio | 43,6 s |
| Horários também fazem parte da experiência | 29,0 s (falta 1 cena) |
| Faça o cliente entender o que você oferece | 28,8 s |
| Fotos ajudam o cliente a decidir | 35,4 s |
| Por que as avaliações importam? | 35,1 s |
| Como fazer um pedido de avaliação genuíno | 31,4 s |
| Como responder avaliações | 33,4 s |
| Seu perfil precisa continuar atualizado | 25,7 s |
| Faça seu primeiro check-up completo | 23,6 s |
| Escolha sua próxima ação | 0 s (sem áudio ainda) |

Nenhuma lição chega perto de "1 min" — a mais longa (Informações corretas) tem 43,6 s. Isso confirma o ponto do usuário: o rótulo "1 min" está sistematicamente errado, não é um caso isolado. Recomendo trocar por algo que não prometa um número fixo enquanto a duração real varia por lição — por exemplo omitir a duração, ou calcular e exibir dinamicamente a soma real dos segments quando o áudio existir (com um rótulo genérico, tipo "menos de 1 min", enquanto não houver áudio).

---

## 3. Lição por lição

Legenda de veredito: **APROVADA** (sem mudanças necessárias) · **AJUSTAR** (mudança pontual, texto exato indicado) · **REFAZER** (regenerar a imagem do zero).

### Lição 1 — Por que aparecer nas buscas locais importa

**Narração: AJUSTAR.** Duas frases afirmam com certeza algo que é só provável:

- Cena `intro`, texto exibido e roteiro: *"Essa busca já representa uma necessidade concreta, acontecendo naquele exato momento."* — trata toda busca como certamente urgente e concreta. Sugestão: *"Essa busca muitas vezes já representa uma necessidade concreta, acontecendo naquele momento."*
- Cena `first-step`, `text`: *"Essa pessoa já está procurando resolver algo agora — não é só curiosidade."* e `narration.script`: *"Essa pessoa não está só curiosa: ela já está tentando resolver algo agora."* — nega a possibilidade de ser só curiosidade, quando na prática pode ser. Sugestão: *"Essa pessoa pode não estar só curiosa: muitas vezes, já está tentando resolver algo agora."*

**Imagens:**
- `cena-01.jpg` — AJUSTAR: legenda grande duplica o `highlight` da cena seguinte; UI do app mostra "Rescha resultados" (não é palavra, ver 1.4).
- `cena-02.jpg` — AJUSTAR: repete a mesma legenda da cena-01 dentro da imagem (o rótulo do diagrama "Ser encontrado / Ser escolhido" já comunica a ideia sozinho, a caixa de texto é redundante mesmo dentro da própria imagem).
- `cena-03.jpg` — **REFAZER**: parágrafo em inglês sem sentido (ver 1.3) e placar de estrelas com um valor de texto solto.
- `cena-04.jpg` — APROVADA.

### Lição 2 — Seu perfil representa seu negócio

**Narração: APROVADA.** Texto bem calibrado ("costuma ser", "pode passar a impressão errada"), sem promessas indevidas.

**Imagens:**
- `cena-01.jpg` — APROVADA.
- `cena-02.jpg` — AJUSTAR: legenda duplica o `highlight`; botões da tela do celular saíram como "Phono" / "Direição" (ver 1.4).
- `cena-03.jpg` — **REFAZER**: parágrafo em inglês/português sem sentido e "Descripção" com erro de grafia (ver 1.3/1.4).
- `cena-04.jpg` — AJUSTAR: "Cametóriet" deveria ser "Categorias"; legenda duplica a `text` da cena.

### Lição 3 — Informações corretas ajudam o cliente a entender o negócio

**Narração: APROVADA.** Um dos melhores exemplos do currículo de como falar do Google sem prometer nada: *"isso não garante uma posição específica nos resultados"* está explícito no próprio roteiro.

**Imagens:**
- `cena-01.jpg` — AJUSTAR: legenda duplica a `text`.
- `cena-02.jpg` — AJUSTAR: duas caixas de texto empilhadas (o aviso "Isso não garante..." e a legenda principal), ambas já ditas na narração.
- `cena-03.jpg` — **REFAZER**: o texto solto "Secondary information labels" (em inglês) claramente vazou de uma instrução de design para dentro da imagem; há também um bloco de texto espelhado/de cabeça para baixo.
- `cena-04.jpg` — AJUSTAR: cabeçalho do mockup em inglês ("Profile") deveria ser "Perfil".

### Lição 4 — Horários também fazem parte da experiência

**Narração: AJUSTAR (opcional/baixa prioridade).** Cena `consequence`: *"…acaba perdendo confiança — mesmo sem culpa do negócio em si."* É uma afirmação de senso comum sobre comportamento do cliente (não uma promessa sobre o Google), então o risco é bem menor que na Lição 1 — mas fica mais preciso como *"pode acabar perdendo confiança"*.

**Imagens:**
- `cena-01.jpg` — AJUSTAR: código de cor `8C8478` vazado como texto (ver 1.2); legenda duplica a narração.
- `cena-02.jpg` — AJUSTAR: legenda duplica o `highlight`.
- `cena-03.jpg` — AJUSTAR: legenda duplica a narração quase palavra por palavra.
- `cena-04.jpg` — AJUSTAR: calendário mostra "September" em inglês num app em português; o rótulo "Site" aparece duas vezes na mesma imagem. **Esta cena também não tem áudio ainda** (ver 1.7) — prioridade maior que o ajuste visual.

### Lição 5 — Faça o cliente entender o que você oferece

**Narração: APROVADA.** Contém a frase que o usuário já elogiou: *"não coloque uma informação porque o Google gosta dela. Coloque porque o cliente precisa dela para decidir."*

**Imagens:**
- `cena-01.jpg` — AJUSTAR: código de cor `8C8478` vazado no lugar da contagem de avaliações (ver 1.2).
- `cena-02.jpg` — **REFAZER**: parágrafo "Comena com manutenção de logal e ar-condicionado." é ilegível/sem sentido (ver 1.3).
- `cena-03.jpg` — AJUSTAR: a palavra "Sobrancelha" aparece cortada na borda do checklist ("Sobrancelh").
- `cena-04.jpg` — AJUSTAR: o mockup mistura serviços de negócios muito diferentes na mesma lista (cabeleireiro, ar-condicionado, limpeza de carro, aula de inglês, reforço escolar) — funciona como conceito de "adicionar serviço", mas não parece um perfil de negócio real e consistente.

### Lição 6 — Fotos ajudam o cliente a decidir

**Narração: APROVADA.**

**Imagens:**
- `cena-01.jpg` — AJUSTAR: duas caixas de texto na mesma imagem ("Fotos reais ajudam o cliente a decidir" + "Sua Fachada Autêntica / Seu Produto Real / Seu Espaço Acolhedor") — texto em excesso para uma única cena.
- `cena-02.jpg` — AJUSTAR: legenda repete quase literalmente a narração ("Não é sobre ter fotos bonitas, é sobre mostrar a verdade."); os rótulos "Ambiente / Produto / Resultado" já comunicam a ideia sozinhos.
- `cena-03.jpg` — AJUSTAR (menor): legenda parafraseia de perto a narração.
- `cena-04.jpg` — **REFAZER**: três códigos de cor vazados como texto na mesma imagem (`#8C8478`, `#2A2420` duas vezes) — ver 1.2.

### Lição 7 — Por que as avaliações importam?

*(Esta foi a primeira lição produzida no projeto — as imagens têm um estilo de ilustração mais rico e detalhado que as demais, mas herdaram o mesmo problema de excesso de texto.)*

**Narração: APROVADA.**

**Imagens:**
- `cena-01.png` — AJUSTAR (prioridade alta dentro desta categoria): a imagem tem uma caixa com 3 marcadores repetindo o roteiro inteiro em forma de lista, mais uma segunda caixa de texto amarela com uma frase que **não existe em nenhuma versão atual do roteiro** (ver 1.6). Recomendo simplificar bastante — hoje a imagem funciona mais como um slide informativo do que como uma ilustração de apoio à narração.
- `cena-02.jpg` — AJUSTAR: legenda repete a narração quase palavra por palavra.
- `cena-03.jpg` — AJUSTAR: a caixa de texto à direita repete o `highlight` da cena quase literalmente — vale conferir se esse texto já aparece em algum outro lugar da tela (ex. um componente de destaque) para não duplicar.
- `cena-04.jpg` — AJUSTAR: a legenda ("Tudo pronto para destacar seu negócio no Google. Seu próximo passo é natural.") não corresponde ao roteiro atual (ver 1.6).

### Lição 8 — Como fazer um pedido de avaliação genuíno

**Narração: APROVADA.**

**Imagens:**
- `cena-01.jpg` — AJUSTAR (menor): legenda curta, mas ainda parafraseia a narração.
- `cena-02.jpg` — AJUSTAR: o exemplo "o que fazer / o que evitar" é útil e concreto (vale manter), mas a legenda inferior duplica o `highlight` — pode ser removida sem perder conteúdo.
- `cena-03.jpg` — AJUSTAR: o texto "agora, enquanto está fresco na memória" aparece duas vezes na mesma imagem (uma vez em preto, uma vez em cinza) — provavelmente uma repetição indesejada da geração.
- `cena-04.jpg` — AJUSTAR (menor): legenda parafraseia a narração.

### Lição 9 — Como responder avaliações

**Narração: APROVADA.** Vale registrar: a frase *"O Google recomenda responder às avaliações"* é factualmente correta (é uma orientação publicada pelo próprio Google em sua central de ajuda do Perfil da Empresa) — não é um overclaim, é uma referência a uma recomendação real e verificável.

**Imagens:**
- `cena-01.jpg` — **REFAZER**: um terço da imagem é ocupado por texto sem sentido misturando português e inglês quebrado (ver 1.3), incluindo mais um código de cor vazado (`#2A24E0`).
- `cena-02.jpg` — AJUSTAR: erro de concordância "[Problema Mencionada]" deveria ser "[Problema Mencionado]"; legenda duplica a narração.
- `cena-03.jpg` — AJUSTAR (menor, um dos melhores exemplos funcionais do currículo): os dois cartões de avaliação com resposta são um bom exemplo concreto; só a legenda inferior é redundante.
- `cena-04.jpg` — AJUSTAR: a legenda ("Sua resposta, seu cuidado. Para mais confiança e conexão.") não corresponde ao roteiro atual (ver 1.6).

### Lição 10 — Seu perfil precisa continuar atualizado

**Narração: APROVADA.**

**Imagens:**
- `cena-01.jpg` — AJUSTAR: legenda duplica a narração/`highlight`.
- `cena-02.jpg` — AJUSTAR: o ícone "Serviços" aparece duas vezes na mesma composição (deveria mostrar 3 conceitos distintos — horário, serviço, endereço — mas repete um deles).
- `cena-03.jpg` — AJUSTAR: "Padaia" deveria ser "Padaria"; a palavra "Artisan" em inglês destoa do restante do app, que é em português.
- `cena-04.jpg` — **REFAZER**: várias linhas de texto sem sentido no mockup do perfil (ver 1.3), incluindo "Artesansto" e "Clla" com erro de grafia.

### Lição 11 — Faça seu primeiro check-up completo

**Narração: APROVADA** — um dos melhores roteiros do currículo: a cena `purpose` já deixa explícito *"esse olhar não é sobre nota ou posição no Google… é sobre identificar o que ainda pode representar melhor o seu negócio real"*, exatamente o cuidado que as outras lições também deveriam ter.

**Imagens:**
- `cena-01.jpg` — **REFAZER** (a imagem com mais defeitos técnicos de todo o currículo): abas do app ilegíveis ("Adimtsss", "Neles", "Ferolments", "Compate"), endereço e horário completamente sem sentido, e **quatro** códigos de cor vazados como texto (`#4E9E6E`, `#E3A23C` três vezes).
- `cena-02.jpg` — APROVADA: imagem limpa, sem erros técnicos; a legenda inferior é redundante mas não chega a atrapalhar.
- `cena-03.jpg` — AJUSTAR (menor): a legenda inferior repete o que os dois rótulos já dizem visualmente dentro da própria imagem — redundância interna, não só com a narração.
- `cena-04.jpg` — AJUSTAR: a palavra "destacar" aparece cortada na borda do balão de texto ("destaca" sem o "r" final) — defeito de composição.

### Lição 12 — Escolha sua próxima ação

**Narração: APROVADA.** Bom fechamento de currículo, deixa claro que o objetivo não é "terminar o curso".

**Áudio: pendente nas 4 cenas** (ver 1.7) — hoje essa lição aparece no app sem nenhum áudio e, por causa do item 1.1, sem nenhum texto visível também. É a lição com a lacuna mais visível do currículo inteiro no momento.

**Imagens:**
- `cena-01.jpg` — **REFAZER**: três códigos de cor vazados como texto (`#8C2420`, `#E3A23C`, `#8C8478`).
- `cena-02.jpg` — AJUSTAR (menor): imagem limpa, só a legenda é redundante.
- `cena-03.jpg` — AJUSTAR (menor): imagem limpa, só a legenda repete o roteiro quase palavra por palavra.
- `cena-04.jpg` — APROVADA: um dos melhores mockups funcionais do currículo (fluxo real de "carregando foto → salvando → confirmar alteração"); a legenda diverge um pouco do roteiro atual (ver 1.6), mas não chega a contradizer o sentido.

---

## 4. Resumo — quadro geral

| Lição | Narração | Pior veredito de imagem | Observação principal |
|---|---|---|---|
| 1. Por que aparecer nas buscas locais importa | AJUSTAR | REFAZER (cena-03) | 2 frases de certeza indevida no roteiro |
| 2. Seu perfil representa seu negócio | APROVADA | REFAZER (cena-03) | texto ilegível + erro de grafia |
| 3. Informações corretas ajudam o cliente | APROVADA | REFAZER (cena-03) | texto de instrução de design vazou pra imagem |
| 4. Horários também fazem parte da experiência | AJUSTAR (opcional) | AJUSTAR | falta áudio na cena 4 |
| 5. Faça o cliente entender o que você oferece | APROVADA | REFAZER (cena-02) | parágrafo ilegível |
| 6. Fotos ajudam o cliente a decidir | APROVADA | REFAZER (cena-04) | 3 códigos de cor vazados |
| 7. Por que as avaliações importam? | APROVADA | AJUSTAR (cena-01 prioritária) | texto em excesso, legenda "fantasma" |
| 8. Como fazer um pedido de avaliação genuíno | APROVADA | AJUSTAR | texto duplicado dentro da mesma imagem |
| 9. Como responder avaliações | APROVADA | REFAZER (cena-01) | 1/3 da imagem é texto ilegível |
| 10. Seu perfil precisa continuar atualizado | APROVADA | REFAZER (cena-04) | texto ilegível + erros de grafia |
| 11. Faça seu primeiro check-up completo | APROVADA | REFAZER (cena-01) | pior imagem do currículo (4 hex + texto ilegível) |
| 12. Escolha sua próxima ação | APROVADA | REFAZER (cena-01) | falta áudio nas 4 cenas + 3 hex vazados |

**Conclusão geral:** nenhuma lição precisa ser reescrita do zero — os roteiros de narração são, em geral, bem calibrados (a maioria já segue a regra "Google = compreensão, Cliente = decisão, Empresário = ação" que o usuário propôs, mesmo sem ela estar escrita em lugar nenhum). Os problemas reais estão concentrados em dois pontos específicos e corrigíveis sem tocar no roteiro:

1. **10 das 48 imagens têm defeitos técnicos de geração** (texto ilegível ou código de cor vazado) que precisam ser regeradas — isso não é uma questão de opinião editorial, é um defeito visível para qualquer usuário.
2. **A grande maioria das imagens tem uma legenda embutida que duplica a narração.** Como a interface hoje não mostra mais nenhum texto próprio na tela, essa legenda é, na prática, o único texto visível da lição — vale decidir, cena a cena, se ela realmente ajuda (como em `first-profile-checkup/cena-03` ou `why-appear-in-local-search/cena-02`, onde o rótulo é curto e funciona como parte do diagrama) ou se está apenas repetindo o que o áudio já diz (a maioria dos casos).

Como próximo passo, sugiro priorizar nesta ordem: (a) gerar o áudio das 5 cenas que faltam (item 1.7) — sem isso, "Escolha sua próxima ação" fica muda e sem texto; (b) regerar as 10 imagens com defeito técnico (lista completa nas seções 1.2/1.3, com o veredito REFAZER); (c) revisar as 2 frases de certeza indevida da Lição 1; (d) decidir, com calma, quais legendas embutidas vale a pena simplificar nas próximas rodadas de geração de imagem.
