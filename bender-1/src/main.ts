declare function readline(): string

const [L, C] = readline().split(' ').map(Number);

const cityMap: string[][] = []
for (let i = 0; i < L; i++) {
    const row = readline();
    cityMap.push(Array.from(row))
}

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
        return new Position(this.x_, this.y_ -= 1)
    }
    get east() {
        return new Position(this.x_ += 1, this.y_)
    }
    get south() {
        return new Position(this.x_, this.y_ += 1)
    }
    get west() {
        return new Position(this.x_ -= 1, this.y_)
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
    private moves_: string[] = []
    private facingDirection_: string = 'south'
    private directionPriorities_ = ['south', 'east', 'north', 'west']

    constructor(private city_: City, private position_: Position) {}
    move(): void {
            
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