import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Subject } from '../types/subject'
import { subjectsService } from '../services/subjectsService'
import { studiesService } from '../services/studiesService'
import { Header } from '../components/Header'
import { SubjectSelector } from '../components/SubjectSelector'
import { MarkdownEditor } from '../components/MarkdownEditor'

// 7.1 — subjectIds: string[] instead of subjectId: string
interface FormState {
  title: string
  description: string
  content: string
  subjectIds: string[]
}

// 7.2 — subjectIds?: string instead of subjectId?: string
interface FormErrors {
  title?: string
  description?: string
  content?: string
  subjectIds?: string
}

// 7.3 — validate subjectIds.length === 0
function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {}
  if (form.title.trim() === '') errors.title = 'Título é obrigatório'
  if (form.description.trim() === '') errors.description = 'Descrição é obrigatória'
  if (form.content.trim() === '') errors.content = 'Conteúdo é obrigatório'
  if (form.subjectIds.length === 0) errors.subjectIds = 'Selecione ao menos um assunto'
  return errors
}

export function CreateStudyPage() {
  const navigate = useNavigate()

  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loadingSubjects, setLoadingSubjects] = useState(true)
  const [saving, setSaving] = useState(false)
  // 7.1 — initial value for subjectIds is []
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    content: '',
    subjectIds: [],
  })
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    subjectsService.getAll().then((data) => {
      setSubjects(data)
      setLoadingSubjects(false)
    })
  }, [])

  function handleChange(field: keyof Omit<FormState, 'subjectIds'>, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  // 7.11 — handler for onToggle: adds/removes id from subjectIds array
  function handleSubjectToggle(id: string) {
    setForm((prev) => {
      const already = prev.subjectIds.includes(id)
      return {
        ...prev,
        subjectIds: already
          ? prev.subjectIds.filter((s) => s !== id)
          : [...prev.subjectIds, id],
      }
    })
  }

  // 7.5 — pass subjectIds to studiesService.create()
  async function handleSubmit() {
    const errs = validateForm(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSaving(true)
    try {
      await studiesService.create({
        title: form.title.trim(),
        description: form.description.trim(),
        content: form.content,
        subjectIds: form.subjectIds,
      })
      navigate('/')
    } catch {
      setErrors({ content: 'Erro ao salvar. Tente novamente.' })
    } finally {
      setSaving(false)
    }
  }

  // 7.4 — add new subject id to subjectIds array
  async function handleSubjectCreate(name: string) {
    const newSubject = await subjectsService.create({ name: name.trim() })
    setSubjects((prev) => [...prev, newSubject])
    setForm((prev) => ({ ...prev, subjectIds: [...prev.subjectIds, newSubject.id] }))
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-[1024px] mx-auto px-4 flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-dark">Novo estudo</h1>

          {/* Título */}
          <div className="flex flex-col gap-1">
            <label className="font-bold text-dark text-sm">Título</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Título do estudo"
              className="w-full px-3 py-2 border-2 border-dark shadow-[3px_3px_0px_#261200] bg-white text-dark outline-none"
            />
            {errors.title && (
              <p className="text-red-600 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-1">
            <label className="font-bold text-dark text-sm">Descrição</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Descrição curta (máx. 300 caracteres)"
              maxLength={300}
              className="w-full px-3 py-2 border-2 border-dark shadow-[3px_3px_0px_#261200] bg-white text-dark outline-none"
            />
            {errors.description && (
              <p className="text-red-600 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Assunto */}
          <div className="flex flex-col gap-1">
            <label className="font-bold text-dark text-sm">Assunto</label>
            {/* 7.11 — selectedIds/onToggle instead of selectedId/onSelect */}
            <SubjectSelector
              subjects={subjects}
              selectedIds={form.subjectIds}
              loading={loadingSubjects}
              onToggle={handleSubjectToggle}
              onCreate={handleSubjectCreate}
              error={errors.subjectIds}
            />
          </div>

          {/* Conteúdo Markdown */}
          <div className="flex flex-col gap-1">
            <label className="font-bold text-dark text-sm">Conteúdo</label>
            <MarkdownEditor
              value={form.content}
              onChange={(v) => handleChange('content', v)}
              error={errors.content}
            />
          </div>

          {/* Ações */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="px-6 py-2 bg-primary border-2 border-dark text-white font-bold shadow-[3px_3px_0px_#261200] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {saving ? 'Salvando...' : 'Salvar estudo'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-white border-2 border-dark text-dark font-bold shadow-[3px_3px_0px_#261200] cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
