//build the canvas 
const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 500;
const submarineImg = new Image();
submarineImg.src = "sub-basic.png";


class Submarine {
    constructor() {
        this.x = 250; //update initial position here
        this.y = 250;
        this.neutralFloat = submarineImg; //maybe directly assign src
    }
    draw() {
        context.drawImage(this.neutralFloat, this.x, this.y);
    }
    move() { //maybe an up and down?

    }
}

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

class Game {
    constructor() {
        this.hello = "hello world!";
        this.canvas = canvas; //maybe initialize inside object?
        this.traverseSpeed = 25; //change for faster/slower game scrolling
    }
    start() {
        const rock = new Rock();
        const submarine = new Submarine();
        rock.draw();
        submarine.draw();
        const animate = () => { //split animate into animation function?
            context.clearRect(0, 0, canvas.width, canvas.height);
            rock.move();
            rock.draw();
            submarine.draw();
            requestAnimationFrame(animate);
        };
        animate();
    }
}





//hide ui elements and start game
const startScreenElem = document.getElementById("start-screen");
document.addEventListener("keydown", (event) => {
    if (event.key === ' ') {
        startScreenElem.style.display = 'none';
        startGame();
    }
});

function startGame() { //initializes the game object
    const game = new Game();
    game.start();

}