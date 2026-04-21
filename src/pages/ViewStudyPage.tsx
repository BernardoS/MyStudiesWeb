import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import type { Study } from '../types/study'
import type { Subject } from '../types/subject'
import { studiesService } from '../services/studiesService'
import { subjectsService } from '../services/subjectsService'
import { Header } from '../components/Header'
import { DeleteModal } from '../components/DeleteModal'

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const markdownComponents: Components = {
  h1: ({ children }) => <h1 className="text-3xl font-bold text-dark mt-6 mb-3">{children}</h1>,
  h2: ({ children }) => <h2 className="text-2xl font-bold text-dark mt-5 mb-2">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-bold text-dark mt-4 mb-2">{children}</h3>,
  p: ({ children }) => <p className="text-dark mb-3 leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-6 mb-3 text-dark">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-6 mb-3 text-dark">{children}</ol>,
  li: ({ children }) => <li className="mb-1">{children}</li>,
  code: ({ className, children, ...props }) => {
    const isBlock = !!(props as { node?: { type?: string }; 'data-sourcepos'?: string })['data-sourcepos'] === false && className?.startsWith('language-')
    const isInline = !className
    if (isInline) {
      return (
        <code className="bg-primary-light/20 border border-dark px-1 font-mono text-sm text-dark">
          {children}
        </code>
      )
    }
    return (
      <pre className="bg-primary-light/20 border-2 border-dark p-4 overflow-x-auto mb-3 font-mono text-sm text-dark">
        <code>{children}</code>
      </pre>
    )
  },
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary pl-4 my-3 text-dark/80">{children}</blockquote>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-primary hover:opacity-80 underline">
      {children}
    </a>
  ),
  hr: () => <hr className="border-dark my-4" />,
  strong: ({ children }) => <strong className="font-bold text-dark">{children}</strong>,
}

export function ViewStudyPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [study, setStudy] = useState<Study | null>(null)
  const [subject, setSubject] = useState<Subject | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!id) {
      navigate('/')
      return
    }
    loadStudyData(id)
  }, [id])

  async function loadStudyData(studyId: string): Promise<void> {
    setLoading(true)
    setError(null)
    try {
      const [loadedStudy, subjects] = await Promise.all([
        studiesService.getById(studyId),
        subjectsService.getAll(),
      ])
      const foundSubject = subjects.find((s) => s.id === loadedStudy.subjectIds[0]) ?? null
      setStudy(loadedStudy)
      setSubject(foundSubject)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar estudo'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(): Promise<void> {
    if (!study) return
    setDeleting(true)
    try {
      await studiesService.delete(study.id)
      navigate('/')
    } catch (err) {
      console.error('Erro ao excluir estudo:', err)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-[1024px] mx-auto px-4 flex flex-col gap-6">

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <p className="text-dark font-bold text-lg">Carregando...</p>
            </div>
          )}

          {/* Error state */}
          {!loading && error !== null && (
            <div className="flex flex-col gap-4">
              <p className="text-dark font-bold text-lg">{error}</p>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="self-start px-4 py-2 bg-white text-dark border-2 border-dark shadow-[3px_3px_0px_#261200] font-bold hover:opacity-80 cursor-pointer"
              >
                ← Voltar
              </button>
            </div>
          )}

          {/* Success state */}
          {!loading && error === null && study !== null && (
            <>
              {/* Study header */}
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold text-dark">{study.title}</h1>
                <div className="flex items-center gap-3 flex-wrap">
                  {subject && (
                    <span className="px-3 py-1 bg-primary-light border-2 border-dark text-dark font-bold text-sm">
                      {subject.name}
                    </span>
                  )}
                  <span className="text-dark text-sm">
                    Criado em {formatDate(study.createdAt)}
                  </span>
                </div>
                <p className="text-dark leading-relaxed">{study.description}</p>
              </div>

              {/* Markdown content */}
              <div className="bg-white border-2 border-dark shadow-[4px_4px_0px_#261200] p-6">
                <ReactMarkdown components={markdownComponents}>
                  {study.content}
                </ReactMarkdown>
              </div>

              {/* Action bar */}
              <div className="flex gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-white text-dark border-2 border-dark shadow-[3px_3px_0px_#261200] font-bold hover:opacity-80 cursor-pointer"
                >
                  ← Voltar
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/estudos/${study.id}/editar`)}
                  className="px-4 py-2 bg-primary-light text-dark border-2 border-dark shadow-[3px_3px_0px_#261200] font-bold hover:opacity-80 cursor-pointer"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2 bg-primary text-white border-2 border-dark shadow-[3px_3px_0px_#261200] font-bold hover:opacity-80 cursor-pointer"
                >
                  Excluir
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Delete modal */}
      {showDeleteModal && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          deleting={deleting}
        />
      )}
    </div>
  )
}
