import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { DoubleSide } from "three";

function GenerateGrid({ props }) {
  const { isMouseDown, setMouseDown, position, color } = props;

  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerEnter={(e) => {
        if (isMouseDown) {
          console.log("oh my");
        }
      }}
    >
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial color={color ? color : "#1F618D"} side={DoubleSide} />
    </mesh>
  );
}

export default function Grid({ props }) {
  const {
    gridDimensions: { rows, columns },
    isMouseDown,
    setMouseDown,
  } = props;

  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const addTiles = (prevState) => {
      const newArray = [];

      let counter = 0;
      let x, y, z;
      x = rows;
      y = 0;
      z = rows;

      for (let i = rows; i > 0; i--) {
        for (let j = columns; j > 0; j--) {
          newArray.push(
            <GenerateGrid
              key={counter}
              props={{ isMouseDown, setMouseDown, position: [x, y, z] }}
            />
          );
          counter++;
          x -= 2.1;
        }
        x = rows;
        z -= 2.1;
      }

      return newArray;
    };
    setGrid(addTiles);
  }, [rows, columns]);

  return (
    <group
      onPointerDown={(e) => {
        e.stopPropagation();
        setMouseDown(true);
      }}
    >
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[rows * 2.1 + 2, columns * 2.1 + 2]} />
        <meshBasicMaterial color="#2E86C1" side={DoubleSide} />
      </mesh>

      {[...grid]}
    </group>
  );
}
