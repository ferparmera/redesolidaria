export function el(tag, atributos = {}, ...filhos) {
  const elemento = document.createElement(tag);

  for (const [nome, valor] of Object.entries(atributos)) {
    if (nome.startsWith("on")) {
      elemento.addEventListener(nome.slice(2), valor);
    } else {
      elemento.setAttribute(nome, valor);
    }
  }

  elemento.append(...filhos.filter((filho) => filho !== null && filho !== undefined));

  return elemento;
}

export function mostrarMensagem(caixa, texto, tipo = "sucesso") {
  caixa.textContent = texto;
  caixa.className = `mensagem ${tipo}`;
  caixa.hidden = false;
}

export function esconderMensagem(caixa) {
  caixa.hidden = true;
}

export function estado(texto) {
  return el("li", { class: "estado" }, texto);
}

export function formatarData(data) {
  const [ano, mes, dia] = data.slice(0, 10).split("-");
  return `${dia}/${mes}/${ano}`;
}

export function hoje() {
  const agora = new Date();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");

  return `${agora.getFullYear()}-${mes}-${dia}`;
}
