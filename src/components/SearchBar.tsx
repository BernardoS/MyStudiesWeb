interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onCreateClick: () => void
  createLabel?: string
}

export function SearchBar({
  value,
  onChange,
  onCreateClick,
  createLabel = 'criar estudo',
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex items-center flex-1">
        <span className="absolute right-4 text-dark pointer-events-none select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar estudo..."
          className="w-full pr-12 pl-5 py-3 text-lg bg-white border-2 border-dark rounded-none outline-none font-sans text-dark placeholder:text-dark/40 shadow-[3px_3px_0px_#261200]"
        />
      </div>

      <button
        type="button"
        onClick={onCreateClick}
        className="flex items-center gap-2 px-6 py-3 text-lg bg-primary-light border-2 border-dark text-dark font-bold rounded-none transition-colors duration-200 hover:opacity-80 cursor-pointer whitespace-nowrap shadow-[3px_3px_0px_#261200]"
      >
        <span aria-hidden="true" className="text-xl leading-none">+</span>
        {createLabel}
      </button>
    </div>
  )
}
