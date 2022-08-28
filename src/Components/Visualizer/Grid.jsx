import { useThree } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { DoubleSide } from "three";
import Model from "./Model";

function Tiles({ props }) {
  const { isMouseDown, position, color, index } = props;

  const [tileColor, setColor] = useState(color);
  const [isObstruction, setIsObstruction] = useState(false);

  return (
    <group position={position}>
      <Suspense fallback={null}>{isObstruction && <Model />}</Suspense>
      <mesh
        isObstruction={isObstruction}
        index={index}
        customPosition={position}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerEnter={(e) => {
          if (isMouseDown) {
            setIsObstruction(!isObstruction);
          } else {
            setColor("#6699CC");
          }
        }}
        onPointerLeave={(e) => {
          setColor(color);
        }}
      >
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial color={tileColor} side={DoubleSide} />
      </mesh>
    </group>
  );
}

export default function Grid({ props }) {
  const {
    gridDimensions: { rows, columns },
    generateGrid,
    isMouseDown,
    setMouseDown,
  } = props;

  return (
    <group
      onPointerDown={(e) => {
        e.stopPropagation();
        setMouseDown(true);
      }}
    >
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <boxGeometry args={[rows * 2.1 + 1, columns * 2.1 + 1, 1.5]} />
        <meshBasicMaterial color="#2E86C1" side={DoubleSide} />
      </mesh>

      {generateGrid().map((row) => {
        return row.map((tile, indx) => {
          const { position, color, index } = tile;

          return (
            <Tiles
              key={indx}
              props={{
                isMouseDown,
                position,
                color,
                index,
              }}
            />
          );
        });
      })}
    </group>
  );
}
