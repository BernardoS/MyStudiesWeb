![Capa do Repositório](<Capa -  Web.png>)

# My Studies - Web

Projeto para implementar o front-end da API desenvolvida anteriormente em .NET.

- **API:** https://github.com/BernardoS/mystudies

---

## Propósito

O propósito deste projeto é desenvolver uma aplicação front-end React completa que interaja com uma API construída em .NET.

---

## Stack

- **React** com **TypeScript**
- **Vite** como bundler
- **Tailwind CSS** para estilização

---

## Páginas implementadas

### Home (`/`)

Página principal da aplicação. Exibe todos os estudos cadastrados em um grid de cards e permite busca por título em tempo real.

**Funcionalidades:**

- Listagem de estudos em grid de 4 colunas, com cards vazios para completar a última linha
- Barra de busca para filtrar estudos pelo título
- Botão "criar estudo" na barra de busca que navega para `/estudos/novo`
- Estado de carregamento enquanto os dados são buscados
- Mensagem de erro com botão "Tentar novamente" em caso de falha na requisição
- Mensagem de estado vazio quando não há estudos cadastrados
- Mensagem de "nenhum resultado" quando a busca não retorna correspondências

**Componentes utilizados:**

| Componente | Descrição |
|---|---|
| `Header` | Cabeçalho com logo e links de navegação (cards, assuntos, estudos) |
| `SearchBar` | Campo de busca com ícone e botão de criação |
| `CardGrid` | Container em grid de 4 colunas para os cards |
| `StudyCard` | Card com título, descrição e botão "Ler mais..." |
| `EmptyCard` | Card vazio para preenchimento visual do grid |

---

### Criar Estudo (`/estudos/novo`)

Página de criação de um novo estudo. Permite escrever o conteúdo em Markdown, associar o estudo a um assunto e pré-visualizar a formatação antes de salvar.

**Funcionalidades:**

- Campo de título e descrição curta do estudo
- Editor de texto Markdown com toggle entre modo "Editar" e "Visualizar"
- Pré-visualização do Markdown renderizado (headings, listas, código, negrito, itálico)
- Seleção de assunto existente via botões clicáveis
- Criação de novo assunto inline, sem sair da página
- Validação de campos obrigatórios com mensagens de erro inline
- Estado de loading no botão "Salvar estudo" durante o envio
- Redirecionamento para a home após salvar com sucesso
- Botão "Cancelar" para voltar à home sem salvar

**Componentes utilizados:**

| Componente | Descrição |
|---|---|
| `Header` | Cabeçalho reutilizado da home |
| `MarkdownEditor` | Textarea com toggle edição/pré-visualização via `react-markdown` |
| `SubjectSelector` | Lista de assuntos selecionáveis + input para criar assunto inline |

---

## Serviços

- **`studiesService`** — busca e criação de estudos. Atualmente utiliza dados mockados com delay de 500ms. Será integrado à API .NET futuramente.
- **`subjectsService`** — listagem e criação de assuntos. Atualmente utiliza dados mockados (delay de 500ms para listagem, 300ms para criação). Será integrado à API .NET futuramente.
