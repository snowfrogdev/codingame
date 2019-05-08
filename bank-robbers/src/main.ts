declare function readline(): string

const R = parseInt(readline());
const V = parseInt(readline());

const times: number[] = []

for (let i = 0; i < V; i++) {
    const inputs = readline().split(' ');
    const C = parseInt(inputs[0]);
    const N = parseInt(inputs[1]);

    if (i < R) {
        times.push(0)
    }
    // See https://www.xarg.org/puzzle/codingame/bank-robbers/
    times.sort((a, b) => a - b)[0] += 5**C << N
}

const total = times.sort((a, b) => a - b)[times.length - 1] 

console.log(total)
