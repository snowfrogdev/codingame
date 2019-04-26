declare function readline(): string

const ROOM_SIZE = parseInt(readline())
const LIGHT_STRENGTH = parseInt(readline())

const room: string[] = []

for (let i = 0; i < ROOM_SIZE; i++) {
    const LINE = readline()
    room.push(LINE.replace(/\s/g, ''))
}

const mappedRoom = room.map((row, i) => {
    let mappedRow: number[] = []   
    for (let j = 0; j < ROOM_SIZE; j++) {        
           if (row.charAt(j) === 'C') {
               mappedRow.push(LIGHT_STRENGTH)
           } else {
               mappedRow.push(0)
           }
           
    }
    return mappedRow
})

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

    mappedRoom.forEach((row, i) => {
        for (let j = 0; j < ROOM_SIZE; j++) {
            if (row[j] === lightStrength) {
                findAdjacentSpotFunctions.forEach(findAdjacentSpot => {
                    const spot = findAdjacentSpot(j, i)
                    if (spot.y >=0 && spot.x >= 0 && spot.y < ROOM_SIZE && spot.x < ROOM_SIZE) {                        
                        const adjacentSpot = mappedRoom[spot.y][spot.x]
                        if (adjacentSpot < lightStrength - 1)
                        mappedRoom[spot.y][spot.x] = lightStrength - 1 
                    }
                })
            }
        }
    })
    
    mapRoom(lightStrength - 1)
}

mapRoom(LIGHT_STRENGTH)

const answer = mappedRoom.reduce((count, row) => {
    for (const spot of row) {
        if (spot === 0) {
            count += 1
        }
    }
    return count
}, 0)


console.log(answer)

/*
Example for the light spread N = 5, L = 3:
5
3
C X X X C
X X X X X
X X X X X
X X X X X
C X X X C

3 2 1 2 3
2 2 1 2 2
1 1 1 1 1
2 2 1 2 2
3 2 1 2 3
*/