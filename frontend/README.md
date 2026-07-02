# Frontend - Portal de Consulta de Documentos

## 📋 Descrição do Projeto

Interface frontend do **Portal de Consulta de Documentos** - Uma aplicação React que permite validar colaboradores e consultar documentos (IR e Boletos) através de um formulário interativo. A aplicação oferece uma experiência responsiva e intuitiva para consulta de documentos de colaboradores.

## 🚀 Como Executar

### Instalação de Dependências

```bash
npm install
```

### Executar em Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

### Configuração da API

A aplicação se conecta com o backend através da URL base configurada em `services/api.js`:

```
BASE_URL: http://localhost:3001
```

Certifique-se de que o servidor backend está rodando na porta 3001 antes de iniciar o frontend.

## ✨ Funcionalidades Principais

- **Validação de Colaboradores** - Formulário para validar dados do colaborador (matrícula, CPF)
- **Seleção de Tipo de Documento** - Interface para selecionar entre IR e Boletos
- **Listagem de Documentos** - Exibe os documentos consultados em uma tabela responsiva
- **Interface Responsiva** - Design adaptável para diferentes tamanhos de tela com Tailwind CSS

## 🧪 Dados de Teste

Use os seguintes colaboradores para testes:

| Nome            | Matrícula | CPF            | Data de Nascimento | Data de Admissão |
| --------------- | --------- | -------------- | ------------------ | ---------------- |
| João Silva      | 12345     | 123.456.789-00 | 1990-01-15         | 2015-03-01       |
| Maria Santos    | 12346     | 987.654.321-11 | 1988-05-20         | 2016-07-15       |
| Carlos Oliveira | 12347     | 456.789.123-22 | 1992-09-10         | 2017-01-10       |
| Ana Costa       | 12348     | 789.123.456-33 | 1995-03-25         | 2018-06-01       |
| Pedro Ferreira  | 12349     | 321.654.987-44 | 1993-11-08         | 2019-02-15       |

## 🛠️ Stack Tecnológico

- **React** 18 - Biblioteca UI
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Axios** - Cliente HTTP
- **PostCSS** - Processamento de CSS
- **Autoprefixer** - Adição de prefixos para compatibilidade de browsers

## 📁 Estrutura de Componentes

```
src/
├── App.jsx                 # Componente raiz da aplicação
├── index.css              # Estilos globais
├── main.jsx               # Ponto de entrada
├── pages/
│   └── Home.jsx           # Página principal
├── components/
│   ├── ValidationForm.jsx # Formulário de validação de colaboradores
│   ├── DocumentSelector.jsx # Seletor de tipo de documento (IR/Boletos)
│   └── DocumentList.jsx   # Listagem e exibição de documentos
└── services/
    └── api.js             # Integração com API backend
```

### Descrição dos Componentes

- **App.jsx**: Componente raiz que gerencia o estado geral da aplicação
- **pages/Home.jsx**: Página principal que reúne todos os componentes
- **components/ValidationForm.jsx**: Formulário para validação de colaboradores
- **components/DocumentSelector.jsx**: Interface para selecionar tipo de documento
- **components/DocumentList.jsx**: Componente que exibe a lista de documentos consultados
- **services/api.js**: Módulo com requisições HTTP para o backend

## 📚 Referências Adicionais

Siga as instruções detalhadas em [`.github/instructions/FRONTEND_INSTRUCTIONS.md`](../.github/instructions/FRONTEND_INSTRUCTIONS.md) para configuração avançada e troubleshooting.
