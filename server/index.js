import "dotenv/config";
import express from "express";
import { pool } from "./db.js";
import doadoresRouter from "./routes/doadores.js";
import equipamentosRouter from "./routes/equipamentos.js";
import doacoesRouter from "./routes/doacoes.js";
import auth, { autenticar } from "./auth.js";

if (!process.env.JWT_SECRET) {
  console.error("Defina JWT_SECRET no arquivo .env");
  process.exit(1);
}

const app = express();

app.use(express.json());

// Verifica se a API esta funcionando
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "RedeSolidária",
    hora: new Date().toISOString(),
  });
});

// Verifica a conexao com o banco de dados
app.get("/api/db-health", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT DATABASE() AS banco, VERSION() AS versao");

    res.json({
      status: "ok",
      banco: rows[0].banco,
      versao: rows[0].versao,
    });
  } catch (erro) {
    console.error("Erro no banco:", erro.message);

    res.status(500).json({
      status: "erro",
      mensagem: "Falha na conexão com o banco de dados",
    });
  }
});

// Rota publica de login
app.use("/api/auth", auth);

// Autenticacao obrigatoria
app.use("/api", autenticar);

// Rotas protegidas
app.use("/api/doadores", doadoresRouter);
app.use("/api/equipamentos", equipamentosRouter);
app.use("/api/doacoes", doacoesRouter);

app.get("/api/instituicoes", async (req, res) => {
  try {
    const [instituicoes] = await pool.execute(
      "SELECT id_instituicao, nome, email, ativo FROM instituicao WHERE id_instituicao = ?",
      [req.usuario.id_instituicao],
    );

    res.json(instituicoes);
  } catch (erro) {
    console.error("Erro ao consultar instituições:", erro.message);

    res.status(500).json({
      status: "erro",
      mensagem: "Não foi possível consultar as instituições",
    });
  }
});

// Tratamento de erros
app.use((erro, req, res, _next) => {
  console.error(erro);
  res.status(500).json({
    erro: "Erro interno do servidor",
  });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
