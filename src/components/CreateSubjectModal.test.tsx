import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import * as fc from 'fast-check'
import { CreateSubjectModal } from './CreateSubjectModal'
import { subjectsService } from '../services/subjectsService'

vi.mock('../services/subjectsService', () => ({
  subjectsService: {
    create: vi.fn(),
  },
}))

const mockCreate = vi.mocked(subjectsService.create)

beforeEach(() => {
  vi.clearAllMocks()
})

/**
 * Property 4: Trimming do nome antes de criar
 * Validates: Requirements 4.2
 *
 * For any name with leading/trailing spaces, the value sent to the service must be name.trim()
 */
describe('Property 4: Trimming do nome antes de criar', () => {
  it('sends trimmed name to subjectsService.create for any name with padding', async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate a non-empty core string with arbitrary leading/trailing spaces
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        fc.nat(5),
        fc.nat(5),
        async (core, leadingCount, trailingCount) => {
          vi.clearAllMocks()

          const leading = ' '.repeat(leadingCount)
          const trailing = ' '.repeat(trailingCount)
          const paddedName = `${leading}${core}${trailing}`

          const expectedTrimmed = paddedName.trim()

          mockCreate.mockResolvedValueOnce({
            id: '1',
            name: expectedTrimmed,
            createdAt: new Date().toISOString(),
          })

          const onClose = vi.fn()
          const onCreated = vi.fn()

          const { unmount } = render(
            <CreateSubjectModal isOpen={true} onClose={onClose} onCreated={onCreated} />
          )

          const input = screen.getByRole('textbox')
          fireEvent.change(input, { target: { value: paddedName } })
          fireEvent.submit(input.closest('form')!)

          await waitFor(() => {
            expect(mockCreate).toHaveBeenCalledWith({ name: expectedTrimmed })
          })

          unmount()
        }
      ),
      { numRuns: 50 }
    )
  })
})

/**
 * Property 5: Rejeição de nomes em branco
 * Validates: Requirements 4.5
 *
 * For any string composed only of spaces (including empty string), the modal must NOT invoke
 * subjectsService.create and must display a validation error.
 */
describe('Property 5: Rejeição de nomes em branco', () => {
  it('does not call subjectsService.create and shows validation error for whitespace-only names', async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate whitespace-only strings (spaces only, including empty string)
        fc.nat(10).map((n) => ' '.repeat(n)),
        async (whitespaceOnly) => {
          vi.clearAllMocks()

          const onClose = vi.fn()
          const onCreated = vi.fn()

          const { unmount } = render(
            <CreateSubjectModal isOpen={true} onClose={onClose} onCreated={onCreated} />
          )

          const input = screen.getByRole('textbox')
          fireEvent.change(input, { target: { value: whitespaceOnly } })
          fireEvent.submit(input.closest('form')!)

          await waitFor(() => {
            expect(screen.getByText('Nome não pode ser vazio')).toBeTruthy()
          })

          expect(mockCreate).not.toHaveBeenCalled()

          unmount()
        }
      ),
      { numRuns: 20 }
    )
  })
})
