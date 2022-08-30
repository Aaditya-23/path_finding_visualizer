import { Routes, Route } from "react-router-dom";
import "../Assets/CSS/app.css";
import Visualizer from "./Visualizer/Visualizer";
import Home from "./Home/Home";
import Features from "./Home/Features";
import HowTo from "./Home/HowTo";
import Algorithms from "./Home/Algorithms";

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<Features />} />
          <Route path="howto" element={<HowTo />} />
          <Route path="algorithms" element={<Algorithms />} />
        </Route>
        <Route path="/visualizer" element={<Visualizer />} />
      </Routes>
    </div>
  );
}

export default App;
