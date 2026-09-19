import { Link } from 'react-router-dom'
import { Mascot } from '../mascot/Mascot'

/**
 * Rodapé da Landing Page pública (Etapa 3 — acabamento). Simples, sem
 * inventar dados institucionais que o projeto não possui: nenhuma menção a
 * CNPJ, endereço, telefone, e-mail ou redes sociais, porque nada disso
 * existe em `docs/`. O aviso sobre o Google é o único texto institucional,
 * na redação sugerida pelo briefing desta etapa.
 *
 * Âncoras reais, verificadas nos arquivos atuais da Landing antes de usar
 * (nenhum id duplicado): `#como-funciona` já existe desde a Etapa 1
 * (`LandingPage.tsx`); `#conteudo` e `#ferramentas` foram adicionados nesta
 * etapa a `LearningSection`/`ReviewToolSection` especificamente para este
 * rodapé. "Entrar" e "Começar gratuitamente" reutilizam a mesma rota
 * `/login` já usada pelo Header e pelo Hero — nenhum fluxo novo.
 */
export function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer__inner">
        <div className="landing-footer__brand">
          <Link to="/" className="landing-footer__logo">
            <Mascot pose="neutral" size={24} />
            <span className="landing-footer__wordmark">Estrelar</span>
          </Link>
          <p className="landing-footer__description">
            O assistente do pequeno negócio para cuidar do Perfil da Empresa no Google.
          </p>
        </div>

        <nav className="landing-footer__nav" aria-label="Navegação do rodapé">
          <a href="#como-funciona" className="landing-footer__link">
            Como funciona
          </a>
          <a href="#conteudo" className="landing-footer__link">
            O que você aprende
          </a>
          <a href="#ferramentas" className="landing-footer__link">
            Ferramentas
          </a>
          <Link to="/login" className="landing-footer__link">
            Entrar
          </Link>
          <Link to="/login" className="landing-footer__link">
            Começar gratuitamente
          </Link>
          <Link to="/privacidade" className="landing-footer__link">
            Política de Privacidade
          </Link>
        </nav>
      </div>

      <p className="landing-footer__notice">
        Estrelar é uma ferramenta independente e não é afiliada, patrocinada ou endossada pelo
        Google.
      </p>
    </footer>
  )
}
