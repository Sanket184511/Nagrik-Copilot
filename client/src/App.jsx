import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import DocumentSimplifier from './pages/DocumentSimplifier'
import ReadinessChecker from './pages/ReadinessChecker'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'landing' && (
        <LandingPage onNavigate={setCurrentPage} />
      )}
      {currentPage === 'simplify' && (
        <DocumentSimplifier onBack={() => setCurrentPage('landing')} />
      )}
      {currentPage === 'readiness' && (
        <ReadinessChecker onBack={() => setCurrentPage('landing')} />
      )}
    </div>
  )
}

export default App
