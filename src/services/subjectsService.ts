import type { Subject, CreateSubjectDTO } from '../types/subject'

const mockSubjects: Subject[] = [
  { id: '1', name: 'Frontend', createdAt: new Date('2024-01-10').toISOString() },
  { id: '2', name: 'POO', createdAt: new Date('2024-01-15').toISOString() },
  { id: '3', name: 'Banco de Dados', createdAt: new Date('2024-01-20').toISOString() },
]

export const subjectsService = {
  getAll(): Promise<Subject[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockSubjects]), 500)
    })
  },

  create(data: CreateSubjectDTO): Promise<Subject> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const subject: Subject = {
          id: crypto.randomUUID(),
          name: data.name,
          createdAt: new Date().toISOString(),
        }
        resolve(subject)
      }, 300)
    })
  },
}
