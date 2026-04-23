import { useState, useEffect, useMemo } from 'react'
import type { Study } from '../types/study'
import type { Subject } from '../types/subject'
import { subjectsService } from '../services/subjectsService'
import { studiesService } from '../services/studiesService'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
import { CardGrid } from '../components/CardGrid'
import { SubjectCard } from '../components/SubjectCard'
import { EmptyCard } from '../components/EmptyCard'
import { CreateSubjectModal } from '../components/CreateSubjectModal'

export function calcularStudyCountMap(studies: Study[]): Record<string, number> {
  const map: Record<string, number> = Object.create(null)
  for (const study of studies) {
    for (const subjectId of study.subjectIds) {
      map[subjectId] = (map[subjectId] ?? 0) + 1
    }
  }
  return map
}

export function filtrarAssuntos(subjects: Subject[], query: string): Subject[] {
  if (query === '') return subjects
  const lower = query.toLowerCase()
  return subjects.filter((s) => s.name.toLowerCase().includes(lower))
}

export function calcularEmptyCount(filteredCount: number): number {
  const remainder = filteredCount % 4
  return remainder === 0 ? 0 : 4 - remainder
}

export function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [studies, setStudies] = useState<Study[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [fetchedSubjects, fetchedStudies] = await Promise.all([
        subjectsService.getAll(),
        studiesService.getAll(),
      ])
      setSubjects(fetchedSubjects)
      setStudies(fetchedStudies)
    } catch {
      setError('Não foi possível carregar os assuntos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const studyCountMap = useMemo(() => calcularStudyCountMap(studies), [studies])
  const filteredSubjects = useMemo(() => filtrarAssuntos(subjects, query), [subjects, query])
  const emptyCount = calcularEmptyCount(filteredSubjects.length)

  return (
    <>
      <Header />
      <main className="flex-1 py-6">
        <div className="max-w-[1024px] mx-auto px-4 mb-6">
          <SearchBar
            value={query}
            onChange={setQuery}
            onCreateClick={() => setIsModalOpen(true)}
            createLabel="criar assunto"
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center py-16">
            <span>Carregando...</span>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-4 py-16">
            <p>{error}</p>
            <button
              type="button"
              onClick={fetchData}
              className="px-6 py-2 bg-primary border-2 border-dark text-white font-bold hover:opacity-80"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!loading && !error && subjects.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-16">
            <p>Nenhum assunto encontrado</p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-primary border-2 border-dark text-white font-bold hover:opacity-80"
            >
              Criar primeiro assunto
            </button>
          </div>
        )}

        {!loading && !error && subjects.length > 0 && filteredSubjects.length === 0 && query !== '' && (
          <div className="flex justify-center py-16">
            <p>Nenhum resultado para "{query}"</p>
          </div>
        )}

        {!loading && !error && filteredSubjects.length > 0 && (
          <div className="max-w-[1024px] mx-auto px-4">
            <CardGrid>
              {filteredSubjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  name={subject.name}
                  studyCount={studyCountMap[subject.id] ?? 0}
                  onClick={() => {}}
                />
              ))}
              {Array.from({ length: emptyCount }, (_, i) => (
                <EmptyCard key={`empty-${i}`} />
              ))}
            </CardGrid>
          </div>
        )}

        <CreateSubjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreated={(subject) => setSubjects((prev) => [...prev, subject])}
        />
      </main>
    </>
  )
}
