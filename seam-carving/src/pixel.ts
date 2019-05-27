export class Pixel {
    private energy_: number = 0
    private cumulativeEnergy_: number = 0   
    private _parentPixelColumnIndex_: number = 0
    constructor(readonly grayscale: number) { }
    get energy(): number {
        return this.energy_;
    }
    set energy(value: number) {
        this.energy_ = value;
    }
    get cumulativeEnergy(): number {
        return this.cumulativeEnergy_;
    }
    set cumulativeEnergy(value: number) {
        this.cumulativeEnergy_ = value;
    }
    get parentPixelColumnIndex_(): number {
        return this._parentPixelColumnIndex_;
    }
    set parentPixelColumnIndex_(value: number) {
        this._parentPixelColumnIndex_ = value;
    }
}
