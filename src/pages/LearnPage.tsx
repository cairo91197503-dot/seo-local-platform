import { useState } from 'react'
import type { AppArea } from '../components/layout/BottomNav'
import { SceneView } from '../components/learn/SceneView'
import { reviewsImportanceLesson } from '../content/lessons/reviews-importance'

type LearnPageProps = {
  onNavigate: (area: AppArea) => void
}

type LearnView = 'list' | 'lesson' | 'completed'

const { scenes, ...lessonMeta } = reviewsImportanceLesson
const totalScenes = scenes.length

export function LearnPage({ onNavigate }: LearnPageProps) {
  const [view, setView] = useState<LearnView>('list')
  const [sceneIndex, setSceneIndex] = useState(0)

  const startLesson = () => {
    setSceneIndex(0)
    setView('lesson')
  }

  const goToNextScene = () => {
    if (sceneIndex < totalScenes - 1) {
      setSceneIndex((current) => current + 1)
      return
    }

    setView('completed')
  }

  const goToPreviousScene = () => {
    if (sceneIndex > 0) {
      setSceneIndex((current) => current - 1)
    }
  }

  if (view === 'completed') {
    return (
      <div className="learn-page">
        <section className="home-block lesson-complete" aria-live="polite">
          <h1 className="lesson-complete__title">Lição concluída!</h1>
          <p className="lesson-complete__message">
            Você aprendeu por que avaliações autênticas são importantes.
          </p>
          <p className="lesson-complete__reward">
            Recompensa futura: +{lessonMeta.futureReward}
          </p>
          <button
            type="button"
            className="home-block__button"
            onClick={() => onNavigate('missions')}
          >
            Ir para a missão
          </button>
        </section>
      </div>
    )
  }

  if (view === 'lesson') {
    const scene = scenes[sceneIndex]
    const isFirstScene = sceneIndex === 0
    const isLastScene = sceneIndex === totalScenes - 1

    return (
      <div className="learn-page learn-page--lesson">
        <SceneView
          key={scene.id}
          scene={scene}
          sceneNumber={sceneIndex + 1}
          totalScenes={totalScenes}
        />

        <div className="lesson-scene__actions">
          {!isFirstScene ? (
            <button
              type="button"
              className="lesson-scene__back"
              onClick={goToPreviousScene}
            >
              Voltar
            </button>
          ) : null}

          <button
            type="button"
            className="home-block__button"
            onClick={goToNextScene}
          >
            {isLastScene ? 'Concluir lição' : 'Continuar'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="learn-page">
      <header className="learn-page__header">
        <h1 className="page__title">Aprender</h1>
        <p className="page__description">
          Aprenda em poucos minutos e coloque em prática no seu negócio.
        </p>
      </header>

      <article className="home-block lesson-card">
        <h2 className="home-block__subtitle">{lessonMeta.title}</h2>
        <dl className="lesson-meta">
          <div className="lesson-meta__item">
            <dt className="lesson-meta__label">Duração</dt>
            <dd className="lesson-meta__value">{lessonMeta.duration}</dd>
          </div>
          <div className="lesson-meta__item">
            <dt className="lesson-meta__label">Nível</dt>
            <dd className="lesson-meta__value">{lessonMeta.level}</dd>
          </div>
          <div className="lesson-meta__item">
            <dt className="lesson-meta__label">Recompensa futura</dt>
            <dd className="lesson-meta__value">{lessonMeta.futureReward}</dd>
          </div>
        </dl>
        <button
          type="button"
          className="home-block__button"
          onClick={startLesson}
        >
          Começar lição
        </button>
      </article>
    </div>
  )
}
