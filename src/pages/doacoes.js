import { listarDoadores, listarDoacoes, registrarDoacao } from "../api.js";

import { el, mostrarMensagem, esconderMensagem, estado, formatarData, hoje } from "../ui.js";

// TELA DE REGISTRO DE DOAÇÃO

export async function telaNovaDoacao(app) {
  app.innerHTML = `
    <h1>Registrar doação</h1>
    <p>Registre os equipamentos recebidos pela instituição.</p>

    <form id="form-doacao" class="cartao">
      <label>
        Doador
        <select name="id_doador" required>
          <option value="">Selecione um doador</option>
        </select>
      </label>

      <label>
        Data da doação
        <input type="date" name="data_doacao" required />
      </label>

      <label>
        Descrição da doação
        <textarea name="descricao" rows="3"></textarea>
      </label>

      <h2>Equipamentos recebidos</h2>

      <div id="equipamentos"></div>

      <button type="button" id="adicionar">
        + Adicionar equipamento
      </button>

      <div class="acoes">
        <button type="submit" disabled>Registrar doação</button>
      </div>

      <p id="msg-form" role="status" hidden></p>
    </form>
  `;

  const form = app.querySelector("#form-doacao");
  const selectDoador = form.elements.id_doador;
  const container = app.querySelector("#equipamentos");
  const mensagem = app.querySelector("#msg-form");
  const salvar = form.querySelector('button[type="submit"]');

  form.elements.data_doacao.value = hoje();

  async function carregarDoadores() {
    try {
      const doadores = await listarDoadores();

      for (const doador of doadores) {
        selectDoador.append(el("option", { value: doador.id_doador }, doador.nome));
      }

      if (doadores.length === 0) {
        mostrarMensagem(mensagem, "Cadastre um doador antes de registrar uma doação.", "erro");
        return;
      }

      salvar.disabled = false;
    } catch (erro) {
      mostrarMensagem(mensagem, erro.message, "erro");
    }
  }

  function adicionarEquipamento() {
    const linha = el("div", { class: "equipamento-linha" });

    linha.innerHTML = `
      <label>
        Número de patrimônio
        <input name="numero_patrimonio" maxlength="50" required />
      </label>

      <label>
        Categoria
        <select name="categoria" required>
          <option value="">Selecione</option>
          <option>Cadeira de rodas</option>
          <option>Cadeira de banho</option>
          <option>Muleta</option>
          <option>Andador</option>
          <option>Cama hospitalar</option>
          <option>Outros</option>
        </select>
      </label>

      <label>
        Descrição
        <input name="descricao" maxlength="255" required />
      </label>

      <label>
        Estado de conservação
        <select name="estado_conservacao">
          <option value="novo">Novo</option>
          <option value="bom" selected>Bom</option>
          <option value="regular">Regular</option>
          <option value="ruim">Ruim</option>
        </select>
      </label>
    `;

    linha.append(
      el(
        "button",
        {
          type: "button",
          class: "perigo",
          onclick: () => {
            if (container.children.length > 1) {
              linha.remove();
            }
          },
        },
        "Remover equipamento",
      ),
    );

    container.append(linha);
  }

  app.querySelector("#adicionar").addEventListener("click", adicionarEquipamento);

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    esconderMensagem(mensagem);

    const equipamentos = [...container.querySelectorAll(".equipamento-linha")].map((linha) => ({
      numero_patrimonio: linha.querySelector('[name="numero_patrimonio"]').value.trim(),

      categoria: linha.querySelector('[name="categoria"]').value,

      descricao: linha.querySelector('[name="descricao"]').value.trim(),

      estado_conservacao: linha.querySelector('[name="estado_conservacao"]').value,
    }));

    const doacao = {
      id_doador: Number(selectDoador.value),
      data_doacao: form.elements.data_doacao.value,
      descricao: form.querySelector('textarea[name="descricao"]').value,
      equipamentos,
    };

    salvar.disabled = true;

    try {
      await registrarDoacao(doacao);

      mostrarMensagem(mensagem, "Doação registrada com sucesso!");

      form.reset();
      form.elements.data_doacao.value = hoje();

      container.replaceChildren();
      adicionarEquipamento();
    } catch (erro) {
      mostrarMensagem(mensagem, erro.message, "erro");
    } finally {
      salvar.disabled = false;
    }
  });

  adicionarEquipamento();
  await carregarDoadores();
}

// TELA DE HISTÓRICO DE DOAÇÕES

export async function telaDoacoes(app) {
  app.innerHTML = `
    <h1>Histórico de doações</h1>
    <p>Consulte as doações recebidas pela instituição.</p>

    <p id="msg-lista" role="status" hidden></p>
    <ul id="lista-doacoes" class="lista"></ul>
  `;

  const lista = app.querySelector("#lista-doacoes");
  const mensagem = app.querySelector("#msg-lista");

  lista.replaceChildren(estado("Carregando..."));

  try {
    const doacoes = await listarDoacoes();

    if (doacoes.length === 0) {
      lista.replaceChildren(estado("Nenhuma doação registrada."));
      return;
    }

    lista.replaceChildren(...doacoes.map(cartaoDoacao));
  } catch (erro) {
    lista.replaceChildren();
    mostrarMensagem(mensagem, erro.message, "erro");
  }
}

function cartaoDoacao(doacao) {
  return el(
    "li",
    { class: "cartao" },

    el("h2", {}, doacao.nome_doador),

    el("span", { class: "detalhe" }, `Doação nº ${doacao.id_doacao}`),

    el("span", { class: "detalhe" }, `Data: ${formatarData(doacao.data_doacao)}`),

    el("span", { class: "detalhe" }, `Status: ${doacao.status}`),

    el("p", {}, doacao.descricao || "Sem descrição"),

    el("h3", {}, `Equipamentos (${doacao.equipamentos.length})`),

    el(
      "ul",
      { class: "lista-equipamentos" },

      ...doacao.equipamentos.map((equipamento) =>
        el(
          "li",
          {},
          `${equipamento.numero_patrimonio} — ` +
            `${equipamento.categoria} — ` +
            `${equipamento.descricao}`,
        ),
      ),
    ),
  );
}
