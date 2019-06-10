import { Array2D } from '../../helpers/array-2d';
import { roomTypes, IndyPos } from './room-types';

export const grid = new Array2D<string>();

export function addLineToGrid(line: string) {
  grid.push(line.split(' '));
}

export function predictIndyPos(y: number, x: number, entry: string): IndyPos | null {
  const roomType = grid.get(+y, +x);
  if (!roomType) {
    throw new Error('Invalid grid position');
  }
  
  const room = roomTypes.get(Math.abs(+roomType));
  if (!room) {
    throw new Error('Invalid room type');
  }
  
  if (room[entry]) {
    return room[entry](+y, +x);
  }

  return null  
}
