// Função para mapear os valores dos selects para texto legível
function getLabelFromSelect(selectId, value) {
  var select = document.getElementById(selectId);
  if (!select) return value;
  var option = select.querySelector('option[value="' + value + '"]');
  return option ? option.textContent : value;
}

// Função para salvar dados do formulário de agendamento no localStorage
function salvarDadosAgendamento() {
  var fornecedor = document.getElementById('fornecedor').value;
  var unidade = document.getElementById('unidade').value;
  var data_coleta = document.getElementById('data_coleta').value;
  var hora_coleta = document.getElementById('hora_coleta').value;
  var janela = document.getElementById('janela').value;
  var freteRadio = document.querySelector('input[name="frete"]:checked');
  var frete = freteRadio ? freteRadio.value : '';
  var local_entrega = document.getElementById('local_entrega').value;

  // Validação dos campos obrigatórios
  if (!fornecedor || !unidade || !data_coleta || !hora_coleta || !janela || !frete || !local_entrega) {
    alert('Por favor, preencha todos os campos obrigatórios do formulário.');
    return false;
  }

  // Salva valores legíveis para exibição na próxima tela
  var dadosFormulario = {
    fornecedor: getLabelFromSelect('fornecedor', fornecedor),
    unidade: getLabelFromSelect('unidade', unidade).replace('Unidade ', ''),
    data_coleta: data_coleta,
    hora_coleta: hora_coleta,
    janela: getLabelFromSelect('janela', janela),
    frete: frete,
    local_entrega: getLabelFromSelect('local_entrega', local_entrega)
  };

  localStorage.setItem('dadosAgendamento', JSON.stringify(dadosFormulario));
  window.location.href = 'confirmacao-fornecedor.html';
  return true;
}

// Função para exibir dados na página de confirmação (confirmacao-fornecedor.html)
function exibirDadosAgendamentoNaConfirmacao() {
  var dados = localStorage.getItem('dadosAgendamento');
  if (!dados) return;
  try {
    var obj = JSON.parse(dados);
    // Preenche os campos do resumo da solicitação
    var dl = document.querySelector('.dados-solicitacao dl');
    if (dl && obj) {
      var dtList = dl.querySelectorAll('dt');
      var ddList = dl.querySelectorAll('dd');
      if (dtList.length === 6 && ddList.length === 6) {
        ddList[0].textContent = obj.fornecedor || '';
        ddList[1].textContent = obj.unidade || '';
        ddList[2].textContent = (obj.data_coleta && obj.hora_coleta) ? (obj.data_coleta + ' ' + obj.hora_coleta) : '';
        ddList[3].textContent = obj.janela || '';
        ddList[4].textContent = obj.frete || '';
        ddList[5].textContent = obj.local_entrega || '';
      }
    }
  } catch (e) {
    // Se erro, não faz nada
  }
}

// Função para limpar os dados do localStorage após confirmação
function limparDadosAgendamento() {
  localStorage.removeItem('dadosAgendamento');
}

// Se estiver na página de confirmação, exibe os dados ao carregar
if (window.location.pathname.endsWith('confirmacao-fornecedor.html')) {
  document.addEventListener('DOMContentLoaded', function() {
    exibirDadosAgendamentoNaConfirmacao();
    var form = document.getElementById('confirmacaoForm');
    if (form) {
      form.addEventListener('submit', function() {
        limparDadosAgendamento();
      });
    }
  });
}
