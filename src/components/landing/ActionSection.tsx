/**
 * Seção "conhecimento vira ação" (Etapa 2): explica o diferencial
 * pedagógico do Estrelar (lição → missão → ação real), sem prometer
 * resultado comercial nem inventar automações — regra explícita da etapa.
 */
const FLOW_STEPS = ['Lição', 'Entendimento', 'Missão', 'Ação real', 'Confirmação', 'XP', 'Progresso']

export function ActionSection() {
  return (
    <section className="landing-section" aria-labelledby="landing-action-title">
      <h2 id="landing-action-title" className="landing-section__title">
        Conhecimento que vira ação.
      </h2>
      <p className="landing-section__lead">
        Você aprende uma ideia, entende por que ela importa e recebe uma missão prática para
        colocar o conhecimento em ação.
      </p>

      <ol className="landing-action__flow">
        {FLOW_STEPS.map((step, index) => (
          <li key={step} className="landing-action__step">
            <span className="landing-action__step-text">{step}</span>
            {index < FLOW_STEPS.length - 1 ? (
              <span className="landing-action__step-arrow" aria-hidden="true">
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  )
}
