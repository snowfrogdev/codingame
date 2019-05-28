import { rearrangeString } from "./rearrange-string";

describe('Rearrange string to two numbers', () => {
    test('Two digits', () => {
        const input = '72'

        const actual = rearrangeString(input)

        const expected = '2 7'

        expect(actual).toBe(expected)
    })

    test('Too many digits', () => {
        const input = '8784688955737839773875997657797875797'

        const actual = rearrangeString(input)

        const expected = '-1 -1'

        expect(actual).toBe(expected)
    })

    test('Maximum B', () => {
        const input = '0800795705000904561000705000000905000'

        const actual = rearrangeString(input)

        const expected = '400005555567778999 1000000000000000000'

        expect(actual).toBe(expected)
    })
})