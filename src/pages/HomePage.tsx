import { useNavigate } from 'react-router-dom'
import { Mascot } from '../components/mascot/Mascot'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <header className="home-page__greeting">
        <Mascot pose="neutral" size={44} />
        <h1 className="home-page__title">Olá</h1>
      </header>

      <section className="home-block" aria-labelledby="progress-heading">
        <h2 id="progress-heading" className="home-block__title">
          Progresso
        </h2>
        <dl className="progress-stats">
          <div className="progress-stats__item">
            <dt className="progress-stats__label">Nível</dt>
            <dd className="progress-stats__value">Iniciante</dd>
          </div>
          <div className="progress-stats__item">
            <dt className="progress-stats__label">XP</dt>
            <dd className="progress-stats__value">0</dd>
          </div>
          <div className="progress-stats__item">
            <dt className="progress-stats__label">Sequência</dt>
            <dd className="progress-stats__value">0 dias</dd>
          </div>
        </dl>
      </section>

      <section className="home-block" aria-labelledby="next-mission-heading">
        <h2 id="next-mission-heading" className="home-block__title">
          Próxima missão
        </h2>
        <h3 className="home-block__subtitle">Peça sua primeira avaliação</h3>
        <p className="home-block__text">
          Convide um cliente satisfeito a avaliar sua empresa no Google.
        </p>
        <button
          type="button"
          className="home-block__button"
          onClick={() => navigate('/missoes')}
        >
          Ver missão
        </button>
      </section>

      <section className="home-block" aria-labelledby="quick-access-heading">
        <h2 id="quick-access-heading" className="home-block__title">
          Acesso rápido
        </h2>
        <ul className="quick-access">
          <li className="quick-access__item">
            <button
              type="button"
              className="quick-access__button"
              onClick={() => navigate('/aprender')}
            >
              Aprender
            </button>
          </li>
          <li className="quick-access__item">
            <button
              type="button"
              className="quick-access__button"
              onClick={() => navigate('/missoes')}
            >
              Missões
            </button>
          </li>
          <li className="quick-access__item">
            <button
              type="button"
              className="quick-access__button"
              onClick={() => navigate('/ferramentas')}
            >
              Ferramentas
            </button>
          </li>
        </ul>
      </section>
    </div>
  )
}
