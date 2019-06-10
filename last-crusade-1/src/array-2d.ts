const VanillaArrayConstructor: new <T>(...args: T[]) => Array<T> = Array;

export class Array2D<T> extends VanillaArrayConstructor<T[]> {
  constructor(...args: T[][]) {
    super(...args);
  }

  static from<T>(array2D: T[][]): Array2D<T> {
    if (!array2D[0] || !(array2D[0] instanceof Array)) {
      throw new Error(
        'Array2D.from() was called with an invalid parameter. Parameter must be of type Array<Array<T>>.'
      );
    }
    return new Array2D(...array2D);
  }

  getIndicesNorthOf(heightIndex: number, widthIndex: number): [number, number] {
    return [heightIndex - 1, widthIndex];
  }
  getNorthOf(heightIndex: number, widthIndex: number): T | undefined {
    return this.get(this.getIndicesNorthOf(heightIndex, widthIndex));
  }

  getIndicesNorthEastOf(heightIndex: number, widthIndex: number): [number, number] {
    return [heightIndex - 1, widthIndex + 1];
  }
  getNorthEastOf(heightIndex: number, widthIndex: number): T | undefined {
    return this.get(this.getIndicesNorthEastOf(heightIndex, widthIndex));
  }

  getIndicesEastOf(heightIndex: number, widthIndex: number): [number, number] {
    return [heightIndex, widthIndex + 1];
  }
  getEastOf(heightIndex: number, widthIndex: number): T | undefined {
    return this.get(this.getIndicesEastOf(heightIndex, widthIndex));
  }

  getIndicesSouthEastOf(heightIndex: number, widthIndex: number): [number, number] {
    return [heightIndex + 1, widthIndex + 1];
  }
  getSouthEastOf(heightIndex: number, widthIndex: number): T | undefined {
    return this.get(this.getIndicesSouthEastOf(heightIndex, widthIndex));
  }

  getIndicesSouthOf(heightIndex: number, widthIndex: number): [number, number] {
    return [heightIndex + 1, widthIndex];
  }
  getSouthOf(heightIndex: number, widthIndex: number): T | undefined {
    return this.get(this.getIndicesSouthOf(heightIndex, widthIndex));
  }

  getIndicesSouthWestOf(heightIndex: number, widthIndex: number): [number, number] {
    return [heightIndex + 1, widthIndex - 1];
  }
  getSouthWestOf(heightIndex: number, widthIndex: number): T | undefined {
    return this.get(this.getIndicesSouthWestOf(heightIndex, widthIndex));
  }

  getIndicesWestOf(heightIndex: number, widthIndex: number): [number, number] {
    return [heightIndex, widthIndex - 1];
  }
  getWestOf(heightIndex: number, widthIndex: number): T | undefined {
    return this.get(this.getIndicesWestOf(heightIndex, widthIndex));
  }

  getIndicesNorthWestOf(heightIndex: number, widthIndex: number): [number, number] {
    return [heightIndex - 1, widthIndex - 1];
  }
  getNorthWestOf(heightIndex: number, widthIndex: number): T | undefined {
    return this.get(this.getIndicesNorthWestOf(heightIndex, widthIndex));
  }

  get(indices: [number, number]): T | undefined;
  get(heightIndex: number, widthIndex: number): T | undefined;
  get(heightIndexOrIndices: number | [number, number], widthIndex?: number): T | undefined {
    let heightIndex: number;
    if (heightIndexOrIndices instanceof Array) {
      heightIndex = heightIndexOrIndices[0];
      widthIndex = heightIndexOrIndices[1];
    } else {
      heightIndex = heightIndexOrIndices;
    }

    if (!this[heightIndex]) {
      return undefined;
    }
    return this[heightIndex][widthIndex as number];
  }
}
