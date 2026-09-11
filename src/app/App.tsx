import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { HomePage } from '../pages/HomePage'
import { LearnPage } from '../pages/LearnPage'
import { LessonPage } from '../pages/LessonPage'
import { MissionsPage } from '../pages/MissionsPage'
import { OnboardingPage } from '../pages/OnboardingPage'
import { ToolsPage } from '../pages/ToolsPage'
import { JourneyProvider } from '../state/JourneyProvider'
import { useJourney } from '../state/useJourney'

function OnboardingGuard() {
  const { journey } = useJourney()
  return journey.onboardingCompleted ? <Outlet /> : <Navigate to="/onboarding" replace />
}

function App() {
  return (
    <JourneyProvider>
      <BrowserRouter>
        <Routes>
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
        </Routes>
      </BrowserRouter>
    </JourneyProvider>
  )
}

export default App
