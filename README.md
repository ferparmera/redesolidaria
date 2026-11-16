# RedeSolidária

**Plataforma de Gestão de Doações e Empréstimos de Equipamentos Assistivos**

Projeto desenvolvido para a disciplina de Projeto Integrador Extensionista II (PIE II), do curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas da Universidade de Marília (UNIMAR).

## Sobre o projeto

O RedeSolidária é uma proposta de plataforma web destinada a auxiliar instituições sem fins lucrativos no gerenciamento de equipamentos assistivos e hospitalares, como cadeiras de rodas, muletas, andadores e camas hospitalares.

O projeto utiliza como referência as atividades do Clube de Cadeira de Rodas João Leão de Carvalho, localizado em Assis/SP.

A plataforma foi planejada para permitir que diferentes instituições administrem seus próprios doadores, doações, beneficiários, equipamentos, empréstimos e devoluções.

## Objetivo

Desenvolver uma solução web para facilitar o recebimento de doações, o controle patrimonial de equipamentos assistivos e o acompanhamento de empréstimos e devoluções, contribuindo para uma gestão mais eficiente dos recursos disponíveis.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- Vite+ 1.6.0
- Node.js
- Express
- MariaDB / MySQL
- mysql2
- dotenv
- pnpm
- Git e GitHub
- XAMPP e phpMyAdmin
- REST Client

## Funcionalidades implementadas

### Aula 1 — Estrutura inicial

- Criação do projeto com Vite+.
- Configuração do backend com Node.js e Express.
- Implementação da rota GET /api/health.
- Configuração do proxy entre frontend e backend.
- Comunicação inicial entre frontend e API.
- Versionamento com Git e GitHub.

### Aula 2 — Banco de dados

- Modelagem de nove tabelas relacionadas.
- Criação do arquivo database/schema.sql.
- Definição de chaves primárias e estrangeiras.
- Configuração do MariaDB.
- Integração do backend com mysql2.
- Configuração de pool de conexões.
- Implementação das rotas de verificação do banco e consulta de instituições.

### Aula 3 — Backend e frontend integrados

- Revisão da modelagem para minimização de dados pessoais.
- Criação do arquivo database/seed.sql.
- Inserção de registros fictícios.
- Modularização das rotas do Express.
- CRUD de doadores.
- Exclusão lógica de doadores.
- Listagem de equipamentos.
- Registro de doações com múltiplos equipamentos.
- Histórico de doações.
- Consultas SQL com JOIN.
- Consultas SQL parametrizadas.
- Transações SQL com COMMIT e ROLLBACK.
- Tratamento de patrimônios duplicados.
- Interface responsiva.
- Navegação SPA com hash routing.
- Comunicação com a API utilizando fetch e async/await.
- Tratamento de erros e mensagens de confirmação.
- Testes manuais com REST Client.
- Verificação e compilação utilizando Vite+.

## Telas disponíveis

| Endereço         | Funcionalidade                                    |
| ---------------- | ------------------------------------------------- |
| `#/doadores`     | Cadastro, listagem, edição e exclusão de doadores |
| `#/doacoes/nova` | Registro de doações com múltiplos equipamentos    |
| `#/doacoes`      | Histórico de doações recebidas                    |

A interface foi desenvolvida para utilização em computadores, tablets e smartphones.

## Estrutura do projeto

```text
redesolidaria/
├── database/
│   ├── schema.sql
│   └── seed.sql
├── public/
├── server/
│   ├── routes/
│   │   ├── doadores.js
│   │   ├── doacoes.js
│   │   └── equipamentos.js
│   ├── db.js
│   └── index.js
├── src/
│   ├── pages/
│   │   ├── doadores.js
│   │   └── doacoes.js
│   ├── api.js
│   ├── ui.js
│   ├── main.js
│   └── style.css
├── .env.example
├── .gitignore
├── api.http
├── index.html
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── vite.config.js
└── README.md
```

O arquivo `.env` contém configurações locais e não deve ser enviado ao GitHub.

## Banco de dados

O projeto utiliza MariaDB, com nove tabelas relacionadas.

| Tabela       | Finalidade                                        |
| ------------ | ------------------------------------------------- |
| instituicao  | Instituições cadastradas                          |
| usuario      | Usuários e níveis de acesso                       |
| beneficiario | Pessoas atendidas                                 |
| doador       | Pessoas físicas ou jurídicas que realizam doações |
| doacao       | Doações recebidas                                 |
| equipamento  | Controle individual dos equipamentos              |
| emprestimo   | Empréstimos e devoluções                          |
| reserva      | Reservas de equipamentos                          |
| manutencao   | Histórico de manutenções                          |

Cada equipamento possui um número de patrimônio único dentro de sua instituição.

Uma doação pode conter diversos equipamentos, permitindo seu controle individual.

### Scripts SQL

- `schema.sql`: criação da estrutura do banco.
- `seed.sql`: inserção de registros fictícios para desenvolvimento e testes.

**Atenção:** o arquivo schema.sql contém o comando DROP DATABASE IF EXISTS redesolidaria. Sua execução recria o banco e apaga os registros existentes.

Utilize esse script somente em ambientes de desenvolvimento nos quais os dados possam ser descartados.

## Como executar o projeto

### Pré-requisitos

- Git
- Vite+ (comando vp)
- Node.js
- MariaDB ou MySQL
- XAMPP (opcional)

### 1. Clonar o repositório

```bash
git clone https://github.com/ferparmera/redesolidaria.git
cd redesolidaria
```

### 2. Instalar as dependências

```bash
vp install
```

### 3. Preparar o banco de dados

Inicie o MariaDB.

Caso utilize o XAMPP, inicie os módulos MySQL e Apache e acesse:

http://localhost/phpmyadmin/

Em uma instalação nova e vazia, importe o arquivo:

```text
database/schema.sql
```

Antes de importar o seed.sql, cadastre uma instituição inicial de referência:

```sql
INSERT INTO redesolidaria.instituicao (nome, email)
VALUES ('Instituicao Exemplo', 'contato@example.org');
```

Em seguida, importe:

```text
database/seed.sql
```

Isso reproduz a sequência utilizada durante o desenvolvimento, na qual a instituição fictícia do seed possui o identificador 2.

O seed deve ser importado uma única vez, para evitar duplicidades.

### 4. Configurar as variáveis de ambiente

Crie o arquivo `.env` na raiz do projeto, utilizando o `.env.example` como referência.

```env
PORT=3000

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=redesolidaria
```

As configurações acima correspondem a um ambiente local típico do XAMPP.

O usuário root sem senha não deve ser utilizado em produção.

### 5. Iniciar o backend

No primeiro terminal:

```bash
vp run api
```

A API estará disponível em:

http://localhost:3000

Para verificar seu funcionamento:

http://localhost:3000/api/health

Para verificar a conexão com o banco:

http://localhost:3000/api/db-health

### 6. Iniciar o frontend

Mantenha o backend em execução.

Em um segundo terminal, execute:

```bash
vp dev
```

Acesse:

http://localhost:5173

A página inicial exibirá a tela de gerenciamento de doadores.

O rodapé apresenta o status da API e do banco de dados.

## Arquitetura da aplicação

O RedeSolidária utiliza uma arquitetura web com separação entre frontend, backend e banco de dados.

```text
Navegador
    |
Frontend - Vite+ (porta 5173)
    |
API HTTP - Express (porta 3000)
    |
MariaDB (porta 3306)
```

O frontend realiza requisições HTTP utilizando fetch.

O proxy configurado no Vite+ encaminha as requisições iniciadas por /api ao servidor Express.

O backend executa consultas SQL no MariaDB por meio da biblioteca mysql2 e retorna os resultados em formato JSON.

## Rotas da API

| Método | Rota                | Finalidade                           |
| ------ | ------------------- | ------------------------------------ |
| GET    | `/api/health`       | Verificar o status da API            |
| GET    | `/api/db-health`    | Verificar a conexão com o banco      |
| GET    | `/api/instituicoes` | Listar instituições                  |
| GET    | `/api/doadores`     | Listar doadores ativos               |
| POST   | `/api/doadores`     | Cadastrar doador                     |
| PUT    | `/api/doadores/:id` | Atualizar doador                     |
| DELETE | `/api/doadores/:id` | Realizar exclusão lógica             |
| GET    | `/api/equipamentos` | Listar equipamentos                  |
| GET    | `/api/doacoes`      | Consultar histórico de doações       |
| POST   | `/api/doacoes`      | Registrar doação e seus equipamentos |

### Exclusão lógica

Os doadores excluídos permanecem armazenados no banco com o campo ativo definido como falso.

Essa abordagem preserva o histórico de doações e os relacionamentos existentes.

### Transações SQL

O registro de doações utiliza transações SQL para garantir que todos os equipamentos sejam cadastrados corretamente.

Caso ocorra algum erro durante a operação, as inserções são desfeitas com ROLLBACK.

Se todas as operações forem bem-sucedidas, os registros são confirmados com COMMIT.

## Testes realizados

O arquivo `api.http` contém requisições para testes manuais utilizando a extensão REST Client do VS Code.

Foram realizados os seguintes testes:

- Cadastro de doadores.
- Consulta de doadores.
- Atualização de doadores.
- Exclusão lógica.
- Consulta de equipamentos.
- Consulta de doações.
- Registro de doações com múltiplos equipamentos.
- Bloqueio de patrimônios duplicados.
- Verificação de rollback.
- Integração entre frontend e backend.
- Responsividade da interface.

### Códigos HTTP utilizados

| Código | Significado                     |
| ------ | ------------------------------- |
| 200    | Requisição bem-sucedida         |
| 201    | Registro criado                 |
| 204    | Operação concluída sem conteúdo |
| 400    | Dados inválidos                 |
| 404    | Registro não encontrado         |
| 409    | Conflito de dados               |
| 500    | Erro interno do servidor        |

## Qualidade do código e build

Para verificar a qualidade do código:

```bash
vp check
```

Para aplicar correções automáticas:

```bash
vp check --fix
```

Para gerar a versão de produção do frontend:

```bash
vp build
```

A versão gerada será armazenada na pasta dist/.

## Privacidade e proteção de dados (LGPD)

O RedeSolidária adota medidas de minimização de dados pessoais, armazenando apenas informações justificadas pelas funcionalidades planejadas.

Durante a revisão da modelagem, foram realizadas as seguintes alterações:

- Remoção do CPF dos beneficiários.
- Remoção do endereço residencial dos beneficiários.
- Remoção do CPF/CNPJ dos doadores.
- Manutenção dos identificadores internos.
- Manutenção dos dados de contato necessários ao atendimento.

Os dados utilizados durante o desenvolvimento são fictícios.

## Limitações da versão atual

- A autenticação ainda não foi implementada.
- As rotas de doadores, doações e equipamentos utilizam temporariamente a instituição de teste com ID 2.
- A autorização e o isolamento de acesso por instituição ainda precisam ser implementados.
- O sistema é destinado ao desenvolvimento local e não está preparado para uso em produção.

## Próximas etapas

- Autenticação de usuários com JWT.
- Login e logout.
- Controle de acesso por perfil.
- Separação efetiva dos dados por instituição.
- Cadastro e gerenciamento de beneficiários.
- Gerenciamento completo dos equipamentos.
- Registro de empréstimos e devoluções.
- Controle de prazos e atrasos.
- Reserva de equipamentos.
- Registro de manutenções.
- Dashboard e relatórios.
- Testes de segurança.
- Publicação da aplicação.

## Autor

**Fernando Campos**

Análise e Desenvolvimento de Sistemas — UNIMAR

Assis/SP — 2026

GitHub: https://github.com/ferparmera
