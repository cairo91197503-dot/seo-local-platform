import {
  GoogleAuthProvider,
  type User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { type ReactNode, useEffect, useMemo, useState } from 'react'
import { getFirebaseAuth } from '../firebase'
import { AuthContext, type AuthContextValue } from './auth-context'

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
 */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getFirebaseAuth()
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
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
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
