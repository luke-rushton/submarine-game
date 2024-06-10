//build the canvas 
const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 500;

class Game {
    constructor(){
        this.hello = "hello world!";
        this.canvas = canvas; //maybe initialize inside object?
    }
    start(){
        console.log(this.hello);
    }
}





//hide ui elements and start game
const startScreenElem = document.getElementById("start-screen");
document.addEventListener("keydown", (event) => {
    if(event.key === ' '){
        startScreenElem.style.display = 'none';
        startGame();
    }
});

function startGame(){ //initializes the game object
    const game = new Game();
    game.start();

}