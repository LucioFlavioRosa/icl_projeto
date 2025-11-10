"use strict";

/**
 * Salva os dados do agendamento no localStorage.
 * @param {Object} dados - Objeto contendo os campos do agendamento.
 */
function salvarDadosAgendamento(dados) {
  if (typeof dados !== 'object' || dados === null) return;
  localStorage.setItem('dadosAgendamento', JSON.stringify(dados));
}

/**
 * Recupera os dados do agendamento do localStorage.
 * @returns {Object|null} Objeto com os dados ou null se não existir.
 */
function recuperarDadosAgendamento() {
  const str = localStorage.getItem('dadosAgendamento');
  if (!str) return null;
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

/**
 * Limpa os dados do agendamento do localStorage.
 */
function limparDadosAgendamento() {
  localStorage.removeItem('dadosAgendamento');
}
