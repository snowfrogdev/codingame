class Pixel {
    private energy_: number = 0
    private cumulativeEnergy_: number = 0
    private _parentPixelColumnIndex_: number = 0;

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
    get parentPixelColumnIndex_(): number {
        return this._parentPixelColumnIndex_;
    }
    set parentPixelColumnIndex_(value: number) {
        this._parentPixelColumnIndex_ = value;
    }
}

export class PgmImage {
    private seams_: number[][] = []
    constructor(private imageFile_: string) { }

    removeSeams(): string {
        let output = ''

        const lines = this.imageFile_.split('\n')
        const [W, H] = lines[1].split(' ').map(Number)
        const seamsToBeRemoved = W - parseInt(lines[2].split(' ')[1])
        const pixels = lines.slice(4).map(row => row.split(' ').map(grayscale => new Pixel(Number(grayscale))))

        if (pixels.length < 3 && pixels[0].length < 3) {
            return '0'
        }

        for (let i = 0; i < seamsToBeRemoved; i++) {
            this.computeGradientMagnitude_(pixels)
            this.computeCumulativeEnergy_(pixels)

            const pathOfLeastEnergy = pixels[pixels.length - 1].reduce((p, c, x, array) => {
                const current = { xIndex: x, cumulativeEnergy: c.cumulativeEnergy }
                const sortedArray = [p, current].sort((a, b) => a.cumulativeEnergy - b.cumulativeEnergy)
                return { xIndex: sortedArray[0].xIndex, cumulativeEnergy: sortedArray[0].cumulativeEnergy }
            }, { xIndex: 0, cumulativeEnergy: Infinity })

            output += pathOfLeastEnergy.cumulativeEnergy.toString() + '\n'

            let currentIndexToRemove = pathOfLeastEnergy.xIndex
            let nextXIndexToRemove;
            for (let y = pixels.length - 1; y >= 0; y--) {
                nextXIndexToRemove = pixels[y][currentIndexToRemove].parentPixelColumnIndex_
                pixels[y].splice(currentIndexToRemove, 1)
                currentIndexToRemove = nextXIndexToRemove
            }
        }

        return output.trim()
    }

    private computeCumulativeEnergy_(pixels: Pixel[][]) {
        pixels.forEach((row, y, array) => {
            const seam: number[] = []
            return row.forEach((pixel, x) => {
                if (y === 0) {
                    pixel.cumulativeEnergy = pixel.energy
                    return
                }

                const northWest = { xIndex: x - 1, cumulativeEnergy: Infinity }
                const northEast = { xIndex: x + 1, cumulativeEnergy: Infinity }
                const north = { xIndex: x, cumulativeEnergy: Infinity }
                if (x !== 0) {
                    northWest.cumulativeEnergy = array[y - 1][northWest.xIndex].cumulativeEnergy
                }
                if (x !== row.length - 1) {
                    northEast.cumulativeEnergy = array[y - 1][northEast.xIndex].cumulativeEnergy
                }
                north.cumulativeEnergy = array[y - 1][north.xIndex].cumulativeEnergy

                const sortedArray = [northWest, northEast, north].sort((a, b) => a.cumulativeEnergy - b.cumulativeEnergy)
                pixel.cumulativeEnergy = sortedArray[0].cumulativeEnergy + pixel.energy
                pixel.parentPixelColumnIndex_ = sortedArray[0].xIndex

                /*
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
                */
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
