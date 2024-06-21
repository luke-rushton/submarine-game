class Submarine {
    constructor() {
        this.x = 250; //update initial position here there is a minor float up at start due to this position. update to start at neutral?
        this.y = 250;
        this.x2 = 250 + 64; //magic numbers for submarine size. make universal?
        this.y2 = 250 + 32;
        this.ceiling = 0; //these 2 are for submarine up and down max height
        this.floor = 450;
        this.neutral = (this.ceiling + this.floor) / 2; //take into account sub sprite offset?
        this.movingUp = false;
        this.movingDown = false;
        //maybe adjust hitbox for float up and down? so pic is not cut
        this.neutralFloat = submarineImg; //maybe directly assign src
        this.upFloat = submarineUpImg; //maybe directly assign src
        this.downFloat = submarineDownImg; //maybe directly assign src

        //debug stuff
        this.geometry = new THREE.BoxGeometry(64, 32, 5);
    }
    draw() {
        if (this.movingUp) {
            context.drawImage(this.upFloat, this.x, this.y);
        } else if (this.movingDown) {
            context.drawImage(this.downFloat, this.x, this.y);
        } else {
            context.drawImage(this.neutralFloat, this.x, this.y);
        }
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
        let hasCollided = false;
        rockArray.forEach((rock) => { //need to differentiate if rock is floor or ceiling
            // if (this.x >= rock.x) { //lotsa magic happening here
            //     if (this.x <= rock.x2) {
            //         if (this.y <= rock.y2) { //not checking top bound but probably dont need to?
            //             console.log('crash!');
            //         }
            //     }
            // }
            //hitbox based of https://stackoverflow.com/questions/306316/determine-if-two-rectangles-overlap-each-other
            if (this.x < rock.x2 && this.x2 > rock.x && this.y < rock.y2 && this.y2 > rock.y) {
                hasCollided = true;
            }
        });
        return hasCollided;
    }
}