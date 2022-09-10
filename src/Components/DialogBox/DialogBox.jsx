import { useEffect, useState } from "react";
import Button from "../Custom/Button/Button";
import {
  DFS,
  BFS,
  Dijkstra,
  ClearGrid,
  GenerateMaze,
  GenerateVirtualGrid,
} from "../Algorithms/Algorithms";
import Toasts from "../Custom/Toasts/Toasts";
import { Home, Info } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
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
    if (scene && scene.children.length > 0)
      GenerateVirtualGrid(scene, gridDimensions);
  }, [scene, gridDimensions]);

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
          <option value={20}>fast</option>
          <option value={60}>medium</option>
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
              default:
                break;
            }
          }}
        >
          <option value="default">choose maze pattern</option>
          <option value="randomMaze">random maze</option>
          <option value="" disabled>
            More Patterns coming soon
          </option>
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

        <div className="bttn-container">
          <Link
            style={{
              height: "fit-content",
              lineHeight: "100%",
            }}
            data-content="Return home"
            className="tooltip"
            to="/"
          >
            <Home />
          </Link>

          <HashLink
            scroll={(el) => {
              el.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              height: "fit-content",
              lineHeight: "100%",
            }}
            data-content="Click here to read the guide."
            className="tooltip"
            to="/#guide"
          >
            <Info />
          </HashLink>
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
