import { Link } from 'react-router-dom'
import { missionCatalog } from '../content/missions/catalog'
import { useJourney } from '../state/useJourney'

export function MissionsPage() {
  const { currentMissionState, startMission, declareMissionAction, confirmMission } =
    useJourney()

  if (currentMissionState.kind === 'locked') {
    return (
      <div className="missions-page">
        <header className="missions-page__header">
          <h1 className="page__title">Missões</h1>
          <p className="page__description">
            Complete ações práticas para melhorar a presença digital do seu
            negócio.
          </p>
        </header>

        <section className="home-block" aria-labelledby="mission-locked">
          <h2 id="mission-locked" className="home-block__title">
            Missão bloqueada
          </h2>
          <p className="home-block__text">
            Primeiro, conclua a lição correspondente para desbloquear esta
            missão.
          </p>
          <Link
            className="home-block__button"
            to={`/licao/${currentMissionState.lessonId}`}
          >
            Fazer lição
          </Link>
        </section>
      </div>
    )
  }

  if (currentMissionState.kind === 'all-done') {
    return (
      <div className="missions-page">
        <section className="home-block mission-complete" aria-live="polite">
          <h1 className="mission-complete__title">
            Você concluiu todas as missões disponíveis!
          </h1>
          <p className="mission-complete__message">
            Você deu passos importantes para fortalecer a reputação do seu
            negócio. Em breve, novas lições e missões.
          </p>
          <Link className="home-block__button" to="/aprender">
            Rever lições
          </Link>
        </section>
      </div>
    )
  }

  const { missionId, status } = currentMissionState
  const mission = missionCatalog.find((item) => item.id === missionId)

  if (!mission) {
    return (
      <section className="home-block lesson-not-found" role="alert">
        <h1 className="lesson-not-found__title">Missão não encontrada</h1>
        <p className="lesson-not-found__message">
          Esta missão ainda não está disponível.
        </p>
        <Link className="home-block__button" to="/">
          Voltar para o início
        </Link>
      </section>
    )
  }

  if (status === 'available') {
    return (
      <div className="missions-page">
        <header className="missions-page__header">
          <h1 className="page__title">Missões</h1>
          <p className="page__description">
            Aplique na prática o que você acabou de aprender.
          </p>
        </header>

        <article className="home-block mission-card">
          <h2 className="home-block__subtitle">{mission.title}</h2>

          <dl className="mission-meta">
            <div className="mission-meta__item">
              <dt className="mission-meta__label">Dificuldade</dt>
              <dd className="mission-meta__value">{mission.difficulty}</dd>
            </div>

            <div className="mission-meta__item">
              <dt className="mission-meta__label">Recompensa</dt>
              <dd className="mission-meta__value">{mission.reward}</dd>
            </div>

            <div className="mission-meta__item">
              <dt className="mission-meta__label">Status</dt>
              <dd className="mission-meta__value">Disponível</dd>
            </div>
          </dl>

          <button
            type="button"
            className="home-block__button"
            onClick={() => startMission(mission.id)}
          >
            Começar missão
          </button>
        </article>
      </div>
    )
  }

  if (status === 'action_completed') {
    return (
      <div className="missions-page">
        <section className="home-block" aria-labelledby="mission-confirm">
          <h1 id="mission-confirm" className="home-block__title">
            Confirme sua missão
          </h1>
          <p className="home-block__text">
            Você declarou que realizou a ação. Confirme para registrar a
            conclusão da missão e receber o XP.
          </p>
          <p className="message-example__note">
            Esta confirmação é manual: o sistema registra sua declaração, mas
            não verifica a ação de forma externa.
          </p>
          <button
            type="button"
            className="home-block__button"
            onClick={() => confirmMission(mission.id)}
          >
            Confirmar missão
          </button>
        </section>
      </div>
    )
  }

  // status === 'in_progress'
  return (
    <div className="missions-page">
      <header className="missions-page__header">
        <h1 className="page__title">{mission.title}</h1>
        <p className="page__description">
          Coloque o aprendizado em prática no seu negócio.
        </p>
      </header>

      <section className="home-block" aria-labelledby="mission-objective">
        <h2 id="mission-objective" className="home-block__title">
          Objetivo
        </h2>
        <p className="home-block__text">{mission.objective}</p>
      </section>

      <section className="home-block" aria-labelledby="mission-explanation">
        <h2 id="mission-explanation" className="home-block__title">
          Por que isso importa
        </h2>
        <p className="home-block__text">{mission.explanation}</p>
      </section>

      <section className="home-block" aria-labelledby="mission-steps">
        <h2 id="mission-steps" className="home-block__title">
          Passos
        </h2>
        <ol className="mission-steps">
          {mission.steps.map((step) => (
            <li key={step} className="mission-steps__item">
              {step}
            </li>
          ))}
        </ol>
      </section>

      {mission.messageExample ? (
        <section className="home-block" aria-labelledby="mission-help">
          <h2 id="mission-help" className="home-block__title">
            Ajuda prática
          </h2>
          <blockquote className="message-example">
            <p className="message-example__text">{mission.messageExample}</p>
          </blockquote>
          {mission.messageExampleNote ? (
            <p className="message-example__note">{mission.messageExampleNote}</p>
          ) : null}
        </section>
      ) : null}

      <section className="home-block" aria-labelledby="mission-action">
        <h2 id="mission-action" className="home-block__title">
          Conclusão
        </h2>
        <p className="home-block__text">{mission.confirmationPrompt}</p>
        <button
          type="button"
          className="home-block__button"
          onClick={() => declareMissionAction(mission.id)}
        >
          Registrar ação realizada
        </button>
      </section>
    </div>
  )
}
