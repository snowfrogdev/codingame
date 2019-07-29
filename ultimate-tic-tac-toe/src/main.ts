declare function readline(): string

while (true) {
  var inputs = readline().split(' ');
  const opponentRow = parseInt(inputs[0]);
  const opponentCol = parseInt(inputs[1]);
  const validActionCount = parseInt(readline());
  for (let i = 0; i < validActionCount; i++) {
    var inputs = readline().split(' ');
    const row = parseInt(inputs[0]);
    const col = parseInt(inputs[1]);
  }

  // Write an action using console.log()
  // To debug: console.error('Debug messages...');

  console.log('0 0');
}
