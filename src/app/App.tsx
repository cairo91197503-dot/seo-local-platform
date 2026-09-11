import { Navigate, Route, Routes } from 'react-router-dom'
import { BottomNav } from '../components/layout/BottomNav'
import { HomePage } from '../pages/HomePage'
import { LearnPage } from '../pages/LearnPage'
import { MissionsPage } from '../pages/MissionsPage'
import { ToolsPage } from '../pages/ToolsPage'

function App() {
  return (
    <div className="app-shell">
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aprender" element={<LearnPage />} />
          <Route path="/missoes" element={<MissionsPage />} />
          <Route path="/ferramentas" element={<ToolsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}

export default App
