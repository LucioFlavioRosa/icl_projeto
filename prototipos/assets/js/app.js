// app.js - Funções centrais simuladas para protótipo Gestão de Fretes
// Todas as funções usam dados mockados e manipulação DOM básica para simulação

// ----------- Validações -----------
function validarCPF(cpf) {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;
  var soma = 0, resto;
  for (var i = 1; i <= 9; i++) soma += parseInt(cpf[i-1]) * (11-i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;
  soma = 0;
  for (i = 1; i <= 10; i++) soma += parseInt(cpf[i-1]) * (12-i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10]);
}

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, '');
  if (cnpj.length !== 14) return false;
  var tamanho = cnpj.length - 2;
  var numeros = cnpj.substring(0, tamanho);
  var digitos = cnpj.substring(tamanho);
  var soma = 0, pos = tamanho - 7;
  for (var i = tamanho; i >= 1; i--) {
    soma += numeros[tamanho - i] * pos--;
    if (pos < 2) pos = 9;
  }
  var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos[0])) return false;
  tamanho++;
  numeros = cnpj.substring(0, tamanho);
  soma = 0; pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros[tamanho - i] * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  return resultado === parseInt(digitos[1]);
}

function validarPlaca(placa) {
  // Aceita padrão antigo e Mercosul
  return /^[A-Z]{3}-?\d{4}$/.test(placa.toUpperCase()) || /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(placa.toUpperCase());
}

function validarEmail(email) {
  return /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email);
}

// ----------- Máscaras de Input -----------
function aplicarMascaraCPF(input) {
  input.value = input.value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}
function aplicarMascaraCNPJ(input) {
  input.value = input.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}
function aplicarMascaraPlaca(input) {
  input.value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/(.{3})(.{1,4})/, '$1-$2');
}
function aplicarMascaraTelefone(input) {
  input.value = input.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{1,4})$/, '$1-$2');
}

// ----------- Manipulação de DOM -----------
function mostrarSecao(id) {
  document.querySelectorAll('.secao').forEach(function(sec) { sec.style.display = 'none'; });
  var el = document.getElementById(id);
  if (el) el.style.display = 'block';
}
function ocultarSecao(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = 'none';
}
function alternarSecao(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = (el.style.display === 'none' ? 'block' : 'none');
}

// ----------- Simulação de API -----------
function apiSimulada(endpoint, params, callback) {
  // Simula delay e retorno mockado
  setTimeout(function() {
    var dados = {
      '/usuario': { nome: 'João Silva', perfil: 'Administrador', email: 'joao@icl.com' },
      '/notificacoes': [
        { id: 1, texto: 'Nova solicitação criada', lida: false },
        { id: 2, texto: 'Transportadora aceitou o frete', lida: false },
        { id: 3, texto: 'Nota Fiscal anexada', lida: true }
      ],
      '/solicitacoes': [
        { id: 'SOL123', status: 'pendente', fornecedor: 'Fornecedor A', data: '2024-06-20' },
        { id: 'SOL124', status: 'confirmado', fornecedor: 'Fornecedor B', data: '2024-06-19' }
      ]
    };
    callback(dados[endpoint] || null);
  }, 600);
}

// ----------- Gerenciamento de Sessão -----------
function salvarSessaoUsuario(usuario) {
  localStorage.setItem('usuario', JSON.stringify(usuario));
}
function obterSessaoUsuario() {
  var u = localStorage.getItem('usuario');
  return u ? JSON.parse(u) : null;
}
function limparSessao() {
  localStorage.clear();
}

// ----------- Funções Auxiliares -----------
function formatarDataISO(data) {
  var d = new Date(data);
  return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
function calcularDiferencaMinutos(dataInicio, dataFim) {
  var ini = new Date(dataInicio);
  var fim = new Date(dataFim);
  var diff = (fim - ini) / 60000;
  return Math.round(diff);
}

// ----------- Exemplo de uso -----------
// apiSimulada('/usuario', {}, function(u) { console.log('Usuário:', u); });
// document.getElementById('cpf').addEventListener('input', function(){ aplicarMascaraCPF(this); });
// document.getElementById('btnNovaSolic').addEventListener('click', function(){ mostrarSecao('secNovaSolic'); });

// ----------- Comentários -----------
// - Todas as funções podem ser usadas diretamente nos HTMLs das telas
// - Simulação de API pode ser expandida para outros endpoints conforme necessário
// - Máscaras devem ser aplicadas via eventos 'input' nos campos
// - Sessão de usuário é persistida via localStorage
// - Manipulação de DOM usa classes/ids padrão para mostrar/ocultar seções dinâmicas
