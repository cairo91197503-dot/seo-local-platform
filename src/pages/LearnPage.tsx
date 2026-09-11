import { Link } from 'react-router-dom'
import { reviewsImportanceLesson } from '../content/lessons/reviews-importance'
import { useLessonProgress } from '../hooks/useLessonProgress'

const lessonMeta = reviewsImportanceLesson

export function LearnPage() {
  const { isCompleted } = useLessonProgress('1')

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
            <dt className="lesson-meta__label">Status</dt>
            <dd className="lesson-meta__value">
              {isCompleted ? 'Concluída' : 'Disponível'}
            </dd>
          </div>
        </dl>
        <Link className="home-block__button" to="/licao/1">
          {isCompleted ? 'Rever lição' : 'Começar lição'}
        </Link>
      </article>
    </div>
  )
}
