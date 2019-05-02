declare function readline(): string

const N = parseInt(readline());
const houses: number[] = []
for (let i = 0; i < N; i++) {
    houses.push(parseInt(readline()))    
}

function houseRobber(houses: number[]) {
    let currentMax = 0;
    let prevMax = 0;

    for (let i = 0; i < houses.length; i++) {
        let currentHouse = houses[i];
        let newMax = Math.max(currentMax, prevMax + currentHouse)
        prevMax = currentMax;
        currentMax = newMax;
    }

    return currentMax
}

console.log(houseRobber(houses));