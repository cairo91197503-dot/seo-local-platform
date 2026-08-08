import { useState } from 'react'
import { BottomNav, type AppArea } from '../components/layout/BottomNav'
import { HomePage } from '../pages/HomePage'
import { LearnPage } from '../pages/LearnPage'
import { MissionsPage } from '../pages/MissionsPage'
import { ToolsPage } from '../pages/ToolsPage'

function renderPage(
  activeArea: AppArea,
  onNavigate: (area: AppArea) => void,
) {
  switch (activeArea) {
    case 'home':
      return <HomePage onNavigate={onNavigate} />
    case 'learn':
      return <LearnPage onNavigate={onNavigate} />
    case 'missions':
      return <MissionsPage />
    case 'tools':
      return <ToolsPage />
  }
}

function App() {
  const [activeArea, setActiveArea] = useState<AppArea>('home')

  return (
    <div className="app-shell">
      <main className="app-content">
        {renderPage(activeArea, setActiveArea)}
      </main>
      <BottomNav activeArea={activeArea} onNavigate={setActiveArea} />
    </div>
  )
}

export default App
