import { useState } from 'react'
import { Mascot } from '../components/mascot/Mascot'
import { useAuth } from '../lib/auth/useAuth'
import styles from './LoginPage.module.css'

/**
 * Tela de login — resgata a funcionalidade que ja funcionava no prototipo
 * anterior (LocalPulse-WEB-V2, ver legacy/web-localpulse-v2/src/pages/Login.tsx),
 * adaptada a identidade visual do Estrelar e a decisao de produto ja tomada
 * de login so com Google (docs/05-BANCO-DE-DADOS.md, secao
 * "Autenticacao") — sem e-mail/senha, diferente do prototipo original.
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
      setError('Nao foi possivel entrar com o Google. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <Mascot pose="neutral" size={88} />
      <h1 className={styles.title}>Bem-vindo ao Estrelar</h1>
      <p className={styles.description}>
        Entre com sua conta Google para comecar sua jornada e guardar seu progresso.
      </p>
      <button
        type="button"
        className={styles.button}
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        {loading ? 'Entrando...' : 'Entrar com o Google'}
      </button>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </main>
  )
}
