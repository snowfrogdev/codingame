export class MyString extends String {
    private array_: string[] = []
    private nextIndex_: number = 0

    constructor(value?: any) {
        super(value);
        Object.setPrototypeOf(this, new.target.prototype)
        this.array_ = this.valueOf().split(/\r\n|\r|\n/)
    }

    readline(): string {
        if (this.nextIndex_ < this.array_.length) {
            return this.array_[this.nextIndex_++]
        }
        return 'null'
    }
}