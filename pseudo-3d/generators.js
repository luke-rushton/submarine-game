//import { gameHeight } from "./game";
const gameHeight = 500;
//import { tunnelWidth } from "./game";
const tunnelWidth = 7;
import { rockSize } from "./game";


let currentCeilingHeight = gameHeight - tunnelWidth * 20;
let minCeilingHeight = tunnelWidth * 20 + Math.floor(Math.random() * gameHeight / 20) * 20;
let currentFloorHeight = tunnelWidth * 20;
let isDescending = true;
let isCeiling = true;

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