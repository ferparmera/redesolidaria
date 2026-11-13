# RedeSolidária

**Plataforma de Gestão de Empréstimos de Equipamentos Assistivos**

Projeto desenvolvido para a disciplina de Projeto Integrador Extensionista II (PIE II), do curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas da Universidade de Marília (UNIMAR).

## Sobre o projeto

O RedeSolidária é uma proposta de plataforma web destinada a auxiliar instituições sem fins lucrativos no gerenciamento de equipamentos assistivos e hospitalares, como cadeiras de rodas, muletas, andadores e camas hospitalares.

O projeto utiliza como referência as atividades do Clube de Cadeira de Rodas João Leão de Carvalho, localizado em Assis/SP.

A plataforma foi planejada para permitir que diferentes instituições administrem seus próprios doadores, doações, beneficiários, equipamentos, empréstimos e devoluções, mantendo seus registros organizados e separados.

## Objetivo

Desenvolver uma solução web para apoiar o recebimento de doações de equipamentos assistivos, o controle do patrimônio disponível, o acompanhamento dos empréstimos e devoluções e a organização das informações utilizadas pelas instituições.

A proposta busca facilitar a gestão dos recursos disponíveis e contribuir para o atendimento à comunidade.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Vite+ 1.6.0
- Node.js
- Express
- MariaDB / MySQL
- mysql2
- dotenv
- pnpm
- Git e GitHub

Para o desenvolvimento local, foi utilizado o XAMPP, que disponibiliza o MariaDB e o phpMyAdmin.

## Funcionalidades implementadas

### Atividade 1 — Estrutura inicial e API

- Criação do frontend com Vite+.
- Configuração do backend com Node.js e Express.
- Implementação da rota `GET /api/health`.
- Configuração do proxy entre frontend e backend.
- Página inicial exibindo o status da API.
- Exibição da data e hora retornadas pelo servidor.
- Versionamento do projeto com Git e GitHub.

### Atividade 2 — Banco de dados e integração

- Criação do arquivo `database/schema.sql`.
- Modelagem inicial de nove tabelas relacionadas.
- Definição de chaves primárias e estrangeiras.
- Configuração do MariaDB em ambiente local.
- Execução do `schema.sql` duas vezes para testar sua recriação.
- Instalação da biblioteca `mysql2`.
- Configuração de um pool de conexões no arquivo `server/db.js`.
- Implementação da rota `GET /api/db-health`.
- Implementação da rota `GET /api/instituicoes`.
- Teste de inserção de uma instituição fictícia no MariaDB.
- Consulta bem-sucedida do registro pela API Express.

O cadastro realizado nesta etapa foi um teste manual pelo phpMyAdmin. Ainda não existe uma tela de cadastro nem uma rota POST para instituições.

## Estrutura do projeto

```text
redesolidaria/
├── database/
│   └── schema.sql
├── public/
├── server/
│   ├── db.js
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

O arquivo `.env` contém configurações locais e não deve ser enviado ao GitHub.

## Banco de dados

O projeto utiliza MariaDB, compatível com os comandos MySQL utilizados na modelagem.

O arquivo `database/schema.sql` define as seguintes tabelas:

| Tabela         | Finalidade                                        |
| -------------- | ------------------------------------------------- |
| `instituicao`  | Instituições cadastradas na plataforma            |
| `usuario`      | Usuários e níveis de acesso                       |
| `beneficiario` | Pessoas atendidas pelas instituições              |
| `doador`       | Pessoas físicas ou jurídicas que realizam doações |
| `doacao`       | Registro de doações recebidas                     |
| `equipamento`  | Equipamentos disponíveis no patrimônio            |
| `emprestimo`   | Empréstimos e devoluções                          |
| `reserva`      | Solicitações de reserva de equipamentos           |
| `manutencao`   | Registros de manutenção                           |

As tabelas possuem relacionamentos definidos por chaves estrangeiras.

**Atenção:** o script contém `DROP DATABASE IF EXISTS redesolidaria`, que exclui o banco existente antes de recriá-lo. Sua execução apaga os dados armazenados nesse banco. Deve ser utilizado apenas em ambiente de desenvolvimento e testes, sem dados que precisem ser preservados.

## Como executar o projeto

### Pré-requisitos

- Git
- Vite+ (comando `vp`)
- MariaDB ou MySQL
- XAMPP, opcionalmente, para executar o MariaDB e acessar o phpMyAdmin

### 1. Clonar o repositório

```bash
git clone https://github.com/ferparmera/redesolidaria.git
cd redesolidaria
```

### 2. Instalar as dependências

```bash
vp install
```

Esse comando instala as dependências do projeto.

### 3. Preparar o banco de dados

Inicie o serviço MySQL/MariaDB.

Caso utilize o XAMPP, inicie o módulo MySQL pelo XAMPP Control Panel.

Acesse o phpMyAdmin:

http://localhost/phpmyadmin/

Na página inicial do phpMyAdmin, utilize a opção **Importar** para selecionar o arquivo `database/schema.sql`.

O script criará o banco de dados `redesolidaria` e suas nove tabelas.

### 4. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes configurações de exemplo:

```env
PORT=3000

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=redesolidaria
```

Esses valores correspondem a uma configuração local típica do XAMPP, com usuário `root` sem senha. Caso a instalação utilize outras credenciais, ajuste as variáveis.

O acesso `root` sem senha não deve ser utilizado em produção. Em ambientes publicados, deverá ser criado um usuário de banco com permissões limitadas e senha segura.

O arquivo `.env` deve permanecer fora do versionamento Git.

### 5. Iniciar o backend

No terminal, execute:

```bash
vp run api
```

A API ficará disponível em:

http://localhost:3000

Para verificar o funcionamento do Express, acesse:

http://localhost:3000/api/health

Resposta de exemplo:

```json
{
  "status": "ok",
  "app": "RedeSolidária",
  "hora": "2026-11-11T16:28:56.084Z"
}
```

A data e a hora são geradas automaticamente.

### 6. Testar a conexão com o banco

Com o MariaDB em execução, acesse:

http://localhost:3000/api/db-health

Resposta obtida no ambiente de desenvolvimento:

```json
{
  "status": "ok",
  "banco": "redesolidaria",
  "versao": "10.11.16-MariaDB"
}
```

Essa rota confirma que o backend consegue consultar o banco de dados.

### 7. Consultar instituições

Acesse:

http://localhost:3000/api/instituicoes

A rota consulta as colunas `id_instituicao`, `nome`, `email` e `ativo` da tabela `instituicao`.

Se não houver instituições cadastradas, a resposta será:

```json
[]
```

Após cadastrar uma instituição fictícia de teste no banco, foi obtida a seguinte resposta:

```json
[
  {
    "id_instituicao": 1,
    "nome": "Instituicao Exemplo",
    "email": "contato@exemplo.org",
    "ativo": 1
  }
]
```

Os dados são ilustrativos e foram cadastrados apenas para verificar o funcionamento da integração.

### 8. Iniciar o frontend

Mantenha o backend em execução e abra um segundo terminal.

Execute:

```bash
vp dev
```

Acesse:

http://localhost:5173

A página inicial apresenta o nome do projeto, o status da API e a data e hora retornadas pelo servidor.

## Arquitetura da aplicação

O projeto utiliza uma arquitetura web com separação entre frontend, backend e banco de dados.

**Frontend:** desenvolvido em HTML, CSS e JavaScript, utilizando Vite+ como ferramenta de desenvolvimento. Durante os testes locais, funciona na porta 5173.

**Backend:** desenvolvido em Node.js e Express, disponibilizando uma API HTTP na porta 3000.

**Banco de dados:** MariaDB, responsável pelo armazenamento persistente dos registros. A comunicação é realizada pelo backend, utilizando a biblioteca `mysql2`.

O frontend utiliza `fetch` para consultar a API. O proxy configurado no Vite+ encaminha requisições com o prefixo `/api` ao backend Express.

As rotas existentes até esta etapa são:

| Método | Rota                | Finalidade                         |
| ------ | ------------------- | ---------------------------------- |
| GET    | `/api/health`       | Verificar o funcionamento da API   |
| GET    | `/api/db-health`    | Verificar a conexão com o MariaDB  |
| GET    | `/api/instituicoes` | Consultar instituições cadastradas |

A autenticação, autorização e separação efetiva de acesso aos dados por instituição ainda serão implementadas. As rotas atuais são voltadas ao desenvolvimento local.

## Próximas etapas

- Implementar cadastros pela API REST.
- Desenvolver o gerenciamento de doadores e doações.
- Implementar o cadastro de beneficiários.
- Implementar o cadastro e a consulta de equipamentos.
- Desenvolver o registro de empréstimos e devoluções.
- Aplicar autenticação e controle de acesso por instituição.
- Implementar regras de disponibilidade dos equipamentos.
- Adicionar controle de atrasos, reservas e manutenções.
- Desenvolver telas integradas ao backend.
- Criar relatórios e indicadores gerenciais.
- Realizar testes e preparar a aplicação para publicação.

Essas funcionalidades fazem parte do planejamento do RedeSolidária e não devem ser consideradas implementadas nesta versão.

## Autor

**Fernando Campos**

Análise e Desenvolvimento de Sistemas — UNIMAR

Assis/SP — 2026

GitHub: https://github.com/ferparmera
