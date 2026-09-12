import { createContext } from 'react'
import type { User } from 'firebase/auth'

export type AuthContextValue = {
  user: User | null
  loading: boolean
  /**
   * Mensagem de erro quando o Firebase não está configurado neste ambiente
   * (variáveis `VITE_FIREBASE_*` ausentes — ver `.env.example`). Enquanto
   * isto não for `null`, não há como autenticar: nenhum projeto Firebase
   * real foi criado ainda (`.ai/context.md`).
   */
  configError: string | null
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
