declare function readline(): string

class Position {
    [key: string]: any
    constructor(private x_: number, private y_: number) { }

    get x(): number {
        return this.x_;
    }
    set x(value: number) {
        this.x_ = value;
    }
    get y(): number {
        return this.y_;
    }
    set y(value: number) {
        this.y_ = value;
    }

    get NORTH() {
        return new Position(this.x, this.y - 1)
    }
    get EAST() {
        return new Position(this.x + 1, this.y)
    }
    get SOUTH() {
        return new Position(this.x, this.y + 1)
    }
    get WEST() {
        return new Position(this.x - 1, this.y)
    }
}

class City {
    private static instance: City
    readonly cityMap: string[][]
    readonly teleporters: Position[] = []
    readonly startingPosition: Position = new Position(0, 0)

    private constructor() {
        const [Y, X] = readline().split(' ').map(Number)
        this.cityMap = new Array(Y)
        for (let y = 0; y < Y; y++) {
            let row = readline()
            this.cityMap[y] = new Array(X)
            for (let x = 0; x < X; x++) {
                this.cityMap[y][x] = row[x]

                if (row[x] === '@') {
                    this.startingPosition = new Position(x, y)
                } else if (row[x] === 'T') {
                    this.teleporters.push(new Position(x, y))
                }
            }
        }
    }

    static createCity(): City {
        if (!City.instance) {
            City.instance = new City()
        }
        return City.instance
    }

    setSymbolAtPosition(symbol: string, position: Position) {
        this.cityMap[position.y][position.x] = symbol
    }

    getSymbolAtPosition(position: Position): string {
        return this.cityMap[position.y][position.x]
    }
}

class BenderState {
    
    constructor(
        private position_: Position,
        private isInverted_ = false,
        private isInBreakerMode_ = false,
        private direction_ = 'SOUTH',
    ) { }

    get position(): Position {
        return this.position_;
    }
    set position(position: Position) {
        this.position_ = position
    }
    get isInverted() {
        return this.isInverted_;
    }
    set isInverted(value) {
        this.isInverted_ = value;
    }
    get isInBreakerMode() {
        return this.isInBreakerMode_;
    }
    set isInBreakerMode(value) {
        this.isInBreakerMode_ = value;
    }

    get direction() {
        return this.direction_;
    }
    set direction(value) {
        this.direction_ = value;
    }

    serialize(): string {
        return JSON.stringify(this)
    }
}

class Bender {
    private state_: BenderState
    private visited_: Set<string> = new Set()
    private moves_: string[] = []
    private DIRECTION_PRIORITIES_ = ['SOUTH', 'EAST', 'NORTH', 'WEST']
    private INVERTED_DIRECTION_PRIORITIES_ = ['WEST', 'NORTH', 'EAST', 'SOUTH']

    constructor(private city_: City) {
        this.state_ = new BenderState(city_.startingPosition)
    }

    run() {
        while (this.city_.getSymbolAtPosition(this.state_.position) !== '$') {

            if (this.visited_.has(this.state_.serialize())) {
                this.moves_ = ['LOOP']
                return
            }
                
            this.visited_.add(this.state_.serialize())

            switch (this.city_.getSymbolAtPosition(this.state_.position)) {
                case 'N':
                    this.state_.direction = 'NORTH'
                    break

                case 'E':
                    this.state_.direction = 'EAST'
                    break

                case 'S':
                    this.state_.direction = 'SOUTH'
                    break

                case 'W':
                    this.state_.direction = 'WEST'
                    break

                case 'I':
                    this.state_.isInverted = !this.state_.isInverted
                    break

                case 'B':
                    this.state_.isInBreakerMode = !this.state_.isInBreakerMode
                    break

                case 'T':
                    const which = +(this.state_.position.x === this.city_.teleporters[0].x && this.state_.position.y === this.city_.teleporters[0].y)
                    this.state_.position.x = this.city_.teleporters[which].x
                    this.state_.position.y = this.city_.teleporters[which].y
            }
            this.moves_.push(this.getMove_())
        }
    }

    private getMove_(): string {
        if (this.getFacingSymbol() === 'X' && !this.state_.isInBreakerMode || this.getFacingSymbol() === '#') {
            const directions = this.state_.isInverted ? this.INVERTED_DIRECTION_PRIORITIES_ : this.DIRECTION_PRIORITIES_
            return this.findOpenTileAndUpdatePosition_(directions);
        }
        
        this.handleBreakerMode_();        
        
        this.state_.position = this.getFacingPosition()
        return this.state_.direction        
    }

    private getFacingSymbol() {
        return this.city_.getSymbolAtPosition(this.getFacingPosition());
    }

    private getFacingPosition() {
        return this.state_.position[this.state_.direction];
    }

    private handleBreakerMode_() {
        if (this.getFacingSymbol() === 'X' && this.state_.isInBreakerMode) {
            this.city_.setSymbolAtPosition(' ', this.getFacingPosition());
            this.visited_ = new Set();
        }
    }

    private findOpenTileAndUpdatePosition_(directions: string[]) {
        for (const direction of directions) {
            switch (this.city_.getSymbolAtPosition(this.state_.position[direction])) {
                case 'X':
                case '#':
                    break;
                default:
                    this.state_.position = this.state_.position[direction];
                    return this.state_.direction = direction;
            }
        }
        throw new Error('Could not find open tile')
    }

    printMoves() {
        for (const move of this.moves_) {
            console.log(move);
        }
    }
}

const newNewYork = City.createCity()
const bender = new Bender(newNewYork)
bender.run()
bender.printMoves()


