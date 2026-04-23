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
    content: `# Tailwind CSS na Prática

Tailwind é um framework CSS **utility-first**: em vez de classes semânticas como \`.card\`, você compõe estilos diretamente no HTML com classes utilitárias como \`flex\`, \`p-4\`, \`text-lg\`.

## Por que Tailwind?

- Sem CSS customizado na maioria dos casos
- Design system embutido (cores, espaçamentos, tipografia)
- Purge automático — bundle final só com classes usadas
- Excelente integração com React/Vite

---

## Layout com Flexbox e Grid

\`\`\`html
<!-- Flexbox centralizado -->
<div class="flex items-center justify-center gap-4">
  <span>Item 1</span>
  <span>Item 2</span>
</div>

<!-- Grid de 3 colunas -->
<div class="grid grid-cols-3 gap-6">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</div>
\`\`\`

## Responsividade

Tailwind usa prefixos de breakpoint: \`sm:\`, \`md:\`, \`lg:\`, \`xl:\`.

\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- 1 coluna no mobile, 2 no tablet, 4 no desktop -->
</div>
\`\`\`

## Customização de Tema

No \`tailwind.config.js\` (ou via CSS com \`@theme\` no Tailwind v4):

\`\`\`js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        dark: '#261200',
      },
      fontFamily: {
        sans: ['Lexend', 'sans-serif'],
      },
    },
  },
}
\`\`\`

## Estados e Variantes

\`\`\`html
<button class="bg-primary hover:opacity-80 active:scale-95 transition-all">
  Clique aqui
</button>
\`\`\`

> **Dica:** Use a extensão **Tailwind CSS IntelliSense** no VS Code para autocompletar e preview de cores.`,
    subjectIds: ['frontend'],
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
  {
    id: '4',
    title: 'Classes e Objetos em POO',
    description: 'Fundamentos de orientação a objetos: classes, atributos, métodos e encapsulamento.',
    content: `# Classes e Objetos em POO

A **Programação Orientada a Objetos** organiza o código em torno de objetos — entidades que combinam dados (atributos) e comportamentos (métodos).

## Classe vs Objeto

- **Classe**: molde/blueprint que define estrutura e comportamento
- **Objeto**: instância concreta de uma classe

\`\`\`ts
class Pessoa {
  nome: string
  idade: number

  constructor(nome: string, idade: number) {
    this.nome = nome
    this.idade = idade
  }

  apresentar(): string {
    return \`Olá, sou \${this.nome} e tenho \${this.idade} anos.\`
  }
}

const ana = new Pessoa('Ana', 28)
console.log(ana.apresentar()) // "Olá, sou Ana e tenho 28 anos."
\`\`\`

## Encapsulamento

Controla o acesso aos dados internos usando modificadores de acesso:

| Modificador | Acesso |
|-------------|--------|
| \`public\`    | Em qualquer lugar |
| \`private\`   | Apenas dentro da classe |
| \`protected\` | Classe e subclasses |

\`\`\`ts
class ContaBancaria {
  private saldo: number = 0

  depositar(valor: number): void {
    if (valor > 0) this.saldo += valor
  }

  getSaldo(): number {
    return this.saldo
  }
}
\`\`\`

## Herança

\`\`\`ts
class Animal {
  constructor(public nome: string) {}

  falar(): string {
    return \`\${this.nome} faz um som.\`
  }
}

class Cachorro extends Animal {
  falar(): string {
    return \`\${this.nome} late: Au au!\`
  }
}
\`\`\`

> **Princípio:** Prefira composição à herança quando possível — herança profunda torna o código difícil de manter.`,
    subjectIds: ['poo'],
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-02-10T00:00:00Z',
  },
  {
    id: '5',
    title: 'Métodos Estáticos',
    description: 'Entendendo métodos estáticos em classes e quando utilizá-los corretamente.',
    content: `# Métodos Estáticos

Métodos estáticos pertencem à **classe**, não às instâncias. São chamados diretamente na classe, sem precisar criar um objeto.

## Sintaxe

\`\`\`ts
class Matematica {
  static somar(a: number, b: number): number {
    return a + b
  }

  static fatorial(n: number): number {
    if (n <= 1) return 1
    return n * Matematica.fatorial(n - 1)
  }
}

console.log(Matematica.somar(3, 4))   // 7
console.log(Matematica.fatorial(5))   // 120
\`\`\`

## Quando usar métodos estáticos?

✅ **Use quando:**
- A lógica não depende do estado de uma instância
- São funções utilitárias relacionadas à classe
- Implementar factory methods

❌ **Evite quando:**
- Precisar acessar \`this\` (estado da instância)
- A lógica mudar conforme o objeto

## Factory Method com static

\`\`\`ts
class Conexao {
  private constructor(private url: string) {}

  static criar(url: string): Conexao {
    if (!url.startsWith('https')) {
      throw new Error('Apenas HTTPS é permitido')
    }
    return new Conexao(url)
  }
}

const conn = Conexao.criar('https://api.exemplo.com')
\`\`\`

## Propriedades Estáticas

\`\`\`ts
class Contador {
  static total = 0

  constructor() {
    Contador.total++
  }
}

new Contador()
new Contador()
console.log(Contador.total) // 2
\`\`\`

> **Atenção:** Propriedades estáticas são compartilhadas entre todas as instâncias — use com cuidado para evitar efeitos colaterais inesperados.`,
    subjectIds: ['poo'],
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z',
  },
  {
    id: '6',
    title: 'Testes Unitários em C#',
    description: 'Uma introdução a testes unitários com xUnit e boas práticas de cobertura de código.',
    content: `# Testes Unitários em C#

Testes unitários verificam o comportamento de unidades isoladas de código (métodos, classes). Em C#, o framework mais popular é o **xUnit**.

## Configuração

\`\`\`bash
dotnet new xunit -n MeuProjeto.Tests
dotnet add reference ../MeuProjeto/MeuProjeto.csproj
\`\`\`

## Estrutura de um Teste

\`\`\`csharp
public class CalculadoraTests
{
    [Fact]
    public void Somar_DoisNumeros_RetornaSoma()
    {
        // Arrange
        var calc = new Calculadora();

        // Act
        var resultado = calc.Somar(3, 4);

        // Assert
        Assert.Equal(7, resultado);
    }
}
\`\`\`

O padrão **AAA** (Arrange, Act, Assert) organiza o teste em três etapas claras.

## Testes Parametrizados

\`\`\`csharp
[Theory]
[InlineData(2, 3, 5)]
[InlineData(0, 0, 0)]
[InlineData(-1, 1, 0)]
public void Somar_Parametrizado(int a, int b, int esperado)
{
    var calc = new Calculadora();
    Assert.Equal(esperado, calc.Somar(a, b));
}
\`\`\`

## Mocks com Moq

\`\`\`csharp
var mockRepo = new Mock<IUsuarioRepository>();
mockRepo.Setup(r => r.BuscarPorId(1))
        .Returns(new Usuario { Id = 1, Nome = "Ana" });

var service = new UsuarioService(mockRepo.Object);
var usuario = service.Obter(1);

Assert.Equal("Ana", usuario.Nome);
\`\`\`

## Boas Práticas

- Um assert por teste (quando possível)
- Nomes descritivos: \`Metodo_Cenario_ResultadoEsperado\`
- Teste o comportamento, não a implementação
- Mantenha os testes rápidos e independentes`,
    subjectIds: ['csharp'],
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: '7',
    title: 'Fundamentos do Angular',
    description: 'Uma introdução ao Angular: componentes, módulos, serviços e data binding.',
    content: `# Fundamentos do Angular

Angular é um **framework front-end** completo mantido pelo Google. Diferente do React (biblioteca), Angular já vem com roteamento, formulários, HTTP client e injeção de dependência embutidos.

## Estrutura de um Componente

\`\`\`ts
@Component({
  selector: 'app-saudacao',
  template: \`<h1>Olá, {{ nome }}!</h1>\`,
})
export class SaudacaoComponent {
  nome = 'Mundo'
}
\`\`\`

## Data Binding

| Tipo | Sintaxe | Direção |
|------|---------|---------|
| Interpolação | \`{{ valor }}\` | Component → Template |
| Property binding | \`[propriedade]="valor"\` | Component → Template |
| Event binding | \`(evento)="handler()"\` | Template → Component |
| Two-way | \`[(ngModel)]="campo"\` | Bidirecional |

## Serviços e Injeção de Dependência

\`\`\`ts
@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private usuarios: string[] = []

  adicionar(nome: string): void {
    this.usuarios.push(nome)
  }

  listar(): string[] {
    return this.usuarios
  }
}

@Component({ ... })
export class AppComponent {
  constructor(private usuarioService: UsuarioService) {}
}
\`\`\`

## Roteamento

\`\`\`ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre', component: SobreComponent },
  { path: '**', redirectTo: '' },
]
\`\`\`

> **Dica:** Use \`RouterLink\` no template em vez de \`href\` para navegação sem recarregar a página.`,
    subjectIds: ['frontend'],
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z',
  },
  {
    id: '8',
    title: 'Git e Controle de Versão',
    description: 'Comandos essenciais do Git: commits, branches, merge, rebase e resolução de conflitos.',
    content: `# Git e Controle de Versão

Git é o sistema de controle de versão distribuído mais usado no mundo. Ele rastreia mudanças no código, permite colaboração e facilita reverter erros.

## Comandos Essenciais

\`\`\`bash
git init                    # inicializa repositório
git clone <url>             # clona repositório remoto
git status                  # mostra estado atual
git add .                   # adiciona tudo ao stage
git commit -m "mensagem"    # cria commit
git push origin main        # envia para remoto
git pull                    # atualiza do remoto
\`\`\`

## Branches

\`\`\`bash
git branch feature/login    # cria branch
git checkout feature/login  # muda para branch
git checkout -b feature/login  # cria e muda

git merge feature/login     # merge na branch atual
git branch -d feature/login # deleta branch local
\`\`\`

## Rebase vs Merge

**Merge** preserva o histórico completo com um commit de merge.

**Rebase** reescreve o histórico linearmente — útil para manter o histórico limpo antes de um PR.

\`\`\`bash
git rebase main             # reaplica commits sobre main
git rebase -i HEAD~3        # rebase interativo (squash, reword...)
\`\`\`

## Resolução de Conflitos

Quando dois branches editam a mesma linha:

\`\`\`
<<<<<<< HEAD
  código da sua branch
=======
  código da outra branch
>>>>>>> feature/login
\`\`\`

Edite o arquivo, escolha o que manter, depois:

\`\`\`bash
git add arquivo.ts
git commit
\`\`\`

## Boas Práticas de Commit

- Mensagens no imperativo: "Adiciona validação de email"
- Commits pequenos e focados em uma mudança
- Use \`git commit --amend\` para corrigir o último commit (antes do push)`,
    subjectIds: ['ferramentas'],
    createdAt: '2024-03-20T00:00:00Z',
    updatedAt: '2024-03-20T00:00:00Z',
  },
  {
    id: '9',
    title: 'SQL para Desenvolvedores',
    description: 'Consultas SQL do básico ao avançado: SELECT, JOIN, subqueries e índices.',
    content: `# SQL para Desenvolvedores

SQL (Structured Query Language) é a linguagem padrão para consultar e manipular bancos de dados relacionais.

## Consultas Básicas

\`\`\`sql
-- Selecionar tudo
SELECT * FROM usuarios;

-- Selecionar colunas específicas com filtro
SELECT nome, email
FROM usuarios
WHERE ativo = true
ORDER BY nome ASC
LIMIT 10;
\`\`\`

## JOINs

\`\`\`sql
-- INNER JOIN: apenas registros com correspondência nos dois lados
SELECT u.nome, p.titulo
FROM usuarios u
INNER JOIN posts p ON p.usuario_id = u.id;

-- LEFT JOIN: todos os usuários, mesmo sem posts
SELECT u.nome, COUNT(p.id) AS total_posts
FROM usuarios u
LEFT JOIN posts p ON p.usuario_id = u.id
GROUP BY u.id, u.nome;
\`\`\`

## Subqueries

\`\`\`sql
-- Usuários que fizeram pelo menos um pedido
SELECT nome FROM usuarios
WHERE id IN (
  SELECT DISTINCT usuario_id FROM pedidos
);
\`\`\`

## Índices

Índices aceleram consultas mas aumentam o custo de escrita.

\`\`\`sql
-- Criar índice
CREATE INDEX idx_usuarios_email ON usuarios(email);

-- Índice composto
CREATE INDEX idx_pedidos_usuario_data
ON pedidos(usuario_id, criado_em DESC);
\`\`\`

## Transações

\`\`\`sql
BEGIN;
  UPDATE contas SET saldo = saldo - 100 WHERE id = 1;
  UPDATE contas SET saldo = saldo + 100 WHERE id = 2;
COMMIT;
-- Se algo falhar: ROLLBACK;
\`\`\`

> **Dica:** Use \`EXPLAIN ANALYZE\` para entender o plano de execução de uma query lenta.`,
    subjectIds: ['banco-de-dados'],
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-04-01T00:00:00Z',
  },
  {
    id: '10',
    title: 'Padrões de Projeto',
    description: 'Design patterns clássicos: Singleton, Factory, Observer e Strategy com exemplos práticos.',
    content: `# Padrões de Projeto

Design patterns são soluções reutilizáveis para problemas recorrentes no design de software. Foram popularizados pelo livro **"Gang of Four"** (GoF).

## Singleton

Garante que uma classe tenha apenas uma instância.

\`\`\`ts
class ConfiguracaoApp {
  private static instancia: ConfiguracaoApp

  private constructor(public tema: string = 'claro') {}

  static getInstance(): ConfiguracaoApp {
    if (!ConfiguracaoApp.instancia) {
      ConfiguracaoApp.instancia = new ConfiguracaoApp()
    }
    return ConfiguracaoApp.instancia
  }
}

const config = ConfiguracaoApp.getInstance()
\`\`\`

## Factory Method

Define uma interface para criar objetos, deixando subclasses decidirem qual classe instanciar.

\`\`\`ts
interface Notificacao {
  enviar(mensagem: string): void
}

class NotificacaoEmail implements Notificacao {
  enviar(msg: string) { console.log(\`Email: \${msg}\`) }
}

class NotificacaoSMS implements Notificacao {
  enviar(msg: string) { console.log(\`SMS: \${msg}\`) }
}

function criarNotificacao(tipo: 'email' | 'sms'): Notificacao {
  return tipo === 'email' ? new NotificacaoEmail() : new NotificacaoSMS()
}
\`\`\`

## Observer

Define uma dependência um-para-muitos: quando um objeto muda, todos os dependentes são notificados.

\`\`\`ts
class EventEmitter<T> {
  private listeners: ((data: T) => void)[] = []

  on(fn: (data: T) => void) { this.listeners.push(fn) }
  emit(data: T) { this.listeners.forEach(fn => fn(data)) }
}
\`\`\`

## Strategy

Define uma família de algoritmos intercambiáveis.

\`\`\`ts
type Ordenador = (arr: number[]) => number[]

const bubbleSort: Ordenador = (arr) => { /* ... */ return arr }
const quickSort: Ordenador = (arr) => { /* ... */ return arr }

class Sorter {
  constructor(private strategy: Ordenador) {}
  ordenar(arr: number[]) { return this.strategy(arr) }
}
\`\`\`

> **Regra de ouro:** Não aplique patterns por aplicar — use quando o problema que eles resolvem realmente existir no seu código.`,
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
