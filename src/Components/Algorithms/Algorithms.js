import { Queue } from "./DataStructures";

const grid = Array(20)
  .fill()
  .map(() => Array(20).fill(null));

const isVisited = Array(20)
  .fill()
  .map(() => Array(20).fill(false));

let path = [];

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
          isSource,
          isTarget,
          isExplored,
          isInPath,
          index: { row, column },
          setIsObstruction,
          setTileColor,
          setIsExplored,
          setIsInPath,
          setIsTarget,
          setIsSource,
        },
      } = mesh;

      grid[row][column] = {
        isObstruction,
        isSource,
        isTarget,
        isExplored,
        isInPath,
        setIsObstruction,
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

export const clearPath = () => {
  const row = grid.length;
  const column = grid[0].length;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      const { setIsExplored, setIsInPath, setIsSource, setIsTarget } =
        grid[i][j];

      setIsExplored(() => false);
      setIsInPath(() => false);
      setIsSource(() => false);
      setIsTarget(() => false);
    }
  }
};

export const clearEverything = () => {
  const row = grid.length;
  const column = grid[0].length;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      const {
        setIsObstruction,
        setIsExplored,
        setIsInPath,
        setIsSource,
        setIsTarget,
      } = grid[i][j];

      setIsObstruction(() => false);
      setIsExplored(() => false);
      setIsInPath(() => false);
      setIsSource(() => false);
      setIsTarget(() => false);
    }
  }
};

const isValidMove = (newX, newY) => {
  return newX > -1 && newX < 20 && newY > -1 && newY < 20;
};

export const DFS = (scene) => {
  generateVirtualGrid(scene);
  resetIsVisited();
  path = [];

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
  generateVirtualGrid(scene);
  resetIsVisited();
  path = [];

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
