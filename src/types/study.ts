export interface Study {
  id: string
  title: string
  description: string
  content: string       // Markdown
  subjectIds: string[]
  createdAt: string
  updatedAt: string
}

export interface CreateStudyDTO {
  title: string
  description: string
  content: string
  subjectIds: string[]
}

export type UpdateStudyDTO = Partial<CreateStudyDTO>
