import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SceneView } from '../components/learn/SceneView'
import { lessonCatalog } from '../content/lessons/catalog'
import { lessonRegistry } from '../content/lessons/registry'
import { useJourney } from '../state/useJourney'

export function LessonPage() {
  const { id } = useParams()
  const [sceneIndex, setSceneIndex] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [renderedForId, setRenderedForId] = useState(id)
  const { completeLesson } = useJourney()

  const catalogLesson = lessonCatalog.find((lesson) => lesson.id === id)
  const lesson = id ? lessonRegistry[id] : undefined

  // Garante que trocar de lição (via navegação para outro :id) comece do
  // início, mesmo que o componente da rota não seja remontado. Ajustar
  // estado durante a renderização (em vez de em um efeito) é o padrão
  // recomendado para "resetar estado quando uma prop muda".
  if (id !== renderedForId) {
    setRenderedForId(id)
    setSceneIndex(0)
    setIsFinished(false)
  }

  if (!catalogLesson || catalogLesson.status !== 'disponivel' || !lesson) {
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

  const { scenes } = lesson
  const totalScenes = scenes.length

  const goToNextScene = () => {
    if (sceneIndex < totalScenes - 1) {
      setSceneIndex((current) => current + 1)
      return
    }

    completeLesson(lesson.id)
    setIsFinished(true)
  }

  if (isFinished) {
    return (
      <div className="learn-page">
        <section className="home-block lesson-complete" aria-live="polite">
          <h1 className="lesson-complete__title">Lição concluída!</h1>
          <p className="lesson-complete__message">Você concluiu "{lesson.title}".</p>
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
