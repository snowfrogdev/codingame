import { main } from "./main";

test('simple moves', () => {
    let index = 0;
    const readline = (): string => {
        const lines = [
            '5 5',
            '#####',
            '#@  #',
            '#   #',
            '#  $#',
            '#####'
        ]
        const currentLine = lines[index]
        index++
        return currentLine
    }

    const answer = [
        'SOUTH',
        'SOUTH',
        'EAST',
        'EAST'
    ]

    expect(main(readline)).toEqual(answer)
})

test('simple moves', () => {
    let index = 0;
    const readline = (): string => {
        const lines = [
            '10 10',
            '##########',
            '#        #',
            '#  S   W #',
            '#        #',
            '#  $     #',
            '#        #',
            '#@       #',
            '#        #',
            '#E     N #',
            '##########'
        ]
        const currentLine = lines[index]
        index++
        return currentLine
    }

    const answer = [
        'SOUTH',
        'SOUTH',
        'EAST',
        'EAST',
        'EAST',
        'EAST',
        'EAST',
        'EAST',
        'NORTH',
        'NORTH',
        'NORTH',
        'NORTH',
        'NORTH',
        'NORTH',
        'WEST',
        'WEST',
        'WEST',
        'WEST',
        'SOUTH',
        'SOUTH'
    ]

    expect(main(readline)).toEqual(answer)
})