import { useState, useEffect } from "react";
import "./App.css";

const initialPokemon = {
  img: "",
  name: "",
  height: "",
  weight: "",
};

function App() {
  const [shownPokemon, setShownPokemon] = useState(initialPokemon);
  const [input, setInput] = useState("");

  useEffect(() => {
    showPokemon(input);
  }, [input]);

  const fetchPokemon = async (pokemon) => {
    const APIFetch = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    const data = await APIFetch.json();
    return data;
  };

  const showPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    console.log(data);
    setShownPokemon({
      img: data.sprites.front_default,
      name: data.name,
      height: data.height / 10,
      weight: data.weight / 10,
    });
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
          <div className="pkm__show">
            <div className="pkm__itens">
              <img
                src={shownPokemon.img}
                alt="Imagem do Pokemon"
                className="pkm-image"
              />
              <div className="pkm__stats">
                <p className="text text-hover pkm-name">
                  Nome: {shownPokemon.name}
                </p>
                <p className="text text-hover">
                  Altura: {shownPokemon.height} m
                </p>
                <p className="text text-hover">
                  Peso: {shownPokemon.weight} kg
                </p>
              </div>
            </div>
            <hr className="line"></hr>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
