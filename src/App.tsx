import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CreateStudyPage } from './pages/CreateStudyPage'
import { ViewStudyPage } from './pages/ViewStudyPage'
import { SubjectsPage } from './pages/SubjectsPage'
import { SubjectStudyListPage } from './pages/SubjectStudyListPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/estudos/novo" element={<CreateStudyPage />} />
        <Route path="/estudos/:id" element={<ViewStudyPage />} />
        <Route path="/assuntos" element={<SubjectsPage />} />
        <Route path="/assuntos/:id" element={<SubjectStudyListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
