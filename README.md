Este projeto é uma aplicação web desenvolvida com React, que consome a API pública do Studio Ghibli para exibir filmes do estúdio de forma interativa e organizada. O objetivo é proporcionar ao usuário uma experiência rica de navegação, permitindo explorar os filmes com diversas funcionalidades úteis.

Funcionalidades implementadas:

O usuário pode pesquisar filmes pelo título.

Há uma opção para incluir ou não a sinopse na busca.

Cada filme apresenta informações detalhadas, como:

Título

Sinopse

Ano de lançamento

Duração

Diretor

Produtor

Nota de avaliação (pontuação da crítica)

É possível expandir a sinopse dos filmes longos com um botão de "Read More".

O usuário pode marcar um filme como "assistido" ou desmarcar.

Também pode adicionar ou remover um filme da lista de "favoritos".

Existe um sistema de anotações e avaliações:

Pode avaliar com estrelas (de 1 a 5).

O usuário pode escrever observações sobre o filme.

As anotações ficam visíveis no card do filme.

Tecnologias utilizadas no projeto:

React


Vite (como bundler)

Bootstrap (para estilização responsiva)

Styled Components (para componentes personalizados)

React-Bootstrap (para modais e alguns elementos visuais)

Como rodar o projeto localmente
git clone https://github.com/brenojbarbosa/ProjetoGhibli.git
cd ProjetoGhibli
npm install
npm run dev
