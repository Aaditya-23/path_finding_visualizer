const grid = Array(20)
  .fill()
  .map(() => Array(20).fill(null));

const isVisited = Array(20)
  .fill()
  .map(() => Array(20).fill(false));

let path = [];

const generateVirtualGrid = (scene) => {
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
          index: { row, column },
          setTileColor,
          setIsExplored,
          setIsInPath,
        },
      } = mesh;

      grid[row][column] = {
        isObstruction,
        isSource,
        isTarget,
        setTileColor,
        setIsExplored,
        setIsInPath,
      };
    }
  });
};

const isValidMove = (newX, newY) => {
  return newX > -1 && newX < 20 && newY > -1 && newY < 20;
};

export const DFS = (scene, source) => {
  generateVirtualGrid(scene);

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
