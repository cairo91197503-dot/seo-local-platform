import { useState } from 'react'
import { Mascot } from '../components/mascot/Mascot'
import { useAuth } from '../lib/auth/useAuth'

/**
 * Tela de login — resgata a funcionalidade que já funcionava no protótipo
 * anterior (LocalPulse-WEB-V2, ver `legacy/web-localpulse-v2/src/pages/Login.tsx`),
 * adaptada à identidade visual do Estrelar e à decisão de produto já tomada
 * de login **só com Google** (`docs/05-BANCO-DE-DADOS.md`, seção
 * "Autenticação") — sem e-mail/senha, diferente do protótipo original.
 */
export function LoginPage() {
  const { signInWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)

    try {
      await signInWithGoogle()
    } catch (err) {
      console.error('Falha no login com Google:', err)
      setError('Não foi possível entrar com o Google. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <Mascot pose="neutral" size={88} />
      <h1 className="login-page__title">Bem-vindo ao Estrelar</h1>
      <p className="login-page__description">
        Entre com sua conta Google para começar sua jornada e guardar seu progresso.
      </p>
      <button
        type="button"
        className="login-page__button"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        {loading ? 'Entrando…' : 'Entrar com o Google'}
      </button>
      {error && (
        <p className="login-page__error" role="alert">
          {error}
        </p>
      )}
    </main>
  )
}
