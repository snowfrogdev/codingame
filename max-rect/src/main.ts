declare function readline(): string

const inputs = readline().split(' ')
const W = parseInt(inputs[0])
const H = parseInt(inputs[1])

const globalRectangle: number[][] = []
for (let i = 0; i < H; i++) {
    const LINE = readline();
    globalRectangle.push(LINE.split(' ').map(Number))
}

class Point {
    constructor(public x: number, public y: number) {}
}

class Rectangle {
    constructor(public startPoint: Point, public endPoint: Point) {}
}

const endTime = Date.now() + 2000
let startingRectangle = generateRandomRect()
let bestRectangle = startingRectangle
let bestSum = sumRect(startingRectangle)

while(Date.now() < endTime) {
    const candidateRectangle = findLocalOptima(startingRectangle)
    const sum = sumRect(candidateRectangle)
    if (sum > bestSum) {
        bestRectangle = candidateRectangle
        bestSum = sum
    }
    startingRectangle = generateRandomRect()
}

console.log(bestSum)


function generateRandomRect(): Rectangle {
    const startPoint = new Point(Math.round(Math.random() * (W - 1)), Math.round(Math.random() * (H - 1)))

    const endPoint = new Point(
        Math.round(Math.random() * ((W - 1) - startPoint.x) + startPoint.x),
        Math.round(Math.random() * ((H - 1) - startPoint.y) + startPoint.y)
    )

    return new Rectangle(startPoint, endPoint)
}

function sumRect(rectangle: Rectangle): number {
    let sum = 0
    for (let y = rectangle.startPoint.y; y <= rectangle.endPoint.y; y++) {
        for (let x = rectangle.startPoint.x; x <= rectangle.endPoint.x; x++) {
            sum += globalRectangle[y][x]
        }
    }
    
    return sum
}

function findLocalOptima(currentRectangle: Rectangle): Rectangle {
    while (true) {
        const neighbours = generateNeighbours(currentRectangle)
        let nextSum = -Infinity
        let nextRectangle = currentRectangle
        for (const neighbour of neighbours) {
            const sum = sumRect(neighbour)
            if (sum > nextSum) {
                nextRectangle = neighbour
                nextSum = sum
            }
        }
        if (nextSum <= sumRect(currentRectangle)) {
            return currentRectangle
        }
        currentRectangle = nextRectangle
    }
}

function generateNeighbours(rectangle: Rectangle): Rectangle[] {
    const { startPoint, endPoint } = rectangle
    return [
        new Rectangle(startPoint, new Point(endPoint.x, Math.min(endPoint.y + 1, H - 1))),
        new Rectangle(startPoint, new Point(endPoint.x, Math.max(endPoint.y - 1, startPoint.y))),
        new Rectangle(startPoint, new Point(Math.min(endPoint.x + 1, W - 1), endPoint.y)),
        new Rectangle(startPoint, new Point(Math.max(endPoint.x - 1, startPoint.x), endPoint.y)),
        new Rectangle(new Point(startPoint.x, Math.min(startPoint.y + 1, endPoint.y)), endPoint),
        new Rectangle(new Point(startPoint.x, Math.max(startPoint.y - 1, 0)), endPoint),
        new Rectangle(new Point(Math.min(startPoint.x + 1, endPoint.x), startPoint.y), endPoint),
        new Rectangle(new Point(Math.max(startPoint.x - 1, 0), startPoint.y), endPoint),
    ]
}