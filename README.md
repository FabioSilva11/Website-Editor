# Editor de Sites

## Sobre o Projeto
O Editor de Sites é uma ferramenta poderosa para quem deseja personalizar e editar sites de maneira intuitiva. Este projeto visa simplificar o processo de edição de conteúdo online, tornando acessível a qualquer usuário a capacidade de modificar textos e elementos visuais diretamente do navegador.

## Funcionalidades Principais

1. **Busca de Sites**
   - Insira a URL de um site e obtenha seu conteúdo para edição.
   - Detalhes sobre a rota:
     - Rota: `POST /api.php`
     - Ação: `fetch`
     - Parâmetro: `url` (URL do site a ser buscado)
   - Resposta:
     - HTML do site marcado para edição.

2. **Edição de Conteúdo**
   - Elementos editáveis são destacados com bordas verdes.
   - Edite textos diretamente no navegador sem complexidade.

3. **Salvamento de Alterações**
   - Ao finalizar as modificações, salve o conteúdo em um arquivo HTML.
   - Detalhes sobre a rota:
     - Rota: `POST /api.php`
     - Ação: `save`
     - Parâmetros:
       - `edits` (modificações feitas no conteúdo)
       - `htmlContent` (HTML completo após edição)
     - Resposta:
       - Caminho do arquivo salvo.

4. **Visualização da Página Salva**
   - Após salvar, você será redirecionado para a página editada.

## Como Funciona o Site

1. **Interface Intuitiva**
   - Um campo de URL para buscar o site desejado.
   - Botões bem definidos para buscar e salvar alterações.
   - Elementos editáveis destacados para facilitar a interação.

2. **Personalização em Tempo Real**
   - O conteúdo é carregado dinâmicamente.
   - Altere textos e estilos diretamente no navegador.

3. **Armazenamento Seguro**
   - As páginas editadas são salvas localmente em um diretório específico.

## Estrutura do Projeto

- **Frontend**:
  - HTML e TailwindCSS para uma interface responsiva e moderna.
  - JavaScript para manipulação de eventos e integração com a API.

- **Backend**:
  - PHP para processamento de requisições e edições do conteúdo HTML.
  - Funções principais:
    - `fetchWebsite`: Busca o conteúdo do site e o prepara para edição.
    - `applyEdits`: Aplica as modificações feitas pelo usuário.
    - `revertEditingMarkers`: Remove os atributos de edição antes de salvar.

## Como Contribuir
Este é um projeto colaborativo e está aberto a melhorias. Você pode contribuir das seguintes formas:

1. **Sugestões**
   - Proponha novas funcionalidades ou melhorias na interface.

2. **Correções de Bugs**
   - Ajude a identificar e corrigir erros.

3. **Novas Funcionalidades**
   - Implemente funcionalidades adicionais, como suporte a múltiplos idiomas ou edição de estilos CSS.

## Como Começar

1. Faça o clone do repositório:
   ```bash
   git clone https://github.com/FabioSilva11/Website-Editor.git
   ```
2. Configure um servidor local para rodar o projeto (ex.: XAMPP ou WAMP).
3. Certifique-se de que o diretório `saved_pages` tenha permissão de escrita.
4. Abra o arquivo `index.html` em um navegador compatível.

## Licença
Este projeto está sob licença [MIT](LICENSE). Sinta-se livre para usá-lo e modificá-lo, mas não se esqueça de dar os créditos aos colaboradores.

---

Seja parte dessa comunidade! Envie suas contribuições e ajude-nos a transformar este projeto em uma ferramenta ainda mais poderosa. Juntos, podemos criar soluções que impactam o mundo digital.

