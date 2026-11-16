async function requisicao(caminho, opcoes = {}) {
  const resposta = await fetch(`/api${caminho}`, {
    ...opcoes,
    headers: {
      "Content-Type": "application/json",
      ...opcoes.headers,
    },
  });

  if (resposta.status === 204) {
    return null;
  }

  const dados = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    throw new Error(dados?.erro || `Erro na API: ${resposta.status}`);
  }

  return dados;
}

// Doadores

export const listarDoadores = () => requisicao("/doadores");

export const criarDoador = (doador) =>
  requisicao("/doadores", {
    method: "POST",
    body: JSON.stringify(doador),
  });

export const atualizarDoador = (id, doador) =>
  requisicao(`/doadores/${id}`, {
    method: "PUT",
    body: JSON.stringify(doador),
  });

export const excluirDoador = (id) =>
  requisicao(`/doadores/${id}`, {
    method: "DELETE",
  });

// Equipamentos

export const listarEquipamentos = () => requisicao("/equipamentos");

// Doações

export const listarDoacoes = () => requisicao("/doacoes");

export const registrarDoacao = (doacao) =>
  requisicao("/doacoes", {
    method: "POST",
    body: JSON.stringify(doacao),
  });

// Status da aplicação

export const verificarSaude = () => requisicao("/health");

export const verificarBanco = () => requisicao("/db-health");
