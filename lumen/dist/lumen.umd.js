(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    var ROOM_SIZE = parseInt(readline());
    var LIGHT_STRENGTH = parseInt(readline());
    var room = [];
    for (var i = 0; i < ROOM_SIZE; i++) {
        var LINE = readline();
        // TODO: Remove spaces from LINE
        room.push();
    }
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

}));
