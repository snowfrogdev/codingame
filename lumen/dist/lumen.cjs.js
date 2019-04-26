'use strict';

var ROOM_SIZE = parseInt(readline());
var LIGHT_STRENGTH = parseInt(readline());
var room = [];
for (var i = 0; i < ROOM_SIZE; i++) {
    var LINE = readline();
    room.push(LINE.replace(/\s/g, ''));
}
var mappedRoom = room.map(function (row, i) {
    var mappedRow = [];
    for (var j = 0; j < ROOM_SIZE; j++) {
        if (row.charAt(j) === 'C') {
            mappedRow.push(LIGHT_STRENGTH);
        }
        else {
            mappedRow.push(0);
        }
    }
    return mappedRow;
});
var Position = /** @class */ (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    return Position;
}());
var findAdjacentSpotFunctions = [
    function (x, y) { return new Position(x, y - 1); },
    function (x, y) { return new Position(x + 1, y - 1); },
    function (x, y) { return new Position(x + 1, y); },
    function (x, y) { return new Position(x + 1, y + 1); },
    function (x, y) { return new Position(x, y + 1); },
    function (x, y) { return new Position(x - 1, y + 1); },
    function (x, y) { return new Position(x - 1, y); },
    function (x, y) { return new Position(x - 1, y - 1); },
];
function mapRoom(lightStrength) {
    if (!lightStrength) {
        return;
    }
    mappedRoom.forEach(function (row, i) {
        var _loop_1 = function (j) {
            if (row[j] === lightStrength) {
                findAdjacentSpotFunctions.forEach(function (findAdjacentSpot) {
                    var spot = findAdjacentSpot(j, i);
                    if (spot.y >= 0 && spot.x >= 0 && spot.y < ROOM_SIZE && spot.x < ROOM_SIZE) {
                        var adjacentSpot = mappedRoom[spot.y][spot.x];
                        if (adjacentSpot < lightStrength - 1)
                            mappedRoom[spot.y][spot.x] = lightStrength - 1;
                    }
                });
            }
        };
        for (var j = 0; j < ROOM_SIZE; j++) {
            _loop_1(j);
        }
    });
    mapRoom(lightStrength - 1);
}
mapRoom(LIGHT_STRENGTH);
var answer = mappedRoom.reduce(function (count, row) {
    for (var _i = 0, row_1 = row; _i < row_1.length; _i++) {
        var spot = row_1[_i];
        if (spot === 0) {
            count += 1;
        }
    }
    return count;
}, 0);
console.log(answer);
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
