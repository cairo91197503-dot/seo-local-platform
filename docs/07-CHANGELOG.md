# Changelog

## 2026-08-24 — Posicionamento de marca decidido; Fase 1 do roadmap praticamente concluída

Posicionamento de marca redigido e registrado em `docs/01-PROJETO.md` (seção "Posicionamento de marca"): público, promessa central, diferencial frente a cursos/consultorias de SEO genéricos, e tom de voz (parceiro caloroso e honesto, não vendedor nem professor de cima para baixo). Com isso, a Fase 1 do roadmap fica com todos os itens centrais decididos — falta apenas o detalhamento do estilo de animações e a migração de telas existentes para os novos tokens visuais.

## 2026-08-24 — Nome comercial definido e herança do LocalPulse documentada

Nome comercial decidido em conversa com o usuário: **Estrelar** (domínio principal planejado: `estrelar.app`). Entre as opções levantadas (Estrelar, Estrelo, Brilha, Bairrista), o usuário escolheu Estrelar. Uma checagem informal por busca identificou uma empresa de outro ramo (provedor de internet no Rio de Janeiro) já usando "Estrelar Web"/`estrelarweb.com.br`; o risco foi levado ao usuário e aceito conscientemente por serem mercados diferentes. Nenhuma checagem formal de marca (INPI) ou de disponibilidade de domínio foi feita ainda. Detalhes em `docs/01-PROJETO.md`, seção "Nome".

O usuário informou que este projeto é uma reconstrução do produto anterior **LocalPulse** (4 repositórios: `LocalPulse`, `LocalPulse-WEB`, `LocalPulse-WEB-V2`, `LocalPulse-v2.0`), que tinha funcionalidades além do módulo educacional e não evoluiu principalmente por falta de acesso oficial à API do Google Business Profile. Essas funcionalidades foram levantadas e documentadas em `docs/10-HERANCA-LOCALPULSE.md`, com referências cruzadas nas fases 5, 6 e 7 de `docs/02-ROADMAP.md`. Nenhuma delas foi aprovada para implementação só por ter existido antes.

## 2026-08-24 — IA passa a atuar como gerente do projeto

A pedido do usuário, `.ai/workflow.md` e `.ai/rules.md` foram reescritos: a IA passa a decidir e executar diretamente produto, pedagogia, arquitetura, conteúdo, priorização e ações antes classificadas como sensíveis (`git commit`, `git push`, deploy, uso de cota paga, sobrescrita de asset aprovado, alteração de credenciais/infraestrutura), sem depender de autorização prévia do usuário. A IA só recorre ao usuário quando estiver genuinamente em dúvida entre alternativas válidas.

Regras permanentes de segurança (nunca gravar segredos no repositório, nunca expor segredos no frontend, menor privilégio) não fazem parte dessa autonomia e continuam valendo sem exceção. Uma instrução explícita do usuário durante uma conversa continua prevalecendo sobre esses documentos.

Consulte `.ai/context.md` para o resumo do modelo de governança vigente.

## 2026-08-24 — Direção de identidade visual (Fase 1)

Primeira decisão da IA sob o novo modelo de governança: paleta de cores, tipografia e conceito de mascote ("Estrelo", uma estrela de avaliação antropomorfizada) para a plataforma, ainda sem nome comercial definitivo. Duas alternativas de baixa fidelidade (mascote-tucano; selo minimalista sem mascote) foram exploradas e descartadas por enquanto. Detalhes e racional em `docs/06-DESIGN-SYSTEM.md`; canvas de referência publicado em https://claude.ai/code/artifact/c979ad0e-cb41-43ad-84d3-5a1eae4c13a1.

Nome comercial, posicionamento formal de marca e estilo detalhado de animações continuam em aberto — não fazem parte desta decisão.

## 2026-08-09 — Pipeline audiovisual da primeira microlição

### Narração da Cena 1

A Cena 1 da lição **“Por que as avaliações importam?”** usa a voz Piper `pt_BR-faber-medium`. A narração Faber foi aprovada, o novo áudio foi integrado ao projeto e os timestamps foram recalculados para essa gravação.

A integração foi validada com:

- `npm run build`;
- `npm run lint`;
- `git diff --check`.

A narração da Cena 1 é considerada concluída por enquanto. No futuro, ela poderá ser substituída por uma ferramenta TTS paga sem mudar a arquitetura atual; nesse caso, deverão ser substituídos o áudio e os timestamps correspondentes.

### Geração de imagens

Foi feita a pré-validação de uma geração experimental para a imagem da Cena 1 com o modelo `gpt-image-2`. A geração não foi executada porque `OPENAI_API_KEY` não está configurada, e foi decidido não prosseguir com uma solução paga neste momento.

A próxima alternativa a investigar é o **Cloudflare Workers AI**, buscando uma solução gratuita ou com franquia gratuita para gerar as imagens das cenas. Nenhuma configuração Cloudflare foi realizada e nenhuma imagem foi gerada por esse serviço.

O fluxo a preservar para geração de imagens é:

Codex → geração externa → PNG de teste fora do projeto → validação → avaliação e aprovação manual → integração no projeto.

Assets aprovados não devem ser sobrescritos durante testes.

### Conceito visual da Cena 1

O conceito definido mostra uma pessoa pesquisando empresas locais antes de escolher um negócio, com:

- pessoa adulta pesquisando no celular;
- interface genérica de busca e avaliações;
- cartões de empresas;
- estrelas de avaliação;
- sinais de reputação e confiança;
- tomada de decisão;
- comunicação visual que não dependa de texto dentro da imagem;
- ausência do logotipo do Google;
- estilo editorial moderno, profissional, limpo e educacional.

A proporção estudada foi `1536x1024` (`3:2`). Antes de gerar uma imagem com outro modelo, deve-se confirmar se dimensão e proporção continuam adequadas.

### Próximo passo previsto naquele momento

Naquele momento, o próximo passo previsto era começar pela investigação do Cloudflare Workers AI para geração de imagens. A pesquisa de TTS, os testes com Chatterbox/Kokoro e alterações na narração Faber aprovada não deveriam ser retomados.

Antes de qualquer geração:

1. consultar a documentação oficial atual;
2. verificar plano e franquia gratuita;
3. verificar modelos de text-to-image disponíveis;
4. verificar requisitos de conta e token;
5. verificar o custo em Neurons por geração;
6. escolher o modelo mais adequado para a Cena 1;
7. preparar uma única geração experimental;
8. parar antes de gerar ou consumir cota e pedir autorização.

Posteriormente, a investigação do Cloudflare Workers AI e a geração definitiva de imagens foram **PAUSADAS**. Este changelog preserva o histórico e não define a tarefa vigente. Consulte `.ai/context.md` para o estado operacional atual e não retome itens pausados sem solicitação explícita.
