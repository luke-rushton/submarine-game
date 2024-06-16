class Rock { //might want to change name?
    constructor(x = 950, y = 0, isCeiling=true) { //update or remove default values
        this.x = x;
        this.y = y;
        this.x2 = x + rockHeight; //magic number is rock height shuld refactor
        this.y2 = y + rockHeight;
        this.color = '#6b2911'; //replace with texture
        this.isCeiling = isCeiling;

    }

    draw() {
        context.beginPath();
        if(this.isCeiling){
            context.rect(this.x, 0, rockHeight, this.y + rockHeight);
        } else {
            context.rect(this.x, this.y, rockHeight, 500);
        }
        context.strokeStyle = '#f2bb74';
        context.stroke(); //remove when add texture
        context.fillStyle = this.color;
        context.fill();
    }

    move() {
        //x will never change no matter generation style
        this.x -= 5; //update this to change scroll speed
        this.x2 = this.x + rockHeight;
        if (this.x < -rockHeight) {
            this.x = canvas.width + rockHeight - 5;
            this.x2 = this.x + rockHeight;
            //generate the tunnel by changing y values
            this.y = testGen(this.y);
            this.y2 = this.y + rockHeight;
        }

    }
}