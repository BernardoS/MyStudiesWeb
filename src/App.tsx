import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CreateStudyPage } from './pages/CreateStudyPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/estudos/novo" element={<CreateStudyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
