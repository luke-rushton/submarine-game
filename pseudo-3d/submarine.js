import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const subSprite = new THREE.TextureLoader().load('yellow-sub-neutral.png');
const material = new THREE.SpriteMaterial({ map: subSprite });
class Submarine {
    constructor() {
        this.x = 250; //update initial position here there is a minor float up at start due to this position. update to start at neutral?
        this.y = 250;
        this.x2 = 250 + 64; //magic numbers for submarine size. make universal?
        this.y2 = 250 + 32;
        this.neutral = (this.ceiling + this.floor) / 2; //take into account sub sprite offset?
        this.movingUp = false;
        this.movingDown = false;
        this.sprite = new THREE.Sprite(material);
        //maybe adjust hitbox for float up and down? so pic is not cut
        //this.neutralFloat = submarineImg; //maybe directly assign src
        //this.upFloat = submarineUpImg; //maybe directly assign src
        //this.downFloat = submarineDownImg; //maybe directly assign src
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
        if (this.y > this.ceiling) {
            this.y -= 5;
            this.y2 -= 5;
        }
    }
    sink() {
        if (this.y < this.floor) {
            this.y += 5;
            this.y2 += 5;
        }
    }
    reset() {
        if (this.y < this.neutral) {
            this.y += 2.5; //floats back at half speed of control
            this.y2 += 2.5;
        }
        if (this.y > this.neutral) {
            this.y -= 2.5;
            this.y2 -= 2.5;
        }
    }
    checkCollision() {

    }
}
export { Submarine };