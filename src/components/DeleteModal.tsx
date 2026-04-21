interface DeleteModalProps {
  onConfirm: () => void
  onCancel: () => void
  deleting: boolean
}

export function DeleteModal({ onConfirm, onCancel, deleting }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-dark/50 flex items-center justify-center z-50">
      <div className="bg-white border-2 border-dark shadow-[4px_4px_0px_#261200] p-8 max-w-sm w-full mx-4">
        <p className="text-dark font-bold text-lg mb-6">
          Tem certeza que deseja excluir este estudo?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={deleting}
            className="bg-white text-dark border-2 border-dark shadow-[3px_3px_0px_#261200] px-4 py-2 font-bold hover:opacity-80 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="bg-primary text-white border-2 border-dark shadow-[3px_3px_0px_#261200] px-4 py-2 font-bold hover:opacity-80 disabled:opacity-50"
          >
            {deleting ? 'Excluindo...' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  )
}
