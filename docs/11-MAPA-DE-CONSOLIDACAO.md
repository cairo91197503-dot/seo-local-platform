# Mapa de Consolidação

## Princípio de priorização

O produto organiza cada passo no ciclo abaixo. Uma funcionalidade só é prioritária se ajudar o usuário a realizar uma ação real e útil no negócio.

```text
Aprender
→ Entender
→ Executar
→ Verificar
→ Ganhar XP
→ Evoluir
→ Repetir
```

Esta classificação consolida o produto atual, a arquitetura pedagógica, o padrão de lições e a herança conceitual do LocalPulse. Ela não converte repositórios antigos em dependências técnicas.

## JÁ EXISTE / MANTER

- Estrutura navegável inicial e conteúdo da primeira microlição, “Por que as avaliações importam?”.
- Direção pedagógica: aprendizado curto, linguagem simples e conexão da lição com uma ação prática.
- Princípios para avaliações genuínas e sem promessas de ranking ou resultado comercial.
- Arquitetura que mantém integrações externas desacopladas e o valor educacional disponível sem API do Google Business Profile.
- Pipeline de mídia de lições com revisão e aprovação explícitas dos assets.

## RECUPERAR

Não há funcionalidade histórica do LocalPulse comprovada neste repositório que deva ser recuperada como código. O que pode ser recuperado é o aprendizado conceitual sobre pequenos negócios, reputação e necessidade de ações práticas, desde que passe pelas regras atuais.

## ADAPTAR

- A ideia de ferramentas para avaliações: no MVP, priorizar link configurado pelo usuário e QR Code, sem validação automática externa.
- A missão de solicitar avaliação: ensiná-la como pedido amplo, legítimo e posterior a uma experiência real, com confirmação manual no MVP.
- Acompanhamento de evolução: separar progresso pedagógico, estado da jornada e gamificação; XP não é prova externa de resultado.
- Login com Google: usá-lo para acesso e persistência de sessão, não como integração ao Google Business Profile.

## ADIAR

### P1

- Gerador de respostas para avaliações com IA.
- Histórico e progresso mais detalhados.
- Recursos opcionais de continuidade, quando reforçarem a rotina sem criar pressão artificial.

### P2

- Check-up ou diagnóstico personalizado.
- Mentor contextual.
- Recursos adicionais que dependam de contexto suficiente sobre o negócio e a jornada.

### P3 / futuro

- Integração com Google Business Profile.
- Dados automáticos do Google e métricas externas.
- PDF.
- Automações mais avançadas.
- Funcionalidades não essenciais ao núcleo pedagógico.

Streak fica fora do P0. Pode ser avaliado em P1 apenas se tiver função pedagógica clara e não pressionar o usuário a acessar o produto diariamente.

## DESCARTAR

- Tratar um antigo “reputation score” como nota oficial, diagnóstico oficial do Google ou métrica que determine a qualidade do negócio.
- Prometer primeiro lugar, aumento garantido de ranking, clientes ou vendas.
- Depender da API do Google Business Profile para o primeiro ciclo de valor.
- Recuperar código antigo sem avaliação de produto, segurança e arquitetura.
- Review gating, seleção de clientes supostamente satisfeitos, incentivo em troca de avaliação, pedido de nota específica, bloqueio de avaliações negativas ou qualquer manipulação de avaliações.
- Posicionar IA como o produto em vez de assistência à metodologia.

## Recorte P0 / MVP

O primeiro ciclo completo do MVP contém:

- Login Google e persistência de sessão;
- onboarding curto do negócio;
- Home orientada à próxima ação;
- microlições;
- missões práticas;
- confirmação manual de execução;
- XP, níveis e progresso;
- QR Code e link para solicitar avaliação;
- primeira jornada completa, da lição à próxima etapa.

Esse recorte funciona sem qualquer API do Google Business Profile.
