import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { initialGeneration } from './generators';
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

//3d stuff
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1000 / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(1000, 500);
renderer.setClearColor(0x00ffff);

//terrain array
const terrainArray = [];
export { terrainArray };

//game variables
const scrollSpeed = 2;
export { scrollSpeed };
const rockSize = 20; //scale for edges of cubes
const tunnelWidth = 5;

class Game {
    constructor() {
        this.canvas = canvas; //maybe initialize inside object?

        //3d elements
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;

    }
    initialTerrain() { //builds the rockArray, not actually structuring map. tunnel generating happens in move()
        //initialGeneration();
        for (let i = 0; i < 1000 + rockSize; i += rockSize) {
            const terrainCubeT = new Rock(i, canvas.height - (tunnelWidth * rockSize));
            const terrainCubeB = new Rock(i, (tunnelWidth * rockSize));
            terrainCubeT.initialize();
            terrainCubeB.initialize();
            terrainArray.push(terrainCubeT);
            terrainArray.push(terrainCubeB);
        }
    }
    start() {
        //setting up camera
        camera.position.z = 325;
        camera.position.y = 250;
        camera.position.x = 500;
        camera.lookAt(500, 250, 0);

        //generate terrain cubes
        this.initialTerrain();
        terrainArray.forEach((cube) => {
            scene.add(cube.get());
        });

        //generate submarine
        const submarine = new Submarine();
        submarine.initialize();
        scene.add(submarine.get());
        const animate = () => {
            terrainArray.forEach((cube) => {
                cube.move();
            });

            this.renderer.render(this.scene, this.camera);
        }
        this.renderer.setAnimationLoop(animate);
    }
    endGame() {

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