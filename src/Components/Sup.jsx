import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Vector3,
} from "three";

function HighLightMesh({ props }) {
  const { customPos } = props;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={customPos}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="hotpink" side={DoubleSide} />
    </mesh>
  );
}

export default function Sup() {
  const [isMouseDown, setMouseDown] = useState(false);
  const [isInPlane, setInPlane] = useState(false);
  const [customPos, setCustomPos] = useState([0.5, 0, 0.5]);
  const [towers, setTowers] = useState(null);

  return (
    <div
      className="referral"
      style={{ backgroundColor: "black", height: "100vh" }}
    >
      <Canvas
        camera={{ position: [10, 15, -22] }}
        onPointerUp={() => {
          setMouseDown(false);
        }}
        onLoad={() => {}}
      >
        <OrbitControls enabled={!isMouseDown} />
        <Stars />

        <gridHelper
          onPointerEnter={(e) => {
            if (isMouseDown && isInPlane) {
              const { intersections } = e;
              intersections.forEach(function (intersect) {
                if (intersect.object.name === "ground") {
                  const position = new Vector3()
                    .copy(intersect.point)
                    .floor()
                    .addScalar(0.5);
                  setCustomPos([position.x, 0, position.z]);
                }
              });
            }
          }}
          onPointerDown={() => {
            setMouseDown(true);
          }}
          args={[30, 30, "#76D7C4", "#76D7C4"]}
        />

        <mesh
          name="ground"
          position={[0, -0.01, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          onPointerEnter={(e) => {
            setInPlane(true);
          }}
          onPointerLeave={() => {
            setInPlane(false);
          }}
        >
          <planeGeometry args={[30, 30]} />
          <meshBasicMaterial color="#3498DB" side={DoubleSide} />
        </mesh>

        <HighLightMesh props={{ customPos }} />
      </Canvas>
    </div>
  );
}
