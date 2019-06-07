type Room = { [index: string]: (y: number, x: number) => string };

const DIRECTIONS = {
  DOWN: (y: number, x: number) => `${x} ${y + 1}`,
  LEFT: (y: number, x: number) => `${x - 1} ${y}`,
  RIGHT: (y: number, x: number) => `${x + 1} ${y}`
};

export const roomTypes = new Map<number, Room>([
  [
    1,
    {
      LEFT: DIRECTIONS.DOWN,
      RIGHT: DIRECTIONS.DOWN,
      TOP: DIRECTIONS.DOWN
    }
  ],
  [
    2,
    {
      LEFT: DIRECTIONS.RIGHT,
      RIGHT: DIRECTIONS.LEFT
    }
  ],
  [
    3,
    {
      TOP: DIRECTIONS.DOWN
    }
  ],
  [
    4,
    {
      TOP: DIRECTIONS.LEFT,
      RIGHT: DIRECTIONS.DOWN
    }
  ],
  [
    5,
    {
      TOP: DIRECTIONS.RIGHT,
      LEFT: DIRECTIONS.DOWN
    }
  ],
  [
    6,
    {
      LEFT: DIRECTIONS.RIGHT,
      RIGHT: DIRECTIONS.LEFT
    }
  ],
  [
    7,
    {
      TOP: DIRECTIONS.DOWN,
      RIGHT: DIRECTIONS.DOWN
    }
  ],
  [
    8,
    {
      LEFT: DIRECTIONS.DOWN,
      RIGHT: DIRECTIONS.DOWN
    }
  ],
  [
    9,
    {
      LEFT: DIRECTIONS.DOWN,
      TOP: DIRECTIONS.DOWN
    }
  ],
  [
    10,
    {
      TOP: DIRECTIONS.LEFT
    }
  ],
  [
    11,
    {
      TOP: DIRECTIONS.RIGHT
    }
  ],
  [
    12,
    {
      RIGHT: DIRECTIONS.DOWN
    }
  ],
  [
    13,
    {
      LEFT: DIRECTIONS.DOWN
    }
  ]
]);
