// Lógica do dashboard principal do protótipo de Gestão de Fretes ICL
(function() {
  const data = window.MockData;

  // KPIs
  function renderKPIs() {
    const totalAgendamentos = data.agendamentos.length;
    const pendentes = data.agendamentos.filter(a => a.status === "Pendente").length;
    const concluidos = data.agendamentos.filter(a => a.status === "Concluído").length;
    const atrasos = data.notificacoes.filter(n => n.tipo === "alerta").length;
    document.getElementById("kpi-total").textContent = totalAgendamentos;
    document.getElementById("kpi-pendentes").textContent = pendentes;
    document.getElementById("kpi-concluidos").textContent = concluidos;
    document.getElementById("kpi-alertas").textContent = atrasos;
  }

  // Cards de acesso rápido
  function renderCards() {
    const cards = [
      { id: "card-solicitacao", label: "Nova Solicitação", icon: "fa-truck-arrow-right", href: "solicitacao.html" },
      { id: "card-pendencias", label: "Pendências", icon: "fa-exclamation-circle", href: "pendencias.html" },
      { id: "card-relatorios", label: "Relatórios", icon: "fa-chart-bar", href: "relatorios.html" },
      { id: "card-cadastros", label: "Cadastros", icon: "fa-database", href: "cadastros.html" }
    ];
    const container = document.getElementById("dashboard-cards");
    container.innerHTML = "";
    cards.forEach(card => {
      const el = document.createElement("a");
      el.className = "dashboard-card";
      el.href = card.href;
      el.innerHTML = `<i class="fa ${card.icon}"></i><span>${card.label}</span>`;
      el.addEventListener("mouseenter", () => el.classList.add("hover"));
      el.addEventListener("mouseleave", () => el.classList.remove("hover"));
      container.appendChild(el);
    });
  }

  // Notificações de pendências
  function renderNotificacoes() {
    const notificacoes = data.notificacoes.sort((a, b) => new Date(b.data) - new Date(a.data));
    const container = document.getElementById("notificacoes-list");
    container.innerHTML = "";
    notificacoes.forEach(n => {
      const el = document.createElement("div");
      el.className = `notificacao ${n.tipo}`;
      el.innerHTML = `<i class="fa ${n.tipo === 'alerta' ? 'fa-bell' : 'fa-exclamation-triangle'}"></i> <span>${n.mensagem}</span> <time>${new Date(n.data).toLocaleString()}</time>`;
      container.appendChild(el);
    });
  }

  // Animações de carregamento
  function showLoading() {
    document.getElementById("dashboard-loading").style.display = "flex";
    setTimeout(() => {
      document.getElementById("dashboard-loading").style.display = "none";
      renderKPIs();
      renderCards();
      renderNotificacoes();
    }, 800);
  }

  // Inicialização
  document.addEventListener("DOMContentLoaded", showLoading);
})();