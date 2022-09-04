import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Grid from "./Grid";
import DialogBox from "../DialogBox/DialogBox";
import "./Styles.css";

export default function Visualizer({ props }) {
  const [gridDimensions, setGridDimensions] = useState({
    rows: 20,
    columns: 20,
  });

  const [isMouseDown, setMouseDown] = useState(false);

  const [isSelectingSource, setIsSelectingSource] = useState(false);
  const [isSelectingTarget, setIsSelectingTarget] = useState(false);
  const [source, setSource] = useState(() => {
    return { row: null, column: null };
  });
  const [target, setTarget] = useState(() => {
    return { row: null, column: null };
  });

  const { scene, setScene } = props;

  const generateGrid = () => {
    const { rows, columns } = gridDimensions;
    const virtualGrid = Array(rows)
      .fill()
      .map(() => Array(columns).fill(null));
    const color = "#1F618D";

    let x, y, z;
    x = rows;
    y = 0;
    z = columns;

    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= columns; j++) {
        virtualGrid[i - 1][j - 1] = {
          position: [x, y, z],
          color,
          index: { row: i - 1, column: j - 1 },
        };
        x -= 2.1;
      }
      x = rows;
      z -= 2.1;
    }

    return virtualGrid;
  };

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
          setIsSelectingSource,
          isSelectingTarget,
          setIsSelectingTarget,
          source,
          target,
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
            gridDimensions,
            generateGrid,
            isMouseDown,
            setMouseDown,
            setScene,
            isSelectingSource,
            setIsSelectingSource,
            isSelectingTarget,
            setIsSelectingTarget,
            setSource,
            setTarget,
          }}
        />
      </Canvas>
    </div>
  );
}
