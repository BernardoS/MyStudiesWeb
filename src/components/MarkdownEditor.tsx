import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function MarkdownEditor({ value, onChange, error }: MarkdownEditorProps) {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit')

  return (
    <div className="flex flex-col gap-0">
      {/* Tabs */}
      <div className="flex">
        <button
          type="button"
          onClick={() => setMode('edit')}
          className={`px-4 py-2 font-bold border-2 border-dark border-b-0 ${
            mode === 'edit'
              ? 'bg-primary text-white'
              : 'bg-white text-dark'
          }`}
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => setMode('preview')}
          className={`px-4 py-2 font-bold border-2 border-dark border-b-0 border-l-0 ${
            mode === 'preview'
              ? 'bg-primary text-white'
              : 'bg-white text-dark'
          }`}
        >
          Visualizar
        </button>
      </div>

      {/* Edit mode */}
      {mode === 'edit' && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escreva o conteúdo em Markdown..."
          className="w-full border-2 border-dark shadow-[3px_3px_0px_#261200] p-3 font-mono text-sm resize-y bg-white text-dark outline-none"
          style={{ minHeight: '300px' }}
        />
      )}

      {/* Preview mode */}
      {mode === 'preview' && (
        <div
          className="w-full border-2 border-dark shadow-[3px_3px_0px_#261200] p-4 bg-white overflow-auto"
          style={{ minHeight: '300px' }}
        >
          {value.trim() === '' ? (
            <p className="text-dark opacity-40 italic">Nenhum conteúdo para visualizar.</p>
          ) : (
            <div className="prose-content">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-dark mb-4 mt-2">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-dark mb-3 mt-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold text-dark mb-2 mt-3">{children}</h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-3 pl-4 text-dark">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-3 pl-4 text-dark">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="mb-1">{children}</li>
                  ),
                  code: ({ children, className }) => {
                    const isBlock = className?.includes('language-')
                    return isBlock ? (
                      <code className="block bg-gray-100 border border-gray-300 font-mono text-sm p-4 mb-3 overflow-x-auto">
                        {children}
                      </code>
                    ) : (
                      <code className="bg-gray-100 border border-gray-300 font-mono text-sm px-1 py-0.5">
                        {children}
                      </code>
                    )
                  },
                  pre: ({ children }) => (
                    <pre className="bg-gray-100 border border-gray-300 font-mono text-sm p-4 mb-3 overflow-x-auto">
                      {children}
                    </pre>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-dark">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic">{children}</em>
                  ),
                  p: ({ children }) => (
                    <p className="mb-3 text-dark">{children}</p>
                  ),
                }}
              >
                {value}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}
