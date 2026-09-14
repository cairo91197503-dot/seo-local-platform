/**
 * Seção "como funciona" (Etapa 2). Não deve ser confundida com a faixa de
 * confiança da Etapa 1 (`landing-trust`, âncora `#como-funciona`, em
 * `LandingPage.tsx`) — aquela lista números do produto; esta explica o
 * método em três passos. Manter as duas, sem reestruturar a da Etapa 1.
 */
const STEPS = [
  {
    number: '1',
    title: 'Aprenda',
    text: 'Entenda, em lições rápidas, o que você pode fazer para cuidar melhor da presença do seu negócio no Google.',
  },
  {
    number: '2',
    title: 'Faça',
    text: 'Transforme o aprendizado em uma missão prática e coloque a ideia em ação no seu negócio.',
  },
  {
    number: '3',
    title: 'Avance',
    text: 'Conclua suas etapas, ganhe XP e acompanhe sua evolução ao longo da jornada.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="landing-section" aria-labelledby="landing-how-title">
      <h2 id="landing-how-title" className="landing-section__title">
        Aprenda. Faça. Avance.
      </h2>

      <ol className="landing-how__list">
        {STEPS.map((step, index) => (
          <li key={step.title} className="landing-how__card">
            <span className="landing-how__number" aria-hidden="true">
              {step.number}
            </span>
            <h3 className="landing-how__card-title">{step.title}</h3>
            <p className="landing-how__card-text">{step.text}</p>
            {index < STEPS.length - 1 ? (
              <span className="landing-how__arrow" aria-hidden="true">
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  )
}
