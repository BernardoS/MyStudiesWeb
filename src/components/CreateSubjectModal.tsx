import { useState } from 'react'
import type { Subject } from '../types/subject'
import { subjectsService } from '../services/subjectsService'

interface CreateSubjectModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: (subject: Subject) => void
}

export function CreateSubjectModal({ isOpen, onClose, onCreated }: CreateSubjectModalProps) {
  const [name, setName] = useState('')
  const [fieldError, setFieldError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  function handleClose() {
    setName('')
    setFieldError(null)
    setSubmitError(null)
    onClose()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (name.trim() === '') {
      setFieldError('Nome não pode ser vazio')
      return
    }

    setSubmitting(true)
    setSubmitError(null)

    try {
      const subject = await subjectsService.create({ name: name.trim() })
      onCreated(subject)
      handleClose()
    } catch {
      setSubmitError('Erro ao criar assunto. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white border-2 border-dark shadow-[4px_4px_0px_#261200] p-8 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-dark font-bold text-lg mb-6">Criar novo assunto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="subject-name" className="block text-dark font-bold mb-1">
              Nome
            </label>
            <input
              id="subject-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (fieldError) setFieldError(null)
              }}
              disabled={submitting}
              className="w-full border-2 border-dark px-3 py-2 text-dark focus:outline-none disabled:opacity-50"
              placeholder="Nome do assunto"
            />
            {fieldError && (
              <p className="text-red-600 text-sm mt-1">{fieldError}</p>
            )}
          </div>

          {submitError && (
            <p className="text-red-600 text-sm mb-4">{submitError}</p>
          )}

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={submitting}
              className="bg-white text-dark border-2 border-dark shadow-[3px_3px_0px_#261200] px-4 py-2 font-bold hover:opacity-80 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-primary text-white border-2 border-dark shadow-[3px_3px_0px_#261200] px-4 py-2 font-bold hover:opacity-80 disabled:opacity-50"
            >
              {submitting ? 'Criando...' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
