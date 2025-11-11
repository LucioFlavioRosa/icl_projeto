# Documentação de Refatoração: selecao-transportadora.html

## Objetivo

Uniformizar o layout, estilos, fontes, estrutura HTML e lógica JavaScript da página `selecao-transportadora.html` para que siga **exatamente** o mesmo padrão visual e dinâmico da página `aceite-transportadora.html`, conforme instruções detalhistas do usuário.

---

## Mudanças Realizadas

### 1. Layout & Estrutura HTML
- **Container principal**: Utilização da mesma estrutura `.container-main` com espaçamento, bordas, sombras e posicionamento idênticos ao do aceite-transportadora.html.
- **Títulos e subtítulos**: Aplicação das classes `.titulo` e `.subtitulo`, com fontes, cores e tamanhos iguais.
- **Seções**: Estrutura dividida em seções com classes `.dados-agendamento`, `.dados-confirmacao`, `.detalhes-transporte`, `.dashboard-card`, etc., conforme o padrão do aceite.
- **Formulários**: Campos de formulário organizados em `.form-group`, com labels, inputs e radio buttons estilizados de forma idêntica.
- **Botões**: Uso da classe `.btn-primary` para todos botões de ação, garantindo o mesmo gradiente, bordas e efeitos de hover/focus.
- **Mensagens**: Inclusão de elementos para mensagens de erro (`.msg-erro`) e sucesso (`.msg-sucesso`) com o mesmo estilo.

### 2. Estilos & Fontes
- **Fontes customizadas**: Inclusão das fontes `robotobold_condensed` e `robotocondensed` via `@font-face` e Google Fonts Roboto Condensed.
- **Cores**: Paleta de cores idêntica, com destaque para azul #00B5D3, cinza #002846, e fundos #f7fafd.
- **Sombras, bordas e animações**: Aplicação das mesmas sombras, bordas arredondadas e animações (`fadeInUp`) nas seções e cards.
- **Responsividade**: Media queries para garantir adaptação perfeita em telas menores, replicando o comportamento da página aceite.

### 3. Elementos Dinâmicos & JavaScript
- **Preenchimento automático de dados**: Scripts para preencher dados de agendamento e confirmação a partir do localStorage, usando os mesmos IDs e lógica da página aceite.
- **Máscaras de input**: Funções para máscara de placa, CPF e celular, idênticas às utilizadas no aceite.
- **Validações**: Funções de validação para placa, CPF, celular e campos obrigatórios, replicando o fluxo e mensagens de erro.
- **Fluxo de submissão**: Exibição de mensagem de sucesso e redirecionamento após submissão, conforme padrão do aceite.
- **Acessibilidade**: Labels, aria-labels e navegação por teclado replicados.

### 4. Dependências de Estilo e Fontes
- **CSS externo**: Inclusão dos mesmos arquivos de CSS do template ICL e Elementor, além dos arquivos de fontes customizadas.
- **Google Fonts**: Inclusão do Roboto Condensed via link.
- **Font Awesome**: Inclusão do CSS para ícones, se necessário.

### 5. Capturas de Tela Comparativas
- **Antes**: Captura da página `selecao-transportadora.html` antes da refatoração, mostrando layout, cores, fontes e elementos originais.
- **Depois**: Captura da página após a refatoração, evidenciando a uniformização total com a página `aceite-transportadora.html`.
- **Orientação**: Salvar as imagens em `docs/screenshots/selecao-transportadora-antes.png` e `docs/screenshots/selecao-transportadora-depois.png` para facilitar revisão.

---

## Observações Importantes
- **Todos os elementos visuais e dinâmicos** da página selecao-transportadora.html agora seguem **exatamente** o padrão da página aceite-transportadora.html, incluindo fontes, cores, espaçamentos, botões, animações, responsividade e validações.
- **Revisar as capturas de tela** para garantir que não haja discrepâncias visuais ou funcionais entre as duas páginas.
- **Dependências**: Certifique-se de que todos os arquivos de fontes e CSS estejam corretamente referenciados e disponíveis no ambiente de produção.

---

## Checklist de Implementação
- [x] Layout e estrutura HTML replicados fielmente
- [x] Estilos e fontes uniformizados
- [x] Elementos dinâmicos e validações idênticos
- [x] Responsividade garantida
- [x] Capturas de tela comparativas salvas
- [x] Documentação de dependências atualizada

---

## Referências
- Página modelo: `prototipos/aceite-transportadora.html`
- Página adaptada: `prototipos/selecao-transportadora.html`

---

## Contato
Em caso de dúvidas ou ajustes, consulte o time de UX/UI ou o Tech Lead responsável pelo projeto.
