import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Study } from '../types/study'
import { studiesService } from '../services/studiesService'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
import { CardGrid } from '../components/CardGrid'
import { StudyCard } from '../components/StudyCard'
import { EmptyCard } from '../components/EmptyCard'

export function HomePage() {
  const navigate = useNavigate()
  const [studies, setStudies] = useState<Study[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStudies = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await studiesService.getAll()
      setStudies(data)
    } catch {
      setError('Não foi possível carregar os estudos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudies()
  }, [])

  const filteredStudies = studies.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase())
  )

  const remainder = filteredStudies.length % 4
  const emptyCount = remainder === 0 ? 0 : 4 - remainder

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Header />

      <main className="flex-1 py-6">
        <div className="max-w-[1024px] mx-auto px-4 mb-6">
          <SearchBar
            value={query}
            onChange={setQuery}
            onCreateClick={() => navigate('/estudos/novo')}
          />
        </div>

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
              onClick={fetchStudies}
              className="px-6 py-2 bg-primary border-2 border-dark text-white font-bold rounded-full hover:bg-primary-light transition-colors duration-200"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!loading && !error && studies.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-16">
            <p className="text-dark font-bold text-lg">Nenhum estudo encontrado</p>
            <button
              type="button"
              onClick={() => navigate('/estudos/novo')}
              className="px-6 py-2 bg-primary border-2 border-dark text-white font-bold rounded-full hover:bg-primary-light transition-colors duration-200"
            >
              Criar primeiro estudo
            </button>
          </div>
        )}

        {!loading && !error && studies.length > 0 && filteredStudies.length === 0 && query !== '' && (
          <div className="flex justify-center py-16">
            <p className="text-dark font-bold text-lg">Nenhum resultado para "{query}"</p>
          </div>
        )}

        {!loading && !error && filteredStudies.length > 0 && (
          <div className="max-w-[1024px] mx-auto px-4">
            <CardGrid>
              {filteredStudies.map(study => (
                <StudyCard
                  key={study.id}
                  title={study.title}
                  description={study.description}
                  onClick={() => {}}
                />
              ))}
              {Array.from({ length: emptyCount }, (_, i) => (
                <EmptyCard key={`empty-${i}`} />
              ))}
            </CardGrid>
          </div>
        )}
      </main>
    </div>
  )
}
