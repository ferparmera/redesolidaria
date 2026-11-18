import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// Listar doadores
router.get("/", async (req, res) => {
  const idInstituicao = req.usuario.id_instituicao;

  try {
    const [doadores] = await pool.execute(
      `SELECT id_doador, id_instituicao, tipo_pessoa,
              nome, email, telefone, ativo
       FROM doador
       WHERE id_instituicao = ?
       AND ativo = TRUE
       ORDER BY nome`,
      [idInstituicao],
    );

    res.json(doadores);
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: "Erro ao consultar doadores",
    });
  }
});

// Cadastrar doador
router.post("/", async (req, res) => {
  const idInstituicao = req.usuario.id_instituicao;
  const { nome, tipo_pessoa, email, telefone } = req.body ?? {};

  if (typeof nome !== "string" || !nome.trim()) {
    return res.status(400).json({
      erro: "O nome é obrigatório",
    });
  }

  if (!["fisica", "juridica"].includes(tipo_pessoa)) {
    return res.status(400).json({
      erro: "Tipo de pessoa inválido",
    });
  }

  try {
    const [resultado] = await pool.execute(
      `INSERT INTO doador
       (id_instituicao, nome, tipo_pessoa, email, telefone)
       VALUES (?, ?, ?, ?, ?)`,
      [idInstituicao, nome.trim(), tipo_pessoa, email || null, telefone || null],
    );

    res.status(201).json({
      mensagem: "Doador cadastrado com sucesso",
      id_doador: resultado.insertId,
    });
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: "Erro ao cadastrar doador",
    });
  }
});

// Atualizar doador
router.put("/:id", async (req, res) => {
  const idInstituicao = req.usuario.id_instituicao;
  const { id } = req.params;
  const { nome, tipo_pessoa, email, telefone } = req.body ?? {};

  if (typeof nome !== "string" || !nome.trim()) {
    return res.status(400).json({
      erro: "O nome é obrigatório",
    });
  }

  if (!["fisica", "juridica"].includes(tipo_pessoa)) {
    return res.status(400).json({
      erro: "Tipo de pessoa inválido",
    });
  }

  try {
    const [resultado] = await pool.execute(
      `UPDATE doador
       SET nome = ?, tipo_pessoa = ?, email = ?, telefone = ?
       WHERE id_doador = ?
       AND id_instituicao = ?
       AND ativo = TRUE`,
      [nome.trim(), tipo_pessoa, email || null, telefone || null, id, idInstituicao],
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        erro: "Doador não encontrado",
      });
    }

    res.json({
      mensagem: "Doador atualizado com sucesso",
    });
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: "Erro ao atualizar doador",
    });
  }
});

// Excluir doador logicamente
router.delete("/:id", async (req, res) => {
  const idInstituicao = req.usuario.id_instituicao;
  const { id } = req.params;

  try {
    const [resultado] = await pool.execute(
      `UPDATE doador
       SET ativo = FALSE
       WHERE id_doador = ?
       AND id_instituicao = ?
       AND ativo = TRUE`,
      [id, idInstituicao],
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        erro: "Doador não encontrado",
      });
    }

    res.status(204).end();
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: "Erro ao excluir doador",
    });
  }
});

export default router;
