import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// Listar equipamentos da instituicao autenticada
router.get("/", async (req, res) => {
  const idInstituicao = req.usuario.id_instituicao;

  try {
    const [equipamentos] = await pool.execute(
      `SELECT id_equipamento, numero_patrimonio,
              categoria, descricao, estado_conservacao, status
       FROM equipamento
       WHERE id_instituicao = ?
       AND ativo = TRUE
       ORDER BY categoria`,
      [idInstituicao],
    );

    res.json(equipamentos);
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: "Erro ao consultar equipamentos",
    });
  }
});

export default router;
