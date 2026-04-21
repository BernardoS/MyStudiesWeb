import type { Study, CreateStudyDTO } from '../types/study'

const MOCK_STUDIES: Study[] = [
  {
    id: '1',
    title: 'Introdução ao React',
    description: 'Conceitos fundamentais do React: componentes, props, estado e ciclo de vida.',
    content: '',
    subjectIds: ['frontend'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'TypeScript para Iniciantes',
    description: 'Tipagem estática no JavaScript: interfaces, tipos, generics e configuração do tsconfig.',
    content: '',
    subjectIds: ['linguagens'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '3',
    title: 'Tailwind CSS na Prática',
    description: 'Estilização utilitária com Tailwind: layout, responsividade e customização de tema.',
    content: '',
    subjectIds: ['frontend'],
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
  {
    id: '4',
    title: 'Classes e Objetos em POO',
    description: 'Fundamentos de orientação a objetos: classes, atributos, métodos e encapsulamento.',
    content: '',
    subjectIds: ['poo'],
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-02-10T00:00:00Z',
  },
  {
    id: '5',
    title: 'Métodos Estáticos',
    description: 'Entendendo métodos estáticos em classes e quando utilizá-los corretamente.',
    content: '',
    subjectIds: ['poo'],
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z',
  },
  {
    id: '6',
    title: 'Testes Unitários em C#',
    description: 'Uma introdução a testes unitários com xUnit e boas práticas de cobertura de código.',
    content: '',
    subjectIds: ['csharp'],
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: '7',
    title: 'Fundamentos do Angular',
    description: 'Uma introdução ao Angular: componentes, módulos, serviços e data binding.',
    content: '',
    subjectIds: ['frontend'],
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z',
  },
  {
    id: '8',
    title: 'Git e Controle de Versão',
    description: 'Comandos essenciais do Git: commits, branches, merge, rebase e resolução de conflitos.',
    content: '',
    subjectIds: ['ferramentas'],
    createdAt: '2024-03-20T00:00:00Z',
    updatedAt: '2024-03-20T00:00:00Z',
  },
  {
    id: '9',
    title: 'SQL para Desenvolvedores',
    description: 'Consultas SQL do básico ao avançado: SELECT, JOIN, subqueries e índices.',
    content: '',
    subjectIds: ['banco-de-dados'],
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-04-01T00:00:00Z',
  },
  {
    id: '10',
    title: 'Padrões de Projeto',
    description: 'Design patterns clássicos: Singleton, Factory, Observer e Strategy com exemplos práticos.',
    content: '',
    subjectIds: ['arquitetura'],
    createdAt: '2024-04-10T00:00:00Z',
    updatedAt: '2024-04-10T00:00:00Z',
  },
]

export const studiesService = {
  getAll(): Promise<Study[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_STUDIES)
      }, 500)
    })
  },

  create(data: CreateStudyDTO): Promise<Study> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const now = new Date().toISOString()
        const study: Study = {
          id: crypto.randomUUID(),
          ...data,
          createdAt: now,
          updatedAt: now,
        }
        resolve(study)
      }, 500)
    })
  },
}
