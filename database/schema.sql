SET NAMES utf8mb4;

DROP DATABASE IF EXISTS redesolidaria;

CREATE DATABASE redesolidaria
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE redesolidaria;
CREATE TABLE instituicao (
    id_instituicao INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cnpj VARCHAR(14) UNIQUE,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE
);
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_instituicao INT,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    perfil ENUM('administrador', 'coordenador', 'voluntario') NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_instituicao)
        REFERENCES instituicao(id_instituicao)
);
CREATE TABLE beneficiario (
    id_beneficiario INT AUTO_INCREMENT PRIMARY KEY,
    id_instituicao INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(11),
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (id_instituicao)
        REFERENCES instituicao(id_instituicao)
);
CREATE TABLE doador (
    id_doador INT AUTO_INCREMENT PRIMARY KEY,
    id_instituicao INT NOT NULL,
    tipo_pessoa ENUM('fisica', 'juridica') NOT NULL,
    nome VARCHAR(150) NOT NULL,
    cpf_cnpj VARCHAR(14),
    email VARCHAR(100),
    telefone VARCHAR(20),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (id_instituicao)
        REFERENCES instituicao(id_instituicao)
);
CREATE TABLE doacao (
    id_doacao INT AUTO_INCREMENT PRIMARY KEY,
    id_instituicao INT NOT NULL,
    id_doador INT NOT NULL,
    data_doacao DATE NOT NULL,
    descricao TEXT,
    status ENUM('pendente', 'recebida', 'cancelada')
        DEFAULT 'recebida',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_instituicao)
        REFERENCES instituicao(id_instituicao),

    FOREIGN KEY (id_doador)
        REFERENCES doador(id_doador)
);
CREATE TABLE equipamento (
    id_equipamento INT AUTO_INCREMENT PRIMARY KEY,
    id_instituicao INT NOT NULL,
    id_doacao INT,
    numero_patrimonio VARCHAR(50) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    estado_conservacao ENUM('novo', 'bom', 'regular', 'ruim')
        DEFAULT 'bom',
    status ENUM(
        'disponivel',
        'emprestado',
        'reservado',
        'manutencao',
        'inativo'
    ) DEFAULT 'disponivel',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (id_instituicao)
        REFERENCES instituicao(id_instituicao),

    FOREIGN KEY (id_doacao)
        REFERENCES doacao(id_doacao),

    UNIQUE (id_instituicao, numero_patrimonio)
);
CREATE TABLE emprestimo (
    id_emprestimo INT AUTO_INCREMENT PRIMARY KEY,
    id_instituicao INT NOT NULL,
    id_beneficiario INT NOT NULL,
    id_equipamento INT NOT NULL,
    id_usuario INT NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_prevista_devolucao DATE NOT NULL,
    data_devolucao DATE,
    status ENUM('ativo', 'devolvido', 'atrasado', 'cancelado')
        DEFAULT 'ativo',
    observacoes TEXT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_instituicao)
        REFERENCES instituicao(id_instituicao),

    FOREIGN KEY (id_beneficiario)
        REFERENCES beneficiario(id_beneficiario),

    FOREIGN KEY (id_equipamento)
        REFERENCES equipamento(id_equipamento),

    FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
);
CREATE TABLE reserva (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_instituicao INT NOT NULL,
    id_beneficiario INT NOT NULL,
    id_equipamento INT NOT NULL,
    id_usuario INT NOT NULL,
    data_reserva DATE NOT NULL,
    data_prevista_retirada DATE,
    status ENUM(
        'pendente',
        'confirmada',
        'atendida',
        'cancelada'
    ) DEFAULT 'pendente',
    observacoes TEXT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_instituicao)
        REFERENCES instituicao(id_instituicao),

    FOREIGN KEY (id_beneficiario)
        REFERENCES beneficiario(id_beneficiario),

    FOREIGN KEY (id_equipamento)
        REFERENCES equipamento(id_equipamento),

    FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
);
CREATE TABLE manutencao (
    id_manutencao INT AUTO_INCREMENT PRIMARY KEY,
    id_instituicao INT NOT NULL,
    id_equipamento INT NOT NULL,
    id_usuario INT NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE,
    descricao TEXT NOT NULL,
    status ENUM(
        'pendente',
        'em_andamento',
        'concluida',
        'cancelada'
    ) DEFAULT 'pendente',
    custo DECIMAL(10,2),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_instituicao)
        REFERENCES instituicao(id_instituicao),

    FOREIGN KEY (id_equipamento)
        REFERENCES equipamento(id_equipamento),

    FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
);