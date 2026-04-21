import type { ReactNode } from 'react'

interface CardGridProps {
  children: ReactNode
}

export function CardGrid({ children }: CardGridProps) {
  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}
    >
      {children}
    </div>
  )
}
