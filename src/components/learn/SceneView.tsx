import { useEffect, useRef, useState } from 'react'
import type { LessonScene } from '../../content/lessons/types'

type SceneViewProps = {
  scene: LessonScene
  sceneNumber: number
  totalScenes: number
}

export function SceneView({ scene, sceneNumber, totalScenes }: SceneViewProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const playbackRequestIdRef = useRef(0)
  const [playedSceneId, setPlayedSceneId] = useState<string | null>(null)
  const [audioErrorSceneId, setAudioErrorSceneId] = useState<string | null>(
    null,
  )

  useEffect(() => {
    const audioElement = audioRef.current

    return () => {
      playbackRequestIdRef.current += 1

      if (audioElement) {
        audioElement.pause()
        audioElement.currentTime = 0
      }
    }
  }, [scene.id])

  const playNarration = async () => {
    const audioElement = audioRef.current

    if (!audioElement) {
      return
    }

    const sceneId = scene.id
    const playbackRequestId = playbackRequestIdRef.current + 1
    playbackRequestIdRef.current = playbackRequestId
    setAudioErrorSceneId(null)
    audioElement.currentTime = 0

    try {
      await audioElement.play()

      if (playbackRequestIdRef.current === playbackRequestId) {
        setPlayedSceneId(sceneId)
      }
    } catch {
      if (playbackRequestIdRef.current === playbackRequestId) {
        setAudioErrorSceneId(sceneId)
      }
    }
  }

  const audioSrc = scene.narration?.audioSrc
  const hasPlayedCurrentScene = playedSceneId === scene.id
  const hasAudioError = audioErrorSceneId === scene.id

  return (
    <article className="lesson-scene">
      <p className="lesson-scene__progress">
        Cena {sceneNumber} de {totalScenes}
      </p>
      <h2 className="lesson-scene__title">{scene.title}</h2>
      {scene.illustration ? (
        <img
          className="lesson-scene__illustration"
          src={scene.illustration.src}
          alt={scene.illustration.alt}
        />
      ) : null}
      <p className="lesson-scene__text">{scene.text}</p>
      {scene.highlight ? (
        <p className="lesson-scene__highlight">{scene.highlight}</p>
      ) : null}
      {scene.estimatedDurationSeconds !== undefined ? (
        <p className="lesson-scene__duration">
          Duração aproximada: {scene.estimatedDurationSeconds} s
        </p>
      ) : null}
      {audioSrc ? (
        <div className="lesson-scene__narration">
          <audio
            key={scene.id}
            ref={audioRef}
            src={audioSrc}
            preload="metadata"
            onError={() => setAudioErrorSceneId(scene.id)}
          />
          <button
            type="button"
            className="lesson-scene__audio-button"
            onClick={playNarration}
          >
            {hasPlayedCurrentScene ? 'Ouvir novamente' : 'Ouvir narração'}
          </button>
          {hasAudioError ? (
            <p className="lesson-scene__audio-error" role="status">
              Narração indisponível no momento.
            </p>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}
