// Lógica da tela de solicitação de agendamento de coleta - Gestão de Fretes ICL
(function() {
  const data = window.MockData;

  // Popular dropdowns de fornecedores e unidades
  function popularFornecedores() {
    const selectFornecedor = document.getElementById("fornecedor");
    selectFornecedor.innerHTML = '<option value="">Selecione</option>';
    data.fornecedores.forEach(f => {
      const opt = document.createElement("option");
      opt.value = f.id;
      opt.textContent = f.nome;
      selectFornecedor.appendChild(opt);
    });
    selectFornecedor.addEventListener("change", popularUnidades);
  }

  function popularUnidades() {
    const fornecedorId = document.getElementById("fornecedor").value;
    const selectUnidade = document.getElementById("unidade");
    selectUnidade.innerHTML = '<option value="">Selecione</option>';
    if (!fornecedorId) return;
    const fornecedor = data.fornecedores.find(f => f.id == fornecedorId);
    fornecedor.unidades.forEach(u => {
      const opt = document.createElement("option");
      opt.value = u.id;
      opt.textContent = u.nome;
      selectUnidade.appendChild(opt);
    });
    selectUnidade.addEventListener("change", popularJanelas);
  }

  function popularJanelas() {
    const fornecedorId = document.getElementById("fornecedor").value;
    const unidadeId = document.getElementById("unidade").value;
    const selectJanela = document.getElementById("janela");
    selectJanela.innerHTML = '<option value="">Selecione</option>';
    if (!fornecedorId || !unidadeId) return;
    const fornecedor = data.fornecedores.find(f => f.id == fornecedorId);
    const unidade = fornecedor.unidades.find(u => u.id == unidadeId);
    unidade.janelas.forEach(j => {
      const opt = document.createElement("option");
      opt.value = j;
      opt.textContent = j;
      selectJanela.appendChild(opt);
    });
  }

  // Popular tipos de frete
  function popularTipoFrete() {
    const select = document.getElementById("tipo-frete");
    select.innerHTML = '<option value="FOB">FOB</option><option value="CIF">CIF</option>';
  }

  // Popular locais de entrega
  function popularLocaisEntrega() {
    const select = document.getElementById("local-entrega");
    select.innerHTML = '<option value="">Selecione</option>';
    data.locaisDescarga.forEach(l => {
      const opt = document.createElement("option");
      opt.value = l.id;
      opt.textContent = l.nome;
      select.appendChild(opt);
    });
  }

  // Popular unidades de medida
  function popularUnidadesMedida() {
    const select = document.getElementById("unidade-medida");
    select.innerHTML = '<option value="">Selecione</option>';
    data.unidadesMedida.forEach(u => {
      const opt = document.createElement("option");
      opt.value = u;
      opt.textContent = u;
      select.appendChild(opt);
    });
  }

  // Sugestão de tipo de veículo baseado em peso/volume
  function sugerirVeiculo() {
    const peso = Number(document.getElementById("peso").value);
    const volume = Number(document.getElementById("volume").value);
    let sugerido = data.tiposVeiculo.find(v => peso <= v.capacidadePeso && volume <= v.capacidadeVolume);
    document.getElementById("tipo-veiculo").value = sugerido ? sugerido.descricao : "Truck";
  }

  // Validação de campos obrigatórios
  function validarFormulario() {
    let ok = true;
    ["fornecedor", "unidade", "data-coleta", "janela", "tipo-frete", "local-entrega", "volume", "unidade-medida", "tipo-carga", "peso"].forEach(id => {
      const el = document.getElementById(id);
      if (!el.value) {
        el.classList.add("erro");
        ok = false;
      } else {
        el.classList.remove("erro");
      }
    });
    return ok;
  }

  // Salvar solicitação em localStorage
  function salvarSolicitacao(e) {
    e.preventDefault();
    if (!validarFormulario()) return;
    const solicitacoes = JSON.parse(localStorage.getItem("solicitacoes") || "[]");
    const fornecedor = data.fornecedores.find(f => f.id == document.getElementById("fornecedor").value);
    const unidade = fornecedor.unidades.find(u => u.id == document.getElementById("unidade").value);
    const localEntrega = data.locaisDescarga.find(l => l.id == document.getElementById("local-entrega").value);
    solicitacoes.push({
      id: Date.now(),
      fornecedor: fornecedor.nome,
      unidade: unidade.nome,
      dataColeta: document.getElementById("data-coleta").value,
      janela: document.getElementById("janela").value,
      tipoFrete: document.getElementById("tipo-frete").value,
      localEntrega: localEntrega.nome,
      volume: document.getElementById("volume").value,
      unidadeMedida: document.getElementById("unidade-medida").value,
      tipoCarga: document.getElementById("tipo-carga").value,
      peso: document.getElementById("peso").value,
      status: "Pendente"
    });
    localStorage.setItem("solicitacoes", JSON.stringify(solicitacoes));
    exibirHistorico();
    document.getElementById("solicitacao-form").reset();
    document.getElementById("tipo-veiculo").value = "";
    alert("Solicitação registrada com sucesso!");
  }

  // Exibir histórico de solicitações
  function exibirHistorico() {
    const solicitacoes = JSON.parse(localStorage.getItem("solicitacoes") || "[]");
    const tbody = document.getElementById("historico-solicitacoes");
    tbody.innerHTML = "";
    solicitacoes.slice(-10).reverse().forEach(s => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${s.fornecedor}</td><td>${s.unidade}</td><td>${s.dataColeta}</td><td>${s.janela}</td><td>${s.tipoFrete}</td><td>${s.localEntrega}</td><td>${s.volume} ${s.unidadeMedida}</td><td>${s.tipoCarga}</td><td>${s.peso}</td><td>${s.status}</td>`;
      tbody.appendChild(tr);
    });
  }

  // Inicialização
  document.addEventListener("DOMContentLoaded", function() {
    popularFornecedores();
    popularTipoFrete();
    popularLocaisEntrega();
    popularUnidadesMedida();
    document.getElementById("volume").addEventListener("input", sugerirVeiculo);
    document.getElementById("peso").addEventListener("input", sugerirVeiculo);
    document.getElementById("solicitacao-form").addEventListener("submit", salvarSolicitacao);
    exibirHistorico();
  });
})();