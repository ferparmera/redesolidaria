import { listarDoadores, criarDoador, atualizarDoador, excluirDoador } from "../api.js";

import { el, mostrarMensagem, esconderMensagem, estado } from "../ui.js";

export async function telaDoadores(app) {
  app.innerHTML = `
    <h1>Doadores</h1>
    <p>Gerencie os doadores da instituição.</p>

    <div class="layout-doadores">
      <form id="form-doador" class="cartao">
        <h2 id="titulo-form">Novo doador</h2>

        <label>
          Nome
          <input name="nome" maxlength="150" required />
        </label>

        <label>
          Tipo de pessoa
          <select name="tipo_pessoa" required>
            <option value="fisica">Pessoa física</option>
            <option value="juridica">Pessoa jurídica</option>
          </select>
        </label>

        <label>
          E-mail
          <input name="email" type="email" maxlength="100" />
        </label>

        <label>
          Telefone
          <input name="telefone" type="tel" maxlength="20" />
        </label>

        <div class="acoes">
          <button type="submit">Salvar</button>
          <button type="button" id="cancelar" hidden>
            Cancelar edição
          </button>
        </div>

        <p id="msg-form" role="status" hidden></p>
      </form>

      <section>
        <h2>Doadores cadastrados</h2>
        <p id="msg-lista" role="status" hidden></p>
        <ul id="lista-doadores" class="lista"></ul>
      </section>
    </div>
  `;

  const form = app.querySelector("#form-doador");
  const titulo = app.querySelector("#titulo-form");
  const cancelar = app.querySelector("#cancelar");
  const lista = app.querySelector("#lista-doadores");
  const msgForm = app.querySelector("#msg-form");
  const msgLista = app.querySelector("#msg-lista");
  const salvar = form.querySelector('button[type="submit"]');

  let editandoId = null;

  async function carregar() {
    esconderMensagem(msgLista);
    lista.replaceChildren(estado("Carregando..."));

    try {
      const doadores = await listarDoadores();

      if (doadores.length === 0) {
        lista.replaceChildren(estado("Nenhum doador cadastrado."));
        return;
      }

      lista.replaceChildren(...doadores.map(cartaoDoador));
    } catch (erro) {
      lista.replaceChildren();
      mostrarMensagem(msgLista, erro.message, "erro");
    }
  }

  function cartaoDoador(doador) {
    return el(
      "li",
      { class: "cartao" },
      el("strong", {}, doador.nome),
      el(
        "span",
        { class: "detalhe" },
        doador.tipo_pessoa === "fisica" ? "Pessoa física" : "Pessoa jurídica",
      ),
      el("span", { class: "detalhe" }, doador.email || "Sem e-mail"),
      el("span", { class: "detalhe" }, doador.telefone || "Sem telefone"),
      el(
        "div",
        { class: "acoes" },
        el(
          "button",
          {
            type: "button",
            onclick: () => editar(doador),
          },
          "Editar",
        ),
        el(
          "button",
          {
            type: "button",
            class: "perigo",
            onclick: () => remover(doador),
          },
          "Excluir",
        ),
      ),
    );
  }

  function editar(doador) {
    editandoId = doador.id_doador;

    form.elements.nome.value = doador.nome;
    form.elements.tipo_pessoa.value = doador.tipo_pessoa;
    form.elements.email.value = doador.email || "";
    form.elements.telefone.value = doador.telefone || "";

    titulo.textContent = "Editar doador";
    cancelar.hidden = false;

    esconderMensagem(msgForm);
    form.elements.nome.focus();
  }

  function limparFormulario() {
    editandoId = null;
    form.reset();
    titulo.textContent = "Novo doador";
    cancelar.hidden = true;
  }

  cancelar.addEventListener("click", () => {
    limparFormulario();
    esconderMensagem(msgForm);
  });

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    esconderMensagem(msgForm);

    const dados = Object.fromEntries(new FormData(form));

    salvar.disabled = true;

    try {
      if (editandoId === null) {
        await criarDoador(dados);
        mostrarMensagem(msgForm, "Doador cadastrado com sucesso!");
      } else {
        await atualizarDoador(editandoId, dados);
        mostrarMensagem(msgForm, "Doador atualizado com sucesso!");
      }

      limparFormulario();
      await carregar();
    } catch (erro) {
      mostrarMensagem(msgForm, erro.message, "erro");
    } finally {
      salvar.disabled = false;
    }
  });

  async function remover(doador) {
    if (!confirm(`Excluir o doador ${doador.nome}?`)) {
      return;
    }

    try {
      await excluirDoador(doador.id_doador);

      if (editandoId === doador.id_doador) {
        limparFormulario();
      }

      await carregar();
      mostrarMensagem(msgLista, "Doador excluído com sucesso!");
    } catch (erro) {
      mostrarMensagem(msgLista, erro.message, "erro");
    }
  }

  await carregar();
}
