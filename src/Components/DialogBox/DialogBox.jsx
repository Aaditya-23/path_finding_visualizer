import { useEffect, useState } from "react";
import Button from "../Custom/Button/Button";
import {
  DFS,
  BFS,
  Dijkstra,
  ClearGrid,
  GenerateMaze,
} from "../Algorithms/Algorithms";
import "./Styles.css";
import Toasts from "../Custom/Toasts/Toasts";

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

  const [toastInfo, setToastInfo] = useState({
    isOpen: false,
    type: null,
    message: null,
  });

  return (
    <>
      <div className="dialog-actions">
        <div
          onClick={() => {
            if (isSelectingTarget) setIsSelectingTarget(() => false);
            setIsSelectingSource(() => true);

            setToastInfo(() => {
              return {
                isOpen: true,
                type: "info",
                message: "click on the grid to select the source node.",
              };
            });
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

            setToastInfo(() => {
              return {
                isOpen: true,
                type: "info",
                message: "click on the grid to select the target node",
              };
            });
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
          <option value="Dijkstra">Dijkstra's Algorithm</option>
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
                DFS(scene, gridDimensions, visualizingSpeed, setToastInfo);
                break;
              case "bfs":
                BFS(scene, gridDimensions, visualizingSpeed, setToastInfo);
                break;
              case "Dijkstra":
                Dijkstra(scene, gridDimensions, visualizingSpeed, setToastInfo);
                break;
              default:
                setToastInfo(() => {
                  return {
                    isOpen: true,
                    type: "error",
                    message: "select an algorithm to visualize",
                  };
                });
            }
          }}
        >
          <Button
            props={{
              title: "visualize !",
              styles: {
                fontSize: "1rem",
                fontWeight: 800,
                color: "black",
                backgroundColor: "#ECF0F1",
              },
            }}
          />
        </div>

        <select
          defaultValue={gridDimensions.dropdown}
          onChange={(e) => {
            let num = parseInt(e.target.value);
            setGridDimensions(() => {
              return {
                rows: (2 + num) * 10,
                columns: (2 + num) * 10,
                dropdown: e.target.value,
              };
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

        <select
          defaultValue={visualizingSpeed}
          onChange={(e) => {
            setVisualizingSpeed(() => e.target.value);
          }}
        >
          <option value={10}>fast</option>
          <option value={50}>medium</option>
          <option value={90}>slow</option>
        </select>

        <select
          defaultValue={"default"}
          onChange={(e) => {
            switch (e.target.value) {
              case "randomMaze":
                GenerateMaze.randomMaze(
                  scene,
                  gridDimensions,
                  visualizingSpeed,
                  setToastInfo
                );
                break;
            }
          }}
        >
          <option disabled value="default">
            choose maze pattern
          </option>
          <option value="randomMaze">random maze</option>
        </select>

        <div
          onClick={() => {
            ClearGrid(false);
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
            ClearGrid(true);
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

      <Toasts
        props={{
          toastInfo,
          setToastInfo,
        }}
      />
    </>
  );
}
