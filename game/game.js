//build the canvas 
const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 500;
const submarineImg = new Image();
submarineImg.src = "sub-basic.png";
const rockArray = [];

//stops spamming start game
let gameStarted = false;

class Game {
    constructor() {
        this.hello = "hello world!";
        this.canvas = canvas; //maybe initialize inside object?
        this.traverseSpeed = 25; //change for faster/slower game scrolling
    }
    generateTerrain(){
        for(let x = -50; x < 1050; x += 50){
            for(let y = 0; y < 3; y++){
                const rock = new Rock(x,y*50);
                const rockb = new Rock(x,450 - y*50);
                rockArray.push(rock);
                rockArray.push(rockb);
            }
        }
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
            submarine.checkCollision();
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
        if(!gameStarted){
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