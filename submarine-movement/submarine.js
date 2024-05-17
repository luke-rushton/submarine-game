//code from https://www.freecodecamp.org/news/how-to-create-animated-bubbles-with-html5-canvas-and-javascript/

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 512;
let mainSub;

const rockArray = [];
class Submarine {
	constructor(x = 256, y = 256) {
		this.x = x;
		this.y = y;
        this.height = 32;
        this.width = 64;
        this.img = document.getElementById('submarine');
        this.asc = document.getElementById('submarine-asc');
        this.dsc = document.getElementById('submarine-dsc');
	}

	//draw circle
	draw() {
		context.drawImage(this.img, this.x, this.y);
	}

	move(amount) {;
		context.clearRect(0, 0, canvas.width, canvas.height);
        this.y = this.y + amount;
        if(amount > 0){
            context.drawImage(this.dsc, this.x, this.y);
        }else{
            context.drawImage(this.asc, this.x, this.y);
        }
	}
}

const generate = () => {
	mainSub = new Submarine();
    mainSub.draw();
};

canvas.addEventListener("click", generate);

window.addEventListener("keydown", moveSomething, false);
  
function moveSomething(e) {
    switch(e.keyCode) {
        case 13:
            //enter key pressed
            generate();
            break;
        case 38:
            // up key pressed
            mainSub.move(-5);
            break;
        case 40:
            // down key pressed
            mainSub.move(5);
            break;  
    }   
}   

