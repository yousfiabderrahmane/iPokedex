const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");
const form = document.querySelector("form");
const input = document.querySelector(".input_search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading ...";

  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data.id <= 649
        ? data["sprites"]["versions"]["generation-v"]["black-white"][
            "animated"
          ]["front_default"]
        : data.id <= 898
        ? data["sprites"]["versions"]["generation-v"]["black-white"][
            "front_default"
          ]
        : data["sprites"]["other"]["official-artwork"]["front_default"];

    searchPokemon = data.id;
    if (data.id > 1) {
      buttonPrev.classList.remove("disabled");
    } else {
      buttonPrev.classList.add("disabled");
    }

    if (data.id >= 649) {
      pokemonImage.classList.add("grow");
    }
    input.value = "";
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not found :c";
    pokemonNumber.innerHTML = "";

    input.value = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
