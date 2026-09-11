import { useContext } from 'react'
import { AuthContext, type AuthContextValue } from './auth-context'

/** Hook de acesso ao contexto de autenticação. Deve ser usado dentro de `AuthProvider`. */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}
