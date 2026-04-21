import type { Study, CreateStudyDTO } from '../types/study'

const MOCK_STUDIES: Study[] = [
  {
    id: '1',
    title: 'Introdução ao React',
    description: 'Conceitos fundamentais do React: componentes, props, estado e ciclo de vida.',
    content: `# Introdução ao React

React é uma **biblioteca JavaScript** para construção de interfaces de usuário, mantida pelo Meta e pela comunidade open-source.

## Por que usar React?

- Componentização: divida a UI em peças reutilizáveis
- Virtual DOM: atualizações eficientes sem re-renderizar tudo
- Ecossistema rico: hooks, context, React Router, etc.
- Grande comunidade e mercado de trabalho aquecido

---

## Componentes

Um componente React é uma função que retorna JSX:

\`\`\`tsx
function Saudacao({ nome }: { nome: string }) {
  return <h1>Olá, {nome}!</h1>
}
\`\`\`

### Componentes de Classe (legado)

Antes dos hooks, usávamos classes:

\`\`\`tsx
class Contador extends React.Component {
  state = { count: 0 }

  render() {
    return <button onClick={() => this.setState({ count: this.state.count + 1 })}>
      Cliques: {this.state.count}
    </button>
  }
}
\`\`\`

## Props e Estado

**Props** são dados passados de pai para filho — imutáveis dentro do componente filho.

**Estado** (\`useState\`) é dado local e mutável:

\`\`\`tsx
import { useState } from 'react'

function Contador() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Contagem: <strong>{count}</strong></p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  )
}
\`\`\`

## Ciclo de Vida com Hooks

Use \`useEffect\` para efeitos colaterais:

\`\`\`tsx
useEffect(() => {
  document.title = \`Contagem: \${count}\`

  return () => {
    // cleanup ao desmontar
    document.title = 'App'
  }
}, [count])
\`\`\`

### Regras dos Hooks

1. Só chame hooks no nível superior (não dentro de loops ou condicionais)
2. Só chame hooks em componentes funcionais React
3. Nomeie hooks customizados com o prefixo \`use\`

> **Dica:** Use o ESLint plugin \`eslint-plugin-react-hooks\` para garantir que as regras dos hooks sejam seguidas automaticamente.

---

## Próximos Passos

- Aprenda sobre **Context API** para estado global
- Explore **React Router** para navegação
- Estude **React Query** para gerenciamento de dados assíncronos`,
    subjectIds: ['frontend'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'TypeScript para Iniciantes',
    description: 'Tipagem estática no JavaScript: interfaces, tipos, generics e configuração do tsconfig.',
    content: `# TypeScript para Iniciantes

TypeScript é um **superset tipado do JavaScript** desenvolvido pela Microsoft. Ele adiciona tipagem estática opcional ao JS, tornando o código mais seguro e fácil de manter.

## Vantagens do TypeScript

- Detecção de erros em tempo de compilação
- Autocompletar e IntelliSense aprimorados
- Refatoração mais segura
- Documentação embutida no código

---

## Tipos Básicos

\`\`\`ts
let nome: string = 'Ana'
let idade: number = 25
let ativo: boolean = true
let lista: number[] = [1, 2, 3]
let tupla: [string, number] = ['item', 42]
\`\`\`

### Union Types

Use \`|\` para aceitar mais de um tipo:

\`\`\`ts
let id: string | number = 'abc123'
id = 456 // também válido
\`\`\`

## Interfaces

Interfaces descrevem a forma de um objeto:

\`\`\`ts
interface Usuario {
  id: number
  nome: string
  email: string
  ativo?: boolean // propriedade opcional
}

function exibirUsuario(user: Usuario): string {
  return \`\${user.nome} (\${user.email})\`
}
\`\`\`

## Type Aliases

\`\`\`ts
type Status = 'pendente' | 'aprovado' | 'rejeitado'

type Coordenada = {
  x: number
  y: number
}
\`\`\`

### Interface vs Type

> Use **interface** quando precisar de extensibilidade (herança, declaration merging). Use **type** para unions, intersections e tipos mais complexos.

## Generics

Generics permitem criar componentes reutilizáveis com tipos flexíveis:

\`\`\`ts
function primeiro<T>(lista: T[]): T | undefined {
  return lista[0]
}

const num = primeiro([1, 2, 3])       // tipo: number | undefined
const str = primeiro(['a', 'b', 'c']) // tipo: string | undefined
\`\`\`

### Generic com Constraint

\`\`\`ts
function obterPropriedade<T, K extends keyof T>(obj: T, chave: K): T[K] {
  return obj[chave]
}
\`\`\`

## Configuração do tsconfig.json

Principais opções:

1. \`"strict": true\` — habilita todas as verificações estritas
2. \`"target": "ES2020"\` — versão do JS gerado
3. \`"module": "ESNext"\` — sistema de módulos
4. \`"jsx": "react-jsx"\` — suporte a JSX no React

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "baseUrl": "src"
  }
}
\`\`\`

---

## Resumo

- Use \`interface\` para objetos e \`type\` para unions/aliases
- Ative \`strict\` no \`tsconfig\` desde o início
- Generics evitam duplicação de código mantendo a segurança de tipos`,
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

  getById(id: string): Promise<Study> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const study = MOCK_STUDIES.find((s) => s.id === id)
        if (study) {
          resolve(study)
        } else {
          reject(new Error('Estudo não encontrado'))
        }
      }, 300)
    })
  },

  delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = MOCK_STUDIES.findIndex((s) => s.id === id)
        if (index !== -1) {
          MOCK_STUDIES.splice(index, 1)
        }
        resolve()
      }, 300)
    })
  },
}
