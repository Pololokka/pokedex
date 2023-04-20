import "./App.css";

function App() {
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
          <input type="text" name="pkm-search" className="text pkm__search" />
          <div className="pkm__show">
            <div className="pkm__itens">
              <img
                src="src/assets/test-img.png"
                alt="Imagem do Pokemon"
                className="pkm-image"
              />
              <div className="pkm__stats">
                <p className="text text-hover">Nome: Rhidon</p>
                <p className="text text-hover">Altura: 1,90m</p>
                <p className="text text-hover">Peso: 120kg</p>
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
