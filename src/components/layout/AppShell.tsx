import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../../lib/auth/useAuth'
import { BottomNav } from './BottomNav'
import styles from './AppShell.module.css'

export function AppShell() {
  const { user, signOut } = useAuth()
  const [signingOut, setSigningOut] = useState(false)
  const firstName = user?.displayName?.split(' ')[0]

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await signOut()
    } catch {
      setSigningOut(false)
    }
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link className={styles.home} to="/">
          Inicio
        </Link>
        <div className={styles.user}>
          {firstName && <span className={styles.greeting}>Ola, {firstName}</span>}
          <button
            type="button"
            className={styles.logout}
            onClick={handleSignOut}
            disabled={signingOut}
          >
            {signingOut ? 'Saindo...' : 'Sair'}
          </button>
        </div>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
