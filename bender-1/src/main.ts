import { start } from "repl";

declare function readline(): string

const inputs = readline().split(' ');
const L = parseInt(inputs[0]);
const C = parseInt(inputs[1]);

const cityMap: string[][] = []
for (let i = 0; i < L; i++) {
    const row = readline();
    cityMap.push(Array.from(row))
}

class Position {
    constructor(public x: number, public y: number) { }
}

class City {
    constructor(readonly cityMap_: string[][]) { }

    public findSymbol(symbol: string): Position | null {
        for (let i = 0; i < this.cityMap_.length; i++) {
            const line = this.cityMap_[i]
            for (let j = 0; j < line.length; j++) {
                if (line[j] === symbol) {
                    return new Position(j, i)
                }
            }
        }
        return null
    }
}

class Bender {
    position: Position
    moves: string[] = []
    constructor(public city_: City , private state_: State) {
        this.state_.setContext(this)
        const position = this.city_.findSymbol('@')
        if (!position) {
            throw ('No starting positon could be found')
        }
        this.position = position
    }

    public transitionTo(state: State): void {
        this.state_ = state
        this.state_.setContext(this)
    }

    public move(): void {
        this.state_.move()
    }

    printMoves(): void {
        this.moves.forEach(move => console.log(move))
    }
}

/**
 * The base State class declares methods that all Concrete State should
 * implement and also provides a backreference to the Context object, associated
 * with the State. This backreference can be used by States to transition the
 * Context to another State.
 */
abstract class State {
    protected bender: Bender | null = null;

    public setContext(context: Bender) {
        this.bender = context
    }

    public abstract move(): void

    protected abstract lookAhead(): string
}


class MovingSouth extends State {
    public move(): void {
        if (!this.bender) {
            throw new Error('No bender in this state')
        }

        const placeToMoveTo = this.lookAhead()
        switch(placeToMoveTo) {
            case ' ': 
                this.bender.position.y += 1
                this.bender.moves.push('SOUTH')
                this.bender.move()
                break
            case '#':
                this.bender.transitionTo(new MovingEast())
                this.bender.move()
                break
            case '$':
                this.bender.position.y += 1
                this.bender.moves.push('SOUTH')
                this.bender.printMoves()
                break
        }        
    }

    protected lookAhead(): string {
        if (!this.bender) {
            throw new Error('No bender in this state')
        }
        return this.bender.city_.cityMap_[this.bender.position.y + 1][this.bender.position.x]
    }
}

class MovingEast extends State {
    public move(): void {
        if (!this.bender) {
            throw new Error('No bender in this state')
        }

        const placeToMoveTo = this.lookAhead()
        switch (placeToMoveTo) {
            case ' ':
                this.bender.position.x += 1
                this.bender.moves.push('EAST')
                this.bender.move()
                break
            case '#':
                this.bender.transitionTo(new MovingNorth())
                this.bender.move()
                break
            case '$':
                this.bender.position.y += 1
                this.bender.moves.push('EAST')
                this.bender.printMoves()
                break
        }
    }

    protected lookAhead(): string {
        if (!this.bender) {
            throw new Error('No bender in this state')
        }
        return this.bender.city_.cityMap_[this.bender.position.y][this.bender.position.x + 1]
    }
}

class MovingNorth extends State {
    public move(): void {
        if (!this.bender) {
            throw new Error('No bender in this state')
        }

        const placeToMoveTo = this.lookAhead()
        switch (placeToMoveTo) {
            case ' ':
                this.bender.position.y -= 1
                this.bender.moves.push('NORTH')
                this.bender.move()
                break
            case '#':
                this.bender.transitionTo(new MovingWest())
                this.bender.move()
                break
            case '$':
                this.bender.position.y += 1
                this.bender.moves.push('NORTH')
                this.bender.printMoves()
                break
        }
    }

    protected lookAhead(): string {
        if (!this.bender) {
            throw new Error('No bender in this state')
        }
        return this.bender.city_.cityMap_[this.bender.position.y - 1][this.bender.position.x]
    }
}

class MovingWest extends State {
    public move(): void {
        if (!this.bender) {
            throw new Error('No bender in this state')
        }

        const placeToMoveTo = this.lookAhead()
        switch (placeToMoveTo) {
            case ' ':
                this.bender.position.x -= 1
                this.bender.moves.push('WEST')
                this.bender.move()
                break
            case '#':
                this.bender.transitionTo(new MovingWest())
                this.bender.move()
                break
            case '$':
                this.bender.position.y += 1
                this.bender.moves.push('WEST')
                this.bender.printMoves()
                break
        }
    }

    protected lookAhead(): string {
        if (!this.bender) {
            throw new Error('No bender in this state')
        }
        return this.bender.city_.cityMap_[this.bender.position.y][this.bender.position.x - 1]
    }
}


const city = new City(cityMap)
const bender = new Bender(city, new MovingSouth())

bender.move()