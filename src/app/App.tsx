import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { Mascot } from '../components/mascot/Mascot'
import { AuthProvider } from '../lib/auth/AuthContext'
import { useAuth } from '../lib/auth/useAuth'
import { HomePage } from '../pages/HomePage'
import { LearnPage } from '../pages/LearnPage'
import { LessonPage } from '../pages/LessonPage'
import { LoginPage } from '../pages/LoginPage'
import { MissionsPage } from '../pages/MissionsPage'
import { OnboardingPage } from '../pages/OnboardingPage'
import { ToolsPage } from '../pages/ToolsPage'
import { JourneyProvider } from '../state/JourneyProvider'
import { useJourney } from '../state/useJourney'

function OnboardingGuard() {
  const { journey } = useJourney()
  return journey.onboardingCompleted ? <Outlet /> : <Navigate to="/onboarding" replace />
}

/**
 * Portão de autenticação: nenhuma rota abaixo dele (nem `/onboarding`) é
 * alcançável sem login, conforme o fluxo definido em
 * `docs/12-ESPECIFICACAO-MVP.md` ("Login Google → Onboarding → Home → ...").
 *
 * Trata separadamente o caso de configuração do Firebase ausente
 * (`configError`) do caso de simplesmente não estar logado ainda, para que
 * um ambiente sem `.env` mostre uma mensagem clara em vez de travar em
 * "Carregando…" ou quebrar a tela de login sem explicação.
 */
function AuthGate() {
  const { user, loading, configError } = useAuth()

  if (configError) {
    return (
      <main className="login-page">
        <Mascot pose="thinking" size={88} />
        <h1 className="login-page__title">Firebase ainda não configurado</h1>
        <p className="login-page__notice">{configError}</p>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="login-page">
        <p className="login-page__description">Carregando…</p>
      </main>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  return <Outlet />
}

function App() {
  return (
    <AuthProvider>
      <JourneyProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthGate />}>
              <Route path="onboarding" element={<OnboardingPage />} />
              <Route element={<OnboardingGuard />}>
                <Route element={<AppShell />}>
                  <Route index element={<HomePage />} />
                  <Route path="aprender" element={<LearnPage />} />
                  <Route path="licao/:id" element={<LessonPage />} />
                  <Route path="missoes" element={<MissionsPage />} />
                  <Route path="ferramentas" element={<ToolsPage />} />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </JourneyProvider>
    </AuthProvider>
  )
}

export default App
