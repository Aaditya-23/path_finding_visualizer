import { useThree } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { DoubleSide } from "three";
import { motion } from "framer-motion-3d";
import Model from "./Model";

function Tiles({ props }) {
  const { isMouseDown, position, color, index } = props;

  const [tileColor, setTileColor] = useState(color);
  const [isHovered, setIsHovered] = useState(false);
  const [isObstruction, setIsObstruction] = useState(false);
  const [isTarget, setIsTarget] = useState(false);
  const [isSource, setIsSource] = useState(false);
  const [isExplored, setIsExplored] = useState(false);
  const [isInPath, setIsInPath] = useState(false);

  const variants = {
    initial: {
      color: tileColor,
    },
    animate: {
      color: isSource
        ? "#dc143c"
        : isTarget
        ? "#17a589"
        : isHovered
        ? "#6699CC"
        : tileColor,
    },
  };

  const pathMesh = {
    initial: {
      scale: 0,
    },
    hidden: {
      scale: 0,
    },
    active: {
      scale: [0.4, 0.75, 1],
    },
  };

  const pathMeshMaterial = {
    hidden: {
      color: "#E91E63",
    },
    active: {
      color: ["#E91E63", "#9C27B0", "#7E57C2"],
    },
    inPath: {
      color: "#FF7043",
    },
  };

  return (
    <>
      <mesh position={position}>
        <Suspense fallback={null}>{isObstruction && <Model />}</Suspense>
      </mesh>

      {!isSource && (
        <motion.mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[position[0], 0.01, position[2]]}
          variants={pathMesh}
          initial="initial"
          animate={isExplored ? "active" : "hidden"}
        >
          <planeGeometry args={[2, 2]} />
          <motion.meshBasicMaterial
            variants={pathMeshMaterial}
            animate={isInPath ? "inPath" : isExplored ? "active" : "hidden"}
            side={DoubleSide}
          />
        </motion.mesh>
      )}

      <mesh
        scale={isExplored ? 0.9 : 1}
        customProps={{
          isObstruction,
          index,
          isSource,
          isTarget,
          setTileColor,
          setIsObstruction,
          setIsTarget,
          setIsSource,
          setIsExplored,
          setIsInPath,
        }}
        name="tile"
        rotation={[-Math.PI / 2, 0, 0]}
        position={position}
        onPointerEnter={(e) => {
          if (isMouseDown) {
            setIsObstruction((prevState) => !prevState);
          } else {
            setIsHovered(true);
          }
        }}
        onPointerLeave={(e) => {
          setIsHovered(false);
        }}
      >
        <planeGeometry args={[2, 2]} />
        <motion.meshBasicMaterial
          variants={variants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.2 }}
          side={DoubleSide}
        />
      </mesh>
    </>
  );
}

export default function Grid({ props }) {
  const {
    gridDimensions: { rows, columns },
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
  } = props;

  const { scene } = useThree();
  useEffect(() => {
    setScene(() => scene);
  }, [scene, setScene]);

  const [prevSource, setPrevSource] = useState(() => {
    const dummy = () => {};
    return dummy;
  });

  const [prevTarget, setPrevTarget] = useState(() => {
    const dummy = () => {};
    return dummy;
  });

  return (
    <group
      name="grid"
      onPointerDown={(e) => {
        // e.stopPropagation();
        setMouseDown(true);

        const { object } = e;
        if (object.name === "tile") {
          const {
            customProps: {
              index,
              isObstruction,
              setIsObstruction,
              isSource,
              setIsSource,
              isTarget,
              setIsTarget,
            },
          } = object;

          if (!isObstruction) {
            if (isSelectingSource && !isTarget) {
              setSource(() => {
                return { row: index.row, column: index.column };
              });

              prevSource(() => false);
              setPrevSource(() => setIsSource);
              setIsSource(() => true);
              setIsSelectingSource(() => false);
              return;
            } else if (isSelectingTarget && !isSource) {
              setTarget(() => {
                return { row: index.row, column: index.column };
              });

              prevTarget(() => false);
              setPrevTarget(() => setIsTarget);
              setIsTarget(() => true);
              setIsSelectingTarget(() => false);
              return;
            }
          }

          setIsObstruction((prevState) => !prevState);
        }
      }}
    >
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} name="base">
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
