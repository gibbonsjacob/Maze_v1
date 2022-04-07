// Jacob Gibbons
// 3/31/2022
// Maze Generation v1
// https://en.wikipedia.org/wiki/Maze_generation_algorithm

var cells = [];
let cellCount;
let w = 20;
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


// var rightWallDirections = {
//   // key is the wall and value is the direction you're facing to keep that wall to the right of you
//   0: 3,
//   1: 0,
//   2: 1,
//   3: 2
// };

// var optimalDirections = {
//   0: 1,
//   1: 2,
//   2: 3,
//   3: 0
// };



// function getWalls(arr) {

//   let indexes = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] == false) {
//       indexes.push(i);
//     }
//   }
//   return indexes;
// }



// function getNext(cell) {
//   let newCoords = { i: cell.i, j: cell.j };
//   let optimalDirection = optimalDirections[direction];

//   let newDirection = direction;

//   if (cell.walls[direction]) {
//     newDirection = (direction + 1) % 4;
//   }
//   if (!cell.walls[optimalDirection]) {
//     newDirection = optimalDirection;
//   }
//   if (cell.walls[direction] && cell.walls[optimalDirection]) {
//     newDirection = rightWallDirections[direction]
//   }


//   if (getWalls(cell.walls).length == 1 && cell != cells[0][0]) {
//     newDirection = (direction + 2) % 4;

//   }


//   direction = newDirection;
//   cell.drawDirection(newDirection)
//   switch (newDirection) {

//     case 0:
//       // up
//       newCoords.j -= 1;
//       break;

//     case 1:
//       // right
//       newCoords.i += 1;
//       break;

//     case 2:
//       // down
//       newCoords.j += 1;
//       break;

//     case 3:
//       // left 
//       newCoords.i -= 1;
//       break;

//   }
//   return newCoords;

// }


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
  // frameRate(10);
  cols = floor(width / w);
  rows = floor(height / w);

  for (let i = 0; i < cols; i++) {
    cells[i] = [];
    for (let j = 0; j < rows; j++) {
      cells[i][j] = new cell(i, j, w);
    }
  }
  goal = cells[cols - 1][rows - 1];
  current = cells[0][0]; 


  generateMaze();
  // setting every outer border to have a wall
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
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      cells[i][j].show();
    }
  }

  cellCount = 0;
  if (current == goal) {
    noLoop();
    console.log(frameCount)
  }
  current.showCurrent();
  goal.showCurrent();
  nextCell = WallFollowerGetNext(current);





    visitedCells.push(current);
    current = cells[nextCell.i][nextCell.j];

    // for (let vCell of visitedCells) {
    //   vCell.showCurrent();
    // }

}


