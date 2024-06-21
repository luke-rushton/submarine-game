import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gameHeight } from './game';
import { gameWidth } from './game';
import { terrainArray } from './game';

let counter = 0;
const subSprite = new THREE.TextureLoader().load('yellow-sub-neutral.png');
const material = new THREE.SpriteMaterial({ map: subSprite });
class Submarine {
    constructor() {
        this.x = 250; //update initial position here there is a minor float up at start due to this position. update to start at neutral?
        this.y = 250;
        this.x2 = 250 + 64; //magic numbers for submarine size. make universal?
        this.y2 = 250 + 32;
        this.neutral = (gameHeight) / 2; //take into account sub sprite offset?
        this.ceiling = gameHeight;
        this.floor = 0;
        this.movingUp = false;
        this.movingDown = false;
        this.sprite = new THREE.Sprite(material);
    }
    initialize() {
        this.sprite.position.x = this.x;
        this.sprite.position.y = this.y;
        this.sprite.position.z = 0;
        this.sprite.scale.set(64, 32, 1);
    }
    get() {
        return this.sprite;

    }

    float() { //maybe combine float and sink?
        if (this.sprite.position.y < this.ceiling) {
            this.sprite.position.y += 4;
            this.y += 4;
            this.y2 += 4;
        }
    }
    sink() {
        if (this.sprite.position.y > this.floor) {
            this.sprite.position.y -= 4;
            this.y -= 4;
            this.y2 -= 4;
        }

    }
    reset() {
        if (this.sprite.position.y < this.neutral) {
            this.sprite.position.y += 2; //floats back at half speed of control
            this.y += 2;
            this.y2 += 2;
        }
        if (this.sprite.position.y > this.neutral) {
            this.sprite.position.y -= 2;
            this.y -= 2;
            this.y2 -= 2;
        }
    }
    checkCollision() {
        let hasCollided = false;
        terrainArray.forEach((cube) => {
            //hitbox based of https://stackoverflow.com/questions/306316/determine-if-two-rectangles-overlap-each-other
            if (this.x < cube.x2 && this.x2 > cube.x && this.y2 > cube.y && this.y < cube.y2) {
                hasCollided = true;
            }
        });
        return hasCollided;
    }
}
export { Submarine };