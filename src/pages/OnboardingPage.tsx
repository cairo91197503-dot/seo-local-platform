import { Navigate, useNavigate } from 'react-router-dom'
import { Mascot } from '../components/mascot/Mascot'
import { useJourney } from '../state/useJourney'

export function OnboardingPage() {
  const navigate = useNavigate()
  const { completeOnboarding, journey } = useJourney()

  if (journey.onboardingCompleted) {
    return <Navigate to="/" replace />
  }

  const handleContinue = () => {
    completeOnboarding()
    navigate('/', { replace: true })
  }

  return (
    <main className="onboarding-page">
      <Mascot pose="neutral" size={88} />
      <h1 className="onboarding-page__title">Vamos começar</h1>
      <p className="onboarding-page__description">
        O Estrelar transforma pequenos aprendizados em ações práticas para o seu negócio.
      </p>
      <button type="button" className="home-block__button" onClick={handleContinue}>
        Começar jornada
      </button>
    </main>
  )
}
