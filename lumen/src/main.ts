declare function readline(): string

const ROOM_SIZE = parseInt(readline())
const LIGHT_STRENGTH = parseInt(readline())

const room: number[][] = []

for (let i = 0; i < ROOM_SIZE; i++) {
    const LINE = readline().replace(/\s/g, '')
    let mappedRow: number[] = []
    
    for (let j = 0; j < ROOM_SIZE; j++) {
        if (LINE.charAt(j) === 'C') {
            mappedRow.push(LIGHT_STRENGTH)
        } else {
            mappedRow.push(0)
        }
    }    room.push(mappedRow)
}

class Position {
    constructor(public x: number, public y: number) {}
}

const findAdjacentSpotFunctions = [
    (x: number, y: number) => new Position(x, y - 1),
    (x: number, y: number) => new Position(x + 1, y - 1),
    (x: number, y: number) => new Position(x + 1, y),
    (x: number, y: number) => new Position(x + 1, y + 1),
    (x: number, y: number) => new Position(x, y + 1),
    (x: number, y: number) => new Position(x - 1, y + 1),
    (x: number, y: number) => new Position(x - 1, y),
    (x: number, y: number) => new Position(x - 1, y - 1),
]

function mapRoom(lightStrength: number) {
    if (!lightStrength) {
        return
    }

    room.forEach((row, i) => {
        for (let j = 0; j < ROOM_SIZE; j++) {
            if (row[j] === lightStrength) {
                findAdjacentSpotFunctions.forEach(findAdjacentSpot => {
                    const spot = findAdjacentSpot(j, i)
                    if (spot.y >=0 && spot.x >= 0 && spot.y < ROOM_SIZE && spot.x < ROOM_SIZE) {                        
                        const adjacentSpot = room[spot.y][spot.x]
                        if (adjacentSpot < lightStrength - 1)
                        room[spot.y][spot.x] = lightStrength - 1 
                    }
                })
            }
        }
    })
    
    mapRoom(lightStrength - 1)
}

mapRoom(LIGHT_STRENGTH)

const answer = room.reduce((count, row) => {
    for (const spot of row) {
        if (spot === 0) {
            count += 1
        }
    }
    return count
}, 0)


console.log(answer)
