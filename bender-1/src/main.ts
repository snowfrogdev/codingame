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
    get NORTH() {
        return new Position(this.x_, this.y_ - 1)
    }
    get EAST() {
        return new Position(this.x_ + 1, this.y_)
    }
    get SOUTH() {
        return new Position(this.x_, this.y_ + 1)
    }
    get WEST() {
        return new Position(this.x_ - 1, this.y_)
    }
}

class City {
    constructor(readonly cityMap: string[][]) { }

    public findSymbol(symbol: string): Position[] {
        const positions = []
        for (let i = 0; i < this.cityMap.length; i++) {
            const line = this.cityMap[i]
            for (let j = 0; j < line.length; j++) {
                if (line[j] === symbol) {
                    positions.push(new Position(j, i))
                }
            }
        }
        return positions
    }

    public getSymbolAtPosition(position: Position): string {
        return this.cityMap[position.y][position.x]
    }
}

class Bender {
    readonly moves_: string[] = []
    private facingDirection_: string = 'SOUTH'
    private DIRECTION_PRIORITIES_ = ['SOUTH', 'EAST', 'NORTH', 'WEST']
    private INVERTED_DIRECTION_PRIORITIES_ = ['WEST', 'NORTH', 'EAST', 'SOUTH']
    private position_: Position
    private teleporters_: Position[]
    private isInverted_ = false
    private inBreakerMode_ = false

    isDead = false

    constructor(private city_: City, ) {
        const position = this.city_.findSymbol('@')
        this.position_ = position[0]
        this.teleporters_ = this.city_.findSymbol('T')
    }
    move(): void {
        const facingSymbol = this.lookAhead()

        if (facingSymbol === 'T') {
            const positionToTeleportTo = this.teleporters_.find((teleporter) => {
                const newPosition = this.position_[this.facingDirection_]
                return !(teleporter.x === newPosition.x && teleporter.y === newPosition.y)
            })

            if (!positionToTeleportTo) {
                throw new Error('OMG I cannot find the other teleporter')
            }
            this.position_ = positionToTeleportTo
            this.moves_.push(this.facingDirection_)
            return
        }
        
        if ((facingSymbol === 'X' && !this.inBreakerMode_) || facingSymbol === '#') {
            const directions = this.isInverted_ ? this.INVERTED_DIRECTION_PRIORITIES_ : this.DIRECTION_PRIORITIES_
            for (const direction of directions) {
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

        if (facingSymbol === 'X' && this.inBreakerMode_) {
            const newPosition = this.position_[this.facingDirection_]
            this.city_.cityMap[newPosition.y][newPosition.x] = ' '
        }

        this.position_ = this.position_[this.facingDirection_]
        this.moves_.push(this.facingDirection_)

        if (facingSymbol === '$') {
            this.isDead = true
            return
        }

        switch (facingSymbol) {
            case 'N':
                this.facingDirection_ = 'NORTH'
                break

            case 'E':
                this.facingDirection_ = 'EAST'
                break

            case 'S':
                this.facingDirection_ = 'SOUTH'
                break

            case 'W':
                this.facingDirection_ = 'WEST'
                break
            
            case 'B':
                this.inBreakerMode_ = !this.inBreakerMode_
                break

            case 'I':
                this.isInverted_ = !this.isInverted_
                break
        }
    }

    lookAhead(): string {
        return this.city_.getSymbolAtPosition(this.position_[this.facingDirection_])
    }

    printMoves(): void {
        this.moves_.forEach(move => {
            console.log(move)
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

    let count = 0
    while (!bender.isDead) {
        if (count > 10000) {
            break
        }
        bender.move()
        count++
    }
    if (count > 10000) {
        console.log('LOOP')
        return bender.moves_
    }
    bender.printMoves()
    return bender.moves_
}

// main(readline)

