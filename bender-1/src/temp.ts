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
    readonly teleporters: Position[]
    constructor(readonly cityMap: string[][]) {
        this.teleporters = this.findSymbol('T')
    }

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

class BenderState {
    constructor(
        public facingDirection: string,
        private position_: Position,
        public previousPosition: Position,
        public isInverted: boolean = false,
        public inBreakerMode: boolean = false
    ) { }

    get position() {
        return this.position_
    }
    set position(position: Position) {
        this.previousPosition = this.position_
        this.position_ = position
    }

    serialize(): string {
        return JSON.stringify(this)
    }
}

class Bender {
    private moves_: string[] = []
    private previousStates_: Set<string> = new Set()
    private state_: BenderState
    private DIRECTION_PRIORITIES_ = ['SOUTH', 'EAST', 'NORTH', 'WEST']
    private INVERTED_DIRECTION_PRIORITIES_ = ['WEST', 'NORTH', 'EAST', 'SOUTH']
    private isLooping_: boolean = false
    private isDead_ = false

    constructor(private city_: City, ) {
        const position = this.city_.findSymbol('@')
        this.state_ = new BenderState('SOUTH', position[0], position[0])

    }

    get moves() {
        return this.moves_;
    }
    get isLooping() {
        return this.isLooping_
    }
    get isDead() {
        return this.isDead_
    }


    move(): void {
        const facingSymbol = this.lookAhead_()

        if (facingSymbol === 'T') {
            return this.handleT_();
        }

        if ((facingSymbol === 'X' && !this.state_.inBreakerMode) || facingSymbol === '#') {
            const directions = this.state_.isInverted ? this.INVERTED_DIRECTION_PRIORITIES_ : this.DIRECTION_PRIORITIES_
            for (const direction of directions) {
                switch (this.city_.getSymbolAtPosition(this.state_.position[direction])) {
                    case 'X':
                    case '#':
                        break
                    case 'W':
                        this.state_.position = this.state_.position[direction]
                        this.state_.facingDirection = 'WEST'
                        this.moves_.push(direction)
                        this.handleLoop_()
                        this.previousStates_.add(this.state_.serialize())
                        return
                    case 'N':
                        this.state_.position = this.state_.position[direction]
                        this.state_.facingDirection = 'NORTH'
                        this.moves_.push(direction)
                        this.handleLoop_()
                        this.previousStates_.add(this.state_.serialize())
                        return
                    default:
                        this.state_.position = this.state_.position[direction]
                        this.state_.facingDirection = direction
                        this.moves_.push(direction)
                        this.handleLoop_()
                        this.previousStates_.add(this.state_.serialize())
                        return
                }
            }
        }

        const newPosition = this.state_.position[this.state_.facingDirection]

        if (facingSymbol === 'X' && this.state_.inBreakerMode) {
            this.city_.cityMap[newPosition.y][newPosition.x] = ' '
        }

        this.state_.position = newPosition
        this.moves_.push(this.state_.facingDirection)

        switch (facingSymbol) {
            case '$':
                this.isDead_ = true
                break
            case 'N':
                this.state_.facingDirection = 'NORTH'
                break

            case 'E':
                this.state_.facingDirection = 'EAST'
                break

            case 'S':
                this.state_.facingDirection = 'SOUTH'
                break

            case 'W':
                this.state_.facingDirection = 'WEST'
                break

            case 'B':
                this.state_.inBreakerMode = !this.state_.inBreakerMode
                break

            case 'I':
                this.state_.isInverted = !this.state_.isInverted
                break
        }
        this.handleLoop_()
        this.previousStates_.add(this.state_.serialize())
    }

    private handleT_() {
        const positionToTeleportTo = this.city_.teleporters.find((teleporter) => {
            const newPosition = this.state_.position[this.state_.facingDirection];
            return !(teleporter.x === newPosition.x && teleporter.y === newPosition.y);
        });
        if (!positionToTeleportTo) {
            throw new Error('OMG I cannot find the other teleporter');
        }
        this.state_.position = positionToTeleportTo;
        this.moves_.push(this.state_.facingDirection);
        this.handleLoop_();
        this.previousStates_.add(this.state_.serialize());
        return;
    }

    private handleLoop_() {
        if (this.previousStates_.has(this.state_.serialize())) {
            this.isLooping_ = true
        }
    }

    private lookAhead_(): string {
        return this.city_.getSymbolAtPosition(this.state_.position[this.state_.facingDirection])
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

    while (!bender.isDead) {
        if (bender.isLooping) {
            break
        }
        bender.move()
    }
    if (bender.isLooping) {
        console.log('LOOP')
        return bender.moves
    }
    bender.printMoves()
    return bender.moves
}

// main(readline)