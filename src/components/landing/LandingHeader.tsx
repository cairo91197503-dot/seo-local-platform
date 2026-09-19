import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Mascot } from '../mascot/Mascot'

/**
 * Cabeçalho da Landing Page pública (`src/pages/LandingPage.tsx`).
 *
 * Separado em componente próprio porque tem estado próprio (menu mobile) e é
 * o único lugar do app, por enquanto, que precisa desse padrão — o cabeçalho
 * do app autenticado (`src/components/layout/AppShell.tsx`) é mais simples
 * (sem menu) e continua como está, sem relação com este.
 *
 * "Como funciona" aponta para a âncora `#como-funciona` na própria
 * `LandingPage`, que hoje é a faixa de números do produto — ainda não existe
 * uma seção dedicada de "como funciona" passo a passo (fora do escopo desta
 * etapa, ver relatório).
 */
export function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
        toggleRef.current?.focus()
        return
      }

      if (e.key === 'Tab' && navRef.current) {
        const focusables = navRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return

        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <header className="landing-header">
      <div className="landing-header__bar">
        <Link to="/" className="landing-header__logo" onClick={closeMenu}>
          <Mascot pose="neutral" size={28} />
          <span className="landing-header__wordmark">Estrelar</span>
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="landing-header__menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="landing-header-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Fechar' : 'Menu'}
        </button>

        <nav
          ref={navRef}
          id="landing-header-nav"
          className={`landing-header__nav${menuOpen ? ' landing-header__nav--open' : ''}`}
          aria-label="Navegação principal"
        >
          <a href="#como-funciona" className="landing-header__link" onClick={closeMenu}>
            Como funciona
          </a>
          <Link to="/login" className="landing-header__link" onClick={closeMenu}>
            Entrar
          </Link>
          <Link to="/login" className="landing-header__cta" onClick={closeMenu}>
            Começar gratuitamente
          </Link>
        </nav>
      </div>
    </header>
  )
}
