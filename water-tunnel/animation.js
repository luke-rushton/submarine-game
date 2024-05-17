//code from https://www.freecodecamp.org/news/how-to-create-animated-bubbles-with-html5-canvas-and-javascript/

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 512;

let scale = 10; //scales the noise. higher = noisier

const rockArray = [];
class Rock {
	constructor(x = 0, y = 0, xPerlin = 0, yPerlin = 0) {
		this.x = x;
        this.xOrigin = x;
		this.y = y;
        this.xPerlin = xPerlin;
        this.yPerlin = yPerlin;
        this.color = 255;
	}

	//draw circle
	draw() {
		context.beginPath();
		context.rect(this.x, this.y, 32, 32)
        context.stroke();
        context.fillStyle = 'rgb(' + this.color + ', ' + this.color + ',' + this.color + ')'; //uncomment this one for black and white
		context.fill();
	}

	// move circle
    //need to fix:
    //seem is not perfect got to calculate correct values
    //update so works at different window sizes
	move() {
		this.x = this.x + this.dx;
		if (this.x < -32){
            this.x = canvas.width + 32;
            this.xOrigin = this.xOrigin + this.x;
            //this.xPerlin = this.xPerlin + (1950 / (parseInt(canvas.width) / 2));
            this.xPerlin = this.xOrigin / parseInt(canvas.width) / 2;
            this.radius = Math.abs(parseInt(perlin.get(this.xPerlin, this.yPerlin) * 250))/2;
            this.color = this.radius * 2;
        }
	}
}

const generateTerrain = (event) => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    rockArray.length = 0;

    perlin.seed();
    for(let y = 0; y < canvas.height; y= y + 32){
        for(let x = -32; x < canvas.width + 32; x = x + 32){
            let xPerlin = x / parseInt(canvas.width) * scale;
            let yPerlin = y / parseInt(canvas.height) * scale;
            let perlinVal = perlin.get(xPerlin, yPerlin);
            const rock = new Rock(x, y, xPerlin, yPerlin);
            if(perlinVal>0){
                if (352 < y){
                    rockArray.push(rock);
                }
                if (128 > y){
                    rockArray.push(rock);
                }
            }

            
        }
    }
	
};

//  const animate = () => {
// 	context.clearRect(0, 0, canvas.width, canvas.height);

// 	rockArray.forEach((rock) => {
// 		rock?.move();
// 		rock?.draw();
// 	});

// 	requestAnimationFrame(animate);
// }; 

const generate = () => {
	context.clearRect(0, 0, canvas.width, canvas.height);
    generateTerrain();
	rockArray.forEach((rock) => {
		rock?.draw();
	});
};

//animate();

canvas.addEventListener("click", generate);

