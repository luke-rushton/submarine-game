//build the canvas 
const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 500;

class Rock {
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
        rock.draw();
        const animate = () => { //split animate into animation function?
            context.clearRect(0, 0, canvas.width, canvas.height);
            rock.move();
            rock.draw();
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