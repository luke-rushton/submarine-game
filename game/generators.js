//intializes the rock array.
function initialGeneration() {
    for (let x = -rockHeight; x < (1000 + rockHeight); x += rockHeight) { //+rockSize to account for ofscreen generation to avoid gaps
        const rock = new Rock(x, tunnelWidth * rockHeight);
        const rockb = new Rock(x, (500 - rockHeight) - tunnelWidth * rockHeight); //finds bottom point to start from
        rockArray.push(rock);
        rockArray.push(rockb);
    }
}

//params for generating infinite terrain
let maxTunnelHeight = Math.floor(Math.random() * 20);
let currentHeight = tunnelWidth;
let isDescending = true;
let isCeiling = true;
let ceilingHeight = 0;

function testGen(height) {
    if (isCeiling) {
        if (currentHeight <= 0) {
            isDescending = true;
        }
        if (isDescending && currentHeight >= maxTunnelHeight) {
            isDescending = false;
            maxTunnelHeight = Math.floor(Math.random() * 20);
            console.log(maxTunnelHeight);
        }


        if (isDescending) {
            currentHeight += 1;
        } else {
            currentHeight -= 1;
        }
        isCeiling = false;
        ceilingHeight = currentHeight * rockHeight;
        return ceilingHeight;
    }
    else {
        isCeiling = true;
        floor = ceilingHeight - tunnelWidth * rockHeight + (500 - rockHeight) - tunnelWidth * rockHeight;
        if (floor >= 500) {
            return 500 - rockHeight;
        } else {
            return floor;
        }
    }

}