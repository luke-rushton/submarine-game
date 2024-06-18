//start screen elem
const startScreenElem = document.getElementById("start-screen");

//build the canvas 
const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 500;
context.font = '25px VT323';
//images
const submarineImg = new Image();
submarineImg.src = "yellow-sub-neutral.png";
const submarineUpImg = new Image();
submarineUpImg.src = "yellow-sub-ascend.png";
const submarineDownImg = new Image();
submarineDownImg.src = "yellow-sub-descend.png";
const submarineAnimOne = new Image();
submarineAnimOne.src = "submarine-death-frame-1.png";
const submarineAnimTwo = new Image();
submarineAnimTwo.src = "submarine-death-frame-2.png";
const submarineDead = new Image();
submarineDead.src = "submarine-death-final.png";
//water
const waterTexture = new Image();
waterTexture.src = "water-texture.png";
//earth
const earthTexture = new Image();
earthTexture.src = "earth-texture.png";

let rockArray = [];
const rockHeight = 20; //change this to increase/decrease rocksize 
const tunnelWidth = 4; //used to set initial distance of tunnel from floor/ceiling
const rockColor = '#6b2911'; //same as in rock class
//stops spamming start game
let gameStarted = false;
let gameplayTheme = new Audio('gameplay-theme.mp3');
let gameOverTheme = new Audio('game-over.mp3');
let isDead = false; //to play death animation
let currentScore = 0;

class Game {
    constructor() {
        this.hello = "hello world!";
        this.canvas = canvas; //maybe initialize inside object?
        this.traverseSpeed = 25; //change for faster/slower game scrolling maybe make const
    }
    generateTerrain() { //builds the rockArray, not actually structuring map. tunnel generating happens in move()
        initialGeneration();
    }
    start() {
        //MUSIC FROM: https://heatleybros.bandcamp.com/track/sunset-beach
        gameplayTheme.play();
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
            context.drawImage(waterTexture, 0, 0); //animate this?
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
                this.endGame(submarine); //add in ending animation function
                return;
            }
            submarine.draw();
            context.fillStyle = '#fff';
            context.fillText(`score: ${currentScore}`, 875, 20);
            currentScore++;
            requestAnimationFrame(animate);
        };
        animate();
    }
    endGame(submarine) {
        gameplayTheme.pause();
        gameplayTheme.currentTime = 0;

        let xPos = submarine.x;
        let yPos = submarine.y;
        let counter = 60;
        gameOverTheme.play();
        const deathAnim = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            if (counter < 20) {
                context.drawImage(submarineDead, xPos, yPos);
            } else if (counter < 40) {
                context.drawImage(submarineAnimTwo, xPos, yPos);
            } else {
                context.drawImage(submarineAnimOne, xPos, yPos);
            }
            counter -= 1;
            requestAnimationFrame(deathAnim);
        }
        deathAnim();

        setTimeout(() => {
            gameOverTheme.pause();
            gameOverTheme.currentTime = 0;
            startScreenElem.style.display = 'block';
            startScreenElem.style.fontSize = '3rem'; 
            startScreenElem.style.color = '#6b2911';
            startScreenElem.style.textAlign = 'center';
            startScreenElem.innerHTML = 'You Died! Your Score:' + currentScore + ' Press space to restart.';
            gameStarted = false;
            //resetting global variables
            currentHeight = tunnelWidth;
            isDescending = true;
            currentScore = 0;
            rockArray = [];
            //resetting canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
        }, 1000);
    }
    reset() {

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