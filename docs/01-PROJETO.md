# Projeto

## Visão

Criar uma plataforma brasileira que ensina pequenos empresários a melhorar sua presença no Perfil da Empresa no Google por meio de aprendizado prático, gamificação, inteligência artificial e ferramentas úteis.

## Problema

Muitos pequenos empresários:

- não sabem configurar corretamente o Perfil da Empresa no Google;
- não entendem SEO local;
- não sabem quando ou como pedir avaliações;
- não mantêm uma rotina de atualização do perfil;
- têm dificuldade para entender quais ações realmente ajudam a gerar mais clientes.

## Solução

A plataforma deve funcionar como um treinador digital.

O usuário aprende uma pequena lição, executa uma missão prática e acompanha sua evolução.

O objetivo educacional é ajudar pequenos empresários a cuidar da presença local do negócio de forma prática e contínua: ser encontrados, ajudar o cliente a entender e escolher o negócio, construir reputação e manter o perfil atualizado. O foco não é formar especialistas técnicos em SEO, mas transformar aprendizado acessível em ações reais.

Fluxo principal:

Aprender → Executar → Ganhar XP → Evoluir → Repetir

A fonte da verdade sobre princípios, jornada e estrutura educacional é `docs/08-ARQUITETURA-PEDAGOGICA.md`.

## Público-alvo

Pequenos empresários brasileiros, prestadores de serviços e negócios locais com pouco conhecimento de marketing digital.

## Posicionamento de marca (decidido em 2026-08-24)

Para o pequeno empresário brasileiro que sabe que precisa aparecer bem no Google, mas não tem tempo nem paciência para aprender marketing digital sozinho, o **Estrelar** é o treinador digital que transforma aprendizado em ação prática, uma missão de cada vez — diferente de cursos genéricos de SEO ou consultorias caras, porque ensina só o necessário para a situação real do negócio, no momento em que ela importa, e comemora cada progresso junto com o usuário.

Tom de voz: parceiro de confiança que entende de internet, não professor de cima para baixo nem vendedor de curso milagroso. Prático, encorajador, honesto — nunca promete hack de algoritmo ou posição garantida no Google (ver "Princípio central" abaixo). Caloroso como um negócio de bairro, não frio como um SaaS corporativo; adulto e direto, não infantilizado, mesmo usando uma mascote.

Este posicionamento orienta copy, tom da mascote (`docs/06-DESIGN-SYSTEM.md`) e critérios de priorização de funcionalidades (`docs/02-ROADMAP.md`).

## Diferenciais

- aprendizado em microlições;
- conteúdo visual e animado;
- missões práticas;
- gamificação;
- mentor com inteligência artificial;
- ferramentas para avaliações e SEO local;
- futura integração com o Perfil da Empresa no Google.



## Princípio central

A plataforma deve gerar ações reais no negócio do usuário.

A gamificação não existe apenas para entretenimento.

Cada missão deve ajudar o empresário a melhorar sua presença digital, reputação ou capacidade de conquistar clientes.

## Dependência de APIs externas

O valor principal do produto não pode depender exclusivamente da API do Google.

Quando integrações oficiais estiverem disponíveis, elas devem automatizar e enriquecer a experiência existente.

## Nome

**Nome comercial: Estrelar** (decidido em 2026-08-24). Amarra com a identidade visual já definida (mascote nasce do símbolo de estrela de avaliação — ver `docs/06-DESIGN-SYSTEM.md`) e com o verbo real do português ("estrelar" = ser o protagonista / ganhar estrelas).

Domínio principal planejado: `estrelar.app`. Ainda não há confirmação de registro nem de disponibilidade de `estrelar.com.br`.

**Risco de marca conhecido:** existe uma empresa registrada no Rio de Janeiro, "Estrelar Web Serviços de Internet Ltda" (provedor de internet), com app próprio nas lojas e o domínio `estrelarweb.com.br` já em uso. É um mercado diferente (telecom/ISP vs. SaaS de reputação), então não deve haver conflito formal de classe no INPI, mas existe risco de confusão de busca/marca. Aceito conscientemente; reavaliar se uma checagem formal de marca (INPI) ou de disponibilidade de domínio apontar problema real.

`seo-local-platform` continua sendo o nome técnico do repositório; não é necessário renomear o repositório para adotar o nome comercial.

## Estrutura inicial do MVP

A experiência principal será organizada inicialmente em quatro áreas:

### Início

Painel principal do usuário.

Deve mostrar futuramente:

- progresso;
- XP;
- nível;
- sequência de dias;
- próxima missão recomendada.



### Aprender

Área educacional da plataforma.

Será composta por trilhas e microlições curtas, visuais e práticas.

### Missões

Transforma conhecimento em ações reais no negócio.

Cada missão deve ter um objetivo claro e contribuir para a evolução da presença digital do usuário.

### Ferramentas

Recursos práticos para ajudar o empresário.

Primeira ferramenta planejada:

- geração de QR Code para solicitar avaliações.

Outras ferramentas serão adicionadas conforme necessidades reais forem validadas.

## Evolução futura

O Mentor IA e a integração com o Perfil da Empresa no Google serão incorporados progressivamente.

Eles não são requisitos para a primeira estrutura navegável do produto.

## Modelo inicial de missão

Uma missão transforma aprendizado em uma ação prática no negócio do usuário.

Cada missão deve possuir:

### 1. Título

Explica claramente o que o usuário fará.

### 2. Objetivo

Explica por que aquela ação é importante para o negócio.

### 3. Explicação curta

Ensina o conceito necessário antes da execução.

### 4. Passos

Mostra exatamente o que o usuário precisa fazer.

### 5. Ação

O usuário executa a tarefa no mundo real ou utilizando uma ferramenta da plataforma.

### 6. Confirmação

O usuário informa que concluiu a tarefa.

No MVP, essa confirmação poderá ser manual.

### 7. Recompensa

Ao concluir, o usuário recebe uma recompensa de gamificação.

Inicialmente utilizaremos XP.

## Primeira missão



### Peça sua primeira avaliação

Objetivo:

Ensinar o empresário a transformar um atendimento bem-sucedido em uma oportunidade legítima de receber uma avaliação no Google.

Fluxo inicial:

Aprender → Preparar → Pedir → Confirmar → Ganhar XP

A plataforma deve incentivar avaliações autênticas.

Não devemos ensinar ou incentivar:

- compra de avaliações;
- avaliações falsas;
- manipulação de notas;
- pressão indevida sobre clientes;
- seleção enganosa de quais clientes podem avaliar.

A solicitação deve acontecer de maneira natural após uma experiência real com o negócio.

## Modelo inicial de microlição

As lições devem ser curtas, visuais e fáceis de entender.

O objetivo não é reproduzir uma aula tradicional.

A experiência deve se aproximar de um pequeno conteúdo educativo animado.

### Estrutura

Uma microlição poderá ser dividida em cenas.

Cada cena pode conter futuramente:

- fala do mascote;

- texto curto;

- ilustração;

- animação;

- destaque visual;

- áudio/narração;

- interação do usuário.

### Fluxo

Introdução → Explicação → Exemplo → Ação

Ao final da lição, o usuário deve receber uma ação prática relacionada ao conteúdo.

### Duração

Preferencialmente entre 30 segundos e 3 minutos.

### Primeira microlição

Título:

"Por que as avaliações importam?"

Objetivo:

Explicar de forma simples como avaliações autênticas ajudam outras pessoas a conhecer e confiar em um negócio.

Ação relacionada:

Missão "Peça sua primeira avaliação".
