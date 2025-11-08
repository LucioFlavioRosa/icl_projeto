// Lógica de Check-in (Coleta e Destino)
// Valida token, calcula diferença de horário, alerta se fora da janela, registra timestamp em localStorage

(function() {
  // Mock de tokens válidos e janelas operacionais
  const mockCheckins = [
    {
      token: 'ABC123',
      agendamento: '2024-07-10T09:00:00',
      janelaInicio: '2024-07-10T08:30:00',
      janelaFim: '2024-07-10T10:00:00',
      fornecedor: 'Fornecedor XPTO',
      local: 'Planta A'
    },
    {
      token: 'XYZ789',
      agendamento: '2024-07-11T14:00:00',
      janelaInicio: '2024-07-11T13:30:00',
      janelaFim: '2024-07-11T15:00:00',
      fornecedor: 'Fornecedor Y',
      local: 'Planta B'
    }
  ];

  function findCheckinByToken(token) {
    return mockCheckins.find(c => c.token === token);
  }

  function formatDateTime(dt) {
    return new Date(dt).toLocaleString('pt-BR');
  }

  window.handleCheckinSubmit = function(formId, resultId) {
    const form = document.getElementById(formId);
    const result = document.getElementById(resultId);
    if (!form || !result) return;
    result.innerHTML = '';
    const token = form.token.value.trim();
    if (!token) {
      result.innerHTML = '<div style="color:#cf2e2e">Informe o token de check-in.</div>';
      return;
    }
    const checkin = findCheckinByToken(token);
    if (!checkin) {
      result.innerHTML = '<div style="color:#cf2e2e">Token inválido. Verifique e tente novamente.</div>';
      return;
    }
    const now = new Date();
    const janelaInicio = new Date(checkin.janelaInicio);
    const janelaFim = new Date(checkin.janelaFim);
    let statusMsg = '';
    if (now < janelaInicio) {
      statusMsg = '<div style="color:#fcb900">Check-in realizado ANTES da janela. Aguarde até o horário permitido.</div>';
    } else if (now > janelaFim) {
      statusMsg = '<div style="color:#cf2e2e">Check-in FORA da janela! Notifique o responsável.</div>';
    } else {
      statusMsg = '<div style="color:#00d084">Check-in dentro da janela operacional.</div>';
    }
    // Calcula diferença
    const diffMin = Math.round((now - new Date(checkin.agendamento)) / 60000);
    let diffMsg = '';
    if (diffMin > 0) {
      diffMsg = `Atraso de <b>${diffMin} min</b> em relação ao agendamento.`;
    } else if (diffMin < 0) {
      diffMsg = `Antecipado em <b>${-diffMin} min</b> em relação ao agendamento.`;
    } else {
      diffMsg = 'No horário exato do agendamento.';
    }
    // Salva no localStorage
    const registro = {
      token: token,
      fornecedor: checkin.fornecedor,
      local: checkin.local,
      dataCheckin: now.toISOString(),
      status: statusMsg.replace(/<[^>]+>/g, ''),
      diffMin: diffMin
    };
    let arr = [];
    try {
      arr = JSON.parse(localStorage.getItem('checkins') || '[]');
    } catch(e) {}
    arr.push(registro);
    localStorage.setItem('checkins', JSON.stringify(arr));
    // Exibe resultado
    result.innerHTML = `
      <div style="margin-bottom:8px"><b>Fornecedor:</b> ${checkin.fornecedor} | <b>Local:</b> ${checkin.local}</div>
      <div><b>Janela:</b> ${formatDateTime(checkin.janelaInicio)} - ${formatDateTime(checkin.janelaFim)}</div>
      <div><b>Agendado:</b> ${formatDateTime(checkin.agendamento)}</div>
      <div><b>Check-in:</b> ${formatDateTime(now)}</div>
      <div style="margin:8px 0">${statusMsg}</div>
      <div>${diffMsg}</div>
    `;
  };
})();
