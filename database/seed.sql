SET NAMES utf8mb4;

USE redesolidaria;

-- Instituição fictícia para testes
INSERT INTO instituicao (nome, email)
VALUES ('Instituição Solidária Teste', 'teste@example.org');

SET @instituicao = LAST_INSERT_ID();

-- Doadores
INSERT INTO doador (id_instituicao, tipo_pessoa, nome, email)
VALUES
    (@instituicao, 'fisica', 'Ana Souza', 'ana@example.org'),
    (@instituicao, 'fisica', 'Carlos Silva', 'carlos@example.org'),
    (@instituicao, 'juridica', 'Empresa Esperança', 'empresa@example.org');

-- Beneficiários
INSERT INTO beneficiario (id_instituicao, nome)
VALUES
    (@instituicao, 'Maria Oliveira'),
    (@instituicao, 'João Santos');

    -- Selecionar um doador da instituição
SET @doador = (
    SELECT id_doador
    FROM doador
    WHERE id_instituicao = @instituicao
    AND email = 'ana@example.org'
);

-- Registrar doação
INSERT INTO doacao (
    id_instituicao,
    id_doador,
    data_doacao,
    descricao,
    status
)
VALUES (
    @instituicao,
    @doador,
    '2026-11-16',
    'Doação de equipamentos assistivos',
    'recebida'
);

SET @doacao = LAST_INSERT_ID();

-- Equipamentos recebidos
INSERT INTO equipamento (
    id_instituicao,
    id_doacao,
    numero_patrimonio,
    categoria,
    descricao,
    estado_conservacao
)
VALUES
    (@instituicao, @doacao, 'EQ-001', 'Cadeira de rodas',
     'Cadeira de rodas dobrável', 'bom'),

    (@instituicao, @doacao, 'EQ-002', 'Muleta',
     'Muleta canadense ajustável', 'novo'),

    (@instituicao, @doacao, 'EQ-003', 'Andador',
     'Andador de alumínio', 'bom');