//start screen elem
const startScreenElem = document.getElementById("start-screen");
//build the canvas 
const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 500;
const submarineImg = new Image();
submarineImg.src = "sub-basic.png";
let rockArray = [];
const rockHeight = 10; //change this to increase/decrease rocksize 

//stops spamming start game
let gameStarted = false;

class Game {
    constructor() {
        this.hello = "hello world!";
        this.canvas = canvas; //maybe initialize inside object?
        this.traverseSpeed = 25; //change for faster/slower game scrolling maybe make const
    }
    generateTerrain() {
        flatGeneration(rockHeight);
        //waveGeneration(rockHeight);
    }
    start() {
        this.generateTerrain();
        const submarine = new Submarine();
        rockArray.forEach((rock) => {
            rock?.draw();
        });
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
            rockArray.forEach((rock) => {
                rock?.move();
                rock?.draw();
            });
            if (submarine.movingUp) { //can move this logic around, used to control submarine up and down
                submarine.float();
            } else if (submarine.movingDown) {
                submarine.sink();
            } else {
                submarine.reset();
            }
            if (submarine.checkCollision()) {
                this.endGame(); //add in ending animation function
                return;
            }
            submarine.draw();
            requestAnimationFrame(animate);
        };
        animate();
    }
    endGame() {
        startScreenElem.style.display = 'block';
        startScreenElem.innerHTML = 'You Died! Press space to restart';
        gameStarted = false;
        rockArray = [];
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}





//hide ui elements and start game
document.addEventListener("keydown", (event) => {
    if (event.key === ' ') {
        if (!gameStarted) {
            gameStarted = true;
            startScreenElem.style.display = 'none';
            startGame();
        }
    }
});

function startGame() { //initializes the game object
    const game = new Game();
    game.start();

}