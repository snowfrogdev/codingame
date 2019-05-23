class Pixel {
    private energy_: number = 0
    private cumulativeEnergy_: number = 0;

    constructor(readonly grayscale: number) { }

    get energy(): number {
        return this.energy_
    }
    set energy(value: number) {
        this.energy_ = value
    }
    get cumulativeEnergy(): number {
        return this.cumulativeEnergy_;
    }
    set cumulativeEnergy(value: number) {
        this.cumulativeEnergy_ = value;
    }
}

export class PgmImage {
    constructor(private imageFile_: string) { }

    removeSeam(): string {
        const pixels = this.imageFile_.split('\n').slice(4).map(row => row.split(' ').map(grayscale => new Pixel(Number(grayscale))))

        if (pixels.length < 3 && pixels[0].length < 3) {
            return '0'
        }

        this.computeGradientMagnitude_(pixels);

        this.computeCumulativeEnergy_(pixels);

        const pathOfLeastEnergy = pixels[pixels.length - 1].reduce((p, c, x, array) => {
            /*if (x === 0 || x === array.length -1) {
                return p
            }*/
            return Math.min(p, c.cumulativeEnergy)
        }, Infinity)

        return pathOfLeastEnergy.toString()
    }

    private computeCumulativeEnergy_(pixels: Pixel[][]) {
        pixels.forEach((row, y, array) => {
            return row.forEach((pixel, x) => {
                if (y === 0) {
                    pixel.cumulativeEnergy = pixel.energy
                    return
                }
                let northWest = Infinity
                let northEast = Infinity
                if (x !== 0) {
                    northWest = array[y - 1][x - 1].cumulativeEnergy                    
                }
                if (x !== row.length - 1) {
                    northEast = array[y - 1][x + 1].cumulativeEnergy
                }
                const north = array[y - 1][x].cumulativeEnergy;
                pixel.cumulativeEnergy = Math.min(northWest, north, northEast) + pixel.energy
            })
        })
    }

    private computeGradientMagnitude_(pixels: Pixel[][]) {
        pixels.forEach((row, y, array) => {
            return row.forEach((pixel, x) => {
                let xGradient = 0
                let yGradient = 0
                if (x !== 0 && x !== row.length - 1) {
                    xGradient = row[x + 1].grayscale - row[x - 1].grayscale
                }
                if (y !== 0 && y !== array.length - 1) {
                    yGradient = array[y + 1][x].grayscale - array[y - 1][x].grayscale
                }
                pixel.energy = Math.abs(xGradient) + Math.abs(yGradient)
            })
        })
    }

    private isWithinBounds(array: Pixel[][], y: number, row: Pixel[], x: number) {
        return array[y + 1] !== undefined && array[y - 1] !== undefined && row[x + 1] !== undefined && row[x - 1] !== undefined
    }
}
