declare function readline(): string

const r1 = readline()
const r2 = readline()

function generateNextNumber(startingNumber: string): string {
    const sum = Array.from(startingNumber).map(Number).reduce((p, c) => {
        return p + c
    })
    return (parseInt(startingNumber) + sum).toString()
}

function findMeetingPoint(river1: string, river2: string): string {    
    while(river1 !== river2) {
        if (parseInt(river1) > parseInt(river2)) {
            river2 = generateNextNumber(river2)
        } else {
            river1 = generateNextNumber(river1)
        }
    }
    return river1
}

console.log(findMeetingPoint(r1, r2))