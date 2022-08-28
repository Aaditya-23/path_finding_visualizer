import { useGLTF } from "@react-three/drei";

export default function Model() {
  const { nodes, materials } = useGLTF("./Models_3d/scene.gltf");
  return (
    <group
      position={[0.07, 0, -0.07]}
      rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
      scale={0.58}
      dispose={null}
    >
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials.lambert2SG}
      />
    </group>
  );
}
