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
- Botão "criar estudo" na barra de busca (ação ainda não implementada)
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

## Serviços

- **`studiesService`** — responsável por buscar os estudos. Atualmente utiliza dados mockados localmente, com simulação de delay de 500ms. Será integrado à API .NET futuramente.
