// Jacob Gibbons
// 4.11.2022
// Maze Solver with dead end filling 

let addToDeadEnds;


function getDeadEnds() {
    // find all dead ends in the maze (any cell with 3 walls)
    var deadEnds = [];
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let cell = cells[i][j];
            if (cell != cells[0][0] && cell != cells[cols - 1][rows - 1]) {
                let numOfWalls = 0;
                addToDeadEnds = true;
                for (let wall of cell.walls) {
                    if (wall) {
                        numOfWalls++;
                    }
                }
                if (numOfWalls == 3) {
                    deadEnds.push(cells[i][j]);
                }
            }
        }
    }
    return deadEnds;
}

function getDeadEndNeighbor(cell, direction) {
    let newDirection = cell.walls.indexOf(false);
    let newCoords = { i: cell.i, j: cell.j };

    if (direction) {
        newDirection = direction
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
    return cells[newCoords.i][newCoords.j];
}

function addWalls(cell, neighbor) {
    let iDiff = cell.i - neighbor.i;
    let jDiff = cell.j - neighbor.j;

    if (iDiff != 0) {
        // move left or right 
        // since the difference will give either -1 or 1, we add 2 to get to wall 1 or 3
        cell.walls[iDiff + 2] = true;
        neighbor.walls[Math.abs(iDiff - 2)] = true;
    } else if (jDiff != 0) {
        // move up or down
        // same concept as above, but since we need 0 or 2, we add 1 instead of 2
        neighbor.walls[jDiff + 1] = true;
        cell.walls[Math.abs(jDiff - 1)] = true;
    }
}






function DeadEndSolve() {
    var deadEnds = getDeadEnds();
    if (deadEnds.length > 0) {
      for (let deadEndCell of deadEnds) {
        deadEndCell.deadEnd();
        neighbor = getDeadEndNeighbor(deadEndCell);
        addWalls(deadEndCell, neighbor);
      }
    } else {
      // path has been identified so animate the path
      let currentWalls = [];
      path.push(current);
      for (let i = 0; i < current.walls.length; i++) {
        if (!current.walls[i]) {
          currentWalls.push(i);
        }
      }
      nextCell = getDeadEndNeighbor(current, currentWalls[0]);
      if (path.indexOf(nextCell) > -1) {
        nextCell = getDeadEndNeighbor(current, currentWalls[1]);
      }
      current = nextCell;
    }
    for (let p of path){
      p.showCurrent();
    }
  
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (cells[i][j].walls.indexOf(false) == -1) {
          cells[i][j].deadEnd();
  
        }
      }
    }
  
    

}








