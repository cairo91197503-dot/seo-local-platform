import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SceneView } from '../components/learn/SceneView'
import { lessonCatalog } from '../content/lessons/catalog'
import { reviewsImportanceLesson } from '../content/lessons/reviews-importance'
import { useLessonProgress } from '../hooks/useLessonProgress'
import { useJourney } from '../state/useJourney'

const { scenes } = reviewsImportanceLesson
const totalScenes = scenes.length

export function LessonPage() {
  const { id } = useParams()
  const [sceneIndex, setSceneIndex] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const { markAsCompleted } = useLessonProgress(id ?? '')
  const { completeLesson } = useJourney()
  const catalogLesson = lessonCatalog.find((lesson) => lesson.id === id)

  if (
    !catalogLesson ||
    catalogLesson.status !== 'disponivel' ||
    catalogLesson.id !== reviewsImportanceLesson.id
  ) {
    return (
      <section className="home-block lesson-not-found" role="alert">
        <h1 className="lesson-not-found__title">Lição não encontrada</h1>
        <p className="lesson-not-found__message">
          Esta lição não existe ou ainda não está disponível.
        </p>
        <Link className="home-block__button" to="/">
          Voltar para o início
        </Link>
      </section>
    )
  }

  const goToNextScene = () => {
    if (sceneIndex < totalScenes - 1) {
      setSceneIndex((current) => current + 1)
      return
    }

    markAsCompleted()
    completeLesson(id ?? '')
    setIsFinished(true)
  }

  if (isFinished) {
    return (
      <div className="learn-page">
        <section className="home-block lesson-complete" aria-live="polite">
          <h1 className="lesson-complete__title">Lição concluída!</h1>
          <p className="lesson-complete__message">
            Você aprendeu por que avaliações autênticas são importantes.
          </p>
          <Link className="home-block__button" to="/">
            Voltar para o início
          </Link>
        </section>
      </div>
    )
  }

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
            onClick={() => setSceneIndex((current) => current - 1)}
          >
            Voltar
          </button>
        ) : (
          <Link className="lesson-scene__back" to="/">
            Sair
          </Link>
        )}

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
