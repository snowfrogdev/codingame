"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VanillaArrayConstructor = Array;
class Array2D extends VanillaArrayConstructor {
    constructor(...args) {
        super(...args);
    }
    static from(array2D) {
        if (!array2D[0] || !(array2D[0] instanceof Array)) {
            throw new Error('Array2D.from() was called with an invalid parameter. Parameter must be of type Array<Array<T>>.');
        }
        return new Array2D(...array2D);
    }
    getIndicesNorthOf(heightIndex, widthIndex) {
        return [heightIndex - 1, widthIndex];
    }
    getNorthOf(heightIndex, widthIndex) {
        return this.get(this.getIndicesNorthOf(heightIndex, widthIndex));
    }
    getIndicesNorthEastOf(heightIndex, widthIndex) {
        return [heightIndex - 1, widthIndex + 1];
    }
    getNorthEastOf(heightIndex, widthIndex) {
        return this.get(this.getIndicesNorthEastOf(heightIndex, widthIndex));
    }
    getIndicesEastOf(heightIndex, widthIndex) {
        return [heightIndex, widthIndex + 1];
    }
    getEastOf(heightIndex, widthIndex) {
        return this.get(this.getIndicesEastOf(heightIndex, widthIndex));
    }
    getIndicesSouthEastOf(heightIndex, widthIndex) {
        return [heightIndex + 1, widthIndex + 1];
    }
    getSouthEastOf(heightIndex, widthIndex) {
        return this.get(this.getIndicesSouthEastOf(heightIndex, widthIndex));
    }
    getIndicesSouthOf(heightIndex, widthIndex) {
        return [heightIndex + 1, widthIndex];
    }
    getSouthOf(heightIndex, widthIndex) {
        return this.get(this.getIndicesSouthOf(heightIndex, widthIndex));
    }
    getIndicesSouthWestOf(heightIndex, widthIndex) {
        return [heightIndex + 1, widthIndex - 1];
    }
    getSouthWestOf(heightIndex, widthIndex) {
        return this.get(this.getIndicesSouthWestOf(heightIndex, widthIndex));
    }
    getIndicesWestOf(heightIndex, widthIndex) {
        return [heightIndex, widthIndex - 1];
    }
    getWestOf(heightIndex, widthIndex) {
        return this.get(this.getIndicesWestOf(heightIndex, widthIndex));
    }
    getIndicesNorthWestOf(heightIndex, widthIndex) {
        return [heightIndex - 1, widthIndex - 1];
    }
    getNorthWestOf(heightIndex, widthIndex) {
        return this.get(this.getIndicesNorthWestOf(heightIndex, widthIndex));
    }
    get(heightIndexOrIndices, widthIndex) {
        let heightIndex;
        if (heightIndexOrIndices instanceof Array) {
            heightIndex = heightIndexOrIndices[0];
            widthIndex = heightIndexOrIndices[1];
        }
        else {
            heightIndex = heightIndexOrIndices;
        }
        if (!this[heightIndex]) {
            return undefined;
        }
        return this[heightIndex][widthIndex];
    }
}
exports.Array2D = Array2D;
