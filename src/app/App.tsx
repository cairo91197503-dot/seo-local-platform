import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { HomePage } from '../pages/HomePage'
import { LearnPage } from '../pages/LearnPage'
import { LessonPage } from '../pages/LessonPage'
import { MissionsPage } from '../pages/MissionsPage'
import { ToolsPage } from '../pages/ToolsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="aprender" element={<LearnPage />} />
          <Route path="licao/:id" element={<LessonPage />} />
          <Route path="missoes" element={<MissionsPage />} />
          <Route path="ferramentas" element={<ToolsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
