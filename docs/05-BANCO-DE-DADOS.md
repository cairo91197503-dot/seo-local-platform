# Banco de Dados

**Status:** identidade e perfil básico do usuário decididos (2026-08-24). Progresso, XP, missões e lições continuam bloqueados por decisões pedagógicas em aberto — ver seção "Em aberto" abaixo.

## Serviço

Firestore (Firebase), conforme `docs/03-ARQUITETURA.md`. Nenhum projeto Firebase real foi criado ainda; este documento descreve o modelo planejado para quando o projeto existir.

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

## Em aberto

As coleções abaixo NÃO estão implementadas nem têm formato definido, porque dependem de decisões pedagógicas ainda marcadas como `DECISÃO NECESSÁRIA` em `docs/08-ARQUITETURA-PEDAGOGICA.md`: sistema definitivo de XP, persistência de progresso, formato e regras de quizzes, modelo definitivo de missão. Enquanto essas decisões não forem tomadas, não se deve inferir nomes de campo, estrutura de subcoleção ou regras de validação para:

- progresso de lições (quais cenas o usuário já viu, quando);
- XP e nível;
- sequência de dias (streak);
- estado das missões (disponível, ativa, concluída) e seus critérios de conclusão.

`firestore.rules` bloqueia por padrão qualquer coleção não listada acima — criar uma dessas coleções exigirá adicionar a regra correspondente antes de usá-la em produção.

## Fontes canônicas relacionadas

- Arquitetura geral: `docs/03-ARQUITETURA.md`.
- Decisões pedagógicas em aberto: `docs/08-ARQUITETURA-PEDAGOGICA.md`.
- Regras de segurança do Firestore: `firestore.rules`.
- Variáveis de ambiente necessárias: `.env.example`.
