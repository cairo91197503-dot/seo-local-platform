export type AppArea = 'home' | 'learn' | 'missions' | 'tools'

type NavItem = {
  id: AppArea
  label: string
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Início' },
  { id: 'learn', label: 'Aprender' },
  { id: 'missions', label: 'Missões' },
  { id: 'tools', label: 'Ferramentas' },
]

type BottomNavProps = {
  activeArea: AppArea
  onNavigate: (area: AppArea) => void
}

export function BottomNav({ activeArea, onNavigate }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      <ul className="bottom-nav__list">
        {navItems.map((item) => {
          const isActive = activeArea === item.id

          return (
            <li key={item.id} className="bottom-nav__item">
              <button
                type="button"
                className={
                  isActive
                    ? 'bottom-nav__button bottom-nav__button--active'
                    : 'bottom-nav__button'
                }
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
