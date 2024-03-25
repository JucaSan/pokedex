const pokedex = document.querySelector(".pokedex-content");
const pokemon_cuenta = 151;

const color = {
  fire: "#E6B0AA",
  grass: "#A9DFBF",
  electric: "#FFDF5E",
  water: "#D4E6F1",
  ground: "#F4E7DA",
  rock: "#D5D5D4",
  fairy: "#FCEAFF",
  poison: "#D2B4DE",
  bug: "#f8d5a3",
  dragon: "#97B3E6",
  psychic: "#EAEDA1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
  ice: "#EBF5FB",
  steel : '#BDC3C7'
};

async function buscarPokemon() {
  for (let i = 1; i <= pokemon_cuenta; i++) {
    conseguirPokemon(i);
  }
}

async function conseguirPokemon(id) {
  const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(URL);
  const data = await response.json();

  crearTarjeta(data);
}

function crearTarjeta(pokemon) {
  const card = document.createElement("div");
  card.classList = "card shadow";
  let id = pokemon.id.toString();

  if (id.length === 1) {
    id = "00" + id;
  } else if (id.length === 2) {
    id = "0" + id;
  }

  const nombre_pokemon = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  let tipos = pokemon.types.map((type) => type.type.name);

  card.style.backgroundColor = color[tipos[0]];

  if (tipos[0] === "normal") {
    card.classList.add("normal");
  }

  let tiposSection = pokemon.types.map((type) => `<p class="type">${type.type.name}</p>`);
  tiposSection = tiposSection.join("");

  card.innerHTML = `
    <div class="card__img">
        <h2 class="id__pokemon">#${id}</h2>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png" alt="Imagen de Pokemon">
    </div> <!--.card__img-->

    <div class="card__info">

        <div class="header-card">
            <p class="header-card__id">#${id}</p>
            <h2 class="header-card__name">${nombre_pokemon}</h2>
        </div> <!--.header__card-->
                
        <div class="types">
            <h3 class="types__title">Type</h3>
            <div class="types__section">
                
                ${tiposSection}
            </div>
        </div> <!--.types-->

        <div class="extra">
            <p class="heigth">${pokemon.height}ft</p>
            <p class="weight">${pokemon.weight}kg</p>
        </div> <!--.extra-->

    </div><!--.card__info-->
    `;

  const tipoElementos = card.querySelectorAll(".type");
  tipoElementos.forEach((elemento, idx) => {
    elemento.style.backgroundColor = color[tipos[idx]];
  });
  pokedex.appendChild(card);
}

buscarPokemon();
