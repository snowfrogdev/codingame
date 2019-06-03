const VanillaArrayConstructor: new <T>(...args: T[]) => Array<T> = Array

export class Array2D<T> extends VanillaArrayConstructor<T[]> {
    constructor(...args: T[][]) {
        super(...args)
    }

    static from<T>(array2D: T[][]): Array2D<T> {
        if (!array2D[0] || !(array2D[0] instanceof Array) ) {
            throw new Error('Array2D.from() was called with an invalid parameter. Parameter must be of type Array<Array<T>>.')
        }
        return new Array2D(...array2D)
    }
    
    getNorthOf(heightIndex: number, widthIndex: number): T | undefined {
        return this.get(heightIndex - 1, widthIndex)
    }

    getNorthEastOf(heightIndex: number, widthIndex: number): T | undefined {
        return this.get(heightIndex - 1, widthIndex + 1)
    }

    getEastOf(heightIndex: number, widthIndex: number): T | undefined {
        return this[heightIndex][widthIndex + 1]
    }

    getSouthEastOf(heightIndex: number, widthIndex: number): T | undefined {
        return this.get(heightIndex + 1, widthIndex + 1)
    }

    getSouthOf(heightIndex: number, widthIndex: number): T | undefined {
        return this.get(heightIndex + 1, widthIndex)
    }

    getSouthWestOf(heightIndex: number, widthIndex: number): T | undefined {
        return this.get(heightIndex + 1, widthIndex - 1)
    }

    getWestOf(heightIndex: number, widthIndex: number): T | undefined {
        return this[heightIndex][widthIndex - 1]
    }

    getNorthWestOf(heightIndex: number, widthIndex: number): T | undefined {
        return this.get(heightIndex - 1, widthIndex - 1)
    }

    get(heightIndex: number, widthIndex: number): T | undefined {
        if (!this[heightIndex]) {
            return undefined
        }
        return this[heightIndex][widthIndex]
    }
}
