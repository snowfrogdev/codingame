declare function readline(): string

const ROOM_SIZE = parseInt(readline());
const LIGHT_STRENGTH = parseInt(readline());

const room: string[] = []

for (let i = 0; i < ROOM_SIZE; i++) {
    const LINE = readline()
    // TODO: Remove spaces from LINE
    room.push()
}

const mappedRoom = room.map((row, i) => {   
    for (let j = 0; j < ROOM_SIZE; j++) {
           // console.error(row.charAt(j))
    }
})

console.log(room);

/*
Example for the light spread N = 5, L = 3:
X X X X X
X C X X X
X X X X X
X X X X X
X X X X X

2 2 2 1 0
2 3 2 1 0
2 2 2 1 0
1 1 1 1 0
0 0 0 0 0
*/