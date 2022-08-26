import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Grid from "./Grid";
import "./visualizer.css";

export default function Visualizer() {
  const [gridDimensions, setGridDimensions] = useState({
    rows: 20,
    columns: 20,
  });

  const [isMouseDown, setMouseDown] = useState(false);

  return (
    <div
      className="visualizer"
      onMouseLeave={() => {
        setMouseDown(false);
      }}
      onMouseUp={() => {
        setMouseDown(false);
      }}
    >
      <Canvas camera={{ position: [10, 15, -22] }}>
        <OrbitControls enabled={!isMouseDown} />
        <Stars />
        <Grid props={{ gridDimensions, isMouseDown, setMouseDown }} />
      </Canvas>
    </div>
  );
}
