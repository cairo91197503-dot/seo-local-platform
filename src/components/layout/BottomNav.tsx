import { NavLink } from 'react-router-dom'

type NavItem = {
  to: string
  label: string
  end: boolean
}

const navItems: NavItem[] = [
  { to: '/', label: 'Início', end: true },
  { to: '/aprender', label: 'Aprender', end: false },
  { to: '/missoes', label: 'Missões', end: false },
  { to: '/ferramentas', label: 'Ferramentas', end: false },
]

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      <ul className="bottom-nav__list">
        {navItems.map((item) => (
          <li key={item.to} className="bottom-nav__item">
            <NavLink
              to={item.to}
              end={item.end}
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
