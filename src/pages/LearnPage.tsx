import { Link } from 'react-router-dom'
import { lessonCatalog } from '../content/lessons/catalog'
import { useJourney } from '../state/useJourney'

export function LearnPage() {
  const { journey } = useJourney()

  return (
    <div className="learn-page">
      <header className="learn-page__header">
        <h1 className="page__title">Aprender</h1>
        <p className="page__description">
          Aprenda em poucos minutos e coloque em prática no seu negócio.
        </p>
      </header>

      {lessonCatalog.map((lessonMeta) => {
        const isCompleted = journey.completedLessonIds.includes(lessonMeta.id)
        const isAvailable = lessonMeta.status === 'disponivel'

        return (
          <article key={lessonMeta.id} className="home-block lesson-card">
            <h2 className="home-block__subtitle">{lessonMeta.title}</h2>
            <p className="home-block__text">{lessonMeta.description}</p>
            <dl className="lesson-meta">
              <div className="lesson-meta__item">
                <dt className="lesson-meta__label">Status</dt>
                <dd className="lesson-meta__value">
                  {!isAvailable ? 'Em breve' : isCompleted ? 'Concluída' : 'Disponível'}
                </dd>
              </div>
            </dl>
            {isAvailable ? (
              <Link className="home-block__button" to={`/licao/${lessonMeta.id}`}>
                {isCompleted ? 'Rever lição' : 'Começar lição'}
              </Link>
            ) : null}
          </article>
        )
      })}
    </div>
  )
}
