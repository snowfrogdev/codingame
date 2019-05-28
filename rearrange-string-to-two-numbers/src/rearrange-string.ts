export function rearrangeString(input: string): string {
    const allDigits = Array.from(input)
    const zeroes = allDigits.filter(digit => digit === '0')
    const otherDigits = allDigits.filter(digit => digit !== '0').sort()
    let sizeOfA = 0

    let b = ''
    // Check if B can have 19 digits    
    if (otherDigits[0] === '1' && zeroes.length >= 18) {
        b = (10 ** 18).toString()
        sizeOfA = allDigits.length - 19
    } else {
        sizeOfA = allDigits.length - 18 >= 1 ? allDigits.length - 18 : 1
    }

    let a = ''
    // Minimize A
    // First digit is the smallest number bigger than 0
    a += otherDigits.shift()

    // Shove as many zeroes as possible in a without busting sizeOfA - 1
    if (zeroes.length <= sizeOfA - 1 && zeroes.length > 0) {
        a += zeroes.splice(0, sizeOfA - 1).join('')
    }

    // Fill remaining space of a with the smallest numbers in digits
    const remainingSpaceInA = sizeOfA - a.length
    a += otherDigits.splice(0, remainingSpaceInA).join('')

    // Minimize B
    // First digit is the smallest number bigger than 0
    b += otherDigits.shift()

    // Shove as many zeroes as possible in b
    if (zeroes.length > 0) {
        b += zeroes.splice(0, sizeOfA - 1).join('')
    }

    // Fill the rest b with the smallest numbers in digits
    b += otherDigits.join('')

    // Check to make sure that a or b are not bigger than 10^18
    if (parseInt(a) > 10**18 || parseInt(b) > 10**18) {
        return '-1 -1'
    }

    return `${a} ${b}`
}



