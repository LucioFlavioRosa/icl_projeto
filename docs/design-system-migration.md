# Migração do Design System ICL Group

## 1. Justificativa para Adoção da Roboto Condensed

A plataforma digital do ICL Group, incluindo o bra.icl-group.com, padroniza sua tipografia na família **Roboto Condensed**. As fontes específicas utilizadas são:
- **robotobold_condensed** para títulos (Headlines)
- **robotocondensed** para o corpo de texto (Body)

Essas fontes são auto-hospedadas (self-hosted) como ativos "Custom" para garantir desempenho, segurança e consistência da marca. A escolha reforça a identidade da marca ICL, projetando eficiência técnica, modernidade e precisão, alinhada ao posicionamento da empresa como líder industrial e tecnológica.

## 2. Mapeamento de Estilos do Dashboard para Solicitação de Agendamento

Durante a migração do design da página `solicitacao-agendamento.html`, foram seguidos os padrões visuais e estruturais presentes em `dashboard.html`, garantindo:
- **Tipografia:** Uso consistente da família Roboto Condensed em todos os títulos, subtítulos, labels e corpo de texto.
- **Cards:** Estrutura visual de cards com bordas arredondadas, sombras suaves, animações de entrada e feedback visual ao hover/focus.
- **Botões:** Botões estilizados com cores, bordas e fontes idênticas aos utilizados no dashboard, incluindo feedback visual ao interagir.
- **Tabelas:** Tabelas responsivas, com cabeçalhos destacados, badges de status coloridos e alinhamento visual com o restante do sistema.
- **Cores e Espaçamento:** Paleta de cores institucional (azul ICL, branco, cinza claro), espaçamento generoso e layout centralizado.
- **Responsividade:** Layout adaptável para diferentes tamanhos de tela, mantendo legibilidade e usabilidade.

## 3. Diretrizes para Futuras Páginas do Sistema

### Tipografia
- Utilizar **robotobold_condensed** para títulos e headlines.
- Utilizar **robotocondensed** para corpo de texto, labels, descrições e tabelas.
- Garantir que as fontes estejam auto-hospedadas e referenciadas corretamente em todos os arquivos HTML/CSS.

### Cards
- Cards devem ter bordas arredondadas (mínimo 16px), sombra suave, animação de entrada (fadeInUp) e feedback visual ao hover/focus.
- O conteúdo dos cards deve ser centralizado verticalmente, com ícones e títulos destacados.

### Botões
- Botões institucionais devem usar a cor primária (#00B5D3) com texto branco.
- Devem possuir bordas arredondadas, padding suficiente para toque confortável, e animação de hover.
- Botões secundários podem usar tons de cinza ou branco com borda azul.

### Tabelas
- Cabeçalhos com fundo azul claro e texto azul institucional.
- Linhas alternadas com fundo branco e cinza claro.
- Badges de status coloridos e arredondados, seguindo o padrão visual do dashboard.
- Tabelas devem ser responsivas, com scroll horizontal em telas pequenas.

### Hierarquia Visual
- Títulos grandes e destacados no topo da página.
- Subtítulos com menor peso e cor secundária.
- Espaçamento generoso entre seções, cards e tabelas.

### Responsividade
- Layouts devem se adaptar para 1 coluna em telas menores (mobile), mantendo legibilidade e acessibilidade.
- Elementos interativos devem ser facilmente acessíveis em dispositivos móveis.

### Consistência
- Todos os componentes visuais devem seguir o design system documentado, garantindo identidade visual e experiência de usuário consistente.

## 4. Referências
- [ICL Group - bra.icl-group.com](https://bra.icl-group.com/)
- Arquivos de protótipo: `dashboard.html`, `solicitacao-agendamento.html`

---

**Esta documentação deve ser atualizada a cada nova migração ou criação de página, garantindo que o padrão visual e de usabilidade do ICL Group seja mantido em toda a plataforma.**