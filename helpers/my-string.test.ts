import { MyString } from "./my-string";

xdescribe('MyString', () => {
    test('readline works', () => {
        const input = 'This is the first line\n' +
        'This is the second line\n' +
        'This is the third line'
        const str = new MyString(input)

        const firstCall = str.readline()
        const secondCall = str.readline()
        const thirdCall = str.readline()

        expect(firstCall).toBe('This is the first line')
        expect(secondCall).toBe('This is the second line')
        expect(thirdCall).toBe('This is the third line')
    })
})