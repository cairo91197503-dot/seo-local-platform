# Design System

**Status:** direção principal decidida (2026-08-24). Falta nome comercial definitivo, posicionamento formal de marca e o detalhamento do estilo de animações.

Canvas de referência (paleta, tipografia, mascote e duas alternativas descartadas): https://claude.ai/code/artifact/c979ad0e-cb41-43ad-84d3-5a1eae4c13a1

## Racional

O público é pequeno empresário brasileiro sem bagagem técnica de marketing. A direção evita o padrão "SaaS corporativo frio" (azul + cinza + gradientes) e busca calor de bairro, coerente com o tom de "treinador digital" descrito em `docs/01-PROJETO.md`. A mascote nasce do próprio símbolo de avaliação (a estrela) em vez de um bicho genérico, reforçando o mecanismo central do produto — reputação e avaliações — a cada aparição.

Duas alternativas de baixa fidelidade foram desenhadas e descartadas por enquanto (registradas no canvas): um mascote-tucano (mais carismático, mas perde a metáfora de avaliação) e um selo minimalista sem mascote (mais "ferramenta séria", mas mais frio para um produto de hábito diário e gamificação).

## Paleta

| Papel | Hex | oklch aprox. |
| --- | --- | --- |
| Fundo | `#FAF6EF` | 97% 0.015 75 |
| Tinta (texto principal) | `#2A2420` | 22% 0.02 75 |
| Estrela — primária (avaliação, XP, conquista) | `#E3A23C` | 66% 0.14 75 |
| Crescimento — ação (CTA, confirmação, sucesso) | `#4E9E6E` | 66% 0.14 150 |
| Texto secundário | `#8C8478` | 55% 0.02 75 |
| Linhas / cartões | `#E7E1D6` | 90% 0.01 75 |

As duas cores de acento têm o mesmo tom e saturação — só muda o matiz — para não competir visualmente entre si.

## Tipografia

- **Fredoka** (SemiBold/Bold) — títulos, conquistas, fala da mascote. Pontas arredondadas, amigável sem ser infantil.
- **Work Sans** (Regular/Medium) — corpo de texto, legendas. Legível em telas pequenas, bom suporte a acentuação em português.

Ambas via Google Fonts.

## Mascote — "Estrelo" (nome de trabalho)

Corpo de estrela de 5 pontas arredondadas (não pontas afiadas), rosto simples com dois olhos e boca. Estados definidos:

- **Neutro/à vontade** — padrão nas lições.
- **Comemorando** — braços erguidos, fagulhas ao redor; usado ao concluir missão/ganhar XP.
- **Pensando** — leve inclinação de cabeça; usado antes de uma dica ou pergunta.

O nome "Estrelo" é um apelido de trabalho, independente do nome comercial da marca (ainda não escolhido — ver `docs/01-PROJETO.md`, seção "Nome").

## Estilo de animações (direção inicial, não detalhada)

Movimento suave, tipo "squash and stretch" leve, sem exageros — reforça calor e vivacidade sem parecer infantilizado. Detalhamento (curvas de easing, duração padrão, biblioteca a usar) fica para quando a implementação de animação entrar em pauta.

## Em aberto

- Nome comercial definitivo e posicionamento formal de marca (`docs/01-PROJETO.md`).
- Aplicação da paleta/tipografia em todas as telas existentes do MVP (ainda não migradas para os tokens acima).
- Biblioteca/abordagem técnica de animação.
