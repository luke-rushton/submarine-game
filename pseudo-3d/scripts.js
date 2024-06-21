import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const myCanvas = document.getElementById("game-canvas");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1000 / 500, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: myCanvas });
renderer.setSize(1000, 500);
renderer.setClearColor(0x00ffff);


//generating cubes
const geometry = new THREE.BoxGeometry(20, 20, 20);

//loading a matcap for baked in shadows
const matCapMaterial = new THREE.MeshMatcapMaterial();
const matcapTexture = new THREE.TextureLoader().load('/matcap.png');
const texture = new THREE.TextureLoader().load("/earth-texture.png");
matCapMaterial.map = texture;
matCapMaterial.matcap = matcapTexture;

//adding the cubes
const terrainArray = [];
for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 25; j++) {
        const terrainCube = new THREE.Mesh(geometry, matCapMaterial);
        terrainCube.position.x = i * 20;
        terrainCube.position.y = j * 10;
        scene.add(terrainCube);
        terrainArray.push(terrainCube);
    }
}

//setting up camera
camera.position.z = 325;
camera.position.y = 250;
camera.position.x = 500;
camera.lookAt(500, 250, 0);

function animate() {
    terrainArray.forEach((cube) => {
        cube.position.x -= 2;
        if (cube.position.x < 0) {
            cube.position.x = 998;
        }
    });
    renderer.render(scene, camera);

}
renderer.setAnimationLoop(animate);