import { type FormEvent, useId, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Mascot } from '../components/mascot/Mascot'
import { useAuth } from '../lib/auth/useAuth'
import { saveBusinessProfile } from '../lib/auth/userProfile'
import { useJourney } from '../state/useJourney'

const MAX_FIELD_LENGTH = 80

/**
 * Onboarding real (P0 do roadmap, `docs/02-ROADMAP.md`): antes desta
 * mudança, esta tela só tinha um botão "Começar jornada" sem coletar nada.
 * Agora pede nome e segmento/ramo do negócio (texto livre, sem taxonomia
 * fixa — ver `docs/05-BANCO-DE-DADOS.md`) e grava em `users/{uid}` via
 * `saveBusinessProfile` antes de concluir o onboarding.
 *
 * A gravação no Firestore é best-effort, mesmo padrão já usado no resto do
 * app (`upsertUserProfile`, `saveJourneyProgress`): se falhar (ex.: sem
 * conexão), o erro só é registrado no console — o onboarding é concluído e o
 * usuário segue para a Home normalmente, porque o produto deve continuar
 * funcionando sem depender de uma escrita de rede (`docs/04-REGRAS.md`,
 * "O produto deve funcionar mesmo sem integração com APIs externas").
 */
export function OnboardingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { completeOnboarding, journey } = useJourney()

  const [businessName, setBusinessName] = useState('')
  const [businessSegment, setBusinessSegment] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const nameInputId = useId()
  const segmentInputId = useId()

  if (journey.onboardingCompleted) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedName = businessName.trim()
    const trimmedSegment = businessSegment.trim()

    if (!trimmedName || !trimmedSegment) {
      setFormError('Preencha o nome e o segmento do seu negócio para continuar.')
      return
    }

    setFormError(null)
    setSubmitting(true)

    if (user) {
      try {
        await saveBusinessProfile(user.uid, {
          businessName: trimmedName,
          businessSegment: trimmedSegment,
        })
      } catch (error) {
        console.error('Falha ao salvar os dados do negócio em users/{uid}:', error)
      }
    }

    completeOnboarding()
    navigate('/', { replace: true })
  }

  return (
    <main className="onboarding-page">
      <Mascot pose="neutral" size={88} />
      <h1 className="onboarding-page__title">Vamos começar</h1>
      <p className="onboarding-page__description">
        Antes da sua primeira lição, conte um pouco sobre o seu negócio.
      </p>

      <form className="onboarding-page__form" onSubmit={(event) => void handleSubmit(event)}>
        <div className="onboarding-page__field">
          <label htmlFor={nameInputId} className="onboarding-page__label">
            Nome do negócio
          </label>
          <input
            id={nameInputId}
            type="text"
            autoComplete="organization"
            placeholder="Ex.: Salão da Ana"
            maxLength={MAX_FIELD_LENGTH}
            className="onboarding-page__input"
            value={businessName}
            onChange={(event) => {
              setBusinessName(event.target.value)
              if (formError) {
                setFormError(null)
              }
            }}
            aria-invalid={formError ? true : undefined}
          />
        </div>

        <div className="onboarding-page__field">
          <label htmlFor={segmentInputId} className="onboarding-page__label">
            Segmento do negócio
          </label>
          <input
            id={segmentInputId}
            type="text"
            placeholder="Ex.: salão de beleza, oficina mecânica, restaurante"
            maxLength={MAX_FIELD_LENGTH}
            className="onboarding-page__input"
            value={businessSegment}
            onChange={(event) => {
              setBusinessSegment(event.target.value)
              if (formError) {
                setFormError(null)
              }
            }}
            aria-invalid={formError ? true : undefined}
            aria-describedby={formError ? `${segmentInputId}-error` : undefined}
          />
        </div>

        {formError ? (
          <p id={`${segmentInputId}-error`} className="onboarding-page__error" role="alert">
            {formError}
          </p>
        ) : null}

        <button
          type="submit"
          className="home-block__button onboarding-page__submit"
          disabled={submitting}
        >
          {submitting ? 'Só um instante…' : 'Começar jornada'}
        </button>
      </form>
    </main>
  )
}
