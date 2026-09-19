import { useState } from 'react'
import { Link } from 'react-router-dom'
import { missionCatalog } from '../content/missions/catalog'
import { useJourney } from '../state/useJourney'
import { CURRICULUM, getMissionStatus } from '../state/journey'

const STATUS_LABEL: Record<string, string> = {
  locked: 'Bloqueada',
  available: 'Disponível',
  in_progress: 'Em andamento',
  action_completed: 'Ação registrada',
  completed: 'Concluída',
}

export function MissionsPage() {
  const {
    journey,
    currentMissionState,
    startMission,
    declareMissionAction,
    confirmMission,
  } = useJourney()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedMission = selectedId
    ? missionCatalog.find((m) => m.id === selectedId)
    : null

  if (selectedMission) {
    const status = getMissionStatus(journey, selectedMission.id)

    return (
      <div className="missions-page">
        <button
          type="button"
          className="home-block__button missions-page__back"
          onClick={() => setSelectedId(null)}
        >
          ← Voltar para missões
        </button>

        <header className="missions-page__header">
          <h1 className="page__title">{selectedMission.title}</h1>
          <p className="page__description">
            {status === 'completed'
              ? 'Esta missão foi concluída.'
              : 'Coloque o aprendizado em prática no seu negócio.'}
          </p>
        </header>

        <dl className="mission-meta">
          <div className="mission-meta__item">
            <dt className="mission-meta__label">Dificuldade</dt>
            <dd className="mission-meta__value">{selectedMission.difficulty}</dd>
          </div>
          <div className="mission-meta__item">
            <dt className="mission-meta__label">Recompensa</dt>
            <dd className="mission-meta__value">{selectedMission.reward}</dd>
          </div>
          <div className="mission-meta__item">
            <dt className="mission-meta__label">Status</dt>
            <dd className="mission-meta__value">{STATUS_LABEL[status] ?? status}</dd>
          </div>
        </dl>

        <section className="home-block" aria-labelledby="mission-objective">
          <h2 id="mission-objective" className="home-block__title">
            Objetivo
          </h2>
          <p className="home-block__text">{selectedMission.objective}</p>
        </section>

        <section className="home-block" aria-labelledby="mission-explanation">
          <h2 id="mission-explanation" className="home-block__title">
            Por que isso importa
          </h2>
          <p className="home-block__text">{selectedMission.explanation}</p>
        </section>

        <section className="home-block" aria-labelledby="mission-steps">
          <h2 id="mission-steps" className="home-block__title">
            Passos
          </h2>
          <ol className="mission-steps">
            {selectedMission.steps.map((step) => (
              <li key={step} className="mission-steps__item">
                {step}
              </li>
            ))}
          </ol>
        </section>

        {selectedMission.messageExample ? (
          <section className="home-block" aria-labelledby="mission-help">
            <h2 id="mission-help" className="home-block__title">
              Ajuda prática
            </h2>
            <blockquote className="message-example">
              <p className="message-example__text">
                {selectedMission.messageExample}
              </p>
            </blockquote>
            {selectedMission.messageExampleNote ? (
              <p className="message-example__note">
                {selectedMission.messageExampleNote}
              </p>
            ) : null}
          </section>
        ) : null}

        {status === 'completed' ? (
          <section className="home-block" aria-live="polite">
            <p className="home-block__text">Missão concluída com sucesso!</p>
          </section>
        ) : status === 'available' ? (
          <section className="home-block" aria-labelledby="mission-action">
            <h2 id="mission-action" className="home-block__title">
              Conclusão
            </h2>
            <p className="home-block__text">
              {selectedMission.confirmationPrompt}
            </p>
            <button
              type="button"
              className="home-block__button"
              onClick={() => startMission(selectedMission.id)}
            >
              Começar missão
            </button>
          </section>
        ) : status === 'action_completed' ? (
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
              onClick={() => confirmMission(selectedMission.id)}
            >
              Confirmar missão
            </button>
          </section>
        ) : status === 'in_progress' ? (
          <section className="home-block" aria-labelledby="mission-action">
            <h2 id="mission-action" className="home-block__title">
              Conclusão
            </h2>
            <p className="home-block__text">
              {selectedMission.confirmationPrompt}
            </p>
            <button
              type="button"
              className="home-block__button"
              onClick={() => declareMissionAction(selectedMission.id)}
            >
              Registrar ação realizada
            </button>
          </section>
        ) : null}
      </div>
    )
  }

  // Locked state: lesson not completed yet
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

        <MissionList journey={journey} onSelect={setSelectedId} />
      </div>
    )
  }

  // All done
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

        <MissionList journey={journey} onSelect={setSelectedId} />
      </div>
    )
  }

  // Default: show mission list with current mission highlighted
  return (
    <div className="missions-page">
      <header className="missions-page__header">
        <h1 className="page__title">Missões</h1>
        <p className="page__description">
          Aplique na prática o que você acabou de aprender.
        </p>
      </header>

      <MissionList
        journey={journey}
        onSelect={setSelectedId}
        currentMissionId={currentMissionState.missionId}
        currentStatus={currentMissionState.status}
      />
    </div>
  )
}

function MissionList({
  journey,
  onSelect,
  currentMissionId,
  currentStatus,
}: {
  journey: ReturnType<typeof useJourney>['journey']
  onSelect: (id: string) => void
  currentMissionId?: string
  currentStatus?: string
}) {
  return (
    <section className="home-block" aria-labelledby="mission-list-title">
      <h2 id="mission-list-title" className="home-block__title">
        Todas as missões
      </h2>
      <ul className="mission-list">
        {CURRICULUM.map((item) => {
          const mission = missionCatalog.find((m) => m.id === item.missionId)
          if (!mission) return null

          const status =
            item.missionId === currentMissionId
              ? (currentStatus ?? getMissionStatus(journey, item.missionId))
              : getMissionStatus(journey, item.missionId)

          return (
            <li key={item.missionId}>
              <button
                type="button"
                className={`mission-list__item ${status === 'completed' ? 'mission-list__item--completed' : ''}`}
                onClick={() => onSelect(item.missionId)}
              >
                <span className="mission-list__title">{mission.title}</span>
                <span className="mission-list__status">
                  {STATUS_LABEL[status] ?? status}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
