/**
 * ```
 * State
 * Index 9      : Meta board - 0b000000000_000000000_000000000.
 * Index 0 - 8  : Small boards - 0b0_0_0000_0_000000000_000000000.
 * bit 24       : 1 = Game Over, 0 = Game Not Over. // Only for index 0.
 * bit 23       : 1 = Player X to play, 0 = Player O to play. // Only for index 0.
 * bits 22 - 19 : Index of valid board for next move, in binary. If > 8 allboards valid. / Only for index 0.
 * bit 18       : 1 = Board is closed / Only for index 0-8.
 * bit 26 - 18  : Drawn small boards. / Only for index 9.
 * bits 17 - 9  : Position of X tokens. / Small boards X wins.
 * bits 8 - 0   : Position of O tokens. / Small boards O wins.
 * ```
 */
type State = Int32Array;

/**
 * ```
 * Action
 * 0: Board index
 * 1: Position index
 * ```
 */
type Action = Int8Array;