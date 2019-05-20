declare function readline(): string
/*
export function makeStringFromReadline(readline: () => string): string {
    let output: string = ''
    while(true) {
        const line = readline()
        if(line === 'null') {
            return output
        }
        output += line + '\n'
    }
}
*/

let imageFile: string = '' 
imageFile += readline() + '\n'
const inputs = readline()
const H = parseInt(inputs.split(' ')[1]);
imageFile += inputs + '\n'
imageFile += readline() + '\n'
imageFile += readline() + '\n'
for (let i = 0; i < H; i++) {
    imageFile += readline() + '\n'
}

class Pixel {
    constructor(private grayScaleValue_: number) { }
}

export class PgmImage {
    private pixels_: Pixel[][]
    private targetWidth_: number
    constructor(file: string) {
        const lines = file.split('\n')
        // const [W, H] = lines[1].split(' ')
        this.targetWidth_ = parseInt(lines[2])
        this.pixels_ = lines.slice(4).map(line => {
            return line.split(' ').map(pixel => new Pixel(parseInt(pixel)))
        })
    }

    removeSeam(): string {
        this.pixels_.forEach((row, rowIndex )=> {
            row.forEach((pixel, columnIndex) => {
                pixel = this.calculateEnergy(rowIndex, columnIndex)
            })
        })
    }

    private calculateEnergy(rowIndex: number, columnIndex: number): number {
    /*
        dI/dx(x,y) = I(x+1,y) - I(x-1,y) if 0 < x < W-1
                0                   otherwise (left/right borders)
        dI/dy(x,y) = I(x,y+1) - I(x,y-1) if 0 < y < H-1
                0                   otherwise (top/bottom borders)
        E(x,y) = |dI/dx(x,y)| + |dI/dy(x,y)|
            (where |.| denotes the absolute value)
    */
    }
}



/*
const magic = readline();
var inputs = readline().split(' ');
const W = parseInt(inputs[0]);
const H = parseInt(inputs[1]);
var inputs = readline().split(' ');
const comment = inputs[0];
const V = parseInt(inputs[1]);
const maxintensity = parseInt(readline());
for (let i = 0; i < H; i++) {
    var inputs = readline().split(' ');
    for (let j = 0; j < W; j++) {
        const I = parseInt(inputs[j]);
    }
}
*/


console.log(imageFile);
