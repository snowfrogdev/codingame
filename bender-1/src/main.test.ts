import { main } from "./main";

xtest('simple moves', () => {
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

xtest('path modifier', () => {
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

test('multiple loops?', () => {
    let index = 0;
    const readline = (): string => {
        const lines = [
            '30 15',
            '###############',
            '#  #@#I  T$#  #',
            '#  #    IB #  #',
            '#  #     W #  #',
            '#  #      ##  #',
            '#  #B XBN# #  #',
            '#  ##      #  #',
            '#  #       #  #',
            '#  #     W #  #',
            '#  #      ##  #',
            '#  #B XBN# #  #',
            '#  ##      #  #',
            '#  #       #  #',
            '#  #     W #  #',
            '#  #      ##  #',
            '#  #B XBN# #  #',
            '#  ##      #  #',
            '#  #       #  #',
            '#  #       #  #',
            '#  #      ##  #',
            '#  #  XBIT #  #',
            '#  #########  #',
            '#             #',
            '# ##### ##### #',
            '# #     #     #',
            '# #     #  ## #',
            '# #     #   # #',
            '# ##### ##### #',
            '#             #',
            '###############'
        ]
        const currentLine = lines[index]
        index++
        return currentLine
    }

    const answer = [
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'EAST',
        'EAST',
        'EAST',
        'EAST',
        'NORTH',
        'NORTH',
        'NORTH',
        'NORTH',
        'WEST',
        'WEST',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'EAST',
        'EAST',
        'EAST',
        'NORTH',
        'WEST',
        'WEST',
        'WEST',
        'WEST',
        'WEST',
        'SOUTH',
        'SOUTH',
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
        'NORTH',
        'NORTH',
        'NORTH',
        'WEST',
        'WEST',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'EAST',
        'EAST',
        'EAST',
        'NORTH',
        'WEST',
        'WEST',
        'WEST',
        'WEST',
        'WEST',
        'SOUTH',
        'SOUTH',
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
        'NORTH',
        'NORTH',
        'NORTH',
        'NORTH',
        'NORTH',
        'NORTH',
        'NORTH',
        'NORTH',
        'WEST',
        'WEST',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'EAST',
        'EAST',
        'EAST',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'WEST',
        'WEST',
        'WEST',
        'WEST',
        'WEST',
        'SOUTH',
        'SOUTH',
        'EAST',
        'EAST',
        'EAST',
        'EAST',
        'NORTH',
        'NORTH',
        'NORTH',
        'NORTH',
        'WEST',
        'WEST',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'SOUTH',
        'EAST',
        'EAST',
        'EAST',
        'EAST'
    ]

    expect(main(readline)).toEqual(answer)
})

