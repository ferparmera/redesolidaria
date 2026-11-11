
# RedeSolidária

*Plataforma de Gestão de Empréstimos de Equipamentos Assistivos*

Projeto desenvolvido para a disciplina de Projeto Integrador Extensionista II (PIE II), do curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas da Universidade de Marília (UNIMAR).

## Sobre o projeto

O RedeSolidária é uma proposta de plataforma web destinada a auxiliar instituições sem fins lucrativos no gerenciamento de empréstimos de equipamentos assistivos e hospitalares, como cadeiras de rodas, muletas, andadores e camas hospitalares.

O projeto utiliza como referência as atividades do Clube de Cadeira de Rodas João Leão de Carvalho, localizado em Assis/SP.

A plataforma foi planejada para permitir que diferentes instituições gerenciem seus próprios equipamentos, beneficiários, empréstimos e devoluções de forma independente, mantendo suas informações organizadas e separadas.

## Objetivo

Desenvolver uma solução web que facilite o controle de equipamentos assistivos, o acompanhamento dos empréstimos e devoluções e a organização das informações utilizadas pelas instituições.

A proposta busca contribuir para uma gestão mais eficiente dos recursos disponíveis e apoiar o atendimento à comunidade.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Vite 8
- Node.js
- Express
- dotenv
- Git e GitHub

## Funcionalidades implementadas — Atividade 1

Nesta primeira etapa, foi desenvolvida a estrutura inicial da aplicação, incluindo:

- Criação do projeto frontend com Vite.
- Configuração da API utilizando Node.js e Express.
- Implementação da rota GET /api/health.
- Configuração do proxy para comunicação entre frontend e backend.
- Página inicial exibindo o status da API.
- Exibição da data e hora retornadas pelo servidor.
- Versionamento do código utilizando Git.

## Estrutura do projeto

```text
redesolidaria/
├── public/
├── server/
│   └── index.js
├── src/
│   ├── main.js
│   └── style.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── pnpm-lock.yaml
├── vite.config.js
└── README.md
```

O arquivo `.env` deve ser criado localmente e não é enviado ao GitHub.

## Como executar o projeto

# Pré-requisitos

É necessário ter instalado:

- Node.js
- npm
- Git

# 1. Clonar o repositório

Abra o terminal e execute:

```bash
git clone https://github.com/ferparmera/redesolidaria.git
```

Entre na pasta do projeto:

```bash
cd redesolidaria
```

# 2. Instalar as dependências

Execute:

```bash
npm install
```

# 3. Configurar as variáveis de ambiente

Na raiz do projeto, crie um arquivo chamado `.env` com o seguinte conteúdo:

```env
PORT=3000
```

O arquivo `.env.example` contém um modelo dessa configuração.

# 4. Iniciar o backend

Abra um terminal na pasta do projeto e execute:

```bash
npm run api
```

A API Express será iniciada na porta 3000.

Para verificar seu funcionamento, acesse:

http://localhost:3000/api/health

A resposta esperada será semelhante a:

```json
{
  "status": "ok",
  "app": "RedeSolidária",
  "hora": "2026-11-11T16:28:56.084Z"
}
```

A data e a hora são geradas automaticamente pelo servidor.

### 5. Iniciar o frontend

Mantenha o terminal do backend aberto.

Em um segundo terminal, execute:

```bash
npm run dev
```

Acesse no navegador:

http://localhost:5173

A página inicial deverá apresentar:

```text
RedeSolidária

Plataforma de Gestão de Empréstimos de Equipamentos Assistivos

Status da API: ok

Data e hora: [data e hora da consulta]
```

## Funcionamento da aplicação

A aplicação possui duas partes principais:

*Frontend:* desenvolvido com HTML, CSS e JavaScript, utilizando o Vite como servidor de desenvolvimento na porta 5173.

*Backend:* desenvolvido com Node.js e Express, responsável por disponibilizar a API na porta 3000.

O frontend realiza uma requisição à rota `/api/health`. O proxy configurado no Vite encaminha essa solicitação ao backend, que retorna uma resposta em formato JSON contendo o status da aplicação e a data e hora da consulta.

## Próximas etapas

Nas próximas etapas do projeto, estão previstas as seguintes funcionalidades:

- Cadastro de instituições.
- Cadastro de usuários com diferentes níveis de acesso.
- Cadastro de beneficiários.
- Cadastro e consulta de equipamentos.
- Registro de empréstimos e devoluções.
- Controle de prazos e identificação de atrasos.
- Reserva de equipamentos.
- Registro de manutenções.
- Dashboard e relatórios gerenciais.
- Separação dos dados por instituição.

Essas funcionalidades fazem parte do planejamento do RedeSolidária e ainda não estão implementadas nesta primeira versão.

## Autor

**Fernando Campos**

Análise e Desenvolvimento de Sistemas — UNIMAR

Assis/SP — 2026

GitHub: https://github.com/ferparmera
