# Changelog

## 2026-08-24 — Arquitetura de Firebase (auth, dados, deploy) preparada (Fase 2)

Com o roteamento real já implementado, a IA avançou no que restava da Fase 2 que não depende de criar contas: arquitetura e scaffolding de código para Firebase, Firestore e deploy no Render, mantendo o limite de nunca criar contas/credenciais (`.ai/rules.md`) e de não inferir decisões pedagógicas marcadas `DECISÃO NECESSÁRIA` (`docs/08-ARQUITETURA-PEDAGOGICA.md`).

**Decisão de produto:** autenticação apenas com conta Google (Firebase Authentication, sem e-mail/senha), pelo menor atrito para o público-alvo e por já haver dependência do ecossistema Google. Racional completo em `src/lib/auth/AuthContext.tsx`.

**Código adicionado** (nada disso está conectado a nenhuma tela ainda — é infraestrutura, não integração de UI):

- `src/lib/firebase.ts`: inicialização do Firebase App/Auth/Firestore lendo configuração só de variáveis de ambiente (`VITE_FIREBASE_*`); lança um erro claro listando as variáveis faltando em vez de falhar silenciosamente.
- `src/lib/auth/auth-context.ts`, `AuthContext.tsx`, `useAuth.ts`: contexto de autenticação (usuário atual, `signInWithGoogle`, `signOut`), separado em três arquivos para respeitar a regra do ESLint sobre Fast Refresh (`react-refresh/only-export-components`).
- `firestore.rules`: regras de segurança em rascunho — cada usuário só lê/escreve o próprio documento em `users/{uid}`; qualquer outro caminho é bloqueado por padrão (menor privilégio, `docs/04-REGRAS.md`).
- `render.yaml`: blueprint de deploy em rascunho para site estático, incluindo a regra de rewrite de SPA (`/* → /index.html`, necessária por causa do roteamento real) e variáveis de ambiente do Firebase declaradas com `sync: false` (nunca vão para o repositório).
- `.env.example`: adicionada a seção de variáveis `VITE_FIREBASE_*`, com nota explicando que a config web do Firebase não é secreta por natureza, mas segue o mesmo padrão de variável de ambiente do projeto.
- `docs/05-BANCO-DE-DADOS.md`: preenchido pela primeira vez — coleção `users/{uid}` com identidade/perfil básico definida; progresso, XP, missões e lições explicitamente listados como bloqueados pelas decisões pedagógicas pendentes, para não serem inferidos por engano depois.
- `firebase` foi adicionado a `package.json`/`package-lock.json` (SDK oficial). Como em ciclos anteriores, os metadados `libc` de pacotes opcionais não relacionados — removidos incidentalmente pela versão de npm deste ambiente a cada instalação — foram restaurados manualmente para manter o diff do lockfile limitado à mudança real.

Validado com `npm run build`, `npm run lint`, `npm ci` limpo, e dois testes de fumaça funcionais via `vite` (`ssrLoadModule`, aplicando a substituição real de `import.meta.env`): sem variáveis de ambiente configuradas, `src/lib/firebase.ts` lança o erro esperado listando exatamente o que falta; com variáveis de teste locais (nunca reais, nunca commitadas), App/Auth/Firestore inicializam corretamente. Nenhuma chamada de rede real ao Firebase foi feita — e não seria possível a partir deste ambiente de qualquer forma.

**Continua bloqueado, depende do usuário:** criar o projeto Firebase de fato, habilitar o provedor de login Google, criar o banco Firestore, publicar `firestore.rules` nele, criar a conta/serviço no Render e preencher as variáveis de ambiente reais (no Render e/ou em `.env.local` local). Nenhuma dessas ações foi ou pode ser feita pela IA (`.ai/rules.md`).

## 2026-08-24 — Roteamento real por URL (Fase 2)

Com a Fase 3 pausada e a migração visual concluída, a IA avançou autonomamente para a Fase 2 do roadmap (MVP técnico). O que a navegação por abas fazia com `useState` (sem URL própria, sem suporte a voltar do navegador, sem deep link) foi substituído por roteamento real com `react-router-dom`: `/` (Início), `/aprender`, `/missoes` e `/ferramentas`, com fallback de rota desconhecida redirecionando para `/`. `BottomNav` passou a usar `NavLink` (marcando a rota ativa automaticamente via `aria-current`), e `HomePage`/`LearnPage` passaram a navegar com `useNavigate` em vez de receber um callback `onNavigate` repassado manualmente por toda a árvore de componentes.

Essa é uma mudança de infraestrutura de navegação, não de conteúdo — nenhum texto, lógica ou estrutura pedagógica da lição em `LearnPage` foi alterado, respeitando a pausa da Fase 3.

`package-lock.json` foi atualizado para incluir a nova dependência (`react-router-dom` e suas transitivas `react-router`, `cookie`, `set-cookie-parser`); os metadados `libc` de pacotes opcionais não relacionados, que a versão de npm deste ambiente remove incidentalmente a cada instalação, foram restaurados manualmente para manter o diff limitado à mudança real, como em ciclos anteriores.

Validado com `npm run build`, `npm run lint`, `npm ci` limpo (lockfile íntegro) e verificação funcional com Playwright: navegação por clique nos 4 links do menu inferior, link direto/deep link com reload em `/aprender`, e botão "voltar" do navegador — todos funcionando corretamente, sem regressão visual nas capturas de tela.

Deploy real (Fase 2: Firebase, autenticação, banco de dados, deploy no Render) continua bloqueado por depender de criação de contas e credenciais, ação que a IA não está autorizada a executar; ver `.ai/rules.md`. Ao deployar como site estático, será necessário configurar uma regra de rewrite (todas as rotas para `/index.html`) para o roteamento funcionar em produção — anotado em `docs/02-ROADMAP.md`.

## 2026-08-24 — Design system aplicado às telas existentes; Fase 3 (Academia) pausada

A pedido do usuário, a Fase 3 do roadmap (conteúdo educacional/Academia, incluindo o pipeline de lições) foi pausada por completo — nenhum item dessa fase deve ser retomado sem solicitação explícita. Ver `.ai/context.md`, seção "Itens pausados".

Em seguida, a IA aplicou os tokens de paleta e tipografia já decididos (`docs/06-DESIGN-SYSTEM.md`) às telas existentes do MVP em `src/styles/index.css`: fundo, texto principal, texto secundário, linhas/cartões e as duas cores de acento (estrela/dourado para avaliação-XP-conquista, verde-crescimento para CTA/confirmação) foram tokenizados em `body`, cabeçalhos, navegação inferior, cartões da Home, missões, ferramentas e lista de lições; tipografia (Fredoka para títulos/conquistas, Work Sans para corpo) foi aplicada de forma universal, inclusive dentro da tela imersiva escura de lição. O botão primário de ação (`.home-block__button`, usado em todo o app) foi separado do botão secundário de atalho (`.quick-access__button`, específico da Home) para que só o primário use a cor de ação verde — o secundário permanece neutro.

Decisão consciente de escopo: as cores de fundo/overlay da tela imersiva escura de lição (`.learn-page--lesson`) foram **propositalmente mantidas** com suas cores literais originais, por ser um modo visual distinto (imersivo/escuro) e não uma tela "padrão" do app; apenas a tipografia foi unificada lá. Superfícies elevadas como cartões (`.home-block`, `.bottom-nav`) mantêm `#fff` literal, por representar um papel de "superfície elevada" acima do fundo tokenizado, não uma cor de marca.

Validado com `npm run build` (bundle CSS cresceu de 9.03 kB para 10.18 kB, gzip 2.26→2.45 kB), `npm run lint` e `git diff --check`. Verificação visual adicional feita com Playwright (Chromium headless, viewport 390×844) capturando as telas Home, lista de Missões, missão ativa e lista de Aprender contra um build local (`vite preview`); as quatro capturas foram revisadas e não mostraram quebra de layout, contraste ou legibilidade.

## 2026-08-24 — Geração de imagens do pipeline de lições passa a ser automática

A pedido do usuário, o pipeline assistido de rascunhos (`scripts/generate-lesson.ts`) deixou de exigir colar prompts manualmente no Meta AI para gerar as imagens de cada cena. `GeminiAdapter` ganhou um método `generateImage`, usando o mesmo modelo de imagem da família "Nano Banana" (`gemini-3.1-flash-image` por padrão, configurável por `GEMINI_IMAGE_MODEL`) e a mesma chave já usada para texto (`GOOGLE_AI_STUDIO_API_KEY`) — nenhuma credencial nova foi introduzida. Essa foi uma retomada explícita e pontual do item "geração definitiva de imagens", que estava pausado em `.ai/context.md` desde 2026-08-09; a investigação de Cloudflare Workers AI (outro item pausado, não usado aqui) continua pausada.

O CLI agora gera e salva o PNG de cada cena automaticamente dentro de `content-drafts/<lesson-id>/images/`, mas essas imagens continuam sendo rascunho — a revisão humana antes de promover qualquer asset para `public/` continua obrigatória, sem exceção. Cada execução completa do comando consome cota paga da API Gemini (1 chamada de roteiro + 1 de prompt e 1 de imagem por cena); isso só acontece quando um humano roda o comando localmente. Validado com `tsc --noEmit` (via `npm run lint`), `npm run build` e um teste de fumaça do CLI sem credenciais reais — a chamada de rede real não pôde ser testada neste ambiente (a API do Gemini não está na allowlist de rede do sandbox usado pela IA) e depende de teste manual do usuário com sua própria chave. Detalhes em `docs/09-PADRAO-DE-LICOES.md`.

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
