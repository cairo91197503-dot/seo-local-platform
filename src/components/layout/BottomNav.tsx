import { NavLink } from 'react-router-dom'

type NavItem = {
  to: string
  label: string
}

const navItems: NavItem[] = [
  { to: '/', label: 'Início' },
  { to: '/aprender', label: 'Aprender' },
  { to: '/missoes', label: 'Missões' },
  { to: '/ferramentas', label: 'Ferramentas' },
]

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      <ul className="bottom-nav__list">
        {navItems.map((item) => (
          <li key={item.to} className="bottom-nav__item">
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'bottom-nav__button bottom-nav__button--active'
                  : 'bottom-nav__button'
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
