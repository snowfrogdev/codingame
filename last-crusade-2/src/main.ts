import { addLineToGrid, grid, predictIndyPos } from './predict-indy-pos';

declare function readline(): string;

var inputs = readline().split(' ');
const W = parseInt(inputs[0]); // number of columns.
const H = parseInt(inputs[1]); // number of rows.
for (let i = 0; i < H; i++) {
  const LINE = readline(); // each line represents a line in the grid and contains W integers T. The absolute value of T specifies the type of the room. If T is negative, the room cannot be rotated.
  addLineToGrid(LINE);
}

const EX = parseInt(readline()); // the coordinate along the X axis of the exit.

let turnCount = 0;
// game loop
while (true) {
  var inputs = readline().split(' ');
  const XI = parseInt(inputs[0]);
  const YI = parseInt(inputs[1]);
  const POSI = inputs[2];
  const R = parseInt(readline()); // the number of rocks currently in the grid.
  for (let i = 0; i < R; i++) {
    var inputs = readline().split(' ');
    const XR = parseInt(inputs[0]);
    const YR = parseInt(inputs[1]);
    const POSR = inputs[2];
  }

  // One line containing on of three commands: 'X Y LEFT', 'X Y RIGHT' or 'WAIT'
  const IndysNextPos = predictIndyPos(YI, XI, POSI);
  console.error(IndysNextPos)
  if (IndysNextPos) {
    const lookAhead = predictIndyPos(IndysNextPos.y, IndysNextPos.x, IndysNextPos.entry);
    if (!lookAhead) {
      console.log(`${IndysNextPos.x} ${IndysNextPos.y} LEFT`);
      continue;
    }
  }
  console.log('WAIT');

  turnCount++;
}
