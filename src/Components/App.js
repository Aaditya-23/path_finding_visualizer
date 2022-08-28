import { Routes, Route } from "react-router-dom";
import "../Assets/CSS/app.css";
import Visualizer from "./Visualizer/Visualizer";
import Home from "./Home/Home";

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visualizer" element={<Visualizer />} />
      </Routes>
    </div>
  );
}

export default App;
