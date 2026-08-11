import { useEffect, useRef, useState } from 'react'
import type { LessonScene } from '../../content/lessons/types'

type SceneViewProps = {
  scene: LessonScene
  sceneNumber: number
  totalScenes: number
}

export function SceneView({ scene, sceneNumber, totalScenes }: SceneViewProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioState, setAudioState] = useState<
    'idle' | 'playing' | 'paused' | 'ended' | 'blocked' | 'error'
  >('idle')
  const [currentTime, setCurrentTime] = useState(0)

  const audioSrc = scene.narration?.audioSrc
  const segments = scene.narration?.segments
  const activeSegment = segments?.find(
    (segment) =>
      currentTime >= segment.startSeconds && currentTime < segment.endSeconds,
  )
  const captionText = segments?.length ? activeSegment?.text : scene.text
  const accessibleTranscript =
    scene.narration?.script ??
    [scene.text, scene.highlight].filter(Boolean).join(' ')

  useEffect(() => {
    const audioElement = audioRef.current

    if (!audioElement) {
      return
    }

    let isCurrentScene = true

    const startNarration = async () => {
      audioElement.currentTime = 0

      try {
        await audioElement.play()
      } catch {
        if (isCurrentScene) {
          setAudioState(audioElement.error ? 'error' : 'blocked')
        }
      }
    }

    void startNarration()

    return () => {
      isCurrentScene = false
      audioElement.pause()
      audioElement.currentTime = 0
    }
  }, [])

  const handleAudioControl = async () => {
    const audioElement = audioRef.current

    if (!audioElement) {
      return
    }

    if (audioState === 'playing') {
      audioElement.pause()
      return
    }

    if (audioState === 'ended' || audioState === 'blocked') {
      audioElement.currentTime = 0
      setCurrentTime(0)
    }

    try {
      await audioElement.play()
    } catch {
      setAudioState(audioElement.error ? 'error' : 'blocked')
    }
  }

  const audioButtonLabel = {
    idle: 'Ouvir narração',
    playing: 'Pausar',
    paused: 'Continuar áudio',
    ended: 'Ouvir novamente',
    blocked: 'Ouvir narração',
    error: 'Narração indisponível',
  }[audioState]

  return (
    <article className="lesson-scene">
      <div
        className="lesson-scene__progress"
        aria-label={`Cena ${sceneNumber} de ${totalScenes}`}
      >
        <span className="lesson-scene__progress-label" aria-hidden="true">
          {sceneNumber}/{totalScenes}
        </span>
        <progress value={sceneNumber} max={totalScenes}>
          Cena {sceneNumber} de {totalScenes}
        </progress>
      </div>

      <div
        className={`lesson-scene__visual${
          scene.illustration ? '' : ' lesson-scene__visual--fallback'
        }`}
      >
        {scene.illustration ? (
          <img
            className="lesson-scene__illustration"
            src={scene.illustration.src}
            alt={scene.illustration.alt}
          />
        ) : null}

        <h2 className="lesson-scene__title">{scene.title}</h2>

        <p className="visually-hidden">{accessibleTranscript}</p>

        {captionText ? (
          <div className="lesson-scene__caption" aria-hidden="true">
            {activeSegment ? (
              <p className="lesson-scene__segment lesson-scene__segment--active">
                {activeSegment.text}
              </p>
            ) : (
              <p className="lesson-scene__text">{captionText}</p>
            )}
          </div>
        ) : null}

        {audioSrc ? (
          <div className="lesson-scene__narration">
            <audio
              ref={audioRef}
              src={audioSrc}
              preload="metadata"
              onPlay={() => setAudioState('playing')}
              onPause={() => {
                if (!audioRef.current?.ended) {
                  setAudioState('paused')
                }
              }}
              onEnded={() => setAudioState('ended')}
              onTimeUpdate={(event) =>
                setCurrentTime(event.currentTarget.currentTime)
              }
              onError={() => setAudioState('error')}
            />
            <button
              type="button"
              className="lesson-scene__audio-button"
              onClick={handleAudioControl}
              disabled={audioState === 'error'}
            >
              {audioButtonLabel}
            </button>
            {audioState === 'error' ? (
              <p className="lesson-scene__audio-error" role="status">
                Narração indisponível no momento.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}
