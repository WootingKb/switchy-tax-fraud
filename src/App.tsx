import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <div className="app-container">
      <main style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <h1>My epic Analog game</h1>
          <p>Some description</p>
        </div>
        <Game />
      </main>
    </div>
  );
}

export default App;
