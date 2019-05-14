declare function readline(): string

class Position {
    [key: string]: any
    constructor(private x_: number, private y_: number) { }

    get x() {
        return this.x_
    }
    get y() {
        return this.y_
    }
    get north() {
        return new Position(this.x_, this.y_ - 1)
    }
    get east() {
        return new Position(this.x_ + 1, this.y_)
    }
    get south() {
        return new Position(this.x_, this.y_ + 1)
    }
    get west() {
        return new Position(this.x_ - 1, this.y_)
    }
}

class City {
    constructor(readonly cityMap: string[][]) { }

    public findSymbol(symbol: string): Position | null {
        for (let i = 0; i < this.cityMap.length; i++) {
            const line = this.cityMap[i]
            for (let j = 0; j < line.length; j++) {
                if (line[j] === symbol) {
                    return new Position(j, i)
                }
            }
        }
        return null
    }

    public getSymbolAtPosition(position: Position): string {
        return this.cityMap[position.y][position.x]
    }
}

class Bender {
    readonly moves_: string[] = []
    private facingDirection_: string = 'south'
    private DIRECTION_PRIORITIES_ = ['south', 'east', 'north', 'west']
    private position_: Position
    isDead = false

    constructor(private city_: City, ) {
        const position = this.city_.findSymbol('@')
        if (!position) {
            throw new Error('No starting positon')
        }
        this.position_ = position
    }
    move(): void {
        const facingSymbol = this.lookAhead()

        if (facingSymbol === 'X' || facingSymbol === '#') {
            for (const direction of this.DIRECTION_PRIORITIES_) {
                switch (this.city_.getSymbolAtPosition(this.position_[direction])) {
                    case 'X':
                    case '#':
                        break
                    default:
                    this.position_ = this.position_[direction]
                    this.facingDirection_ = direction
                    this.moves_.push(direction)
                    return
                }
            }
        }

        if (facingSymbol === '$') {
            this.position_ = this.position_[this.facingDirection_]
            this.moves_.push(this.facingDirection_)
            this.isDead = true
            return
        }

        this.position_ = this.position_[this.facingDirection_]
        this.moves_.push(this.facingDirection_)
    }

    lookAhead(): string {
        return this.city_.getSymbolAtPosition(this.position_[this.facingDirection_])
    }

    printMoves(): void {
        this.moves_.forEach(move => {
            console.log(move.toUpperCase())
        });
    }
}

export const main = (readline: () => string) => {
    const [L, C] = readline().split(' ').map(Number);

    const cityMap: string[][] = []
    for (let i = 0; i < L; i++) {
        const row = readline();
        cityMap.push(Array.from(row))
    }

    const city = new City(cityMap)
    const bender = new Bender(city)

    while (!bender.isDead) {
        bender.move()
    }
    bender.printMoves()
    return bender.moves_
}

// main(readline)

