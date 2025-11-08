# CHANGELOG - Protótipo Gestão de Fretes ICL

## Estrutura do Projeto
- Todos os arquivos HTML das telas estão organizados individualmente, com CSS e JS embutidos conforme padrão do projeto.
- Layout e identidade visual baseados no template `novo_teste.html`.

---

## Épico E01 - Gestão de Solicitações de Agendamento de Coleta
- **Tela:** `solicitacao-agendamento.html`
  - Formulário com campos: fornecedor, unidade, data/horário de coleta, janela operacional, tipo de frete, local de entrega.
  - Validação de campos obrigatórios e regras de negócio.
  - Notificação simulada ao fornecedor após criação.
  - Link para histórico de solicitações.

## Épico E02 - Confirmação de Volumes e Janelas pelo Fornecedor
- **Tela:** `confirmacao-fornecedor.html`
  - Formulário para confirmação de volume, tipo de carga, peso, janela.
  - Fluxo de aprovação/rejeição de nova janela.
  - Notificação simulada à ICL após confirmação.
  - Registro de timestamp simulado.

## Épico E03 - Seleção e Solicitação de Transportadora
- **Tela:** `definicao-transporte.html`
  - Formulário para definição de tipo de veículo, transportadora, data estimada, modal.
  - Sugestão automática de veículo baseada em peso/volume.
  - Envio de solicitação simulada à transportadora.

## Épico E04 - Aceite e Registro de Dados do Transporte pela Transportadora
- **Tela:** `aceite-transportadora.html`
  - Formulário para aceite, placa, CPF, nome e celular do motorista.
  - Validação de formatos.
  - Notificação simulada à ICL em caso de recusa.
  - Registro de timestamp simulado.

## Épico E05 - Check-in de Chegada do Veículo no Fornecedor
- **Tela:** `checkin-coleta.html`
  - Campo para inserção de token alfanumérico.
  - Validação do token e registro de timestamp.
  - Alerta automático se check-in fora da janela.

## Épico E06 - Anexo de Nota Fiscal (XML) e Emissão de CT-e
- **Tela:** `upload-nf-cte.html`
  - Upload de XML da nota fiscal (drag-and-drop/campo de texto).
  - Validação de estrutura e extração de informações principais.
  - Upload de XML do CT-e pela transportadora.
  - Registro de timestamps.

## Épico E07 - Check-in de Chegada no Destino e Confirmação de Descarga
- **Tela:** `checkin-destino.html`
  - Sistema de check-in via token no destino.
  - Confirmação de descarga.
  - Registro de timestamps e cálculo de SLA.
  - Geração de alertas em caso de atraso.

## Épico E08 - Módulo de Cadastros e Parametrizações
- **Tela:** `cadastros.html`
  - CRUDs para fornecedores, transportadoras, tipos de veículo, locais de descarga, unidades de medida.
  - Importação em massa via Excel/CSV (simulado).
  - Controle de versão de cadastros (simulado).

## Épico E09 - Painel de Acompanhamento e Gestão de Pendências
- **Tela:** `dashboard.html`
  - Visão consolidada de agendamentos por status.
  - Filtros por data, fornecedor, transportadora, tipo de frete, status.
  - Tela de pendências com ações requerendo intervenção.
  - Sistema de notificações simuladas.
  - Busca rápida por ID, placa, nota fiscal.

## Épico E10 - Relatórios e Análises de Performance
- **Tela:** `relatorios.html`
  - Relatórios de volume de fretes, taxa de atrasos, tempo médio de estadia, performance por fornecedor/transportadora.
  - Exportação simulada para Excel/PDF.
  - Visualizações gráficas (linha, barra, pizza) de KPIs principais.

## Épico E11 - Gestão de Acessos e Perfis de Usuário
- **Tela:** `usuarios.html`
  - Módulo de autenticação e autorização (login/senha).
  - Perfis: Administrador, Operador ICL, Fornecedor, Transportadora.
  - Gestão de usuários: cadastro, edição, desativação.
  - Log de auditoria de acessos (simulado).

## Épico E12 - Arquitetura de Sistema e Infraestrutura
- **Documentação:** Não há tela, mas decisões técnicas e arquitetura estão documentadas em README e diagramas anexos (fora do escopo do protótipo HTML).

---

## Telas Gerais e Fluxo
- **Tela de Login:** `login.html`
  - Acesso inicial ao sistema; direciona para `dashboard.html` após login bem-sucedido.
- **Navegação:** Todas as telas possuem navegação consistente baseada no template, com links para simular o fluxo real entre etapas do processo.
- **Responsividade:** Todas as telas seguem padrões de responsividade e acessibilidade do template base.

---

## Componentes Comuns
- Header, footer e menus replicados do template `novo_teste.html`.
- Notificações e alertas estilizados conforme identidade visual.
- Botões, campos e tabelas com classes e estilos do template.

---

## Observações Finais
- Todo o código foi revisado para garantir nomenclatura consistente, ausência de código morto, e validação básica de HTML/CSS/JS.
- Todos os arquivos estão organizados em `prototipos/` e prontos para versionamento.
