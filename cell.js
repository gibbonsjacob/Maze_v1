

class cell {
    constructor(i, j, w) {
        this.i = i;
        this.j = j;
        this.w = w;
        this.x = this.i * this.w;
        this.y = this.j * this.w;
        this.visited = false;
        this.walls = [true, true, true, true];
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
            fill(255, 0, 255,100);
            noStroke();
            rect(this.x, this.y, this.w - 2, this.w - 2);
        }
    }

    showCurrent() {
        fill(0, 255, 0);
        noStroke();
        rect(this.x + 5, this.y + 5, this.w - 10, this.w - 10);
    }

    drawDirection(direction) {
        fill(0)
        let x1, y1, x2, y2, x3, y3;
        switch (direction) {

            case 0:
                // up
                x1 = current.x + (current.w / 6);
                y1 = current.y + (current.w / 2);
                x2 = current.x + (5 * (current.w / 6));
                y2 = current.y + (current.w / 2);
                x3 = current.x + (current.w / 2);
                y3 = current.y + (current.w / 6);

                break;
            case 1:
                // right
                x1 = current.x + (current.w / 2);
                y1 = current.y + (current.w / 6);
                x2 = current.x + (5 * (current.w / 6));
                y2 = current.y + (current.w / 2);
                x3 = current.x + (current.w / 2);
                y3 = current.y + (5 * current.w / 6);
                break;

            case 2:
                // down 
                x1 = current.x + (current.w / 6);
                y1 = current.y + current.w / 2;
                x2 = current.x + (5 * current.w / 6);
                y2 = current.y + current.w / 2;
                x3 = current.x + (current.w / 2);
                y3 = current.y + 5 * current.w / 6;
                break;

            case 3:
                // left
                x1 = current.x + current.w / 2;
                y1 = current.y + current.w / 6;
                x2 = current.x + (current.w / 6);
                y2 = current.y + current.w / 2;
                x3 = current.x + (current.w / 2);
                y3 = current.y + 5 * current.w / 6;

                break;

        }
        triangle(x1, y1, x2, y2, x3, y3);
    }



}

