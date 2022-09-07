import { Queue } from "./DataStructures";

const grid = Array(20)
  .fill()
  .map(() => Array(20).fill(null));

const isVisited = Array(20)
  .fill()
  .map(() => Array(20).fill(false));

let source = { row: null, column: null };

const resetIsVisited = () => {
  isVisited.forEach((subarray, i) => {
    subarray.forEach((item, j) => (isVisited[i][j] = false));
  });
};

export const generateVirtualGrid = (scene) => {
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

      if (isSource) source = { row, column };
    }
  });
};

export const clearGrid = (parameter) => {
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

const isValidMove = (newX, newY) => {
  return newX > -1 && newX < 20 && newY > -1 && newY < 20;
};

export const DFS = (scene) => {
  clearGrid(false);
  resetIsVisited();
  generateVirtualGrid(scene);

  let path = [];

  let counter = 0;
  const recurDFS = (currPath, x, y) => {
    if (grid[x][y].isTarget) {
      setTimeout(() => {
        grid[x][y].setIsExplored(() => true);
        path.push(grid[x][y]);

        path.map((tile, index) => {
          setTimeout(() => {
            tile.setIsInPath(() => true);
          }, index * 100);

          return null;
        });
      }, 500 + counter * 200);
      return true;
    }

    isVisited[x][y] = true;
    currPath.push(grid[x][y]);
    setTimeout(() => {
      grid[x][y].setIsExplored(() => true);
    }, 500 + counter * 200);

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
        isValidMove(newX, newY) &&
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
  recurDFS(currPath, x, y);
};

export const BFS = (scene) => {
  clearGrid(false);
  resetIsVisited();
  generateVirtualGrid(scene);

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
            isValidMove(newX, newY) &&
            !isVisited[newX][newY] &&
            !grid[newX][newY].isObstruction
          ) {
            if (grid[newX][newY].isTarget) {
              setTimeout(() => {
                grid[newX][newY].setIsExplored(() => true);
                front.path.push([newX, newY]);
                front.path.map((tile, index) => {
                  setTimeout(() => {
                    let row = tile[0];
                    let col = tile[1];

                    grid[row][col].setIsInPath(() => true);
                  }, index * 100);
                });
              }, 500 + counter * 200);

              return;
            }

            q.enqueue({
              index: [newX, newY],
              path: [...front.path, [newX, newY]],
            });
            isVisited[newX][newY] = true;

            setTimeout(() => {
              grid[newX][newY].setIsExplored(() => true);
            }, 500 + counter * 200);

            counter++;
          }
        }
      }
    }
  };

  const currPath = [];
  let x = source.row;
  let y = source.column;

  runBFS(currPath, x, y);
};

export const dijkstra = (scene) => {
  clearGrid(false);
  resetIsVisited();
  generateVirtualGrid(scene);

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
        }, index * 100);
      });
    };

    const findSmallestDist = () => {
      let cords = null;
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
        setTimeout(() => {
          grid[tempX][tempY].setIsExplored(() => true);
          colorShortestPath(currX, currY);
        }, 500 + counter * 200);

        break;
      }

      setTimeout(() => {
        grid[tempX][tempY].setIsExplored(() => true);
      }, 500 + counter * 200);

      counter++;

      for (let i = 0; i < 4; i++) {
        let newX = currX + moves[i][0];
        let newY = currY + moves[i][1];

        if (
          isValidMove(newX, newY) &&
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
    }

    console.log("The End", currX, currY, counter);
  };

  const currPath = [];
  const x = source.row;
  const y = source.column;

  runDijkstra(currPath, x, y);
};
