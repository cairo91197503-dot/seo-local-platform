import type { LessonScene } from '../../content/lessons/types'

type SceneViewProps = {
  scene: LessonScene
  sceneNumber: number
  totalScenes: number
}

export function SceneView({ scene, sceneNumber, totalScenes }: SceneViewProps) {
  return (
    <article className="lesson-scene" aria-live="polite">
      <p className="lesson-scene__progress">
        Cena {sceneNumber} de {totalScenes}
      </p>
      <h2 className="lesson-scene__title">{scene.title}</h2>
      <p className="lesson-scene__text">{scene.text}</p>
      {scene.highlight ? (
        <p className="lesson-scene__highlight">{scene.highlight}</p>
      ) : null}
    </article>
  )
}
