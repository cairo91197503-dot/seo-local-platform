import { Link, Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function AppShell() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="app-header__home" to="/">
          Início
        </Link>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
