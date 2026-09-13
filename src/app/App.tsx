import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { Mascot } from '../components/mascot/Mascot'
import { AuthProvider } from '../lib/auth/AuthContext'
import { useAuth } from '../lib/auth/useAuth'
import { HomePage } from '../pages/HomePage'
import { LandingPage } from '../pages/LandingPage'
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
 *
 * Landing Page (2026-09-13, `docs/02-ROADMAP.md`, prioridade P0): quando não
 * há usuário logado e a rota é exatamente `/`, mostra a `LandingPage`
 * pública em vez da tela de login — é a nova porta de entrada do produto.
 * Qualquer outra rota protegida (deep link para `/aprender`, `/missoes`
 * etc. sem login) continua caindo na tela de login de sempre, sem mudança
 * de comportamento.
 */
function AuthGate() {
  const { user, loading, configError } = useAuth()
  const location = useLocation()

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
    return location.pathname === '/' ? <LandingPage /> : <LoginPage />
  }

  return <Outlet />
}

/**
 * Rota `/login`, alcançável a partir dos CTAs da `LandingPage` (link real de
 * navegação, não uma tela só encaixada dentro de outra rota). Um usuário já
 * autenticado que caia aqui (ex.: link salvo) é redirecionado para `/` em
 * vez de ver a tela de login de novo — mesmo princípio de "encaminhamento
 * mais coerente" já usado no restante do `AuthGate`.
 */
function LoginRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <main className="login-page">
        <p className="login-page__description">Carregando…</p>
      </main>
    )
  }

  return user ? <Navigate to="/" replace /> : <LoginPage />
}

function App() {
  return (
    <AuthProvider>
      <JourneyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<LoginRoute />} />
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
