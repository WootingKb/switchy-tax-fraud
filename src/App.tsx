import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <div className="app-container">
      <main style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Game />
      </main>
    </div>
  );
}

export default App;
