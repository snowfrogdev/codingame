export class StringRearranger {
    private allDigits_: string[]
    private zeroes_: string[]
    private otherDigits_: string[]
    private remainingSpaceInA_ = 0
    private a_ = ''
    private b_ = ''

    constructor(input: string) {
        this.allDigits_ = Array.from(input)
        this.zeroes_ = this.allDigits_.filter(digit => digit === '0')
        this.otherDigits_ = this.allDigits_.filter(digit => digit !== '0').sort()
    }

    rearrangeString(): string {   
        this.ifPossibleMakeBHave19Digits_()

        this.assignFirstDigitOfA_()
        this.addZeroesToA_()
        this.addOtherDigitsToA_()

        this.assignFirstDigitOfB_()
        this.addZeroesToB_()
        this.addOtherDigitsToB_()

        this.dealWithInvalidInputs_()

        return `${this.a_} ${this.b_}`
    }

    private ifPossibleMakeBHave19Digits_() {
        if (this.otherDigits_[0] === '1' && this.zeroes_.length >= 18) {
            this.b_ = (10 ** 18).toString();
            this.zeroes_.splice(0, 18);
            this.otherDigits_.shift();
            this.remainingSpaceInA_ = this.allDigits_.length - 19;
        }
        else {
            this.remainingSpaceInA_ = this.allDigits_.length - 18 >= 1 ? this.allDigits_.length - 18 : 1;
        }
    }

    private assignFirstDigitOfA_() {
        if (this.remainingSpaceInA_ === 1 && this.zeroes_.length >= 1) {
            this.addZeroesToA_();
        }
        else if (this.otherDigits_.length > 0) {
            this.a_ += this.otherDigits_.shift();
            this.remainingSpaceInA_ -= 1;
        }
    }

    private addZeroesToA_() {
        const zeroesRemaining = this.zeroes_.length;
        if (zeroesRemaining > 0) {
            this.a_ += this.zeroes_.splice(0, this.remainingSpaceInA_).join('');
            this.remainingSpaceInA_ -= Math.min(this.remainingSpaceInA_, zeroesRemaining);
        }
    }

    private addOtherDigitsToA_() {
        this.a_ += this.otherDigits_.splice(0, this.remainingSpaceInA_).join('');
    }

    private assignFirstDigitOfB_() {
        if (this.otherDigits_.length > 0) {
            this.b_ += this.otherDigits_.shift();
        }
    }

    private addZeroesToB_() {
        this.b_ += this.zeroes_.join('');
    }

    private addOtherDigitsToB_() {
        this.b_ += this.otherDigits_.join('');
    }

    private dealWithInvalidInputs_() {
        if (this.hasLessThanTwoDigits_() || this.aOrBAreTooBig_() || this.hasTooManyZeroes_()) {
            this.a_ = '-1';
            this.b_ = '-1';
        }
    }

    private hasLessThanTwoDigits_() {
        return this.allDigits_.length < 2;
    }

    private aOrBAreTooBig_() {
        return parseInt(this.a_) > 10 ** 18 || parseInt(this.b_) > 10 ** 18;
    }   

    private hasTooManyZeroes_() {
        return (this.a_[0] === '0' && this.a_[1] === '0') || (this.b_[0] === '0' && this.b_[1] === '0');
    }    
}
