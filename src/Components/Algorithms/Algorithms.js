import { Queue } from "./DataStructures";

let grid = null;

let isVisited = null;

let source = { row: null, column: null };

const ResetIsVisited = (gridDimensions) => {
  isVisited = Array(gridDimensions.rows)
    .fill()
    .map(() => Array(gridDimensions.columns).fill(false));
};

const StartNodeNotFound = (setToastInfo) => {
  setToastInfo(() => {
    return { isOpen: true, type: "error", message: "no starting node found" };
  });
};

const PathFound = (setToastInfo) => {
  setToastInfo(() => {
    return {
      isOpen: true,
      type: "success",
      message: "path founded successfully",
    };
  });
};

const PathNotFound = (setToastInfo) => {
  setToastInfo(() => {
    return { isOpen: true, type: "error", message: "unable to find the path" };
  });
};

const IsValidMove = (newX, newY) => {
  return newX > -1 && newX < grid.length && newY > -1 && newY < grid[0].length;
};

export const GenerateVirtualGrid = (scene, gridDimensions) => {
  grid = Array(gridDimensions.rows)
    .fill()
    .map(() => Array(gridDimensions.columns).fill(null));

  const { children } = scene.children.filter(
    (child) => child.name === "grid"
  )[0];

  children.forEach((mesh) => {
    const { name } = mesh;

    if (name === "tile") {
      const {
        customProps: {
          isObstruction,
          isBomb,
          isSource,
          isTarget,
          isExplored,
          isInPath,
          index: { row, column },
          setIsObstruction,
          setIsBomb,
          setTileColor,
          setIsExplored,
          setIsInPath,
          setIsTarget,
          setIsSource,
        },
      } = mesh;

      grid[row][column] = {
        isObstruction,
        isBomb,
        isSource,
        isTarget,
        isExplored,
        isInPath,
        setIsObstruction,
        setIsBomb,
        setTileColor,
        setIsExplored,
        setIsInPath,
        setIsTarget,
        setIsSource,
      };

      if (isSource) {
        source = { row, column };
      }
    }
  });
};

export const ClearGrid = (parameter) => {
  if (!grid) return;

  const row = grid.length;
  const column = grid[0].length;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      const {
        setIsObstruction,
        setIsBomb,
        setIsExplored,
        setIsInPath,
        setIsSource,
        setIsTarget,
      } = grid[i][j];

      setIsExplored(() => false);
      setIsInPath(() => false);

      if (parameter) {
        setIsObstruction(() => false);
        setIsBomb(() => false);
        setIsSource(() => false);
        setIsTarget(() => false);
      }
    }
  }
};

export const GenerateMaze = {
  randomMaze: (scene, gridDimensions, speed, setToastInfo) => {
    ClearGrid(true);
    ResetIsVisited(gridDimensions);
    GenerateVirtualGrid(scene, gridDimensions);

    const rows = grid.length;
    const columns = grid[0].length;
    let counter = 0;

    const add = (x, y) => {
      const temp = counter;
      setTimeout(() => {
        grid[x][y].setIsObstruction(() => true);
      }, temp * 100);
      counter++;
    };

    const topLeftBlock = () => {
      const n = (rows * 30) / 100;
      const m = (columns * 30) / 100;

      for (let i = 0; i < n; i++) add(0, i);
      for (let i = 1; i < m; i++) add(i, n - 1);
      for (let i = 0; i < n - 1; i++) add(n - 1, i);
    };

    const topLeftOutline = () => {
      
    }

    topLeftBlock();
    console.log("random maze");
  },
};

export const DFS = (scene, gridDimensions, speed, setToastInfo) => {
  ClearGrid(false);
  ResetIsVisited(gridDimensions);
  GenerateVirtualGrid(scene, gridDimensions);

  let path = [];
  let isFound = false;

  let counter = 0;
  const recurDFS = (currPath, x, y) => {
    if (grid[x][y].isTarget) {
      isFound = true;

      setTimeout(() => {
        grid[x][y].setIsExplored(() => true);
        path.push(grid[x][y]);

        path.map((tile, index) => {
          setTimeout(() => {
            tile.setIsInPath(() => true);
          }, index * 50);

          return null;
        });
      }, 500 + counter * speed);
      return true;
    }

    isVisited[x][y] = true;
    currPath.push(grid[x][y]);

    setTimeout(() => {
      grid[x][y].setIsExplored(() => true);
    }, 500 + counter * speed);

    const moves = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (let i = 0; i < 4; i++) {
      let newX = x + moves[i][0];
      let newY = y + moves[i][1];

      if (
        IsValidMove(newX, newY) &&
        !grid[newX][newY].isObstruction &&
        !isVisited[newX][newY]
      ) {
        counter++;
        if (recurDFS(currPath, newX, newY)) {
          path = [...currPath];
          return true;
        }
      }
    }

    currPath.pop();
    return false;
  };

  const currPath = [];
  let x = source.row;
  let y = source.column;

  if (x === null || y === null) {
    StartNodeNotFound(setToastInfo);
    return;
  }

  recurDFS(currPath, x, y);

  if (isFound)
    setTimeout(() => {
      PathFound(setToastInfo);
    }, 500 + counter * speed);
  else
    setTimeout(() => {
      PathNotFound(setToastInfo);
    }, 500 + counter * speed);
};

export const BFS = (scene, gridDimensions, speed, setToastInfo) => {
  ClearGrid(false);
  ResetIsVisited(gridDimensions);
  GenerateVirtualGrid(scene, gridDimensions);

  let isFound = false;
  let counter = 0;

  const runBFS = (currPath, x, y) => {
    const q = new Queue();
    q.enqueue({ index: [x, y], path: [[x, y]] });
    isVisited[x][y] = true;

    while (!q.isEmpty()) {
      const size = q.size();

      for (let i = 0; i < size; i++) {
        const front = q.front();
        q.dequeue();

        const moves = [
          [-1, 0],
          [0, 1],
          [1, 0],
          [0, -1],
        ];

        for (let j = 0; j < 4; j++) {
          let newX = front.index[0] + moves[j][0];
          let newY = front.index[1] + moves[j][1];

          if (
            IsValidMove(newX, newY) &&
            !isVisited[newX][newY] &&
            !grid[newX][newY].isObstruction
          ) {
            if (grid[newX][newY].isTarget) {
              isFound = true;

              setTimeout(() => {
                grid[newX][newY].setIsExplored(() => true);
                front.path.push([newX, newY]);
                front.path.map((tile, index) => {
                  setTimeout(() => {
                    let row = tile[0];
                    let col = tile[1];

                    grid[row][col].setIsInPath(() => true);
                  }, index * 50);
                });
              }, 500 + counter * speed);

              return;
            }

            q.enqueue({
              index: [newX, newY],
              path: [...front.path, [newX, newY]],
            });
            isVisited[newX][newY] = true;

            setTimeout(() => {
              grid[newX][newY].setIsExplored(() => true);
            }, 500 + counter * speed);

            counter++;
          }
        }
      }
    }
  };

  const currPath = [];
  let x = source.row;
  let y = source.column;

  if (x === null || y === null) {
    StartNodeNotFound(setToastInfo);
    return;
  }

  runBFS(currPath, x, y);

  if (isFound)
    setTimeout(() => {
      PathFound(setToastInfo);
    }, 500 + counter * speed);
  else
    setTimeout(() => {
      PathNotFound(setToastInfo);
    }, 500 + counter * speed);
};

export const Dijkstra = (scene, gridDimensions, speed, setToastInfo) => {
  ClearGrid(false);
  ResetIsVisited(gridDimensions);
  GenerateVirtualGrid(scene, gridDimensions);

  let isFound = false;
  let counter = 0;

  const runDijkstra = (currPath, x, y) => {
    const rows = grid.length;
    const columns = grid[0].length;
    const distanceArray = Array(rows)
      .fill()
      .map(() => Array(columns).fill(null));

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let dist = i === x && j === y ? 0 : Infinity;
        distanceArray[i][j] = {
          distance: dist,
          parentIndex: [-1, -1],
        };
      }
    }

    let currX = x;
    let currY = y;

    let moves = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];

    const colorShortestPath = (currX, currY) => {
      while (currX != -1 && currY != -1) {
        currPath.push(grid[currX][currY]);
        let cords = distanceArray[currX][currY].parentIndex;
        currX = cords[0];
        currY = cords[1];
      }

      currPath.reverse();

      currPath.map((tile, index) => {
        setTimeout(() => {
          tile.setIsInPath(() => true);
        }, index * 50);
      });
    };

    const findSmallestDist = () => {
      let cords = [-1, -1];
      let smallestDist = Infinity;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          let newDist = distanceArray[i][j].distance;

          if (!isVisited[i][j] && smallestDist > newDist) {
            cords = [i, j];
            smallestDist = newDist;
          }
        }
      }

      return cords;
    };

    while (1) {
      isVisited[currX][currY] = true;

      const tempX = currX;
      const tempY = currY;

      if (grid[currX][currY].isTarget) {
        isFound = true;

        setTimeout(() => {
          grid[tempX][tempY].setIsExplored(() => true);
          colorShortestPath(currX, currY);
        }, 500 + counter * speed);

        break;
      }

      setTimeout(() => {
        grid[tempX][tempY].setIsExplored(() => true);
      }, 500 + counter * speed);

      counter++;

      for (let i = 0; i < 4; i++) {
        let newX = currX + moves[i][0];
        let newY = currY + moves[i][1];

        if (
          IsValidMove(newX, newY) &&
          !grid[newX][newY].isObstruction &&
          !isVisited[newX][newY]
        ) {
          let cost = 1;
          if (grid[newX][newY].isBomb) {
            cost += 5;
          }

          let oldCost = distanceArray[newX][newY].distance;
          let newCost = distanceArray[currX][currY].distance + cost;

          if (newCost < oldCost) {
            distanceArray[newX][newY].distance = newCost;
            distanceArray[newX][newY].parentIndex = [currX, currY];
          }
        }
      }

      let cords = findSmallestDist();
      currX = cords[0];
      currY = cords[1];

      if (currX === -1 && currY === -1) return;
    }
  };

  const currPath = [];
  const x = source.row;
  const y = source.column;

  if (x === null || y === null) {
    StartNodeNotFound(setToastInfo);
    return;
  }

  runDijkstra(currPath, x, y);

  if (isFound)
    setTimeout(() => {
      PathFound(setToastInfo);
    }, 500 + counter * speed);
  else
    setTimeout(() => {
      PathNotFound(setToastInfo);
    }, 500 + counter * speed);
};
