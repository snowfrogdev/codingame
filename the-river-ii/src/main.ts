declare function readline(): string

const r1 = parseInt(readline());

function generateNextNumber(startingNumber: string): string {
    const sum = Array.from(startingNumber).map(Number).reduce((p, c) => {
        return p + c
    })
    return (parseInt(startingNumber) + sum).toString()
}

let answer = 'NO'

const cache = new Set<number>()
for (let i = r1 - 1; i >= 1; i--) {
    if (answer === 'YES') {
        break
    }
    let candidate = i
    while(candidate <= r1) {
        candidate = parseInt(generateNextNumber(candidate.toString()))
        if (cache.has(candidate)) {
            break
        }
        if (candidate === r1) {
            answer = 'YES'
            break
        }
        cache.add(candidate)
    }
}

console.log(answer);