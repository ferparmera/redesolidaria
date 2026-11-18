import { entrar } from "../api.js";

export function telaLogin(raiz, aoEntrar) {
  raiz.innerHTML = `
    <section class="login">
      <div class="cartao login-cartao">
        <h1>RedeSolidária</h1>
        <p>Acesse sua conta para continuar.</p>

        <form id="form-login">
          <label for="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="username"
            required
          />

          <label for="senha">Senha</label>
          <input
            id="senha"
            name="senha"
            type="password"
            autocomplete="current-password"
            required
          />

          <button type="submit">Entrar</button>

          <p id="msg-login" role="alert" hidden></p>
        </form>
      </div>
    </section>
  `;

  const form = raiz.querySelector("#form-login");
  const msg = raiz.querySelector("#msg-login");
  const botao = form.querySelector("button");

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    botao.disabled = true;
    botao.textContent = "Entrando...";
    msg.hidden = true;

    try {
      await entrar(form.email.value, form.senha.value);
      aoEntrar();
    } catch (erro) {
      msg.textContent = erro.message;
      msg.hidden = false;

      form.senha.value = "";
      form.senha.focus();
    } finally {
      botao.disabled = false;
      botao.textContent = "Entrar";
    }
  });
}
