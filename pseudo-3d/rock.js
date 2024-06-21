import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { scrollSpeed } from './game';
import { testGen } from './generators';

//info for cubes, does not change
const geometry = new THREE.BoxGeometry(20, 20, 20);
const matCapMaterial = new THREE.MeshMatcapMaterial();
const matCapTexture = new THREE.TextureLoader().load('/matcap.png');
const texture = new THREE.TextureLoader().load("/earth-texture.png");
matCapMaterial.map = texture;
matCapMaterial.matcap = matCapTexture;

class Rock {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dimensions = 20;
        this.x2 = x + this.dimensions;
        this.y2 = y + this.dimensions;
        this.terrainCube = new THREE.Mesh(geometry, matCapMaterial);
    }
    initialize() {
        this.terrainCube.position.x = this.x;
        this.terrainCube.position.y = this.y;
        this.terrainCube.position.z = 0;
    }
    get() {
        return this.terrainCube;
    }

    move() {
        this.terrainCube.position.x -= scrollSpeed;
        if (this.terrainCube.position.x < 0) {
            this.terrainCube.position.x = 1000;
            this.terrainCube.position.x -= scrollSpeed;
            this.terrainCube.position.y = testGen(this.y);
        }
        this.x = this.terrainCube.position.x;
        this.x2 = this.x + this.dimensions;
        this.y = this.terrainCube.position.y;
        this.y2 = this.y + this.dimensions;
    }
}
export { Rock };