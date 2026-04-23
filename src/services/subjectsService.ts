import type { Subject, CreateSubjectDTO } from '../types/subject'

const mockSubjects: Subject[] = [
  { id: 'frontend', name: 'Frontend', createdAt: new Date('2024-01-10').toISOString() },
  { id: 'poo', name: 'POO', createdAt: new Date('2024-01-15').toISOString() },
  { id: 'banco-de-dados', name: 'Banco de Dados', createdAt: new Date('2024-01-20').toISOString() },
  { id: 'linguagens', name: 'Linguagens', createdAt: new Date('2024-01-25').toISOString() },
  { id: 'arquitetura', name: 'Arquitetura', createdAt: new Date('2024-02-01').toISOString() },
  { id: 'ferramentas', name: 'Ferramentas', createdAt: new Date('2024-02-05').toISOString() },
  { id: 'csharp', name: 'C#', createdAt: new Date('2024-02-10').toISOString() },
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
