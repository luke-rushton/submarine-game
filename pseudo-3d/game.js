import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Rock } from './rock.js';
import { Submarine } from './submarine.js';

//start screen elem
const startScreenElem = document.getElementById("start-screen");

//build the canvas 
const canvas = document.getElementById("game-canvas");
canvas.width = 1000;
canvas.height = 500;

//stops spamming start game
let gameStarted = false;

//music
let gameplayTheme = new Audio('gameplay-theme.mp3');
let gameOverTheme = new Audio('game-over.mp3');

//3d stuff
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1000 / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(1000, 500);
renderer.setClearColor(0x00ffff);

//terrain array
let terrainArray = [];
export { terrainArray };

//score counter
let currentScore = 0;

//game variables
const scrollSpeed = 2;
export { scrollSpeed };
const rockSize = 20; //scale for edges of cubes
export { rockSize };
const tunnelWidth = 7;
export { tunnelWidth };
const gameHeight = 500; //canvas.height;
export { gameHeight };
const gameWidth = canvas.width;
export { gameWidth };


class Game {
    constructor() {
        this.canvas = canvas; //maybe initialize inside object?

        //3d elements
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;

    }
    initialTerrain() { //builds the rockArray, not actually structuring map. tunnel generating happens in move()
        //terrainArray = initialGeneration();
        for (let i = 0; i < 1000; i += rockSize) {
            const terrainCubeT = new Rock(i, gameHeight - (tunnelWidth * rockSize));
            const terrainCubeB = new Rock(i, (tunnelWidth * rockSize));
            terrainCubeT.initialize();
            terrainCubeB.initialize();
            terrainArray.push(terrainCubeT);
            terrainArray.push(terrainCubeB);
        }
    }
    generateTerrain() {

    }
    start() {

        //MUSIC FROM: https://heatleybros.bandcamp.com/track/sunset-beach
        gameplayTheme.play();

        //setting up camera
        camera.position.z = 300;
        camera.position.y = 250;
        camera.position.x = 500;
        camera.lookAt(500, 250, 0);



        //generate submarine
        const submarine = new Submarine();
        submarine.initialize();
        //scene.add(submarine.getDebug());
        scene.add(submarine.get());

        //generate terrain cubes
        this.initialTerrain();
        terrainArray.forEach((cube) => {
            scene.add(cube.get());
        });



        //control submarine
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

        const animate = () => {
            terrainArray.forEach((cube) => {
                cube.move();
            });
            //submarine movement logic
            if (submarine.movingUp) {
                submarine.float();
            } else if (submarine.movingDown) {
                submarine.sink();
            } else {
                submarine.reset();
            }
            if (submarine.checkCollision()) {
                this.endGame(submarine);
            }
            //increase score
            currentScore++;
            //render next frame
            this.renderer.render(this.scene, this.camera);
        }
        this.renderer.setAnimationLoop(animate);
    }
    endGame(submarine) {
        gameplayTheme.pause();
        gameplayTheme.currentTime = 0;

        this.renderer.setAnimationLoop(null);

        //do death animation here
        submarine.die();
        //play game over theme
        gameOverTheme.play();

        //reset the scene
        while (this.scene.children.length > 1) {
            this.scene.remove(this.scene.children[1]);
        }
        //display game over menu and reset in background
        setTimeout(() => {
            submarine.resetArt();
            this.scene.remove(this.scene.children[0]);
            gameOverTheme.pause();
            gameOverTheme.currentTime = 0;
            startScreenElem.style.display = 'block';
            startScreenElem.style.fontSize = '3rem';
            startScreenElem.style.color = '#6b2911';
            startScreenElem.style.textAlign = 'center';
            startScreenElem.innerHTML = 'You Died! Your Score:' + currentScore + ' Press space to restart.';
            gameStarted = false;
            //resetting global variables
            currentScore = 0;
            terrainArray = [];
            location.reload();


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
            console.log('test');
            startGame();
        }
    }
});

function startGame() { //initializes the game object
    const game = new Game();
    game.start();
    console.log('test');
}