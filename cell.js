

class cell {
    constructor(i, j, w) {
        this.i = i;
        this.j = j;
        this.w = w;
        this.x = this.i * this.w;
        this.y = this.j * this.w;
        this.visited = false;
        this.walls = [true, true, true, true];
        // for (let i = 0; i < 4; i++){
        //     this.walls.push((random() >= .5));
        // }
    }



    show() {
        stroke(0);
        strokeWeight(4);
        if (this.walls[0]) {
            line(this.x, this.y, this.x + this.w, this.y);
        }
        if (this.walls[1]) {
            line(this.x + this.w, this.y, this.x + this.w, this.y + this.w);
        }
        if (this.walls[2]) {
            line(this.x, this.y + this.w, this.x + this.w, this.y + this.w);
        }
        if (this.walls[3]) {
            line(this.x, this.y, this.x, this.y + this.w);
        }
        if (this.visited) {
            fill(255, 0, 255, 100);
            strokeWeight(0);
            rect(this.x, this.y, this.w - 2, this.w - 2);
        }
    }

    showCurrent() {
        fill(0, 255, 0);
        rect(this.x, this.y, this.w, this.w);
    }



}

