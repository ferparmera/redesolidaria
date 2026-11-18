const CHAVE_TOKEN = "redesolidaria_token";
const CHAVE_USUARIO = "redesolidaria_usuario";

// Gerenciamento da autenticacao

export function lerToken() {
  return localStorage.getItem(CHAVE_TOKEN);
}

export function lerUsuario() {
  const dados = localStorage.getItem(CHAVE_USUARIO);

  return dados ? JSON.parse(dados) : null;
}

export function sair() {
  localStorage.removeItem(CHAVE_TOKEN);
  localStorage.removeItem(CHAVE_USUARIO);
}

// Requisicao centralizada

async function requisicao(caminho, opcoes = {}) {
  const token = lerToken();

  const resposta = await fetch(`/api${caminho}`, {
    ...opcoes,
    headers: {
      "Content-Type": "application/json",
      ...opcoes.headers,
      ...(token && caminho !== "/auth/login" ? { Authorization: `Bearer ${token}` } : {}),
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

// Login

export async function entrar(email, senha) {
  const dados = await requisicao("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });

  localStorage.setItem(CHAVE_TOKEN, dados.token);
  localStorage.setItem(CHAVE_USUARIO, JSON.stringify(dados.usuario));

  return dados.usuario;
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

// Doacoes

export const listarDoacoes = () => requisicao("/doacoes");

export const registrarDoacao = (doacao) =>
  requisicao("/doacoes", {
    method: "POST",
    body: JSON.stringify(doacao),
  });

// Status da aplicacao

export const verificarSaude = () => requisicao("/health");

export const verificarBanco = () => requisicao("/db-health");
