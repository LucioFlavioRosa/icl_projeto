// Lógica de Upload de XML (NF-e e CT-e)
// Valida formato, simula parsing, exibe preview, salva referência em localStorage

(function() {
  function parseXMLMock(file, callback) {
    // Simulação de parsing: extrai dados fake do nome do arquivo
    const reader = new FileReader();
    reader.onload = function(e) {
      let nome = file.name;
      let tipo = nome.includes('cte') ? 'CT-e' : 'NF-e';
      let dados = {
        tipo: tipo,
        numero: nome.match(/(\d{6,})/) ? nome.match(/(\d{6,})/)[1] : Math.floor(Math.random()*1000000),
        valor: (Math.random()*10000+100).toFixed(2),
        peso: (Math.random()*2000+100).toFixed(1),
        destinatario: tipo === 'NF-e' ? 'Cliente Exemplo' : 'Transportadora XYZ',
        chave: nome.replace(/\D/g, '').slice(0,44)
      };
      callback(dados);
    };
    reader.readAsText(file);
  }

  window.handleXMLUpload = function(inputId, previewId, tipoDoc) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    if (!input || !preview || !input.files.length) return;
    const file = input.files[0];
    if (!file.name.endsWith('.xml')) {
      preview.innerHTML = '<div style="color:#cf2e2e">Arquivo inválido. Envie um arquivo XML.</div>';
      return;
    }
    parseXMLMock(file, function(dados) {
      // Salva referência em localStorage
      let arr = [];
      try {
        arr = JSON.parse(localStorage.getItem('uploads_xml') || '[]');
      } catch(e) {}
      arr.push({
        tipo: dados.tipo,
        numero: dados.numero,
        valor: dados.valor,
        peso: dados.peso,
        destinatario: dados.destinatario,
        chave: dados.chave,
        dataUpload: new Date().toISOString()
      });
      localStorage.setItem('uploads_xml', JSON.stringify(arr));
      // Exibe preview
      preview.innerHTML = `
        <div><b>Tipo:</b> ${dados.tipo}</div>
        <div><b>Número:</b> ${dados.numero}</div>
        <div><b>Valor:</b> R$ ${dados.valor}</div>
        <div><b>Peso:</b> ${dados.peso} kg</div>
        <div><b>Destinatário:</b> ${dados.destinatario}</div>
        <div><b>Chave de Acesso:</b> ${dados.chave || '(mock)'}</div>
        <div style='color:#00d084;margin-top:8px'>Upload realizado com sucesso!</div>
      `;
    });
  };
})();
