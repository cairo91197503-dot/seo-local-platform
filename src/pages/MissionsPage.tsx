import { useState } from 'react'

type MissionView = 'list' | 'active' | 'completed'

const MISSION = {
  title: 'Peça sua primeira avaliação',
  difficulty: 'Fácil',
  reward: '50 XP',
  status: 'Disponível',
  objective:
    'Transforme um bom atendimento em uma oportunidade de receber uma avaliação autêntica no Google.',
  explanation:
    'As avaliações ajudam novos clientes a conhecerem a experiência de outras pessoas com seu negócio. O melhor momento para pedir uma avaliação é depois de uma experiência positiva e real.',
  steps: [
    'Escolha um cliente que acabou de ter uma experiência real com seu negócio.',
    'Agradeça pela preferência e pergunte educadamente se ele gostaria de deixar uma avaliação.',
    'Envie o link de avaliação do seu Perfil da Empresa no Google.',
  ],
  messageExample:
    'Obrigado pela preferência! Se você gostou do nosso atendimento, poderia compartilhar sua experiência no Google? Sua avaliação ajuda muito nosso negócio.',
} as const

export function MissionsPage() {
  const [view, setView] = useState<MissionView>('list')

  if (view === 'completed') {
    return (
      <div className="missions-page">
        <section className="home-block mission-complete" aria-live="polite">
          <h1 className="mission-complete__title">Missão concluída!</h1>
          <p className="mission-complete__reward">+50 XP</p>
          <p className="mission-complete__message">
            Você deu mais um passo para fortalecer a reputação do seu negócio.
          </p>
        </section>
      </div>
    )
  }

  if (view === 'active') {
    return (
      <div className="missions-page">
        <header className="missions-page__header">
          <h1 className="page__title">{MISSION.title}</h1>
        </header>

        <section className="home-block" aria-labelledby="mission-objective">
          <h2 id="mission-objective" className="home-block__title">
            Objetivo
          </h2>
          <p className="home-block__text">{MISSION.objective}</p>
        </section>

        <section className="home-block" aria-labelledby="mission-explanation">
          <h2 id="mission-explanation" className="home-block__title">
            Por que isso importa
          </h2>
          <p className="home-block__text">{MISSION.explanation}</p>
        </section>

        <section className="home-block" aria-labelledby="mission-steps">
          <h2 id="mission-steps" className="home-block__title">
            Passos
          </h2>
          <ol className="mission-steps">
            {MISSION.steps.map((step) => (
              <li key={step} className="mission-steps__item">
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="home-block" aria-labelledby="mission-help">
          <h2 id="mission-help" className="home-block__title">
            Ajuda prática
          </h2>
          <blockquote className="message-example">
            <p className="message-example__text">{MISSION.messageExample}</p>
          </blockquote>
          <p className="message-example__note">
            Este é apenas um modelo de mensagem. Você poderá personalizá-lo no
            futuro.
          </p>
        </section>

        <section className="home-block" aria-labelledby="mission-confirm">
          <h2 id="mission-confirm" className="home-block__title">
            Conclusão
          </h2>
          <p className="home-block__text">Já pediu a avaliação?</p>
          <button
            type="button"
            className="home-block__button"
            onClick={() => setView('completed')}
          >
            Concluir missão
          </button>
        </section>
      </div>
    )
  }

  return (
    <div className="missions-page">
      <header className="missions-page__header">
        <h1 className="page__title">Missões</h1>
        <p className="page__description">
          Complete ações práticas para melhorar a presença digital do seu
          negócio.
        </p>
      </header>

      <article className="home-block mission-card">
        <h2 className="home-block__subtitle">{MISSION.title}</h2>
        <dl className="mission-meta">
          <div className="mission-meta__item">
            <dt className="mission-meta__label">Dificuldade</dt>
            <dd className="mission-meta__value">{MISSION.difficulty}</dd>
          </div>
          <div className="mission-meta__item">
            <dt className="mission-meta__label">Recompensa</dt>
            <dd className="mission-meta__value">{MISSION.reward}</dd>
          </div>
          <div className="mission-meta__item">
            <dt className="mission-meta__label">Status</dt>
            <dd className="mission-meta__value">{MISSION.status}</dd>
          </div>
        </dl>
        <button
          type="button"
          className="home-block__button"
          onClick={() => setView('active')}
        >
          Começar missão
        </button>
      </article>
    </div>
  )
}
