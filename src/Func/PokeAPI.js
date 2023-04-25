export const initialPokemon = {
  img: "",
  name: "",
  id: "",
  height: "",
  weight: "",
  abilities: [],
};

const loadPokemon = {
  img: "Carregando...",
  name: "Carregando...",
  id: "Carregando...",
  height: "Carregando...",
  weight: "Carregando...",
  abilities: [],
};

const errorPokemon = {
  img: "NA",
  name: "NA",
  id: "NA",
  height: "NA",
  weight: "NA",
  abilities: [],
};

export const fetchPokemon = async (pokemon) => {
  const APIFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIFetch.status === 200) {
    const data = await APIFetch.json();
    return data;
  }
};

export const showPokemon = async (pokemon, setState) => {
  setState(loadPokemon);
  const data = await fetchPokemon(pokemon);
  console.log(data);
  if (data) {
    setState({
      img:
        data.sprites.versions["generation-ii"].crystal.front_transparent ||
        data.sprites.front_default,
      name: data.name,
      id: data.id,
      height: data.height / 10,
      weight: data.weight / 10,
      abilities: data.abilities,
    });
  } else setState(errorPokemon);
};
