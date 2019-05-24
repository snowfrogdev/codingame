import { PgmImage } from "./pgm-image";

declare function readline(): string

let imageString = ''

imageString += readline() + '\n'
var inputs: any = readline()
imageString += inputs + '\n'
inputs = inputs.split(' ')
const W = parseInt(inputs[0])
const H = parseInt(inputs[1])
var inputs: any = readline()
imageString += inputs + '\n'
imageString += readline() + '\n'
for (let i = 0; i < H; i++) {
    imageString += readline() + '\n'
}

const image = new PgmImage(imageString.trim())

console.log(image.removeSeams())