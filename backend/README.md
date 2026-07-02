# Backend

## Descrição do Projeto

Portal de Consulta de Documentos - Uma aplicação que permite validar colaboradores e recuperar documentos como Informes de Rendimento (IR) e Boletos.

## Como Executar

### Instalação de Dependências

```bash
npm install
```

### Iniciar o Servidor em Desenvolvimento

```bash
npm run dev
```

O servidor iniciará na porta padrão **3001**.

### Variáveis de Ambiente

Você pode configurar as seguintes variáveis de ambiente:

- `PORT`: Porta em que o servidor será executado (padrão: 3001)
- `TOKEN_EXPIRATION_SECONDS`: Tempo de expiração do token em segundos (padrão: 3600)

## Endpoints da API

### POST /api/validar-colaborador

Valida um colaborador com base nas informações fornecidas.

**Parâmetros (body):**

- `matricula`: Matrícula do colaborador
- `cpf`: CPF do colaborador (formato: XXX.XXX.XXX-XX)
- `dataNascimento`: Data de nascimento (formato: YYYY-MM-DD)
- `dataAdmissao`: Data de admissão (formato: YYYY-MM-DD)

**Resposta de sucesso:** Token de validação e informações do colaborador

### GET /api/documentos/:cpf

Retorna documentos (IR ou BOLETO) de um CPF específico.

**Parâmetros:**

- `:cpf`: CPF do colaborador (obrigatório)
- `matricula`: Matrícula (opcional, filtra documentos)
- `tipo`: Tipo de documento - IR ou BOLETO (opcional)

**Resposta:** Lista de documentos encontrados

### GET /health

Health check do servidor para verificar se está respondendo corretamente.

**Resposta:** Status de saúde da aplicação

## Dados de Teste

A aplicação inclui 5 colaboradores mockados para fins de teste:

1. **João Silva**
   - Matrícula: 12345
   - CPF: 123.456.789-00
   - Data de Nascimento: 1990-01-15
   - Data de Admissão: 2015-03-01

2. **Maria Santos**
   - Matrícula: 12346
   - CPF: 987.654.321-11
   - Data de Nascimento: 1988-05-20
   - Data de Admissão: 2016-07-15

3. **Carlos Oliveira**
   - Matrícula: 12347
   - CPF: 456.789.123-22
   - Data de Nascimento: 1992-09-10
   - Data de Admissão: 2017-01-10

4. **Ana Costa**
   - Matrícula: 12348
   - CPF: 789.123.456-33
   - Data de Nascimento: 1995-03-25
   - Data de Admissão: 2018-06-01

5. **Pedro Ferreira**
   - Matrícula: 12349
   - CPF: 321.654.987-44
   - Data de Nascimento: 1993-11-08
   - Data de Admissão: 2019-02-15

## Stack Tecnológico

- **Express**: Framework web para Node.js
- **Node.js**: Runtime JavaScript
- **CORS**: Habilitação de Cross-Origin Resource Sharing
- **UUID**: Geração de identificadores únicos
- **dotenv**: Gerenciamento de variáveis de ambiente

Siga as instruções em [`.github/instructions/BACKEND_INSTRUCTIONS.md`](../.github/instructions/BACKEND_INSTRUCTIONS.md) para mais detalhes sobre a configuração e execução do backend.
