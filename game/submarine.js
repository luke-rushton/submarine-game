class Submarine {
    constructor() {
        this.x = 250; //update initial position here there is a minor float up at start due to this position. update to start at neutral?
        this.y = 250;
        this.ceiling = 0; //these 2 are for submarine up and down max height
        this.floor = 450;
        this.neutral = (this.ceiling + this.floor) / 2; //take into account sub sprite offset?
        this.movingUp = false;
        this.movingDown = false;
        this.neutralFloat = submarineImg; //maybe directly assign src
    }
    draw() {
        context.drawImage(this.neutralFloat, this.x, this.y);
    }
    float() { //maybe combine float and sink?
        if (this.y > this.ceiling) {
            this.y -= 5;
        }
    }
    sink() {
        if (this.y < this.floor) {
            this.y += 5;
        }
    }
    reset() {
        if (this.y < this.neutral) {
            this.y += 2.5; //floats back at half speed of control
        }
        if (this.y > this.neutral) {
            this.y -= 2.5;
        }
    }
    checkCollision() {
        rockArray.forEach((rock) => { //need to differentiate if rock is floor or ceiling
            if (this.x >= rock.x) { //lotsa magic happening here
                if (this.x <= rock.end) {
                    if (this.y <= rock.bot) { //not checking top bound but probably dont need to?
                        console.log('crash!');
                    }
                }
            }
        });
    }
}