import "./style.css";

import { verificarSaude, verificarBanco } from "./api.js";
import { telaDoadores } from "./pages/doadores.js";
import { telaNovaDoacao, telaDoacoes } from "./pages/doacoes.js";

const app = document.querySelector("#app");
const statusApi = document.querySelector("#status-api");

// Rotas do frontend
const rotas = {
  "#/doadores": telaDoadores,
  "#/doacoes/nova": telaNovaDoacao,
  "#/doacoes": telaDoacoes,
};

// Navegação entre as telas
async function navegar() {
  const rota = Object.hasOwn(rotas, location.hash) ? location.hash : "#/doadores";

  for (const link of document.querySelectorAll("nav a")) {
    if (link.getAttribute("href") === rota) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  }

  await rotas[rota](app);
}

// Verificar a API e o banco de dados
async function verificarStatus() {
  try {
    const api = await verificarSaude();
    const banco = await verificarBanco();

    statusApi.textContent = `${api.status} | Banco: ${banco.status}`;
  } catch {
    statusApi.textContent = "Indisponível";
  }
}

// Inicializar a aplicação
window.addEventListener("hashchange", navegar);

await navegar();
await verificarStatus();
