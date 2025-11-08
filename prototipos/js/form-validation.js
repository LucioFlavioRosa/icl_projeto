// Validação reutilizável para formulários do protótipo de gestão de fretes
// Inclui validação de obrigatoriedade, formatos (CPF, placa, e-mail, telefone), datas e máscaras

window.ICLFormValidator = (function() {
  // Máscaras simples
  function maskCPF(value) {
    return value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  function maskPlaca(value) {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/(\w{3})(\w{1,4})/, '$1-$2');
  }
  function maskTelefone(value) {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  // Validações
  function isCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
  }
  function isPlaca(placa) {
    placa = placa.toUpperCase().replace(/[^A-Z0-9]/g, '');
    return /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(placa) || /^[A-Z]{3}[0-9]{4}$/.test(placa);
  }
  function isEmail(email) {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  }
  function isTelefone(tel) {
    return /^\(\d{2}\) \d{5}-\d{4}$/.test(maskTelefone(tel));
  }
  function isFutureDate(dateStr) {
    const today = new Date();
    today.setHours(0,0,0,0);
    const inputDate = new Date(dateStr);
    return inputDate >= today;
  }

  // Exibe mensagem de erro padrão do template
  function showError(input, message) {
    let error = input.parentNode.querySelector('.icl-form-error');
    if (!error) {
      error = document.createElement('div');
      error.className = 'icl-form-error';
      error.style.color = '#cf2e2e';
      error.style.fontSize = '13px';
      error.style.marginTop = '4px';
      input.parentNode.appendChild(error);
    }
    error.textContent = message;
    input.classList.add('icl-error-input');
  }
  function clearError(input) {
    let error = input.parentNode.querySelector('.icl-form-error');
    if (error) error.remove();
    input.classList.remove('icl-error-input');
  }

  // Validação principal
  function validate(form, rules) {
    let valid = true;
    Object.keys(rules).forEach(function(field) {
      const input = form.querySelector('[name="' + field + '"]');
      if (!input) return;
      clearError(input);
      const value = input.value.trim();
      if (rules[field].required && !value) {
        showError(input, 'Campo obrigatório.');
        valid = false;
      } else if (rules[field].type === 'cpf' && value && !isCPF(value)) {
        showError(input, 'CPF inválido.');
        valid = false;
      } else if (rules[field].type === 'placa' && value && !isPlaca(value)) {
        showError(input, 'Placa inválida.');
        valid = false;
      } else if (rules[field].type === 'email' && value && !isEmail(value)) {
        showError(input, 'E-mail inválido.');
        valid = false;
      } else if (rules[field].type === 'telefone' && value && !isTelefone(value)) {
        showError(input, 'Telefone inválido.');
        valid = false;
      } else if (rules[field].type === 'date' && value && !isFutureDate(value)) {
        showError(input, 'Data não pode ser passada.');
        valid = false;
      }
    });
    return valid;
  }

  // Aplica máscaras automaticamente
  function applyMasks(form, rules) {
    Object.keys(rules).forEach(function(field) {
      const input = form.querySelector('[name="' + field + '"]');
      if (!input) return;
      if (rules[field].type === 'cpf') {
        input.addEventListener('input', function() {
          input.value = maskCPF(input.value);
        });
      }
      if (rules[field].type === 'placa') {
        input.addEventListener('input', function() {
          input.value = maskPlaca(input.value);
        });
      }
      if (rules[field].type === 'telefone') {
        input.addEventListener('input', function() {
          input.value = maskTelefone(input.value);
        });
      }
    });
  }

  // Exemplo de uso:
  // const form = document.querySelector('#meuForm');
  // ICLFormValidator.applyMasks(form, {
  //   cpf: {type: 'cpf'},
  //   placa: {type: 'placa'},
  //   telefone: {type: 'telefone'}
  // });
  // form.addEventListener('submit', function(e) {
  //   if (!ICLFormValidator.validate(form, {cpf: {required: true, type: 'cpf'}})) e.preventDefault();
  // });

  return {
    validate,
    applyMasks
  };
})();