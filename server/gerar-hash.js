import bcrypt from "bcryptjs";

const senha = process.argv[2];

if (!senha) {
  console.log("Uso: node server/gerar-hash.js minhaSenha");
  process.exit(1);
}

console.log(await bcrypt.hash(senha, 10));
