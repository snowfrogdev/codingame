import { Array2D } from "./array-2d";
import { jsxExpressionContainer } from "@babel/types";

describe('Array2D Objects', () => {
    describe('The Array2D Constructor', () => {
        describe('when called with no arguments', () => {
            test('should create an empty Array2D', () => {
                const arr = new Array2D()

                expect(arr).toHaveLength(0)
            })
        })
        describe('when called with any number x of arguments', () => {
            test('of type Array, should create an Array2D of x items corresponding to the arguments', () => {
                const arr = new Array2D([5, 3], [6, 8], [13, 4])

                expect(arr).toHaveLength(3)
                expect(arr[0]).toEqual([5, 3])
                expect(arr[1][1]).toEqual(8)
            })
        })
    })
    describe('Array2D.from()', () => {
        describe('when called with an Array of Arrays', () => {
            test('should create an Array2D', () => {
                const arr = Array2D.from([[5, 3], [6, 8], [13, 4]])

                expect(arr).toHaveLength(3)
                expect(arr[0]).toEqual([5, 3])
                expect(arr[1][1]).toEqual(8)
            })
        })

        describe('when called with a 1D Array', () => {
            test('should throw an exception', () => {
                expect(() => Array2D.from([])).toThrow('Array2D.from() was called with an invalid parameter. Parameter must be of type Array<Array<T>>.')
            })
        })
    })

    describe('Array2D.prototype.getNorthOf()', () => {
        describe('when called with (y, x)', () => {
            test('should return the item at [y - 1][x] if it is not out of bounds', () => {
                const arr = Array2D.from([
                        [5, 3, 62], 
                        [6, 8, 57], 
                        [1, 4, 43]                    
                ])

                expect(arr.getNorthOf(1 , 1)).toBe(3)
                expect(arr.getNorthOf(1 , 0)).toBe(5)
                expect(arr.getNorthOf(2 , 2)).toBe(57)
            })
            test('should return undefined if [y - 1][x] is out of bounds', () => {
                const arr = Array2D.from([
                    [5, 3, 62],
                    [6, 8, 57],
                    [1, 4, 43]
                ])

                expect(arr.getNorthOf(0, 0)).toBeUndefined()
                expect(arr.getNorthOf(0, 1)).toBeUndefined()
                expect(arr.getNorthOf(0, 2)).toBeUndefined()
            })
        })
    })

    describe('Array2D.prototype.getNorthEastOf()', () => {
        describe('when called with (y, x)', () => {
            test('should return the item at [y - 1][x + 1] if it is not out of bounds', () => {
                const arr = Array2D.from([
                    [5, 3, 62],
                    [6, 8, 57],
                    [1, 4, 43]
                ])

                expect(arr.getNorthEastOf(1, 0)).toBe(3)
                expect(arr.getNorthEastOf(2, 1)).toBe(57)
                expect(arr.getNorthEastOf(1, 1)).toBe(62)
            })
            test('should return undefined if [y - 1][x + 1] is out of bounds', () => {
                const arr = Array2D.from([
                    [5, 3, 62],
                    [6, 8, 57],
                    [1, 4, 43]
                ])

                expect(arr.getNorthEastOf(0, 0)).toBeUndefined()
                expect(arr.getNorthEastOf(0, 2)).toBeUndefined()
                expect(arr.getNorthEastOf(2, 2)).toBeUndefined()
            })
        })
    })

    describe('Array2D.prototype.getEastOf()', () => {
        describe('when called with (y, x)', () => {
            test('should return the item at [y][x + 1] if it is not out of bounds', () => {
                const arr = Array2D.from([
                    [5, 3, 62],
                    [6, 8, 57],
                    [1, 4, 43]
                ])

                expect(arr.getEastOf(0, 0)).toBe(3)
                expect(arr.getEastOf(1, 1)).toBe(57)
                expect(arr.getEastOf(2, 1)).toBe(43)
            })
            test('should return undefined if [y][x + 1] is out of bounds', () => {
                const arr = Array2D.from([
                    [5, 3, 62],
                    [6, 8, 57],
                    [1, 4, 43]
                ])

                expect(arr.getEastOf(0, 2)).toBeUndefined()
                expect(arr.getEastOf(1, 2)).toBeUndefined()
                expect(arr.getEastOf(2, 2)).toBeUndefined()
            })
        })
    })

    describe('Array2D.prototype.getSouthEastOf()', () => {
        describe('when called with (y, x)', () => {
            test('should return the item at [y + 1][x + 1] if it is not out of bounds', () => {
                const arr = Array2D.from([
                    [5, 3, 62],
                    [6, 8, 57],
                    [1, 4, 43]
                ])

                expect(arr.getSouthEastOf(0, 0)).toBe(8)
                expect(arr.getSouthEastOf(1, 1)).toBe(43)
                expect(arr.getSouthEastOf(1, 0)).toBe(4)
            })
            test('should return undefined if [y + 1][x + 1] is out of bounds', () => {
                const arr = Array2D.from([
                    [5, 3, 62],
                    [6, 8, 57],
                    [1, 4, 43]
                ])

                expect(arr.getSouthEastOf(0, 2)).toBeUndefined()
                expect(arr.getSouthEastOf(1, 2)).toBeUndefined()
                expect(arr.getSouthEastOf(2, 1)).toBeUndefined()
            })
        })
    })

    describe('Array2D.prototype.getSouthOf()', () => {
        describe('when called with (y, x)', () => {
            test('should return the item at [y + 1][x] if it is not out of bounds', () => {
                const arr = Array2D.from([
                    [5, 3, 62],
                    [6, 8, 57],
                    [1, 4, 43]
                ])

                expect(arr.getSouthOf(0, 0)).toBe(6)
                expect(arr.getSouthOf(1, 1)).toBe(4)
                expect(arr.getSouthOf(0, 2)).toBe(57)
            })
            test('should return undefined if [y + 1][x] is out of bounds', () => {
                const arr = Array2D.from([
                    [5, 3, 62],
                    [6, 8, 57],
                    [1, 4, 43]
                ])

                expect(arr.getSouthOf(2, 0)).toBeUndefined()
                expect(arr.getSouthOf(2, 1)).toBeUndefined()
                expect(arr.getSouthOf(2, 2)).toBeUndefined()
            })
        })
    })

    describe('Array2D.prototype.getSouthWestOf()', () => {
        describe('when called with (y, x)', () => {
            test('should return the item at [y + 1][x - 1] if it is not out of bounds', () => {
                const arr = Array2D.from([
                    [5, 3, 62],
                    [6, 8, 57],
                    [1, 4, 43]
                ])

                expect(arr.getSouthWestOf(0, 1)).toBe(6)
                expect(arr.getSouthWestOf(1, 1)).toBe(1)
                expect(arr.getSouthWestOf(1, 2)).toBe(4)
            })
            test('should return undefined if [y + 1][x - 1] is out of bounds', () => {
                const arr = Array2D.from([
                    [5, 3, 62],
                    [6, 8, 57],
                    [1, 4, 43]
                ])

                expect(arr.getSouthWestOf(1, 0)).toBeUndefined()
                expect(arr.getSouthWestOf(2, 0)).toBeUndefined()
                expect(arr.getSouthWestOf(2, 1)).toBeUndefined()
            })
        })
    })

    describe('Array2D.prototype.getWestOf()', () => {
        describe('when called with (y, x)', () => {
            test('should return the item at [y][x - 1] if it is not out of bounds', () => {
                const arr = Array2D.from([
                    [5, 3, 62],
                    [6, 8, 57],
                    [1, 4, 43]
                ])

                expect(arr.getWestOf(0, 1)).toBe(5)
                expect(arr.getWestOf(1, 2)).toBe(8)
                expect(arr.getWestOf(2, 1)).toBe(1)
            })
            test('should return undefined if [y][x - 1] is out of bounds', () => {
                const arr = Array2D.from([
                    [5, 3, 62],
                    [6, 8, 57],
                    [1, 4, 43]
                ])

                expect(arr.getWestOf(0, 0)).toBeUndefined()
                expect(arr.getWestOf(1, 0)).toBeUndefined()
                expect(arr.getWestOf(2, 0)).toBeUndefined()
            })
        })
    })

    describe('Array2D.prototype.getNorthWestOf()', () => {
        describe('when called with (y, x)', () => {
            test('should return the item at [y - 1][x - 1] if it is not out of bounds', () => {
                const arr = Array2D.from([
                    [5, 3, 62],
                    [6, 8, 57],
                    [1, 4, 43]
                ])

                expect(arr.getNorthWestOf(1, 1)).toBe(5)
                expect(arr.getNorthWestOf(1, 2)).toBe(3)
                expect(arr.getNorthWestOf(2, 1)).toBe(6)
            })
            test('should return undefined if [y - 1][x - 1] is out of bounds', () => {
                const arr = Array2D.from([
                    [5, 3, 62],
                    [6, 8, 57],
                    [1, 4, 43]
                ])

                expect(arr.getNorthWestOf(0, 0)).toBeUndefined()
                expect(arr.getNorthWestOf(0, 1)).toBeUndefined()
                expect(arr.getNorthWestOf(1, 0)).toBeUndefined()
            })
        })
    })
})