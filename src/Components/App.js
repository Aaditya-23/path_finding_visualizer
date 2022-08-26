import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Sup from "./Sup";
import "../Assets/CSS/app.css";
import Visualizer from "./Visualizer/Visualizer";

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/sup" element={<Sup />} />
        <Route path="/visualizer" element={<Visualizer />} />
      </Routes>
    </div>
  );
}

export default App;
