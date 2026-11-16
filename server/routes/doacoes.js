import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const [linhas] = await pool.execute(
      `SELECT d.id_doacao, d.data_doacao,
              d.descricao, d.status,
              dr.nome AS nome_doador,
              e.id_equipamento,
              e.numero_patrimonio,
              e.categoria,
              e.descricao AS descricao_equipamento
       FROM doacao d
       JOIN doador dr
         ON d.id_doador = dr.id_doador
         AND d.id_instituicao = dr.id_instituicao
       LEFT JOIN equipamento e
         ON d.id_doacao = e.id_doacao
         AND d.id_instituicao = e.id_instituicao
       WHERE d.id_instituicao = ?
       ORDER BY d.data_doacao DESC, d.id_doacao DESC`,
      [2],
    );

    const doacoes = new Map();

    for (const linha of linhas) {
      if (!doacoes.has(linha.id_doacao)) {
        doacoes.set(linha.id_doacao, {
          id_doacao: linha.id_doacao,
          data_doacao: linha.data_doacao,
          descricao: linha.descricao,
          status: linha.status,
          nome_doador: linha.nome_doador,
          equipamentos: [],
        });
      }

      if (linha.id_equipamento !== null) {
        doacoes.get(linha.id_doacao).equipamentos.push({
          id_equipamento: linha.id_equipamento,
          numero_patrimonio: linha.numero_patrimonio,
          categoria: linha.categoria,
          descricao: linha.descricao_equipamento,
        });
      }
    }

    res.json([...doacoes.values()]);
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: "Erro ao consultar doações",
    });
  }
});

router.post("/", async (req, res) => {
  const { id_doador, data_doacao, descricao, equipamentos } = req.body;

  if (
    !Number.isInteger(id_doador) ||
    id_doador <= 0 ||
    typeof data_doacao !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(data_doacao) ||
    !Array.isArray(equipamentos) ||
    equipamentos.length === 0
  ) {
    return res.status(400).json({
      erro: "Informe o doador, a data e pelo menos um equipamento",
    });
  }

  for (const equipamento of equipamentos) {
    if (
      !equipamento ||
      typeof equipamento.numero_patrimonio !== "string" ||
      !equipamento.numero_patrimonio.trim() ||
      typeof equipamento.categoria !== "string" ||
      !equipamento.categoria.trim() ||
      typeof equipamento.descricao !== "string" ||
      !equipamento.descricao.trim() ||
      !["novo", "bom", "regular", "ruim"].includes(equipamento.estado_conservacao)
    ) {
      return res.status(400).json({
        erro: "Dados do equipamento inválidos",
      });
    }
  }

  let conexao;

  try {
    conexao = await pool.getConnection();
    await conexao.beginTransaction();

    const [doadores] = await conexao.execute(
      `SELECT id_doador FROM doador
       WHERE id_doador = ?
       AND id_instituicao = ?
       AND ativo = TRUE
       FOR UPDATE`,
      [id_doador, 2],
    );

    if (doadores.length === 0) {
      await conexao.rollback();

      return res.status(404).json({
        erro: "Doador não encontrado",
      });
    }

    const [resultado] = await conexao.execute(
      `INSERT INTO doacao
       (id_instituicao, id_doador, data_doacao, descricao, status)
       VALUES (?, ?, ?, ?, ?)`,
      [2, id_doador, data_doacao, descricao || null, "recebida"],
    );

    const id_doacao = resultado.insertId;

    for (const equipamento of equipamentos) {
      await conexao.execute(
        `INSERT INTO equipamento
         (id_instituicao, id_doacao, numero_patrimonio,
          categoria, descricao, estado_conservacao)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          2,
          id_doacao,
          equipamento.numero_patrimonio.trim(),
          equipamento.categoria.trim(),
          equipamento.descricao.trim(),
          equipamento.estado_conservacao,
        ],
      );
    }

    await conexao.commit();

    res.status(201).json({
      mensagem: "Doação registrada com sucesso",
      id_doacao,
    });
  } catch (erro) {
    if (conexao) await conexao.rollback();

    if (erro.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        erro: "Número de patrimônio já cadastrado",
      });
    }

    console.error(erro);

    res.status(500).json({
      erro: "Erro ao registrar doação",
    });
  } finally {
    if (conexao) conexao.release();
  }
});

export default router;
