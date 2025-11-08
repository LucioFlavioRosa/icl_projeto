// Lógica de Relatórios: filtra dados mockados, calcula KPIs, gera gráficos com Chart.js, simula exportação

(function() {
  // Mock de dados de agendamentos
  const mockAgendamentos = [
    {
      id: 'AG001', fornecedor: 'Fornecedor XPTO', transportadora: 'Transp. Alfa', tipoFrete: 'FOB', status: 'Concluído',
      dataColeta: '2024-07-01', dataEntrega: '2024-07-03', volume: 12, atraso: false, estadia: 0
    },
    {
      id: 'AG002', fornecedor: 'Fornecedor Y', transportadora: 'Transp. Beta', tipoFrete: 'CIF', status: 'Em trânsito',
      dataColeta: '2024-07-02', dataEntrega: '', volume: 8, atraso: true, estadia: 2
    },
    {
      id: 'AG003', fornecedor: 'Fornecedor XPTO', transportadora: 'Transp. Alfa', tipoFrete: 'FOB', status: 'Concluído',
      dataColeta: '2024-07-03', dataEntrega: '2024-07-05', volume: 15, atraso: true, estadia: 1
    },
    {
      id: 'AG004', fornecedor: 'Fornecedor Z', transportadora: 'Transp. Gama', tipoFrete: 'FOB', status: 'Concluído',
      dataColeta: '2024-07-04', dataEntrega: '2024-07-06', volume: 10, atraso: false, estadia: 0
    }
  ];

  function filtrarAgendamentos({periodoDe, periodoAte, fornecedor, transportadora, status}) {
    return mockAgendamentos.filter(a => {
      let ok = true;
      if (periodoDe && a.dataColeta < periodoDe) ok = false;
      if (periodoAte && a.dataColeta > periodoAte) ok = false;
      if (fornecedor && fornecedor !== '' && a.fornecedor !== fornecedor) ok = false;
      if (transportadora && transportadora !== '' && a.transportadora !== transportadora) ok = false;
      if (status && status !== '' && a.status !== status) ok = false;
      return ok;
    });
  }

  function calcularKPIs(agendamentos) {
    const total = agendamentos.length;
    const concluidos = agendamentos.filter(a => a.status === 'Concluído').length;
    const emAtraso = agendamentos.filter(a => a.atraso).length;
    const totalVolume = agendamentos.reduce((acc, a) => acc + a.volume, 0);
    const mediaEstadia = agendamentos.length > 0 ? (agendamentos.reduce((acc, a) => acc + a.estadia, 0) / agendamentos.length).toFixed(2) : 0;
    return {
      total,
      concluidos,
      emAtraso,
      totalVolume,
      mediaEstadia
    };
  }

  function gerarGraficoKPI(canvasId, agendamentos) {
    if (!window.Chart) return;
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const statusLabels = ['Concluído', 'Em trânsito', 'Pendente'];
    const statusData = [
      agendamentos.filter(a => a.status === 'Concluído').length,
      agendamentos.filter(a => a.status === 'Em trânsito').length,
      agendamentos.filter(a => a.status === 'Pendente').length
    ];
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: statusLabels,
        datasets: [{
          data: statusData,
          backgroundColor: ['#00B5D3', '#fcb900', '#cf2e2e']
        }]
      },
      options: {
        plugins: {
          legend: { display: true, position: 'bottom' }
        }
      }
    });
  }

  function gerarGraficoVolume(canvasId, agendamentos) {
    if (!window.Chart) return;
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const fornecedores = [...new Set(agendamentos.map(a => a.fornecedor))];
    const volumes = fornecedores.map(f => agendamentos.filter(a => a.fornecedor === f).reduce((acc, a) => acc + a.volume, 0));
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: fornecedores,
        datasets: [{
          label: 'Volume Transportado',
          data: volumes,
          backgroundColor: '#00B5D3'
        }]
      },
      options: {
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  function simularExportacao(tipo, agendamentos) {
    let content = '';
    let filename = '';
    if (tipo === 'excel') {
      // CSV simples
      content = 'ID,Fornecedor,Transportadora,Status,Data Coleta,Data Entrega,Volume,Estadia\n';
      agendamentos.forEach(a => {
        content += `${a.id},${a.fornecedor},${a.transportadora},${a.status},${a.dataColeta},${a.dataEntrega},${a.volume},${a.estadia}\n`;
      });
      filename = 'relatorio-agendamentos.csv';
      const blob = new Blob([content], {type: 'text/csv'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.click();
    } else if (tipo === 'pdf') {
      // Simulação: download de um txt como se fosse PDF
      content = 'Relatório de Agendamentos\n\n';
      agendamentos.forEach(a => {
        content += `ID: ${a.id}\nFornecedor: ${a.fornecedor}\nTransportadora: ${a.transportadora}\nStatus: ${a.status}\nData Coleta: ${a.dataColeta}\nData Entrega: ${a.dataEntrega}\nVolume: ${a.volume}\nEstadia: ${a.estadia}\n---\n`;
      });
      filename = 'relatorio-agendamentos.pdf';
      const blob = new Blob([content], {type: 'application/pdf'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.click();
    }
  }

  // Expor funções globais para uso nas telas
  window.relatoriosLogic = {
    filtrarAgendamentos,
    calcularKPIs,
    gerarGraficoKPI,
    gerarGraficoVolume,
    simularExportacao,
    mockAgendamentos
  };
})();
