class Pixel {
    private energy_!: number
    constructor(readonly grayscale: number) {}

    get energy() {
        return this.energy_
    }

    set energy(value: number) {
        this.energy_ = value
    }
}

export class PgmImage {
    constructor(private imageFile_: string) { }

    removeSeam(): string {
        const pixels = this.imageFile_.split('\n').slice(4).map(row => row.split(' ').map(grayscale => new Pixel(Number(grayscale))))

        if (pixels.length < 3 || pixels[0].length < 3) {
            return '0'
        }

        pixels.forEach((row, y, array) => {
            return row.forEach((pixel, x) => {
                if (this.isWithinBounds(array, y, row, x)) {
                    const xGradient = row[x + 1].grayscale - row[x - 1].grayscale
                    const yGradient = array[y + 1][x].grayscale - array[y - 1][x].grayscale
                    pixel.energy = Math.abs(xGradient) + Math.abs(yGradient)
                }
                return 0              
            })
        })

        const leastEnergyPixelInMiddleRow = pixels[1].reduce((p, c, x, array) => {
            if (x === 0 || x === array.length -1) {
                return p
            }
            if (p <= c.energy) {
                return p
            }
            return c.energy
        }, Infinity)

        let leastEnergyPixelIn3rdRow = 0
        if (pixels.length > 3) {
            leastEnergyPixelIn3rdRow = pixels[2].reduce((p, c, x, array) => {
                if (x === 0 || x === array.length -1) {
                    return p
                }
                if (p <= c.energy) {
                    return p
                }
                return c.energy
            }, Infinity)
        }

        return (leastEnergyPixelInMiddleRow + leastEnergyPixelIn3rdRow).toString()
    }

    private isWithinBounds(array: Pixel[][], y: number, row: Pixel[], x: number) {
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
