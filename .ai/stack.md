# Stack Tecnológica e Ambientes

Este documento diferencia o que está implementado, planejado ou em avaliação. A presença de uma tecnologia nesta lista não autoriza instalação ou configuração.

## Implementado no repositório

- React e React DOM;
- TypeScript;
- Vite;
- React Router (`react-router-dom`), para roteamento real por URL entre as áreas do app;
- ESLint;
- Node.js 22, definido em `.nvmrc`;
- npm, com `package-lock.json`;
- Firebase SDK (app, auth, firestore) — projeto real `estrelar-cc725` criado em 2026-09-12;
- Firebase Authentication (login com Google via `signInWithPopup`) — conectado e funcionando;
- Firestore — produção (`southamerica-east1`), regras publicadas, `users/{uid}` + `users/{uid}/progress/journey`;
- Firebase Hosting — deploy automático via GitHub Actions (`firebase-hosting-merge.yml`);
- PWA instalável (manifest, service worker via `vite-plugin-pwa`, ícones);
- Vitest + React Testing Library + jsdom (43 testes);
- edge-tts (voz `pt-BR-AntonioNeural`) para narração de lições;
- Code splitting (Firestore via dynamic import, 4 rotas lazy);
- CSS Modules (ErrorBoundary, LoginPage, AppShell, BottomNav).

Antes de usar versões ou comandos específicos, confira os arquivos atuais do repositório, especialmente `package.json`, `package-lock.json` e `.nvmrc`.

## Planejado

- Google OAuth / Business Profile API — **bloqueado até aprovação da API** (ação do usuário);
- Assinatura Premium (R$19,90/mês);
- IA contextual por tarefa (fotos, posts, alertas, check-up automático);
- Performance (buscas/chamadas/rotas/termos) traduzida em linguagem simples;
- Planos Profissional/Agência (múltiplos negócios);
- Canal B2B2C (contadores, associações, Sebrae local, agências).

## Em avaliação

- biblioteca de componentes e interface;
- solução para animações educacionais;
- sistema definitivo de gamificação;
- provedor e modelo de IA;
- arquitetura de funções de backend.

## Princípio de arquitetura

Sempre que possível:

Frontend → serviços → APIs externas

Integrações externas devem ficar desacopladas da interface. A aplicação deve continuar oferecendo valor educacional quando uma API externa estiver indisponível.

## Ambientes

### PC principal

- ambiente principal de desenvolvimento local nesta etapa do projeto;
- possui recursos, ferramentas e arquivos locais próprios;
- diretório, branch, dependências e estado do worktree devem ser verificados em cada sessão.

### Oracle VM

- ambiente remoto real atualmente utilizado;
- pode possuir clone, dependências, ferramentas e estado Git diferentes do PC principal;
- não presumir sincronização automática nem a existência de arquivos do PC;
- caminhos e estado devem ser verificados dentro da própria VM.

### GitHub

- repositório remoto e mecanismo de versionamento e sincronização;
- deploy automático via GitHub Actions para Firebase Hosting;
- não é ambiente de execução;
- referências remotas locais podem estar desatualizadas até uma operação de rede explicitamente autorizada.

### Firebase Hosting

- produção do app (`estrelar-cc725`);
- deploy automático a cada push na `main` via `firebase-hosting-merge.yml`;
- preview por PR via `firebase-hosting-pull-request.yml`.

### Celular / Termux

- utilizado como terminal de acesso remoto;
- não presumir que o projeto ou suas dependências devam ser instalados diretamente no celular;
- confirmar o destino da sessão SSH antes de executar comandos.

Não registrar no repositório IPs privados, senhas, tokens, chaves, credenciais ou outros segredos. Caminhos específicos de cada máquina dependem de verificação no ambiente correspondente.
