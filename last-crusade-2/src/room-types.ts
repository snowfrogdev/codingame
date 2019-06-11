export type IndyPos = { x: number; y: number; entry: string };
type DirectionsMap = { [index: string]: (y: number, x: number) => IndyPos | null };

const DIRECTIONS = {
  DOWN: (y: number, x: number) => ({ x, y: y + 1, entry: 'TOP' }),
  LEFT: (y: number, x: number) => ({ x: x - 1, y, entry: 'RIGHT' }),
  RIGHT: (y: number, x: number) => ({ x: x + 1, y, entry: 'LEFT' }),
  DEAD: (y: number, x: number) => null
};

export class Room {
  constructor(
    readonly directions: DirectionsMap,
    readonly rotateLeft?: number,
    readonly rotateRight?: number
  ) {}
}

export const roomTypes = new Map<number, Room>([
  [0, new Room({ LEFT: DIRECTIONS.DEAD, RIGHT: DIRECTIONS.DEAD, TOP: DIRECTIONS.DEAD })],
  [1, new Room({ LEFT: DIRECTIONS.DOWN, RIGHT: DIRECTIONS.DOWN, TOP: DIRECTIONS.DOWN })],
  [2, new Room({ LEFT: DIRECTIONS.RIGHT, RIGHT: DIRECTIONS.LEFT }, 3, 3)],
  [3, new Room({ TOP: DIRECTIONS.DOWN }, 2, 2)],
  [4, new Room({ TOP: DIRECTIONS.LEFT, RIGHT: DIRECTIONS.DOWN }, 5, 5)],
  [5, new Room({ TOP: DIRECTIONS.RIGHT, LEFT: DIRECTIONS.DOWN }, 4, 4)],
  [6, new Room({ LEFT: DIRECTIONS.RIGHT, RIGHT: DIRECTIONS.LEFT }, 9, 7)],
  [7, new Room({ TOP: DIRECTIONS.DOWN, RIGHT: DIRECTIONS.DOWN }, 6, 8)],
  [8, new Room({ LEFT: DIRECTIONS.DOWN, RIGHT: DIRECTIONS.DOWN }, 7, 9)],
  [9, new Room({ LEFT: DIRECTIONS.DOWN, TOP: DIRECTIONS.DOWN }, 8, 6)],
  [10, new Room({ TOP: DIRECTIONS.LEFT }, 13, 11)],
  [11, new Room({ TOP: DIRECTIONS.RIGHT }, 10, 12)],
  [12, new Room({ RIGHT: DIRECTIONS.DOWN }, 11, 13)],
  [13, new Room({ LEFT: DIRECTIONS.DOWN }, 12, 10)]
]);
