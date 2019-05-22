export class PgmImage {
    constructor(private imageFile_: string) { }

    removeSeam(): string {
        const pixels = this.imageFile_.split('\n').slice(4).map(row => row.split(' ').map(Number))

        if (pixels.length < 3 || pixels[0].length < 3) {
            return '0'
        }

        const pixelsWithEnergy = pixels.map((row, y, array) => {
            return row.map((pixel, x) => {
                if (this.isWithinBounds(array, y, row, x)) {
                    const xGradient = row[x + 1] - row[x - 1]
                    const yGradient = array[y + 1][x] - array[y - 1][x]
                    return Math.abs(xGradient) + Math.abs(yGradient)
                }
                return 0              
            })
        })

        const leastEnergyPixelInMiddleRow = pixelsWithEnergy[1].reduce((p, c, x, array) => {
            if (x === 0 || x === array.length -1) {
                return p
            }
            if (p <= c) {
                return p
            }
            return c
        }, Infinity)

        return leastEnergyPixelInMiddleRow.toString()
    }

    private isWithinBounds(array: number[][], y: number, row: number[], x: number) {
        return array[y + 1] !== undefined && array[y - 1] !== undefined && row[x + 1] !== undefined && row[x - 1] !== undefined;
    }
}



/*
dI/dx(x,y) = I(x+1,y) - I(x-1,y) if 0 < x < W-1
             0                   otherwise (left/right borders)
dI/dy(x,y) = I(x,y+1) - I(x,y-1) if 0 < y < H-1
             0                   otherwise (top/bottom borders)
E(x,y) = |dI/dx(x,y)| + |dI/dy(x,y)|
         (where |.| denotes the absolute value)

*/
