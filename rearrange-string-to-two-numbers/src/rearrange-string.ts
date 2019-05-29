export function rearrangeString(input: string): string {
    const allDigits = Array.from(input)
    
    // Check that we have enough digits
    if (allDigits.length <= 1) {
        return '-1 -1'
    }

    const zeroes = allDigits.filter(digit => digit === '0')
    const otherDigits = allDigits.filter(digit => digit !== '0').sort()
    let remainingSpaceInA = 0

    let b = ''
    // Check if B can have 19 digits    
    if (otherDigits[0] === '1' && zeroes.length >= 18) {
        b = (10 ** 18).toString()
        zeroes.splice(0, 18)
        otherDigits.shift()
        remainingSpaceInA = allDigits.length - 19
    } else {
        remainingSpaceInA = allDigits.length - 18 >= 1 ? allDigits.length - 18 : 1
    }

    let a = ''
    // Minimize A
    // First digit is the smallest number bigger than 0
    if (remainingSpaceInA === 1 && zeroes.length >= 1) {
        ({ a, remainingSpaceInA } = addZeroesToA(zeroes, a, remainingSpaceInA))
    } else if (otherDigits.length > 0) {
        a += otherDigits.shift()
        remainingSpaceInA -= 1
    }

    // Shove as many zeroes as possible in a without busting remainingSpaceInA
    ({ a, remainingSpaceInA } = addZeroesToA(zeroes, a, remainingSpaceInA))

    // Fill remaining space of a with the smallest numbers in digits
    a += otherDigits.splice(0, remainingSpaceInA).join('')

    // Minimize B
    // First digit is the smallest number bigger than 0
    if (otherDigits.length > 0) {
        b += otherDigits.shift()
    }

    // Shove as many zeroes as possible in b
        b += zeroes.join('')

    // Fill the rest b with the smallest numbers in digits
    b += otherDigits.join('')

    // Check to make sure that a or b are not bigger than 10^18
    if (parseInt(a) > 10**18 || parseInt(b) > 10**18) {
        return '-1 -1'
    }

    // Check that we don't have a bunch of zeroes
    if ((a[0] === '0' && a[1] === '0') || (b[0] === '0' && b[1] === '0')) {
        return '-1 -1'
    }

    return `${a} ${b}`
}



function addZeroesToA(zeroes: string[], a: string, remainingSpaceInA: number) {
    const zeroesRemaining = zeroes.length
    if (zeroesRemaining > 0) {
        a += zeroes.splice(0, remainingSpaceInA).join('')
        remainingSpaceInA -= Math.min(remainingSpaceInA, zeroesRemaining)
    }
    return { a, remainingSpaceInA }
}

