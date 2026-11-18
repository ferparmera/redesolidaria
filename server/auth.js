import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "./db.js";

const router = Router();

// Rota publica de login
router.post("/login", async (req, res) => {
  const { email, senha } = req.body ?? {};

  if (!email || !senha) {
    return res.status(400).json({
      erro: "Informe e-mail e senha",
    });
  }

  const [linhas] = await pool.execute(
    `SELECT id_usuario, id_instituicao, nome,
            email, senha_hash, perfil
     FROM usuario
     WHERE email = ? AND ativo = 1`,
    [email],
  );

  const usuario = linhas[0];

  if (!usuario || !(await bcrypt.compare(senha, usuario.senha_hash))) {
    return res.status(401).json({
      erro: "E-mail ou senha inválidos",
    });
  }

  const token = jwt.sign(
    {
      id_usuario: usuario.id_usuario,
      id_instituicao: usuario.id_instituicao,
      perfil: usuario.perfil,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "8h",
    },
  );

  res.json({
    token,
    usuario: {
      id_usuario: usuario.id_usuario,
      id_instituicao: usuario.id_instituicao,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil,
    },
  });
});

// Middleware de autenticacao
export function autenticar(req, res, next) {
  const [tipo, token] = (req.headers.authorization || "").split(" ");

  if (tipo !== "Bearer" || !token) {
    return res.status(401).json({
      erro: "Token ausente",
    });
  }

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({
      erro: "Token inválido ou expirado",
    });
  }
}

export default router;
