import { createReadline } from "./create-realine";

xdescribe('MyString', () => {
    test('readline works', () => {
        const input = 'This is the first line\n' +
        'This is the second line\n' +
        'This is the third line'
        const readline = createReadline(input)

        const firstCall = readline()
        const secondCall = readline()
        const thirdCall = readline()

        expect(firstCall).toBe('This is the first line')
        expect(secondCall).toBe('This is the second line')
        expect(thirdCall).toBe('This is the third line')
    })
})