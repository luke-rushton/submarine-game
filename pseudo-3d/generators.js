import { terrainArray } from "./game";
import { Rock } from "./rock";

//intializes the rock array.
function initialGeneration() {
    for (let i = 0; i < 1020; i += 20) {
        const terrainCubeT = new Rock(i, 400);
        const terrainCubeB = new Rock(i, 80);
        terrainCubeT.initialize();
        terrainCubeB.initialize();
        terrainArray.push(terrainCubeT);
        terrainArray.push(terrainCubeB);
    }
}

export { initialGeneration };

//this generator sucks and i hate it
function testGen(height) {


}