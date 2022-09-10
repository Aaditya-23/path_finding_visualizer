import { useGLTF } from "@react-three/drei";

export function Pillar() {
  const { nodes, materials } = useGLTF("./Models_3d/Pillar/scene.gltf");

  return (
    <group
      position={[0.07, 0, -0.07]}
      rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
      scale={0.88}
      dispose={null}
    >
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials.lambert2SG}
      />
    </group>
  );
}

export function Bomb() {
  const { nodes, materials } = useGLTF("./Models_3d/Bomb/scene.gltf");
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} dispose={null} scale={0.007}>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials.material_0}
      />
    </group>
  );
}
