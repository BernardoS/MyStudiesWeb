import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { calcularStudyCountMap, filtrarAssuntos, calcularEmptyCount } from './SubjectsPage'
import type { Study } from '../types/study'
import type { Subject } from '../types/subject'

// Arbitraries

const arbStudy = (): fc.Arbitrary<Study> =>
  fc.record({
    id: fc.uuid(),
    title: fc.string(),
    description: fc.string(),
    content: fc.string(),
    subjectIds: fc.array(fc.string({ minLength: 1 })),
    createdAt: fc.constant(new Date().toISOString()),
    updatedAt: fc.constant(new Date().toISOString()),
  })

const arbSubject = (): fc.Arbitrary<Subject> =>
  fc.record({
    id: fc.uuid(),
    name: fc.string({ minLength: 1 }),
    createdAt: fc.constant(new Date().toISOString()),
  })

// ─── Task 2.1 ────────────────────────────────────────────────────────────────

describe('calcularStudyCountMap', () => {
  /**
   * Property 1: Invariante de soma do StudyCountMap
   * Validates: Requirements 2.1, 2.3
   */
  it('Property 1 — a soma dos valores do mapa é igual à soma de study.subjectIds.length', () => {
    fc.assert(
      fc.property(fc.array(arbStudy()), (studies) => {
        const map = calcularStudyCountMap(studies)
        const mapSum = Object.values(map).reduce((acc, v) => acc + v, 0)
        const expectedSum = studies.reduce((acc, s) => acc + s.subjectIds.length, 0)
        expect(mapSum).toBe(expectedSum)
      }),
    )
  })
})

// ─── Task 2.2 ────────────────────────────────────────────────────────────────

describe('filtrarAssuntos', () => {
  /**
   * Property 2: Filtro retorna subconjunto com match
   * Validates: Requirements 3.1
   */
  it('Property 2 — todo elemento retornado contém a query no nome (case-insensitive)', () => {
    fc.assert(
      fc.property(
        fc.array(arbSubject()),
        fc.string({ minLength: 1 }),
        (subjects, query) => {
          const result = filtrarAssuntos(subjects, query)
          const lower = query.toLowerCase()
          for (const s of result) {
            expect(s.name.toLowerCase()).toContain(lower)
          }
        },
      ),
    )
  })

  /**
   * Property 3: Query vazia retorna todos os assuntos
   * Validates: Requirements 3.2
   */
  it('Property 3 — query vazia retorna todos os assuntos sem filtro', () => {
    fc.assert(
      fc.property(fc.array(arbSubject()), (subjects) => {
        const result = filtrarAssuntos(subjects, '')
        expect(result).toHaveLength(subjects.length)
        expect(result).toEqual(subjects)
      }),
    )
  })
})

// ─── Task 2.3 ────────────────────────────────────────────────────────────────

describe('calcularEmptyCount', () => {
  /**
   * Property 7: calcularEmptyCount completa a linha do grid
   * Validates: Requirements 6.1, 6.2
   */
  it('Property 7 — (n + calcularEmptyCount(n)) % 4 === 0 e resultado está em [0, 3]', () => {
    fc.assert(
      fc.property(fc.nat(), (n) => {
        const empty = calcularEmptyCount(n)
        expect((n + empty) % 4).toBe(0)
        expect(empty).toBeGreaterThanOrEqual(0)
        expect(empty).toBeLessThanOrEqual(3)
      }),
    )
  })
})
