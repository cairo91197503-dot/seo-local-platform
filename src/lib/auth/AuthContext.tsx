import {
  type Auth,
  GoogleAuthProvider,
  type User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { type ReactNode, useEffect, useMemo, useState } from 'react'
import { getFirebaseAuth } from '../firebase'
import { AuthContext, type AuthContextValue } from './auth-context'
import { upsertUserProfile } from './userProfile'

/**
 * Provider de autenticação do app.
 *
 * Decisão de produto (Fase 2, 2026-08-24): login apenas com conta Google
 * (`signInWithPopup` + `GoogleAuthProvider`), sem e-mail/senha. Motivos:
 * - menor atrito para o público-alvo (pequeno empresário sem bagagem técnica);
 * - evita a superfície de suporte de "esqueci minha senha";
 * - o produto já vive no ecossistema Google (Perfil da Empresa), então pedir
 *   a mesma conta Google é natural e prepara terreno para a Fase 7
 *   (Integração Google), que também dependerá de OAuth Google.
 * Se um método alternativo se mostrar necessário (ex.: usuário sem conta
 * Google), isso deve ser decidido explicitamente, não assumido aqui.
 *
 * Este contexto NÃO está conectado a nenhuma tela do app ainda. Quando e como
 * o app deve pedir login (bloquear tudo, deixar navegar sem login, pedir só
 * para salvar progresso etc.) depende da decisão pendente "persistência de
 * progresso" em `docs/08-ARQUITETURA-PEDAGOGICA.md` — não deve ser inferido.
 *
 * O contexto em si vive em `./auth-context.ts` e o hook de acesso em
 * `./useAuth.ts`, em arquivos separados deste, para não misturar exportação
 * de componente com exportação de valor/função no mesmo módulo (regra
 * `react-refresh/only-export-components` do ESLint).
 *
 * Conectado ao app em 2026-09-12 (`src/app/App.tsx`, `AuthGate`): a jornada
 * inteira (onboarding, lições, missões) agora exige login antes, conforme
 * `docs/12-ESPECIFICACAO-MVP.md` ("Login Google → Onboarding → ..."). Como
 * nenhum projeto Firebase real existe ainda, este provider trata a ausência
 * de configuração (`VITE_FIREBASE_*`) como um estado próprio (`configError`)
 * em vez de deixar o erro derrubar o app inteiro — ver `AuthGate`.
 */

type AuthInit = { auth: Auth } | { configError: string }

/**
 * Tenta obter a instância do Firebase Auth uma única vez, na inicialização
 * do provider (`useState(() => ...)`), e não dentro de um `useEffect`: isso
 * evita chamar `setState` de forma síncrona no corpo do efeito, o que o
 * lint (`react-hooks/set-state-in-effect`) rejeita por poder causar
 * renders em cascata.
 */
function initializeAuth(): AuthInit {
  try {
    return { auth: getFirebaseAuth() }
  } catch (error) {
    return {
      configError:
        error instanceof Error ? error.message : 'Configuração do Firebase ausente.',
    }
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authInit] = useState<AuthInit>(initializeAuth)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState('auth' in authInit)

  useEffect(() => {
    if (!('auth' in authInit)) {
      return
    }

    const unsubscribe = onAuthStateChanged(authInit.auth, (nextUser) => {
      setUser(nextUser)
      setLoading(false)

      if (nextUser) {
        // Best-effort: não bloqueia o login nem a navegação se a escrita
        // do perfil falhar (ex.: offline). Só registra no console.
        upsertUserProfile(nextUser).catch((error) => {
          console.error('Falha ao salvar o perfil do usuário em users/{uid}:', error)
        })
      }
    })

    return unsubscribe
  }, [authInit])

  const configError = 'configError' in authInit ? authInit.configError : null

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      configError,
      signInWithGoogle: async () => {
        const auth = getFirebaseAuth()
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
      },
      signOut: async () => {
        const auth = getFirebaseAuth()
        await firebaseSignOut(auth)
      },
    }),
    [user, loading, configError],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
