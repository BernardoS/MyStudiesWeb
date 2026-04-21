interface StudyCardProps {
  title: string
  description: string
  onClick: () => void
}

export function StudyCard({ title, description, onClick }: StudyCardProps) {
  return (
    <div className="bg-primary-light border-2 border-dark p-5 shadow-[4px_4px_0px_#261200] hover:brightness-95 transition-all flex flex-col">
      <h3 className="font-bold text-dark text-lg">{title}</h3>
      <p className="text-dark mt-2 text-base flex-1">{description}</p>
      <hr className="border-dark my-4" />
      <button
        onClick={onClick}
        className="text-dark font-bold text-base hover:underline text-left"
      >
        Ler mais...
      </button>
    </div>
  )
}
