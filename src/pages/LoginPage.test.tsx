import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext, type AuthContextValue } from '../lib/auth/auth-context'
import { LoginPage } from './LoginPage'

const mockAuthValue: AuthContextValue = {
  user: null,
  loading: false,
  configError: null,
  signInWithGoogle: vi.fn(),
  signOut: vi.fn(),
}

function renderWithAuth(ui: React.ReactElement, authValue = mockAuthValue) {
  return render(
    <AuthContext.Provider value={authValue}>
      <MemoryRouter>{ui}</MemoryRouter>
    </AuthContext.Provider>,
  )
}

describe('LoginPage', () => {
  it('renders the login page with title', () => {
    renderWithAuth(<LoginPage />)
    expect(screen.getByText('Bem-vindo ao Estrelar')).toBeInTheDocument()
  })

  it('renders the Google login button', () => {
    renderWithAuth(<LoginPage />)
    expect(screen.getByRole('button', { name: 'Entrar com o Google' })).toBeInTheDocument()
  })

  it('renders the mascot', () => {
    const { container } = renderWithAuth(<LoginPage />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders description text', () => {
    renderWithAuth(<LoginPage />)
    expect(screen.getByText(/conta Google/)).toBeInTheDocument()
  })
})
