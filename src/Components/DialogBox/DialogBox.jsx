import { motion } from "framer-motion";
import { AutoAwesomeMosaicRounded, Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Button from "../Custom/Button/Button";
import Select from "../Custom/Select/Select";
import { DFS } from "../Algorithms/Algorithms";
import "./Styles.css";

export default function DialogBox({ props }) {
  const {
    scene,
    isSelectingSource,
    setIsSelectingSource,
    isSelectingTarget,
    setIsSelectingTarget,
    source,
  } = props;

  const [grid, setGrid] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const pressEscape = (e) => {
      const isSelect = [
        ...document.querySelectorAll(".custom-selectWrapper"),
      ].includes(document.activeElement);

      if (e.key === "Escape" && isSelect) {
        document.activeElement.blur();
      }
    };

    window.addEventListener("keydown", pressEscape);
    return () => {
      window.removeEventListener("keydown", pressEscape);
    };
  }, []);

  const variants = {
    initial: {
      y: "50%",
      x: "-100vw",
    },
    open: {
      x: "50%",
    },
    closed: {
      x: "-100vw",
    },
  };

  return (
    <>
      <div
        className="open-container"
        onClick={() => {
          setIsOpen(() => true);
        }}
      >
        {!isOpen && (
          <AutoAwesomeMosaicRounded
            sx={{ color: "steelblue" }}
            fontSize="large"
          />
        )}
      </div>

      <motion.div
        className="dialog-box"
        variants={variants}
        initial="initial"
        animate={isOpen ? "open" : "closed"}
        transition={{ type: "tween", duration: 0.1 }}
      >
        <div className="close-container" onClick={() => setIsOpen(() => false)}>
          <Close />
        </div>

        <div className="dialog-actions">
          <div
            onClick={() => {
              if (isSelectingTarget) setIsSelectingTarget(() => false);
              setIsSelectingSource(() => true);
              setIsOpen(() => false);
            }}
          >
            <Button
              props={{ title: "pick up source node", bgcolor: "crimson" }}
            />
          </div>

          <div
            onClick={() => {
              if (isSelectingSource) setIsSelectingSource(() => false);
              setIsSelectingTarget(() => true);
              setIsOpen(() => false);
            }}
          >
            <Button
              props={{ title: "pick up target node", bgcolor: "#17A589" }}
            />
          </div>

          <Select
            props={{
              Label: "algorithms",
              queryName: "algorithms",
              Options: [
                "depth-first-search",
                "breadth-first-search",
                "dijkstra's algorithm",
              ],
            }}
          />
          <Select
            props={{
              Label: "Grid Dimensions",
              queryName: "gridDimensions",
              Options: ["20X20", "30X30", "50X50"],
            }}
          />
          <div
            onClick={() => {
              DFS(scene, source);
              setIsOpen(() => false);
            }}
          >
            <Button props={{ title: "visualize!", bgcolor: "steelblue" }} />
          </div>
        </div>
      </motion.div>
    </>
  );
}

// const handleClick = () => {
//   const meshes = scene.children[3].children;
//   const temp_grid = Array(20)
//     .fill()
//     .map(() => Array(20).fill(null));

//   meshes.forEach((item) => {
//     if (item.name !== "tile") return;

//     const {
//       index,
//       isObstruction,
//       customPosition,
//       isTarget,
//       isStart,
//       setTileColor,
//     } = item;
//     temp_grid[index.row][index.column] = {
//       isObstruction,
//       customPosition,
//       isTarget,
//       isStart,
//       setTileColor,
//     };
//   });

//   setGrid(temp_grid);
// };
