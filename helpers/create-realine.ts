export const createReadline = (str: string) => {
    const array_: string[] = str.split(/\r\n|\r|\n/)
    let nextIndex_: number = 0

    return (): string => {
        if (nextIndex_ < array_.length) {
            return array_[nextIndex_++]
        }
        return 'null'
    }
}