var rightWallDirections = {
    // key is the wall and value is the direction you're facing to keep that wall to the right of you
    0: 3,
    1: 0,
    2: 1,
    3: 2
  };
  
  var optimalDirections = {
    0: 1,
    1: 2,
    2: 3,
    3: 0
  };
  
  
  
  function getWalls(arr) {
  
    let indexes = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == false) {
        indexes.push(i);
      }
    }
    return indexes;
  }
  
  
  
  function WallFollowerGetNext(cell) {
    let newCoords = { i: cell.i, j: cell.j };
    let optimalDirection = optimalDirections[direction];
  
    let newDirection = direction;
  
    if (cell.walls[direction]) {
      newDirection = (direction + 1) % 4;
    }
    if (!cell.walls[optimalDirection]) {
      newDirection = optimalDirection;
    }
    if (cell.walls[direction] && cell.walls[optimalDirection]) {
      newDirection = rightWallDirections[direction]
    }
  
  
    if (getWalls(cell.walls).length == 1 && cell != cells[0][0]) {
      newDirection = (direction + 2) % 4;
  
    }
  
  
    direction = newDirection;
    cell.drawDirection(newDirection)
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
  