//build the canvas 
const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 500;
const submarineImg = new Image();
submarineImg.src = "sub-basic.png";

class Submarine {
    constructor() {
        this.x = 250; //update initial position here there is a minor float up at start due to this position. update to start at neutral?
        this.y = 250;
        this.ceiling = 0; //these 2 are for submarine up and down max height
        this.floor = 450;
        this.neutral = (this.ceiling + this.floor) / 2; //take into account sub sprite offset?
        this.movingUp = false;
        this.movingDown = false;
        this.neutralFloat = submarineImg; //maybe directly assign src
    }
    draw() {
        context.drawImage(this.neutralFloat, this.x, this.y);
    }
    float() { //maybe combine float and sink?
        if (this.y > this.ceiling) {
            this.y -= 5;
        }
    }
    sink() {
        if (this.y < this.floor) {
            this.y += 5;
        }
    }
    reset() {
        if (this.y < this.neutral) {
            this.y += 2.5; //floats back at half speed of control
        }
        if (this.y > this.neutral) {
            this.y -= 2.5;
        }
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

        //try and refactor these 4
        const moveUp = document.addEventListener("keydown", (event) => {
            if (event.key === 'w') {
                submarine.movingUp = true;
            }
        });

        const floatDown = document.addEventListener("keyup", (event) => {
            if (event.key === 'w') {
                submarine.movingUp = false;
            }
        });

        const downUp = document.addEventListener("keydown", (event) => {
            if (event.key === 's') {
                submarine.movingDown = true;
            }
        });

        const floatUp = document.addEventListener("keyup", (event) => {
            if (event.key === 's') {
                submarine.movingDown = false;
            }
        });

        const animate = () => { //split animate into animation function?
            context.clearRect(0, 0, canvas.width, canvas.height);
            rock.move();
            rock.draw();

            if (submarine.movingUp) { //can move this logic around, used to control submarine up and down
                submarine.float();
            } else if (submarine.movingDown) {
                submarine.sink();
            } else {
                submarine.reset();
            }

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