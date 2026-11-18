import "./style.css";

import { verificarSaude, verificarBanco, lerToken, lerUsuario, sair } from "./api.js";

import { telaDoadores } from "./pages/doadores.js";
import { telaNovaDoacao, telaDoacoes } from "./pages/doacoes.js";
import { telaLogin } from "./pages/login.js";

const app = document.querySelector("#app");
const statusApi = document.querySelector("#status-api");
const topo = document.querySelector(".topo");

// Rotas do frontend
const rotas = {
  "#/doadores": telaDoadores,
  "#/doacoes/nova": telaNovaDoacao,
  "#/doacoes": telaDoacoes,
};

// Informacoes do usuario conectado
const areaUsuario = document.createElement("div");
areaUsuario.className = "area-usuario";

const nomeUsuario = document.createElement("span");
const botaoSair = document.createElement("button");

botaoSair.textContent = "Sair";
botaoSair.className = "botao-sair";

areaUsuario.append(nomeUsuario, botaoSair);
topo.append(areaUsuario);

// Navegacao entre as telas
async function navegar() {
  if (!lerToken()) {
    mostrarLogin();
    return;
  }

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

// Mostrar tela de login
function mostrarLogin() {
  topo.hidden = true;

  telaLogin(app, mostrarSistema);
}

// Mostrar sistema autenticado
async function mostrarSistema() {
  const usuario = lerUsuario();

  topo.hidden = false;
  nomeUsuario.textContent = usuario?.nome || "Usuário";

  await navegar();
}

// Logout
botaoSair.addEventListener("click", () => {
  sair();
  mostrarLogin();
});

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

// Inicializar a aplicacao
window.addEventListener("hashchange", navegar);

if (lerToken()) {
  await mostrarSistema();
} else {
  mostrarLogin();
}

await verificarStatus();
