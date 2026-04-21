import { useState, useRef, useEffect } from 'react'
import type { Subject } from '../types/subject'

interface SubjectSelectorProps {
  subjects: Subject[]
  selectedIds: string[]
  loading: boolean
  onToggle: (id: string) => void
  onCreate: (name: string) => Promise<void>
  error?: string
}

export function SubjectSelector({
  subjects,
  selectedIds,
  loading,
  onToggle,
  onCreate,
  error,
}: SubjectSelectorProps) {
  const [open, setOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 7.10 — close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleCreate() {
    if (!newName.trim()) return
    setCreating(true)
    try {
      await onCreate(newName.trim())
      setNewName('')
    } finally {
      setCreating(false)
    }
  }

  const selectedSubjects = subjects.filter((s) => selectedIds.includes(s.id))

  return (
    <div className="flex flex-col gap-3">
      {loading ? (
        <div className="flex items-center gap-2 text-dark/60 text-sm">
          <span className="inline-block w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
          Carregando assuntos...
        </div>
      ) : (
        <div ref={containerRef} className="relative">
          {/* 7.7 — dropdown trigger button */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-3 py-2 border-2 border-dark bg-white text-dark text-sm font-medium shadow-[3px_3px_0px_#261200] cursor-pointer"
          >
            <span className="text-dark/60">
              {selectedIds.length === 0
                ? 'Selecionar assuntos...'
                : `${selectedIds.length} assunto${selectedIds.length > 1 ? 's' : ''} selecionado${selectedIds.length > 1 ? 's' : ''}`}
            </span>
            <span className="ml-2">{open ? '▲' : '▼'}</span>
          </button>

          {/* 7.7 — floating list */}
          {open && (
            <div className="absolute z-10 top-full left-0 right-0 mt-1 border-2 border-dark bg-white shadow-[3px_3px_0px_#261200] max-h-48 overflow-y-auto">
              {subjects.length === 0 ? (
                <p className="px-3 py-2 text-sm text-dark/60">Nenhum assunto disponível</p>
              ) : (
                subjects.map((subject) => {
                  const isSelected = selectedIds.includes(subject.id)
                  return (
                    // 7.8 — toggle on click, no duplicates
                    <button
                      key={subject.id}
                      type="button"
                      onClick={() => onToggle(subject.id)}
                      className={`w-full text-left px-3 py-2 text-sm font-medium cursor-pointer flex items-center justify-between ${
                        isSelected ? 'bg-primary text-white' : 'bg-white text-dark hover:bg-primary/10'
                      }`}
                    >
                      <span>{subject.name}</span>
                      {isSelected && <span>✓</span>}
                    </button>
                  )
                })
              )}
            </div>
          )}
        </div>
      )}

      {/* 7.9 — chips for selected subjects */}
      {selectedSubjects.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSubjects.map((subject) => (
            <span
              key={subject.id}
              className="flex items-center gap-1 px-2 py-1 border-2 border-dark bg-primary text-white text-sm font-medium"
            >
              {subject.name}
              <button
                type="button"
                onClick={() => onToggle(subject.id)}
                className="ml-1 leading-none cursor-pointer hover:opacity-70"
                aria-label={`Remover ${subject.name}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* inline create */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Novo assunto"
          className="flex-1 px-3 py-1 border-2 border-dark text-sm outline-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCreate()
          }}
        />
        <button
          type="button"
          onClick={handleCreate}
          disabled={!newName.trim() || creating}
          className="px-3 py-1 border-2 border-dark text-sm font-medium bg-white text-dark disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {creating ? '...' : '+ adicionar'}
        </button>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  )
}
