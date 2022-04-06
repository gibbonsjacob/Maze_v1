// Jacob Gibbons
// 3/31/2022
// Maze Generation v1
// https://en.wikipedia.org/wiki/Maze_generation_algorithm

var cells = [];
let cellCount;
let w = 100;
let cols;
let rows;
let current;
let neighbor;
let direction;
let wallModifier = 1;
let visitedCells = [];
var goal;
let cellStack = [];
let i;
let j;



function getWalls(arr) {

  let indexes = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == false) {
      indexes.push(i);
    }
  }
  return indexes;
}



function getNext(cell, direction) {
  // this is going to look very similar to checkNeighbors()
  let newCoords = { i: cell.i, j: cell.j }
  let optimalDirection = (direction - 1) % 4; // gives us the direction to the "right" of whichever way it's currently facing
  console.log(direction, optimalDirection)
  let newDirection; 
  if (!cell.walls[optimalDirection]){
    newDirection = optimalDirection;
  } else {
    newDirection = direction;
  }
  switch (newDirection) {

    case 0:
      // up
      newCoords.j -= 1;
      break;

    case 1:
      // right
      newCoords.i += 1;
      break;

    case 2:
      // down
      newCoords.j += 1;
      break;

    case 3:
      // left 
      newCoords.i -= 1;
      break;

  }
  return newCoords;

}


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

function generateMaze() {
  let cellCount = 0;
  while (cellCount < ((width / w) * (height / w))) {
    cellCount = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (cells[i][j].visited) {
          cellCount++
        }
      }
    }

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
  }
}






function setup() {
  createCanvas(1000, 1000);
  frameRate(1);
  cols = floor(width / w);
  rows = floor(height / w);

  for (let i = 0; i < cols; i++) {
    cells[i] = [];
    for (let j = 0; j < rows; j++) {
      cells[i][j] = new cell(i, j, w);
      // cellCount++;
    }
  }
  goal = cells[cols - 1][rows - 1];
  current = cells[0][0]; // set it once to generate the maze, then again to show the start of the maze
  // direction = floor(random(4)); // start the maze by facing a random direction (this will change in the first frame)

  generateMaze();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (j == 0) {
        cells[i][j].walls[0] = true;
      } else if (j == rows - 1) {
        cells[i][j].walls[2] = true;
      } else if (i == 0) {
        cells[i][j].walls[3] = true;
      } else if (i == cols - 1) {
        cells[i][j].walls[1] = true;
      }
    }
  }
  current = cells[0][0];

  possibleDirections = getWalls(current.walls);
  direction = possibleDirections[floor(random(possibleDirections.length))]
}

function draw() {
  background(220);
  
  cellCount = 0;
  if (current == goal){
    noLoop();
    console.log(frameCount)
  }
  current.showCurrent();
  goal.showCurrent();
  let rightWall = (direction + 1) % 4;
  if (!current.walls[rightWall]) {
    direction = rightWall;
  }

  current.drawDirection(direction);
  nextCell = getNext(current, direction);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // if (cells[i][j].visited) {
      // }
      cells[i][j].show();
    }
  }

  if (nextCell) {
  visitedCells.push(current);
  
  current = cells[nextCell.i][nextCell.j];
  } else {
    current = visitedCells.pop();
  }
}



// (directionIndex + 1) % num of possible directions = index of right wall!
// so (directionIndex + 1) % 4 = index of right wall

//       direction   right wall
// up    0           1     
// right 1           2
// down  2           3
// left  3           0


// so to get right wall from direction, we take number of directions % 