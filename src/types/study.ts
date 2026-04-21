export interface Study {
  id: string
  title: string
  description: string
  content: string       // Markdown
  subjectId: string
  createdAt: string
  updatedAt: string
}

export interface CreateStudyDTO {
  title: string
  description: string
  content: string
  subjectId: string
}

export type UpdateStudyDTO = Partial<CreateStudyDTO>
