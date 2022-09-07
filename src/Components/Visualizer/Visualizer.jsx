import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Grid from "./Grid";
import DialogBox from "../DialogBox/DialogBox";
import "./Styles.css";
import { useEffect } from "react";

export default function Visualizer({ props }) {
  const [isSelectingSource, setIsSelectingSource] = useState(false);
  const [isSelectingTarget, setIsSelectingTarget] = useState(false);
  const [currentAlgorithm, setCurrentAlgorithm] = useState("default");
  const [model, setModel] = useState("pillar");
  const [gridDimensions, setGridDimensions] = useState({
    rows: 20,
    columns: 20,
    dropdown: 0,
  });
  const [visualizingSpeed, setVisualizingSpeed] = useState(10);

  const [isMouseDown, setMouseDown] = useState(false);

  const { scene, setScene } = props;

  const generateGrid = () => {
    const { rows, columns } = gridDimensions;
    const virtualGrid = Array(rows)
      .fill()
      .map(() => Array(columns).fill(null));
    const color = "#1F618D";

    const extraRow = (rows / 10 - 2) / 2;
    const extraCol = (columns / 10 - 2) / 2;

    let x, y, z;
    x = rows + extraRow;
    y = 0;
    z = columns + extraCol;

    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= columns; j++) {
        virtualGrid[i - 1][j - 1] = {
          position: [x, y, z],
          color,
          index: { row: i - 1, column: j - 1 },
        };
        x -= 2.1;
      }
      x = rows + extraRow;
      z -= 2.1;
    }

    return virtualGrid;
  };

  // useEffect(() => {
  //   console.log(currentAlgorithm);
  // }, [currentAlgorithm]);

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
      <DialogBox
        props={{
          scene,
          isSelectingSource,
          isSelectingTarget,
          currentAlgorithm,
          model,
          gridDimensions,
          visualizingSpeed,
          setIsSelectingSource,
          setIsSelectingTarget,
          setCurrentAlgorithm,
          setModel,
          setGridDimensions,
          setVisualizingSpeed,
        }}
      />

      <Canvas camera={{ position: [10, 15, -22] }}>
        <OrbitControls enabled={!isMouseDown} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={2}
        />
        <ambientLight intensity={2} />
        <spotLight position={[10, 1, 5]} angle={0.5} castShadow />
        <Grid
          props={{
            isSelectingSource,
            isSelectingTarget,
            model,
            gridDimensions,
            generateGrid,
            isMouseDown,
            setIsSelectingSource,
            setIsSelectingTarget,
            setMouseDown,
            setScene,
          }}
        />
      </Canvas>
    </div>
  );
}
