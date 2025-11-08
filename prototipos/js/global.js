// global.js - Funcionalidades comuns do protótipo Gestão de Fretes ICL
(function() {
  // Toasts
  window.showToast = function(type, message, duration = 3500) {
    let toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  };

  // Modal genérico
  window.openModal = function(contentHtml) {
    let backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop active';
    backdrop.innerHTML = '<div class="modal">' + contentHtml + '<button class="modal-close" aria-label="Fechar" onclick="closeModal()">&times;</button></div>';
    document.body.appendChild(backdrop);
    window.closeModal = function() {
      backdrop.classList.remove('active');
      setTimeout(() => backdrop.remove(), 400);
    };
    backdrop.addEventListener('click', function(e) {
      if (e.target === backdrop) closeModal();
    });
  };

  // Formatação de datas (pt-BR)
  window.formatDate = function(dateStr) {
    let d = new Date(dateStr);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('pt-BR');
  };
  window.formatDateTime = function(dateStr) {
    let d = new Date(dateStr);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
  };
  // Formatação de número
  window.formatNumber = function(num, dec = 2) {
    return Number(num).toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  };

  // Controle de sessão (simulado)
  window.setSessionUser = function(user) {
    sessionStorage.setItem('icl_user', JSON.stringify(user));
  };
  window.getSessionUser = function() {
    try { return JSON.parse(sessionStorage.getItem('icl_user') || 'null'); } catch(e) { return null; }
  };
  window.clearSessionUser = function() {
    sessionStorage.removeItem('icl_user');
  };

  // Inicialização de tooltips (simples)
  document.addEventListener('mouseover', function(e) {
    let el = e.target.closest('[data-tooltip]');
    if (el) {
      let tip = document.createElement('div');
      tip.className = 'tooltip';
      tip.innerText = el.getAttribute('data-tooltip');
      document.body.appendChild(tip);
      let rect = el.getBoundingClientRect();
      tip.style.position = 'fixed';
      tip.style.left = (rect.left + rect.width/2 - tip.offsetWidth/2) + 'px';
      tip.style.top = (rect.top - tip.offsetHeight - 8) + 'px';
      el._tip = tip;
    }
  });
  document.addEventListener('mouseout', function(e) {
    let el = e.target.closest('[data-tooltip]');
    if (el && el._tip) {
      el._tip.remove();
      el._tip = null;
    }
  });

  // Transição de página (simples)
  window.pageTransition = function(callback) {
    let main = document.querySelector('main');
    if (!main) return callback();
    main.classList.add('page-transition-exit');
    setTimeout(() => {
      main.classList.remove('page-transition-exit');
      callback();
      main.classList.add('page-transition-enter');
      setTimeout(() => main.classList.remove('page-transition-enter'), 400);
    }, 320);
  };
})();
