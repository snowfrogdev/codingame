import { Pixel } from "./main";


export const createPixelArray = (imageString: string): Pixel[][] => {
    const lines = imageString.split('\n')
        // const [W, H] = lines[1].split(' ')
        this.targetWidth_ = parseInt(lines[2])
        this.pixels_ = lines.slice(4).map(line => {
            return line.split(' ').map(pixel => new Pixel(parseInt(pixel)))
        })
}