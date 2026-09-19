import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { Mascot } from '../components/mascot/Mascot'
import { ErrorBoundary } from '../components/ui/ErrorBoundary'
import { AuthProvider } from '../lib/auth/AuthContext'
import { useAuth } from '../lib/auth/useAuth'
import { HomePage } from '../pages/HomePage'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { OnboardingPage } from '../pages/OnboardingPage'
import { JourneyProvider } from '../state/JourneyProvider'
import { useJourney } from '../state/useJourney'

const LearnPage = lazy(() =>
  import('../pages/LearnPage').then((m) => ({ default: m.LearnPage })),
)
const LessonPage = lazy(() =>
  import('../pages/LessonPage').then((m) => ({ default: m.LessonPage })),
)
const MissionsPage = lazy(() =>
  import('../pages/MissionsPage').then((m) => ({ default: m.MissionsPage })),
)
const ToolsPage = lazy(() =>
  import('../pages/ToolsPage').then((m) => ({ default: m.ToolsPage })),
)

function PageLoader() {
  return (
    <div className="page-loader">
      <Mascot pose="neutral" size={48} />
    </div>
  )
}

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
    <ErrorBoundary>
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
                    <Route
                      path="aprender"
                      element={
                        <Suspense fallback={<PageLoader />}>
                          <LearnPage />
                        </Suspense>
                      }
                    />
                    <Route
                      path="licao/:id"
                      element={
                        <Suspense fallback={<PageLoader />}>
                          <LessonPage />
                        </Suspense>
                      }
                    />
                    <Route
                      path="missoes"
                      element={
                        <Suspense fallback={<PageLoader />}>
                          <MissionsPage />
                        </Suspense>
                      }
                    />
                    <Route
                      path="ferramentas"
                      element={
                        <Suspense fallback={<PageLoader />}>
                          <ToolsPage />
                        </Suspense>
                      }
                    />
                  </Route>
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </JourneyProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
