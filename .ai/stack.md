# Stack Tecnológica e Ambientes

Este documento diferencia o que está implementado, planejado ou em avaliação. A presença de uma tecnologia nesta lista não autoriza instalação ou configuração.

## Implementado no repositório

- React e React DOM;
- TypeScript;
- Vite;
- React Router (`react-router-dom`), para roteamento real por URL entre as áreas do app;
- ESLint;
- Node.js 22, definido em `.nvmrc`;
- npm, com `package-lock.json`.

Antes de usar versões ou comandos específicos, confira os arquivos atuais do repositório, especialmente `package.json`, `package-lock.json` e `.nvmrc`.

## Planejado (scaffolding no código, nenhum serviço real conectado)

- Firebase (SDK instalado; `src/lib/firebase.ts` lê configuração só de variáveis de ambiente `VITE_FIREBASE_*`, ainda não definidas em nenhum lugar real);
- Firebase Authentication (login com Google; `src/lib/auth/AuthContext.tsx`, ainda não conectado a nenhuma tela);
- Firestore (regras de segurança em rascunho em `firestore.rules`; modelo de dados em `docs/05-BANCO-DE-DADOS.md`);
- Render para hospedagem/deploy (`render.yaml` em rascunho);
- integração futura com APIs do Google.

Nenhum projeto Firebase ou serviço Render real foi criado. O código acima só funciona depois que essas contas existirem e as variáveis de ambiente forem preenchidas — não trate como operacional sem nova inspeção.

## Em avaliação

- biblioteca de componentes e interface;
- solução para animações educacionais;
- sistema definitivo de gamificação;
- provedor e modelo de IA;
- arquitetura de funções de backend;
- estratégia definitiva de deploy.

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
- não é ambiente de execução;
- referências remotas locais podem estar desatualizadas até uma operação de rede explicitamente autorizada.

### Celular / Termux

- utilizado como terminal de acesso remoto;
- não presumir que o projeto ou suas dependências devam ser instalados diretamente no celular;
- confirmar o destino da sessão SSH antes de executar comandos.

Não registrar no repositório IPs privados, senhas, tokens, chaves, credenciais ou outros segredos. Caminhos específicos de cada máquina dependem de verificação no ambiente correspondente.
