import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CreateStudyPage } from './pages/CreateStudyPage'
import { ViewStudyPage } from './pages/ViewStudyPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/estudos/novo" element={<CreateStudyPage />} />
        <Route path="/estudos/:id" element={<ViewStudyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
