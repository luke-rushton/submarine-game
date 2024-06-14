function flatGeneration(rockSize) {
    for (let x = -rockSize; x < (1000 + rockSize); x += rockSize) { //+rockSize to account for ofscreen generation to avoid gaps
        for (let y = 0; y < 3; y++) {
            const rock = new Rock(x, y * rockSize);
            const rockb = new Rock(x, (500 - rockSize) - y * rockSize); //finds bottom point to start from
            rockArray.push(rock);
            rockArray.push(rockb);
        }
    }
}
function waveGeneration(rockSize) {
    let startVal = 0;
    let direction = 1;
    for (let x = -rockSize; x < (1000 + rockSize); x += rockSize) {
        for (let y = 0; y < startVal; y++) {
            const rock = new Rock(x, y * rockSize);
            const rockb = new Rock(x, (500 - rockSize) - y * rockSize);
            rockArray.push(rock);
            rockArray.push(rockb);
        }
        if (startVal === 0) {
            direction = 1;
        }
        if (startVal === 3) {
            direction = -1;
        }
        startVal += direction;
    }
}