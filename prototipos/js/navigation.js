// Lógica de navegação simulada para protótipo de gestão de fretes
// Utiliza localStorage para simular sessão de usuário

(function() {
  // Configuração das rotas simuladas
  const routes = {
    login: 'login.html',
    dashboard: 'dashboard.html',
    solicitacao: 'solicitacao-agendamento.html',
    confirmacao: 'confirmacao-fornecedor.html',
    transporte: 'definicao-transporte.html',
    aceite: 'aceite-transportadora.html',
    checkinColeta: 'checkin-coleta.html',
    checkinDestino: 'checkin-destino.html',
    anexoNF: 'anexo-nf.html',
    relatorios: 'relatorios.html',
    cadastros: 'cadastros.html',
    usuarios: 'usuarios.html'
  };

  // Função para simular login
  window.loginUser = function(perfil) {
    localStorage.setItem('icl_fretes_session', JSON.stringify({
      autenticado: true,
      perfil: perfil || 'operador'
    }));
    window.location.href = routes.dashboard;
  };

  // Função para simular logout
  window.logoutUser = function() {
    localStorage.removeItem('icl_fretes_session');
    window.location.href = routes.login;
  };

  // Função para checar autenticação
  window.checkAuth = function() {
    const session = JSON.parse(localStorage.getItem('icl_fretes_session') || '{}');
    if (!session.autenticado) {
      window.location.href = routes.login;
      return false;
    }
    return session;
  };

  // Função para navegar entre telas
  window.navigateTo = function(routeKey) {
    const session = window.checkAuth();
    if (!session) return;
    if (routes[routeKey]) {
      window.location.href = routes[routeKey];
    } else {
      alert('Tela não encontrada: ' + routeKey);
    }
  };

  // Redirecionamento automático se não autenticado (exceto na tela de login)
  document.addEventListener('DOMContentLoaded', function() {
    const isLogin = window.location.pathname.endsWith(routes.login);
    if (!isLogin) {
      window.checkAuth();
    }
  });

  // Exemplo de uso nos botões do protótipo:
  // <button onclick="navigateTo('solicitacao')">Nova Solicitação</button>
  // <button onclick="logoutUser()">Sair</button>
})();