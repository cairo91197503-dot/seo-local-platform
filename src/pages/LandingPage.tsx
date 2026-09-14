import { Link } from 'react-router-dom'
import { ActionSection } from '../components/landing/ActionSection'
import { AudienceSection } from '../components/landing/AudienceSection'
import { FinalCtaSection } from '../components/landing/FinalCtaSection'
import { GamificationSection } from '../components/landing/GamificationSection'
import { HowItWorksSection } from '../components/landing/HowItWorksSection'
import { LandingFooter } from '../components/landing/LandingFooter'
import { LandingHeader } from '../components/landing/LandingHeader'
import { LearningSection } from '../components/landing/LearningSection'
import { ProblemSection } from '../components/landing/ProblemSection'
import { ReviewToolSection } from '../components/landing/ReviewToolSection'
import { Mascot } from '../components/mascot/Mascot'

/**
 * Landing page pública do Estrelar — porta de entrada para quem ainda não
 * tem conta (decisão de 2026-09-13, `docs/02-ROADMAP.md`, prioridade P0).
 *
 * Renderizada por `AuthGate` (`src/app/App.tsx`) só quando não há usuário
 * logado E a rota é exatamente `/` — qualquer outra rota protegida continua
 * levando à tela de login existente (`LoginPage`), sem mudança de
 * comportamento. Um usuário já logado que acesse `/` continua vendo a Home
 * do app normalmente; esta página nunca aparece pra ele.
 *
 * Etapa 1 (fundação): cabeçalho, hero e a faixa de números abaixo dele.
 * Etapa 2 (parte central de conteúdo): sete seções explicando o produto —
 * problema, método, o que se aprende, como o aprendizado vira ação,
 * gamificação, a ferramenta de QR Code e para quem é o produto.
 * Etapa 3 (acabamento, atual): CTA final e rodapé fecham a página; SEO
 * básico (title/description/canonical/Open Graph) foi ajustado em
 * `index.html`, que é compartilhado por toda a SPA. Cada seção é um
 * componente próprio em `src/components/landing/`.
 */

const TRUST_ITEMS = ['12 lições práticas', '12 missões', 'XP e progresso', 'Ferramenta de QR Code']

export function LandingPage() {
  return (
    <div className="landing-page">
      <LandingHeader />

      <main>
        <section className="landing-hero" aria-labelledby="landing-hero-title">
          <div className="landing-hero__content">
            <h1 id="landing-hero-title" className="landing-hero__title">
              Cuide melhor da presença do seu negócio no Google.
            </h1>
            <p className="landing-hero__text">
              O Estrelar ensina você a cuidar do Perfil da Empresa no Google com lições rápidas e
              missões práticas.
            </p>
            <div className="landing-hero__actions">
              <Link to="/login" className="home-block__button landing-hero__cta">
                Começar gratuitamente
              </Link>
              <Link to="/login" className="landing-hero__secondary">
                Já tenho uma conta → Entrar
              </Link>
            </div>
          </div>

          <div className="landing-hero__visual">
            <Mascot pose="celebrating" size={200} />
          </div>
        </section>

        <section className="landing-trust" id="como-funciona" aria-labelledby="landing-trust-title">
          <h2 id="landing-trust-title" className="landing-trust__title">
            Como funciona
          </h2>
          <ul className="landing-trust__list">
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="landing-trust__item">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <ProblemSection />
        <HowItWorksSection />
        <LearningSection />
        <ActionSection />
        <GamificationSection />
        <ReviewToolSection />
        <AudienceSection />
        <FinalCtaSection />
      </main>

      <LandingFooter />
    </div>
  )
}
