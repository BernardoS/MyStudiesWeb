import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import {
  filtrarEstudosPorAssunto,
  filtrarEstudosPorQuery,
  calcularEmptyCount,
} from './SubjectStudyListPage'
import type { Study } from '../types/study'

// Arbitrary for a minimal Study object
const studyArb = fc.record<Study>({
  id: fc.string(),
  title: fc.string(),
  description: fc.string(),
  content: fc.string(),
  subjectIds: fc.array(fc.string()),
  createdAt: fc.string(),
  updatedAt: fc.string(),
})

/**
 * Validates: Requirements 1.1
 *
 * Task 2.1 — PBT: `filtrarEstudosPorAssunto` never returns studies that don't belong to the subject
 */
describe('filtrarEstudosPorAssunto', () => {
  it('never returns studies whose subjectIds does not include the given subjectId', () => {
    fc.assert(
      fc.property(fc.array(studyArb), fc.string(), (studies, subjectId) => {
        const result = filtrarEstudosPorAssunto(studies, subjectId)
        return result.every(study => study.subjectIds.includes(subjectId))
      })
    )
  })
})

/**
 * Validates: Requirements 1.2
 *
 * Task 2.2 — PBT: `filtrarEstudosPorQuery` with empty query returns all studies
 */
describe('filtrarEstudosPorQuery', () => {
  it('returns all studies when query is empty', () => {
    fc.assert(
      fc.property(fc.array(studyArb), (studies) => {
        return filtrarEstudosPorQuery(studies, '').length === studies.length
      })
    )
  })
})

/**
 * Validates: Requirements 1.3
 *
 * Task 2.3 — PBT: `calcularEmptyCount` always returns value between 0 and 3
 */
describe('calcularEmptyCount - range', () => {
  it('always returns a value in [0, 3] for any count >= 0', () => {
    fc.assert(
      fc.property(fc.nat(), (count) => {
        const result = calcularEmptyCount(count)
        return result >= 0 && result <= 3
      })
    )
  })
})

/**
 * Validates: Requirements 1.3
 *
 * Task 2.4 — PBT: `(count + calcularEmptyCount(count)) % 4 === 0` for any `count >= 0`
 */
describe('calcularEmptyCount - grid invariant', () => {
  it('(count + calcularEmptyCount(count)) % 4 === 0 for any count >= 0', () => {
    fc.assert(
      fc.property(fc.nat(), (count) => {
        return (count + calcularEmptyCount(count)) % 4 === 0
      })
    )
  })
})
