import { StringRearranger } from "./rearrange-string";

describe('Rearrange string to two numbers', () => {
    test('Two digits', () => {
        const input = '72'

        const stringRearranger = new StringRearranger(input)
        const actual = stringRearranger.rearrangeString()

        const expected = '2 7'

        expect(actual).toBe(expected)
    })

    test('Too many digits', () => {
        const input = '8784688955737839773875997657797875797'

        const stringRearranger = new StringRearranger(input)
        const actual = stringRearranger.rearrangeString()

        const expected = '-1 -1'

        expect(actual).toBe(expected)
    })

    test('Maximum B', () => {
        const input = '0800795705000904561000705000000905000'

        const stringRearranger = new StringRearranger(input)
        const actual = stringRearranger.rearrangeString()

        const expected = '400005555567778999 1000000000000000000'

        expect(actual).toBe(expected)
    })

    test('Too many 0s', () => {
        const input = '0000000000100000000000'

        const stringRearranger = new StringRearranger(input)
        const actual = stringRearranger.rearrangeString()

        const expected = '-1 -1'

        expect(actual).toBe(expected)
    })

    test('Maximum B with 0', () => {
        const input = '10000000000000000000'

        const stringRearranger = new StringRearranger(input)
        const actual = stringRearranger.rearrangeString()

        const expected = '0 1000000000000000000'

        expect(actual).toBe(expected)
    })

    test('Small A big B', () => {
        const input = '79380248390522737902'

        const stringRearranger = new StringRearranger(input)
        const actual = stringRearranger.rearrangeString()

        const expected = '20 200223334577788999'

        expect(actual).toBe(expected)
    })

    test('Too few digits', () => {
        const input = '9'

        const stringRearranger = new StringRearranger(input)
        const actual = stringRearranger.rearrangeString()

        const expected = '-1 -1'

        expect(actual).toBe(expected)
    })

    test('Zero', () => {
        const input = '9407809450087866606'

        const stringRearranger = new StringRearranger(input)
        const actual = stringRearranger.rearrangeString()

        const expected = '0 400004566667788899'

        expect(actual).toBe(expected)
    })
})