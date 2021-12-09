import type { HeightMapCoordinate, HeightMap } from '.';
import { getHeightMapValue } from './getHeightMapValue';

export function getAdjacentPoints(
  heightMap: HeightMap,
  row: number,
  col: number,
): HeightMapCoordinate[] {
  const heightMapValue = getHeightMapValue(heightMap);

  return [
    { row, col: col - 1 },
    { row, col: col + 1 },
    { row: row - 1, col },
    { row: row + 1, col },
  ].filter(({ row, col }) => heightMapValue(row, col) < Infinity);
}
