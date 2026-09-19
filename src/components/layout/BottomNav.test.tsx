import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { BottomNav } from './BottomNav'

function renderWithRouter(initialRoute = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <BottomNav />
    </MemoryRouter>,
  )
}

describe('BottomNav', () => {
  it('renders all navigation items', () => {
    renderWithRouter()
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Aprender')).toBeInTheDocument()
    expect(screen.getByText('Missoes')).toBeInTheDocument()
    expect(screen.getByText('Ferramentas')).toBeInTheDocument()
  })

  it('renders navigation landmark', () => {
    renderWithRouter()
    expect(screen.getByRole('navigation', { name: 'Navegacao principal' })).toBeInTheDocument()
  })

  it('renders links with correct hrefs', () => {
    renderWithRouter()
    expect(screen.getByText('Inicio').closest('a')).toHaveAttribute('href', '/')
    expect(screen.getByText('Aprender').closest('a')).toHaveAttribute('href', '/aprender')
    expect(screen.getByText('Missoes').closest('a')).toHaveAttribute('href', '/missoes')
    expect(screen.getByText('Ferramentas').closest('a')).toHaveAttribute('href', '/ferramentas')
  })

  it('renders SVG icons', () => {
    const { container } = renderWithRouter()
    const svgs = container.querySelectorAll('svg')
    expect(svgs).toHaveLength(4)
  })
})
