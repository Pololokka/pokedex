import { useState, useEffect } from "react";
import "./App.css";

const initialPokemon = {
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

function App() {
  const [shownPokemon, setShownPokemon] = useState(initialPokemon);
  const [input, setInput] = useState("arcanine");

  const fetchPokemon = async (pokemon) => {
    const APIFetch = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    if (APIFetch.status === 200) {
      const data = await APIFetch.json();
      return data;
    }
  };

  const showPokemon = async (pokemon) => {
    setShownPokemon(loadPokemon);
    const data = await fetchPokemon(pokemon);
    console.log(data);
    if (data) {
      setShownPokemon({
        img:
          data.sprites.versions["generation-v"]["black-white"].animated
            .front_default || data.sprites.front_default,
        name: data.name,
        id: data.id,
        height: data.height / 10,
        weight: data.weight / 10,
        abilities: data.abilities,
      });
    } else setShownPokemon(errorPokemon);
  };

  return (
    <>
      <header className="header">
        <h1 className="title font-hover">Encontre o seu Pokémon!</h1>
      </header>
      <main className="App">
        <section className="pkm__container">
          <label htmlFor="pkm-search" className="subtitle font-hover">
            Digite o nome do Pokémon
          </label>
          <input
            type="text"
            name="pkm-search"
            className="text pkm__search"
            value={input || ""}
            onChange={(event) =>
              setInput(event.target.value.toLocaleLowerCase())
            }
            placeholder="nome ou número"
          />
          <input
            type="button"
            value="Pesquisar!"
            className="text text-hover btn-stan"
            onClick={() => showPokemon(input)}
          />
          <div className="pkm__show">
            {shownPokemon.name == "NA" && (
              <p className="text text-hover">Pokémon não encontrado!</p>
            )}
            <div className="pkm__itens">
              <img
                src={shownPokemon.img}
                alt="Imagem do Pokemon"
                className="pkm-image"
              />
              <div className="pkm__stats">
                <p className="text text-hover pkm-capitalize">
                  Nome: {shownPokemon.name}
                </p>
                <p className="text text-hover">Número: {shownPokemon.id}</p>
                <p className="text text-hover">
                  Altura: {shownPokemon.height} m
                </p>
                <p className="text text-hover">
                  Peso: {shownPokemon.weight} kg
                </p>
              </div>
            </div>
            <hr className="line"></hr>
            <div className="pkm__abi">
              <h3 className="text text-hover">Habilidades: </h3>
              <div className="pkm__stats">
                {shownPokemon.abilities?.map((element) => {
                  return (
                    <p
                      key={element.slot}
                      className="text text-hover pkm-capitalize"
                    >
                      {element.ability.name}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
