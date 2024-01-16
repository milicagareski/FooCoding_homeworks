/* eslint-disable */

/* 
  Call this function to get a JSON string of the data
  (simulates calling a server to retrieve data)
*/
function fetchPokemonData() {
  return '{"abilities":[{"ability":{"name":"rain-dish","url":"https://pokeapi.co/api/v2/ability/44/"},"is_hidden":true,"slot":3},{"ability":{"name":"torrent","url":"https://pokeapi.co/api/v2/ability/67/"},"is_hidden":false,"slot":1}],"base_experience":63,"forms":[{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon-form/7/"}],"height":5,"held_items":[],"id":7,"is_default":true,"location_area_encounters":"https://pokeapi.co/api/v2/pokemon/7/encounters","name":"squirtle","order":10,"species":{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon-species/7/"},"sprites":{"back_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/7.png","back_female":null,"back_shiny":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/7.png","back_shiny_female":null,"front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png","front_female":null,"front_shiny":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/7.png","front_shiny_female":null},"stats":[{"base_stat":43,"effort":0,"stat":{"name":"speed","url":"https://pokeapi.co/api/v2/stat/6/"}},{"base_stat":64,"effort":0,"stat":{"name":"special-defense","url":"https://pokeapi.co/api/v2/stat/5/"}},{"base_stat":50,"effort":0,"stat":{"name":"special-attack","url":"https://pokeapi.co/api/v2/stat/4/"}},{"base_stat":65,"effort":1,"stat":{"name":"defense","url":"https://pokeapi.co/api/v2/stat/3/"}},{"base_stat":48,"effort":0,"stat":{"name":"attack","url":"https://pokeapi.co/api/v2/stat/2/"}},{"base_stat":44,"effort":0,"stat":{"name":"hp","url":"https://pokeapi.co/api/v2/stat/1/"}}],"types":[{"slot":1,"type":{"name":"water","url":"https://pokeapi.co/api/v2/type/11/"}}],"weight":90}';
}

/* Code goes below */

function displayPokemons(obj) {
  let pokemonData = JSON.parse(obj);

  const container = document.createElement('div');
  container.setAttribute('id', 'container');
  container.style.minHeight = '100vh';
  container.style.backgroundColor = ' #e0ffcd';
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  document.body.appendChild(container);
  const list = document.createElement('ul');
  list.setAttribute('id', 'list');
  list.style.display = 'flex';
  container.appendChild(list);

  const images = Object.values(pokemonData.sprites);

  const displayImages = images
    .filter(img => {
      return img !== null;
    })
    .map((img, index) => {
      const item = document.createElement('li');
      item.setAttribute('class', 'img-container');
      item.style.listStyleType = 'none';
      item.style.margin = '0 50px';
      item.style.backgroundColor = 'lightGrey';
      item.style.borderRadius = '50%';
      const image = document.createElement('img');
      image.src = img;
      img.alt = index;
      image.style.width = '200px';
      item.appendChild(image);
      list.appendChild(item);
    });
}

displayPokemons(fetchPokemonData());
