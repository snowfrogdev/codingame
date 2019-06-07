import { addLineToGrid, grid, predictIndyPos } from "./predict-indy-pos";

declare function readline(): string

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(" ");
const W = parseInt(inputs[0]); // number of columns.
const H = parseInt(inputs[1]); // number of rows.
for (let i = 0; i < H; i++) {
  const LINE = readline(); // represents a line in the grid and contains W integers. Each integer represents one room of a given type.
  addLineToGrid(LINE);
}
const EX = parseInt(readline()); // the coordinate along the X axis of the exit (not useful for this first mission, but must be read).

// game loop
while (true) {
  var inputs = readline().split(" ");
  const XI = parseInt(inputs[0]);
  const YI = parseInt(inputs[1]);
  const POS = inputs[2];

  

  console.log(predictIndyPos(YI, XI, POS));
}
