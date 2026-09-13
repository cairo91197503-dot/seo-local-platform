# Banco de Dados

**Status:** identidade e perfil básico do usuário decididos (2026-08-24). Mecanismo técnico de persistência do progresso resolvido em 2026-09-13 (ver seção "Progresso da jornada" abaixo) — mas o formato definitivo de XP, missões e quizzes continua bloqueado por decisões pedagógicas em aberto (ver seção "Em aberto").

## Serviço

Firestore (Firebase), conforme `docs/03-ARQUITETURA.md`. O projeto Firebase real ("Estrelar", `estrelar-cc725`) foi criado em 2026-09-12: Authentication (provedor Google) e Firestore (modo produção, região `southamerica-east1`) estão ativos, e as regras de segurança abaixo já foram publicadas no console. Login com Google testado e funcionando. Deploy do app (Render) ainda depende de ação do usuário — ver `docs/02-ROADMAP.md`.

## Autenticação

Login apenas com conta Google (Firebase Authentication, `GoogleAuthProvider`). Sem e-mail/senha no MVP. Racional e implementação em `src/lib/auth/AuthContext.tsx`.

## Coleções

### `users/{uid}`

Um documento por usuário autenticado, com `{uid}` igual ao UID do Firebase Authentication. Contém apenas dados de identidade/perfil:

```ts
type UserProfile = {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
  createdAt: Timestamp
}
```

Regra de acesso: o usuário só pode ler e escrever o próprio documento (`firestore.rules`, na raiz do repositório).

### `users/{uid}/progress/journey`

Documento único por usuário autenticado com o estado completo da jornada (`JourneyState`, `src/state/journey.ts`) — a mesma forma que já existia só em `localStorage`, agora também salva por conta, para o progresso sobreviver a trocar de aparelho/navegador ou reinstalar o app. Não é uma coleção nova de "progresso pedagógico definitivo": é o mecanismo técnico de persistência do que já existia, resolvendo a `DECISÃO NECESSÁRIA` "persistência de progresso" de `docs/08-ARQUITETURA-PEDAGOGICA.md` só nessa parte (mecanismo/onde os dados moram) — XP definitivo, modelo de missão definitivo e formato de quiz continuam em aberto, e mudar qualquer um deles no futuro só muda a forma deste mesmo documento, não onde ele mora.

```ts
type JourneyState = {
  version: 2
  onboardingCompleted: boolean
  completedLessonIds: string[]
  missionStatuses: Record<string, MissionStatus>
  xp: number
  awardedMilestoneIds: string[]
}
```

Mais um campo, `updatedAt` (timestamp do servidor), gravado a cada escrita só para depuração — não faz parte do tipo `JourneyState` nem é lido de volta.

Regra de acesso: mesma coisa — só o próprio usuário lê e escreve (`firestore.rules`). Documento separado do `users/{uid}` (identidade) de propósito: escritas de progresso são frequentes (a cada lição/missão concluída) e não devem competir com a escrita, rara, do perfil de identidade.

Fonte de verdade quando há conta logada: o Firestore. O `localStorage` (`estrelar-journey-v2:{uid}`) continua existindo só como cache local — primeira renderização instantânea e uso offline — e é sempre sobrescrito pelo que vier do Firestore assim que a leitura remota responder (`src/state/JourneyProvider.tsx`).

## Em aberto

As coleções/campos abaixo NÃO têm formato definitivo, porque dependem de decisões pedagógicas ainda marcadas como `DECISÃO NECESSÁRIA` em `docs/08-ARQUITETURA-PEDAGOGICA.md`: sistema definitivo de XP, formato e regras de quizzes, modelo definitivo de missão. Enquanto essas decisões não forem tomadas, não se deve inferir nomes de campo novos, estrutura de subcoleção adicional ou regras de validação de conteúdo para:

- progresso de lições em nível de cena (quais cenas o usuário já viu, quando — hoje só existe conclusão por lição inteira, em `completedLessonIds`);
- fórmula definitiva de XP e nível;
- sequência de dias (streak);
- critérios de conclusão de missão além do fluxo atual (disponível → em progresso → ação concluída → concluída).

`firestore.rules` bloqueia por padrão qualquer coleção não listada explicitamente — criar uma coleção nova além de `users/{uid}` e `users/{uid}/progress/journey` exigirá adicionar a regra correspondente antes de usá-la em produção.

## Fontes canônicas relacionadas

- Arquitetura geral: `docs/03-ARQUITETURA.md`.
- Decisões pedagógicas em aberto: `docs/08-ARQUITETURA-PEDAGOGICA.md`.
- Regras de segurança do Firestore: `firestore.rules`.
- Variáveis de ambiente necessárias: `.env.example`.
