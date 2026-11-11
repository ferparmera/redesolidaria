
import "./style.css";

const app = document.querySelector("#app");

app.innerHTML = `
  <h1>RedeSolidária</h1>
  <p>Plataforma de Gestão de Empréstimos de Equipamentos Assistivos</p>
  <p>Status da API: <strong id="status">verificando...</strong></p>
  <p>Data e hora: <span id="hora">--</span></p>
`;

async function verificarApi() {
  const status = document.querySelector("#status");
  const hora = document.querySelector("#hora");

  try {
    const resposta = await fetch("/api/health");

    if (!resposta.ok) {
      throw new Error("Erro na resposta da API");
    }

    const dados = await resposta.json();

    status.textContent = dados.status;
    hora.textContent = new Date(dados.hora).toLocaleString("pt-BR");
  } catch (erro) {
    status.textContent = "indisponível";
    hora.textContent = "--";
    console.error("Erro ao consultar a API:", erro);
  }
}

verificarApi();
