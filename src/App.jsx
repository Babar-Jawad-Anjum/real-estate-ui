import Navbar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import "./scss/layout.scss";

function App() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <HomePage />
      </div>
    </div>
  );
}

export default App;
