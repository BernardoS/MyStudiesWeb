import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Study } from '../types/study'
import type { Subject } from '../types/subject'
import { subjectsService } from '../services/subjectsService'
import { studiesService } from '../services/studiesService'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
import { CardGrid } from '../components/CardGrid'
import { StudyCard } from '../components/StudyCard'
import { EmptyCard } from '../components/EmptyCard'

export function filtrarEstudosPorAssunto(studies: Study[], subjectId: string): Study[] {
  return studies.filter(study => study.subjectIds.includes(subjectId))
}

export function filtrarEstudosPorQuery(studies: Study[], query: string): Study[] {
  if (query === '') return studies
  const lower = query.toLowerCase()
  return studies.filter(study => study.title.toLowerCase().includes(lower))
}

export function calcularEmptyCount(count: number): number {
  const remainder = count % 4
  return remainder === 0 ? 0 : 4 - remainder
}

export function SubjectStudyListPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [subjects, setSubjects] = useState<Subject[]>([])
  const [studies, setStudies] = useState<Study[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      setError('Não foi possível carregar os dados.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const subject = useMemo(
    () => subjects.find(s => s.id === id) ?? null,
    [subjects, id]
  )

  const studiesDoAssunto = useMemo(
    () => filtrarEstudosPorAssunto(studies, id ?? ''),
    [studies, id]
  )

  const filteredStudies = useMemo(
    () => filtrarEstudosPorQuery(studiesDoAssunto, query),
    [studiesDoAssunto, query]
  )

  const emptyCount = calcularEmptyCount(filteredStudies.length)

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Header />
      <main className="flex-1 py-6">
        {loading && (
          <div className="flex justify-center items-center py-16">
            <span className="text-dark font-bold text-lg">Carregando...</span>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-4 py-16">
            <p className="text-dark font-bold text-lg">{error}</p>
            <button
              type="button"
              onClick={fetchData}
              className="px-6 py-2 bg-primary border-2 border-dark text-white font-bold hover:opacity-80"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!loading && !error && subject === null && (
          <div className="flex justify-center py-16">
            <p className="text-dark font-bold text-lg">Assunto não encontrado.</p>
          </div>
        )}

        {!loading && !error && subject !== null && studiesDoAssunto.length === 0 && (
          <div className="flex justify-center py-16">
            <p className="text-dark font-bold text-lg">Nenhum estudo neste assunto ainda.</p>
          </div>
        )}

        {!loading && !error && subject !== null && studiesDoAssunto.length > 0 && (
          <>
            <div className="max-w-[1024px] mx-auto px-4 mb-6">
              <h1 className="font-bold text-dark text-2xl mb-4">{subject.name}</h1>
              <SearchBar
                value={query}
                onChange={setQuery}
                onCreateClick={() => {}}
              />
            </div>

            {filteredStudies.length === 0 && query !== '' && (
              <div className="flex justify-center py-16">
                <p className="text-dark font-bold text-lg">Nenhum resultado para "{query}"</p>
              </div>
            )}

            {filteredStudies.length > 0 && (
              <div className="max-w-[1024px] mx-auto px-4">
                <CardGrid>
                  {filteredStudies.map(study => (
                    <StudyCard
                      key={study.id}
                      title={study.title}
                      description={study.description}
                      onClick={() => navigate(`/estudos/${study.id}`)}
                    />
                  ))}
                  {Array.from({ length: emptyCount }, (_, i) => (
                    <EmptyCard key={`empty-${i}`} />
                  ))}
                </CardGrid>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
