import { useEffect, useState } from "react";
import Button from "../Custom/Button/Button";
import {
  DFS,
  BFS,
  generateVirtualGrid,
  clearGrid,
  dijkstra,
} from "../Algorithms/Algorithms";
import "./Styles.css";

export default function DialogBox({ props }) {
  const {
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
  } = props;

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

  useEffect(() => {
    if (scene) generateVirtualGrid(scene);
  }, [scene]);

  return (
    <div className="dialog-actions">
      <div
        onClick={() => {
          if (isSelectingTarget) setIsSelectingTarget(() => false);
          setIsSelectingSource(() => true);
        }}
      >
        <Button
          props={{
            title: "pick up source node",
            styles: { backgroundColor: "crimson" },
          }}
        />
      </div>

      <div
        onClick={() => {
          if (isSelectingSource) setIsSelectingSource(() => false);
          setIsSelectingTarget(() => true);
        }}
      >
        <Button
          props={{
            title: "pick up target node",
            styles: { backgroundColor: "#17A589" },
          }}
        />
      </div>

      <select
        defaultValue={currentAlgorithm}
        onChange={(e) => {
          setCurrentAlgorithm(() => e.target.value);
        }}
      >
        <option disabled value="default">
          select an algorithm
        </option>
        <option value="dfs">DFS</option>
        <option value="bfs">BFS</option>
        <option value="dijkstra">Dijkstra's Algorithm</option>
      </select>

      <select
        defaultValue={model}
        onChange={(e) => {
          setModel(() => e.target.value);
        }}
      >
        <option value="pillar">Pillar</option>
        <option value="bomb">Bomb</option>
      </select>

      <div
        onClick={() => {
          switch (currentAlgorithm) {
            case "dfs":
              DFS(scene);
              break;
            case "bfs":
              BFS(scene);
              break;
            case "dijkstra":
              dijkstra(scene);
              break;
            default:
              console.log("select an algorithm");
          }
        }}
      >
        <Button
          props={{
            title: "visualize !",
            styles: {
              color: "black",
              fontWeight: 800,
              fontSize: "1rem",
              backgroundColor: "#ECF0F1",
            },
          }}
        />
      </div>

      <select
        disabled
        defaultValue={gridDimensions.dropdown}
        onChange={(e) => {
          let num = parseInt(e.target.value);
          setGridDimensions(() => {
            return { row: (2 + num) * 10, column: (2 + num) * 10 };
          });
        }}
      >
        <option disabled value="disabled">
          Choose Grid Dimensions
        </option>
        <option value="0">20X20</option>
        <option value="1">30X30</option>
        <option value="2">40X40</option>
      </select>

      <select defaultValue="fast">
        <option value="">fast</option>
        <option value="">medium</option>
        <option value="">slow</option>
      </select>

      <div
        onClick={() => {
          clearGrid(false);
        }}
      >
        <Button
          props={{
            title: "clear path",
            styles: { backgroundColor: "#C2185B" },
          }}
        />
      </div>

      <div
        onClick={() => {
          clearGrid(true);
        }}
      >
        <Button
          props={{
            title: "clear everything",
            styles: { backgroundColor: "#C2185B" },
          }}
        />
      </div>
    </div>
  );
}

// <div className="dialog-actions">
//       <div
//         onClick={() => {
//           if (isSelectingTarget) setIsSelectingTarget(() => false);
//           setIsSelectingSource(() => true);
//           setIsHidden(() => true);
//         }}
//       >
//         <Button props={{ title: "pick up source node", bgcolor: "crimson" }} />
//       </div>

//       <div
//         onClick={() => {
//           if (isSelectingSource) setIsSelectingSource(() => false);
//           setIsSelectingTarget(() => true);
//           setIsHidden(() => true);
//         }}
//       >
//         <Button props={{ title: "pick up target node", bgcolor: "#17A589" }} />
//       </div>

//       <Select
//         props={{
//           Label: "algorithms",
//           queryName: "algorithms",
//           Options: [
//             "depth-first-search",
//             "breadth-first-search",
//             "dijkstra's algorithm",
//           ],
//         }}
//       />

//       <Select
//         props={{
//           Label: "Grid Dimensions",
//           queryName: "gridDimensions",
//           Options: ["20X20", "30X30", "50X50"],
//         }}
//       />

//       <Select
//         props={{
//           Label: "Model",
//           queryName: "model",
//           Options: ["obstruction", "bomb"],
//         }}
//       />

//       <div
//         onClick={() => {
//           clearPath();
//           setIsHidden(() => true);
//         }}
//       >
//         <Button props={{ title: "clear path", bgcolor: "steelblue" }} />
//       </div>

//       <div
//         onClick={() => {
//           clearEverything();
//           setIsHidden(() => true);
//         }}
//       >
//         <Button props={{ title: "clear everything", bgcolor: "steelblue" }} />
//       </div>

//       <div
//         onClick={() => {
//           BFS(scene);
//           setIsHidden(() => true);
//         }}
//       >
//         <Button props={{ title: "visualize!", bgcolor: "steelblue" }} />
//       </div>
//       <div
//         className="expand-dialogContainer"
//         onClick={() => {
//           setIsHidden((prevState) => !prevState);
//           console.log("pussy");
//         }}
//       >
//         <ArrowBackIos fontSize="large" />
//       </div>
//     </div>
