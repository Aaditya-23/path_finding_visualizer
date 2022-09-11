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
      message: "path found",
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

export const ClearGrid = (parameter, scene, gridDimensions) => {
  GenerateVirtualGrid(scene, gridDimensions);

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
        source.row = null;
        source.column = null;
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

    let n;
    let m;

    const topLeftBlock = () => {
      n = (rows * 30) / 100;
      m = (columns * 30) / 100;

      for (let i = 1; i < n; i++) add(i, m - 1);
      for (let i = 0; i < m; i++) add(0, i);
      for (let i = 0; i < m - 2; i++) add(n - 1, i);
    };

    const topLeftOutline = () => {
      n += -1 + (rows * 15) / 100;
      m += -1 + (columns * 10) / 100;

      for (let i = 0; i < n; i++) add(m, i);
      for (let i = 1; i <= m; i++) add(i, n);
    };

    const bottomLine = () => {
      const prevN = n;
      n += -1 + (rows * 25) / 100;
      m += -1 + (columns * 30) / 100;

      for (let i = 0; i < m; i++) add(n, i);
      for (let i = n; i >= prevN; i--) add(i, m);

      let newM = m + (columns * 15) / 100;
      for (let i = m + 1; i <= newM; i++) add(prevN, i);

      let rowLimit = rows - (rows * 10) / 100;

      for (let i = prevN + 1; i <= rowLimit; i++) add(i, newM);

      let temp = newM;
      newM += (columns * 10) / 100;

      for (let i = temp; i <= newM; i++) add(rowLimit, i);
    };

    const topRightBlock = () => {
      const n = (rows * 25) / 100;
      const m = columns - (columns * 30) / 100;

      for (let i = 0; i < n; i++) add(i, m);
      for (let i = m + 1; i < columns; i++) add(n - 1, i);
    };

    topLeftBlock();
    topRightBlock();
    topLeftOutline();
    bottomLine();
  },
};

export const DFS = (scene, gridDimensions, speed, setToastInfo) => {
  ResetIsVisited(gridDimensions);
  ClearGrid(false, scene, gridDimensions);

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
  ClearGrid(false, scene, gridDimensions);
  ResetIsVisited(gridDimensions);

  let isFound = false;
  let counter = 0;

  const runBFS = (currPath, x, y) => {
    const q = new Queue();
    q.enqueue({ index: [x, y], path: [[x, y]] });
    isVisited[x][y] = true;

    setTimeout(() => {
      grid[x][y].setIsExplored(() => true);
    }, 500 + counter * speed);
    counter++;

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

              //eslint-disable-next-line
              setTimeout(() => {
                grid[newX][newY].setIsExplored(() => true);
                front.path.push([newX, newY]);
                front.path.map((tile, index) => {
                  setTimeout(() => {
                    let row = tile[0];
                    let col = tile[1];

                    grid[row][col].setIsInPath(() => true);
                  }, index * 50);
                  return null;
                });
              }, 500 + counter * speed);

              return;
            }

            q.enqueue({
              index: [newX, newY],
              path: [...front.path, [newX, newY]],
            });
            isVisited[newX][newY] = true;

            //eslint-disable-next-line
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
  ClearGrid(false, scene, gridDimensions);
  ResetIsVisited(gridDimensions);

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
      while (currX !== -1 && currY !== -1) {
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
        return null;
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

        //eslint-disable-next-line
        setTimeout(() => {
          grid[tempX][tempY].setIsExplored(() => true);
          colorShortestPath(currX, currY);
        }, 500 + counter * speed);

        break;
      }

      //eslint-disable-next-line
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
