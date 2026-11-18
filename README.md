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
- Vite+
- Node.js
- Express
- MariaDB / MySQL
- mysql2
- dotenv
- jsonwebtoken (JWT)
- bcryptjs
- OpenAPI 3.0.3
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

### Aula 4 — Autenticação e segurança

- Autenticação de usuários com JWT.
- Armazenamento de senhas com bcrypt.
- Geração e validação de tokens.
- Expiração de tokens em oito horas.
- Middleware de autenticação.
- Proteção das rotas da API.
- Retorno HTTP 401 para acessos não autorizados.
- Identificação da instituição através do token JWT.
- Isolamento de dados entre instituições.
- Tela de login integrada ao frontend.
- Persistência da sessão com localStorage.
- Identificação do usuário autenticado.
- Logout.
- Envio automático do token nas requisições protegidas.
- Testes de autenticação e isolamento entre instituições.
- Documentação da API com OpenAPI.

## Telas disponíveis

| Endereço                        | Funcionalidade                                    |
| ------------------------------- | ------------------------------------------------- |
| Página inicial sem autenticação | Login                                             |
| `#/doadores`                    | Cadastro, listagem, edição e exclusão de doadores |
| `#/doacoes/nova`                | Registro de doações com múltiplos equipamentos    |
| `#/doacoes`                     | Histórico de doações recebidas                    |

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
│   ├── auth.js
│   ├── db.js
│   ├── gerar-hash.js
│   └── index.js
├── src/
│   ├── pages/
│   │   ├── doadores.js
│   │   ├── doacoes.js
│   │   └── login.js
│   ├── api.js
│   ├── ui.js
│   ├── main.js
│   └── style.css
├── .env.example
├── .gitignore
├── api.http
├── openapi.yaml
├── index.html
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── vite.config.js
└── README.md
```

O arquivo `.env` contém configurações locais e informações sensíveis e não deve ser enviado ao GitHub.

## Banco de dados

O projeto utiliza MariaDB, com nove tabelas relacionadas.

| Tabela       | Finalidade                                        |
| ------------ | ------------------------------------------------- |
| instituicao  | Instituições cadastradas                          |
| usuario      | Usuários e perfis de acesso                       |
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

- `database/schema.sql`: criação da estrutura do banco.
- `database/seed.sql`: inserção de registros fictícios e usuário demonstrativo.

**Atenção:** o arquivo `schema.sql` contém o comando `DROP DATABASE IF EXISTS redesolidaria`. Sua execução recria o banco e apaga os registros existentes.

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

Em uma instalação nova e vazia, importe:

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

O script insere os registros fictícios e o usuário demonstrativo utilizado para acessar a aplicação.

O seed deve ser importado uma única vez, para evitar duplicidades.

### 4. Configurar as variáveis de ambiente

Crie o arquivo `.env` na raiz do projeto utilizando o `.env.example` como referência.

```env
PORT=3000

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=redesolidaria

JWT_SECRET=INSIRA_SUA_CHAVE_SECRETA
JWT_EXPIRES_IN=8h
```

Para gerar uma chave secreta aleatória, execute:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copie o resultado para a variável `JWT_SECRET` no arquivo `.env`.

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

A página inicial exibirá a tela de login.

### 7. Credenciais demonstrativas

Utilize a conta criada pelo arquivo seed.sql:

| Campo  | Valor                            |
| ------ | -------------------------------- |
| Nome   | Voluntário Demo                  |
| E-mail | voluntario@redesolidaria.example |
| Senha  | redesolidaria123                 |
| Perfil | Voluntário                       |

Essas credenciais são exclusivamente demonstrativas e não devem ser utilizadas em produção.

Após a autenticação, o usuário terá acesso às funcionalidades disponíveis para sua instituição.

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

## Autenticação e isolamento de dados

O sistema utiliza JSON Web Token (JWT) para autenticação.

O fluxo funciona da seguinte maneira:

1. O usuário informa e-mail e senha.
2. O backend consulta o usuário no banco.
3. A senha é validada utilizando bcrypt.
4. O backend gera um token JWT assinado.
5. O frontend armazena o token.
6. As requisições protegidas enviam o token no cabeçalho Authorization.
7. O middleware valida o token antes de permitir o acesso.

```http
Authorization: Bearer <token>
```

O identificador da instituição é obtido através do token autenticado e utilizado nas consultas e operações do banco de dados.

Dessa forma, cada instituição acessa seus próprios registros, sem depender de um identificador fixo definido no código.

## Rotas da API

| Método | Rota                | Finalidade                       | Autenticação |
| ------ | ------------------- | -------------------------------- | ------------ |
| GET    | `/api/health`       | Verificar status da API          | Pública      |
| GET    | `/api/db-health`    | Verificar conexão com o banco    | Pública      |
| POST   | `/api/auth/login`   | Autenticar usuário               | Pública      |
| GET    | `/api/instituicoes` | Consultar instituição do usuário | JWT          |
| GET    | `/api/doadores`     | Listar doadores ativos           | JWT          |
| POST   | `/api/doadores`     | Cadastrar doador                 | JWT          |
| PUT    | `/api/doadores/:id` | Atualizar doador                 | JWT          |
| DELETE | `/api/doadores/:id` | Realizar exclusão lógica         | JWT          |
| GET    | `/api/equipamentos` | Listar equipamentos              | JWT          |
| GET    | `/api/doacoes`      | Consultar histórico de doações   | JWT          |
| POST   | `/api/doacoes`      | Registrar doação e equipamentos  | JWT          |

A documentação das rotas está disponível no arquivo [openapi.yaml](openapi.yaml).

As requisições para testes manuais estão disponíveis no arquivo [api.http](api.http).

### Exclusão lógica

Os doadores excluídos permanecem armazenados no banco com o campo ativo definido como falso.

Essa abordagem preserva o histórico de doações e os relacionamentos existentes.

### Transações SQL

O registro de doações utiliza transações SQL para garantir que a doação e seus equipamentos sejam cadastrados corretamente.

Caso ocorra algum erro durante a operação, as inserções são desfeitas com ROLLBACK.

Se todas as operações forem bem-sucedidas, os registros são confirmados com COMMIT.

## Testes realizados

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
- Login com credenciais válidas.
- Login com credenciais inválidas.
- Acesso sem token JWT.
- Acesso com token inválido.
- Acesso com token válido.
- Isolamento de consultas entre instituições distintas.
- Persistência da sessão após atualização da página.
- Logout.

### Códigos HTTP utilizados

| Código | Significado                     |
| ------ | ------------------------------- |
| 200    | Requisição bem-sucedida         |
| 201    | Registro criado                 |
| 204    | Operação concluída sem conteúdo |
| 400    | Dados inválidos                 |
| 401    | Não autorizado                  |
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

O RedeSolidária adota medidas de minimização e proteção de dados pessoais.

- Remoção do CPF dos beneficiários.
- Remoção do endereço residencial dos beneficiários.
- Remoção do CPF/CNPJ dos doadores.
- Manutenção dos identificadores internos.
- Manutenção dos dados de contato necessários.
- Armazenamento de senhas utilizando bcrypt.
- Proteção das rotas com autenticação JWT.
- Isolamento dos registros entre instituições.
- Proteção das variáveis de ambiente.
- Utilização de consultas SQL parametrizadas.

Os registros utilizados durante o desenvolvimento são fictícios.

## Limitações da versão atual

- O controle de permissões por perfil ainda não foi implementado.
- O gerenciamento de beneficiários ainda não possui interface.
- Os módulos de empréstimos, devoluções, reservas e manutenções ainda não foram implementados na aplicação.
- A expiração do token ainda não possui tratamento automático de redirecionamento no frontend.
- O sistema utiliza localStorage para armazenamento do token.
- A aplicação é destinada ao desenvolvimento local e não está preparada para uso em produção.

## Próximas etapas

- Controle de acesso por perfil.
- Gerenciamento de usuários e instituições.
- Cadastro e gerenciamento de beneficiários.
- Gerenciamento completo dos equipamentos.
- Registro de empréstimos e devoluções.
- Controle de prazos e atrasos.
- Reserva de equipamentos.
- Registro de manutenções.
- Dashboard e relatórios.
- Ampliação dos testes automatizados e de segurança.
- Aprimoramento da segurança para produção.
- Publicação da aplicação.

## Status do projeto

MVP acadêmico desenvolvido ao longo das quatro aulas do Projeto Integrador Extensionista II.

## Autor

**Fernando Campos**

Análise e Desenvolvimento de Sistemas — UNIMAR

Assis/SP — 2026

GitHub: https://github.com/ferparmera
