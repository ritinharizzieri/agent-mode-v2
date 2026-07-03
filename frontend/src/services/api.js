import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Valida um colaborador por CPF, matrícula e dados pessoais
 * @param {Object} data - Dados do colaborador
 * @returns {Promise}
 */
export const validarColaborador = (data) => {
  return api.post("/api/validar-colaborador", data);
};

/**
 * Busca documentos disponíveis para um CPF e tipo específico
 * @param {string} cpf - CPF do colaborador
 * @param {string} tipo - Tipo de documento (IR ou BOLETO)
 * @returns {Promise}
 */
export const obterDocumentos = (cpf, tipo, ano) => {
  const params = { tipo };

  if (ano) {
    params.ano = ano;
  }

  return api.get(`/api/documentos/${cpf}`, {
    params,
  });
};

export default api;
