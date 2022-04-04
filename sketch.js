// Jacob Gibbons
// 3/31/2022
// Maze Generation v1
// https://en.wikipedia.org/wiki/Maze_generation_algorithm

var cells = [];
let cellCount;
let w = 10;
let cols;
let rows;
let current;
let neighbor;
let wallModifier = 1;
var goal;
let cellStack = [];





function checkNeighbors(cell) {
  let neighbors = [];
  var top, right, bottom, left;
  top = {
    i: cell.i,
    j: cell.j - 1,
    index: 0
  };
  right = {
    i: cell.i + 1,
    j: cell.j,
    index: 1
  };
  bottom = {
    i: cell.i,
    j: cell.j + 1,
    index: 2
  };
  left = {
    i: cell.i - 1,
    j: cell.j,
    index: 3
  };

  let neighborIndexes = [top, right, bottom, left];

  for (let neighbor of neighborIndexes) {
    if (validNeighbor(neighbor.i, neighbor.j)) {
      if (cells[neighbor.i][neighbor.j]) {
        if (!(cells[neighbor.i][neighbor.j].visited)) {
          neighbors.push([cells[neighbor.i][neighbor.j], neighbor.index])
        }
      }
    }
  }
  if (neighbors.length > 0) {
    return neighbors[floor(random(neighbors.length))];
  } else {
    return undefined;
  }
}



function validNeighbor(i, j) {
  // checking if the "neighbor" would be off the screen
  return !(i < 0 || j < 0 || i > cols - 1 || j > rows - 1);

}




function removeWalls(current, neighbor) {
  if (neighbor[1] < 2) {
    wallModifier = 2;
  } else {
    wallModifier = -2;
  }
  neighborCell = cells[neighbor[0].i][neighbor[0].j];
  current.walls[neighbor[1]] = false
  neighborCell.walls[neighbor[1] + wallModifier] = false;
}




function setup() {
  createCanvas(1000, 1000);
  cols = floor(width / w);
  rows = floor(height / w);
  for (let i = 0; i < cols; i++) {
    cells[i] = [];
    for (let j = 0; j < rows; j++) {
      cells[i][j] = new cell(i, j, w);
      cellCount++;
    }
  }
  goal = cells[cols - 1][rows - 1];
  current = cells[0][0];
}

function draw() {
  background(220);
    cellCount = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (cells[i][j].visited) {
          cellCount++
        }
        cells[i][j].show();
      }
    }
    fill(0, 255, 0);
    current.visited = true;
    current.showCurrent(); // just coloring the current cell
    goal.showCurrent(); // the "end" if you were to actually play the maze
    let nextCell = checkNeighbors(current);
    if (nextCell) {
      nextCell[0].visited = true;
      cellStack.push(current);
      removeWalls(current, nextCell);
      current = nextCell[0];
    } else if (cellStack.length > 0) {
      current = cellStack.pop();
    }
    if (cellCount == ((width / w) * (height / w))) {
      current = cells[0][0];
      current.showCurrent();
      noLoop();
    }
  }

