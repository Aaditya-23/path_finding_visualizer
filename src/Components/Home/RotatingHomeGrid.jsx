import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide } from "three";

const rows = 20;
const columns = 20;

function GenerateTiles() {
  const Tiles = [];
  let counter = 0;
  let x, y, z;
  x = rows;
  y = 0;
  z = columns;

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      Tiles.push(
        <mesh key={counter++} rotation-x={-Math.PI / 2} position={[x, y, z]}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial color={"#1F618D"} side={DoubleSide} />
        </mesh>
      );

      x -= 2.1;
    }

    x = rows;
    z -= 2.1;
  }
  return Tiles;
}

function Grid() {
  const scene = useRef();

  useFrame(() => {
    scene.current.rotation.y += 0.003;
  });

  return (
    <group ref={scene} position={[0, 15, -5]}>
      <mesh rotation-x={-Math.PI / 2} position={[0, -1, 0]}>
        <boxGeometry args={[rows * 2.1, columns * 2.1, 1.5]} />
        <meshBasicMaterial color={"#2E86C1"} />
      </mesh>
      <group>{GenerateTiles()}</group>
    </group>
  );
}

export default function RotatingHomeGrid() {
  return (
    <Canvas camera={{ position: [0, 30, -40] }}>
      <Grid />
    </Canvas>
  );
}
