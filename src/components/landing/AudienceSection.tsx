/**
 * Seção "para quem é" (Etapa 2). Tom simples e acolhedor, sem linguagem
 * corporativa — pedido explícito do briefing desta etapa.
 */
const AUDIENCE_PROFILES = [
  'Pequenos negócios',
  'Autônomos',
  'Profissionais que administram seu próprio Perfil da Empresa',
  'Pessoas que querem aprender a cuidar melhor da presença do negócio no Google',
]

export function AudienceSection() {
  return (
    <section className="landing-section" aria-labelledby="landing-audience-title">
      <h2 id="landing-audience-title" className="landing-section__title">
        Feito para quem cuida do próprio negócio.
      </h2>

      <ul className="landing-audience__grid">
        {AUDIENCE_PROFILES.map((profile) => (
          <li key={profile} className="landing-audience__item">
            {profile}
          </li>
        ))}
      </ul>
    </section>
  )
}
