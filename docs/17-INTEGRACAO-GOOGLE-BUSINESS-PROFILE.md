# Esboço de Arquitetura — Integração com o Google Business Profile (Premium)

Este documento é um **esboço**, não uma implementação. Nenhuma chamada real às APIs do Google está ativa — este projeto ainda não tem acesso aprovado. O objetivo aqui é deixar a arquitetura pensada com antecedência, para que, no dia em que o acesso for aprovado, a implementação seja rápida e já nasça isolada do resto do app (ver "Por que isolar", abaixo).

Contexto de decisão: `docs/02-ROADMAP.md`, seção "Reposicionamento estratégico" (2026-09-13). Esta integração é a base técnica do plano Premium (P1 do roadmap de prioridade) e está bloqueada até a aprovação de acesso à API — ver seção 1.

## 0. Antes de qualquer código: o que só o usuário pode fazer

Nenhum destes itens pode ser feito por uma sessão de IA — são ações que exigem uma conta Google real, decisões de negócio e, possivelmente, documentos formais do CJ Studio:

1. Criar um projeto no Google Cloud Console vinculado à conta que administrará a integração.
2. Preencher a solicitação de acesso à API do Google Business Profile, com justificativa comercial (o que o Estrelar faz, para quem, como os dados são usados e protegidos).
3. Ter um site empresarial válido publicado (é um dos requisitos da solicitação — reforça a prioridade P0 "colocar o app no ar" no roadmap, que também é pré-requisito desta fase).
4. Aguardar a análise — o Google indica prazo de até 14 dias, mas pode ser mais.
5. Depois de aprovado: configurar a tela de consentimento OAuth (nome do app, logo, política de privacidade — `docs/15-PUBLICACAO-ANDROID.md` já cobre a necessidade de uma política de privacidade pela publicação Android, ela serve aqui também) e os escopos exatos solicitados.

**Recomendação:** iniciar o passo 1–3 o quanto antes, mesmo antes do deploy estar 100% pronto — o prazo de análise corre em paralelo, não precisa esperar o resto do roadmap.

## 1. As três APIs envolvidas

| API | Para que serve aqui | Prioridade de uso |
|---|---|---|
| **Business Profile API** (Account Management + Business Information) | Ler e atualizar nome, endereço, telefone, categoria, horário, serviços, descrição | P1 — base do "Meu Perfil" |
| **Reviews (dentro da Business Profile API)** | Listar avaliações, ler texto/nota, publicar resposta | P1 — base da "killer feature" (resposta sugerida por IA) |
| **Performance API** | Métricas diárias/mensais: buscas, chamadas, pedidos de rota, termos de pesquisa | P3 — só depois de P1/P2 validados |

Cada uma tem escopos OAuth próprios — pedir só o escopo mínimo necessário para a funcionalidade que está ativa naquele momento (não pedir Performance no dia 1, por exemplo, já que ela só entra em P3).

## 2. Por que isolar a integração do resto do app

Esta é a lição mais importante do histórico do próprio projeto: o LocalPulse (versão anterior) implementou OAuth e um proxy de dados do Google, mas nunca obteve acesso oficial — e por depender disso de forma estrutural, a evolução do produto travou (`docs/10-HERANCA-LOCALPULSE.md`). Duas garantias que este esboço já assume, para não repetir isso:

1. **O Free nunca depende desta camada.** Currículo, missões, QR Code e gamificação continuam funcionando 100% sem nenhuma credencial do Google Business Profile — hoje isso já é verdade (o app só usa o Google como provedor de login via Firebase Auth, que é uma integração completamente diferente e já aprovada/funcionando). Este esboço não muda isso.
2. **Toda chamada às três APIs acima passa por um módulo único**, isolado do resto do código (proposta: `src/integrations/google-business-profile/`), com uma interface estável voltada para o app (`getProfile()`, `listReviews()`, `replyToReview()`, `getPerformance()`...) por trás da qual ficam os detalhes de autenticação, escopos, paginação e tratamento de erro da API real. Se o Google mudar um endpoint, revogar acesso, ou se um dia for preciso trocar de fornecedor de dados, só esse módulo muda — o resto do app (UI, state, missões) não sabe que a API existe.

## 3. Fluxo de OAuth e consentimento (proposta)

Segue o mesmo padrão já usado no app para autenticação (Firebase Auth com Google, `AuthGate` em `src/app/App.tsx`), mas como um **segundo consentimento, separado e opcional**, pedido só quando o usuário decide assinar o Premium — nunca junto do login inicial:

1. Usuário já está logado no Estrelar (login normal, Firebase Auth).
2. Na tela de upgrade para Premium (ou na Lição 12, que já planta essa semente — ver `docs/07-CHANGELOG.md`), botão "Conectar meu Google".
3. Fluxo OAuth 2.0 abre a tela de consentimento do próprio Google, mostrando exatamente quais permissões o Estrelar está pedindo (perfil da empresa, avaliações; performance só quando P3 estiver ativo).
4. Usuário aprova (ou nega — nesse caso, a tela explica que sem essa conexão o Premium não funciona, mas o Free continua disponível).
5. Se a conta Google tiver mais de um negócio, o app lista os negócios administrados por ela e pede para o usuário escolher qual conectar (o plano de R$19,90 é para 1 negócio só, ver roadmap).
6. Tokens de acesso/atualização ficam guardados associados ao usuário (nunca expostos no front-end) — local de armazenamento a decidir junto da escolha de backend real (hoje o app é só Firebase + front-end estático; isso provavelmente exige uma function/backend mínimo para não expor o `client_secret` no navegador).

## 4. Desvinculação (obrigatória por política do Google)

O Google exige que, quando o usuário pedir para desconectar, o app ofereça a desvinculação em até 7 dias úteis. Proposta:

- Botão "Desconectar Google" sempre visível na tela "Meu Perfil" do Premium (não escondido em configurações profundas).
- Ao clicar, o app revoga o token imediatamente e apaga qualquer dado em cache do perfil conectado — não precisa esperar 7 dias para revogar, o prazo do Google é um teto máximo, não uma meta.
- O usuário mantém acesso ao Free normalmente depois de desconectar; só perde as funcionalidades que dependem da conexão.

## 5. Aprovação antes de publicar (não negociável)

Em nenhum fluxo do Premium o Estrelar publica algo no perfil real do usuário sem uma confirmação explícita naquela ação específica — isso vale tanto por política do Google (que proíbe automação de respostas sem consentimento específico) quanto pelo risco apontado na análise do usuário (IA errando o tom numa resposta a uma avaliação negativa, por exemplo). Padrão para toda ação de escrita:

```
IA sugere → usuário revisa/edita → usuário aprova → Estrelar publica
```

Nunca:

```
IA sugere → Estrelar publica
```

## 6. Onde isso se conecta ao modelo de créditos do Premium

Decisão do usuário (2026-09-13): o Premium terá um **limite de uso de IA incluso na mensalidade** (quantidade a calibrar com uso real dos primeiros usuários — a análise inicial sugeriu algo como resposta de avaliação = 1 crédito, edição de foto = 5, geração de imagem = 10) e, além disso, **recompra de créditos extras** como fonte de receita adicional quando o usuário estourar o limite mensal — não é só um teto que bloqueia o uso, é também um mecanismo de monetização extra.

Esse controle de créditos fica **fora** do módulo de integração Google descrito aqui — ele é uma camada de negócio (quantas vezes o usuário pode chamar a IA este mês, e o que acontece quando ele quer mais), enquanto o módulo de integração é uma camada técnica (como falar com a API do Google). Separar os dois evita que uma mudança de regra de negócio (ex.: mudar de 100 para 150 créditos, ou o preço do pacote de recompra) exija tocar no código que fala com o Google, e vice-versa.

Implicações práticas de ter recompra (e não só um limite fixo): precisa de um segundo fluxo de cobrança além da assinatura recorrente (compra avulsa de pacote de créditos), e o saldo de créditos passa a ser um dado que o usuário provavelmente vai querer ver ("quantos créditos me restam este mês") — diferente da proposta inicial de esconder isso da interface. Vale decidir isso junto da escolha de gateway de pagamento (P1).

## 7. O que fica pendente de decisão

- Onde os tokens OAuth ficam guardados — hoje o app não tem backend próprio além do Firebase; isso pode exigir uma Cloud Function ou serviço mínimo, o que é uma decisão de arquitetura maior que vale discutir separadamente quando a API for aprovada.
- Cobrança/assinatura (gateway de pagamento) — não coberto neste esboço, é uma peça própria do P1.
- Modelo exato de créditos (quantidade, o que consome quanto) — proposta inicial já está na análise do usuário; vale revisar com dados reais de uso assim que houver os primeiros usuários Premium.
