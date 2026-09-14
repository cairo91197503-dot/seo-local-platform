import { Link } from 'react-router-dom'

/**
 * CTA final da Landing Page (Etapa 3 — acabamento). Encerra a narrativa
 * convidando o visitante a começar. Reutiliza o mesmo fluxo de
 * autenticação do Hero/Header (`/login`, `src/pages/LoginPage.tsx` via
 * `LoginRoute` em `src/app/App.tsx`) — nenhum sistema de login novo, nenhuma
 * lógica duplicada.
 *
 * Vende a proposta de aprendizado e ação prática, não um resultado
 * comercial — regra explícita desta etapa (nada de "mais clientes",
 * "primeiro lugar", "crescimento garantido" etc.).
 */
export function FinalCtaSection() {
  return (
    <section className="landing-section landing-final-cta" aria-labelledby="landing-final-cta-title">
      <h2 id="landing-final-cta-title" className="landing-section__title">
        Comece a cuidar melhor da presença do seu negócio.
      </h2>
      <p className="landing-section__lead">
        Aprenda os fundamentos, coloque o conhecimento em prática e avance no seu ritmo.
      </p>

      <div className="landing-final-cta__actions">
        <Link to="/login" className="home-block__button landing-final-cta__cta">
          Começar gratuitamente
        </Link>
        <Link to="/login" className="landing-hero__secondary">
          Já tenho uma conta
        </Link>
      </div>
    </section>
  )
}
