import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../../lib/auth/useAuth'
import { BottomNav } from './BottomNav'

export function AppShell() {
  // AppShell só é renderizado dentro do AuthGate (src/app/App.tsx), então
  // `user` sempre existe aqui — não precisa tratar o caso `null`.
  const { user, signOut } = useAuth()
  const firstName = user?.displayName?.split(' ')[0]

  const handleSignOut = () => {
    void signOut()
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="app-header__home" to="/">
          Início
        </Link>
        <div className="app-header__user">
          {firstName && <span className="app-header__greeting">Olá, {firstName}</span>}
          <button type="button" className="app-header__logout" onClick={handleSignOut}>
            Sair
          </button>
        </div>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
