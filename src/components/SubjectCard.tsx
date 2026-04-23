interface SubjectCardProps {
  name: string
  studyCount: number
  onClick: () => void
}

function FolderIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-dark"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export function SubjectCard({ name, studyCount, onClick }: SubjectCardProps) {
  return (
    <div onClick={onClick} className="cursor-pointer hover:brightness-95 transition-all">
      {/* Aba superior */}
      <div className="w-1/2 bg-primary border-2 border-b-0 border-dark px-3 py-1">
        {/* vazio — apenas visual de aba */}
      </div>
      {/* Corpo da pasta */}
      <div className="bg-primary-light border-2 border-dark shadow-[4px_4px_0px_#261200] p-5 flex flex-col gap-3 min-h-[120px]">
        <FolderIcon />
        <h3 className="font-bold text-dark text-lg leading-tight">{name}</h3>
        <p className="text-dark text-sm">
          {studyCount} {studyCount === 1 ? 'estudo' : 'estudos'}
        </p>
      </div>
    </div>
  )
}
