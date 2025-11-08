// Dados mockados para simulação de API no protótipo de Gestão de Fretes ICL
window.MockData = {
  fornecedores: [
    {
      id: 1,
      nome: "Fornecedor Alfa",
      unidades: [
        { id: 11, nome: "Planta SP", janelas: ["08:00-12:00", "13:00-17:00"] },
        { id: 12, nome: "Planta MG", janelas: ["07:00-11:00", "14:00-18:00"] }
      ],
      tipoFretePadrao: "FOB"
    },
    {
      id: 2,
      nome: "Fornecedor Beta",
      unidades: [
        { id: 21, nome: "Planta RJ", janelas: ["09:00-13:00", "15:00-19:00"] }
      ],
      tipoFretePadrao: "CIF"
    }
  ],
  transportadoras: [
    { id: 1, nome: "Translog", sla: "24h", email: "contato@translog.com" },
    { id: 2, nome: "Rápido Sul", sla: "48h", email: "suporte@rapidosul.com" },
    { id: 3, nome: "Expresso Norte", sla: "36h", email: "expresso@norte.com" }
  ],
  tiposVeiculo: [
    { id: 1, descricao: "Toco", capacidadePeso: 7000, capacidadeVolume: 35, custoKm: 2.5 },
    { id: 2, descricao: "Truck", capacidadePeso: 14000, capacidadeVolume: 55, custoKm: 3.5 },
    { id: 3, descricao: "Carreta LS", capacidadePeso: 27000, capacidadeVolume: 90, custoKm: 5.0 }
  ],
  locaisDescarga: [
    { id: 1, nome: "ICL Paulínia", endereco: "Av. Brasil, 1000, Paulínia/SP", capacidadeDocas: 4, restricoes: "Proibido granel" },
    { id: 2, nome: "ICL Cubatão", endereco: "Rua Porto, 500, Cubatão/SP", capacidadeDocas: 2, restricoes: "Sem restrições" }
  ],
  agendamentos: [
    {
      id: 1001,
      fornecedor: "Fornecedor Alfa",
      unidade: "Planta SP",
      dataColeta: "2024-07-10",
      janela: "08:00-12:00",
      tipoFrete: "FOB",
      localEntrega: "ICL Paulínia",
      status: "Pendente",
      volume: 10,
      unidadeMedida: "Palete",
      tipoCarga: "Paletizado",
      peso: 7000,
      transportadora: "Translog",
      veiculo: "Toco",
      dataEntregaEstimada: "2024-07-11",
      modal: "Lotação"
    },
    {
      id: 1002,
      fornecedor: "Fornecedor Beta",
      unidade: "Planta RJ",
      dataColeta: "2024-07-11",
      janela: "09:00-13:00",
      tipoFrete: "CIF",
      localEntrega: "ICL Cubatão",
      status: "Confirmado",
      volume: 20,
      unidadeMedida: "Big Bag",
      tipoCarga: "Granel",
      peso: 12000,
      transportadora: "Rápido Sul",
      veiculo: "Truck",
      dataEntregaEstimada: "2024-07-13",
      modal: "Fracionado"
    }
  ],
  usuarios: [
    { id: 1, nome: "Ana ICL", perfil: "Administrador ICL", email: "ana@icl.com" },
    { id: 2, nome: "Carlos Fornecedor", perfil: "Fornecedor", email: "carlos@alfa.com" },
    { id: 3, nome: "Bruno Transportadora", perfil: "Transportadora", email: "bruno@translog.com" }
  ],
  unidadesMedida: [
    "Caixa", "Palete", "Big Bag", "Litro", "Tonelada"
  ],
  notificacoes: [
    { id: 1, tipo: "pendencia", mensagem: "Fornecedor Beta não confirmou volume da coleta #1002", data: "2024-07-09T10:00:00" },
    { id: 2, tipo: "alerta", mensagem: "Check-in de veículo #1001 fora da janela operacional", data: "2024-07-09T11:00:00" }
  ]
};