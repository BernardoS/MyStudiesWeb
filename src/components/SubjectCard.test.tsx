/**
 * Property 6: SubjectCard exibe nome e contagem
 * Validates: Requirements 5.2, 5.3, 5.4
 */
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import { SubjectCard } from './SubjectCard'

describe('SubjectCard — Property 6: exibe nome e contagem', () => {
  it('renders the subject name for any name string', () => {
    fc.assert(
      fc.property(
        // Exclude whitespace-only strings since they render but can't be found by getByText (normalization)
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        fc.nat(),
        (name, studyCount) => {
          const { unmount } = render(
            <SubjectCard name={name} studyCount={studyCount} onClick={() => {}} />
          )
          const heading = screen.getByRole('heading')
          expect(heading.textContent).toBe(name)
          unmount()
        }
      )
    )
  })

  it('displays "1 estudo" when studyCount is 1', () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), (name) => {
        const { unmount } = render(
          <SubjectCard name={name} studyCount={1} onClick={() => {}} />
        )
        expect(screen.getByText('1 estudo')).toBeInTheDocument()
        unmount()
      })
    )
  })

  it('displays "N estudos" (plural) for any studyCount !== 1', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        fc.nat().filter((n) => n !== 1),
        (name, studyCount) => {
          const { unmount } = render(
            <SubjectCard name={name} studyCount={studyCount} onClick={() => {}} />
          )
          expect(screen.getByText(`${studyCount} estudos`)).toBeInTheDocument()
          unmount()
        }
      )
    )
  })
})
