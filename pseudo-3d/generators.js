import { gameHeight } from "./game";
import { Rock } from "./rock";
import { tunnelWidth } from "./game";
import { rockSize } from "./game";

//intializes the rock array.
function initialGeneration() {
    // for (let i = 0; i < 1020; i += 20) {
    //     const terrainCubeT = new Rock(i, 400);
    //     const terrainCubeB = new Rock(i, 80);
    //     terrainCubeT.initialize();
    //     terrainCubeB.initialize();
    //     terrainArray.push(terrainCubeT);
    //     terrainArray.push(terrainCubeB);
    // }
    const cubeArray = [];
    for (let i = 0; i < 1000; i += rockSize) {
        const terrainCubeT = new Rock(i, gameHeight - (tunnelWidth * rockSize));
        const terrainCubeB = new Rock(i, (tunnelWidth * rockSize));
        terrainCubeT.initialize();
        terrainCubeB.initialize();
        cubeArray.push(terrainCubeT);
        cubeArray.push(terrainCubeB);
    }
    return cubeArray;
}

export { initialGeneration };

let currentCeilingHeight = gameHeight - tunnelWidth * 20;
let minCeilingHeight = tunnelWidth * 20 + Math.floor(Math.random() * gameHeight / 20) * 20;
let currentFloorHeight = tunnelWidth * 20;
let isDescending = true;
let isCeiling = true;
let ceilingHeight = 0;
let flatSegment = 0;

function resetGenerationGlobals() {
    currentCeilingHeight = gameHeight - tunnelWidth * 20;
    minCeilingHeight = tunnelWidth * 20 + Math.floor(Math.random() * gameHeight / 20) * 20;
    currentFloorHeight = tunnelWidth * 20;
    isDescending = true;
    isCeiling = true;
    ceilingHeight = 0;
    flatSegment = 0;
}
export { resetGenerationGlobals };
//this generator sucks and i hate it
function testGen(height) {
    if (isCeiling) {
        isCeiling = false;
        if (isDescending) {
            if (currentCeilingHeight > minCeilingHeight) {
                currentCeilingHeight -= 10;
                currentFloorHeight -= 10;
            } else {
                isDescending = false;
                minCeilingHeight = tunnelWidth * 20 + Math.floor(Math.random() * gameHeight / 20) * 20;

            }
        } else {
            if (currentCeilingHeight < gameHeight - rockSize) {
                currentCeilingHeight += 10;
                currentFloorHeight += 10;
            } else {
                isDescending = true;
            }
        }
        return currentCeilingHeight;
    } else {
        isCeiling = true;
        if (currentFloorHeight < 20) {
            return 20;
        } else {
            return currentFloorHeight;
        }
    }


}
export { testGen };