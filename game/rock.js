class Rock { //might want to change name?
    constructor(x = 950, y = 0) { //update or remove default values
        this.x = x;
        this.y = y;
        this.bot = y + 50; //magic number is rock height shuld refactor
        this.end = x + 50;
        this.color = '#6b2911'; //replace with texture
    }

    draw() {
        context.beginPath();
        context.rect(this.x, this.y, 50, 50);
        context.strokeStyle = '#f2bb74'
        context.stroke(); //remove when add texture
        context.fillStyle = this.color;
        context.fill();
    }

    move() {
        this.x -= 5; //update this to change scroll speed
        this.end = this.x + 50;
        if (this.x < -50) {
            this.x = canvas.width + 45;
        }
    }
}