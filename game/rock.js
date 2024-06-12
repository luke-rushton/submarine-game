class Rock { //might want to change name?
    constructor(x = 950, y = 0) { //update or remove default values
        this.x = x;
        this.y = y;
        this.color = '#000000';
    }

    draw() {
        context.beginPath();
        context.rect(this.x, this.y, 50, 50);
        context.fillStyle = this.color;
        context.fill();
    }

    move() {
        this.x -= 5; //update this to change scroll speed
        if (this.x < -50) {
            this.x = canvas.width + 50;
        }
    }
}