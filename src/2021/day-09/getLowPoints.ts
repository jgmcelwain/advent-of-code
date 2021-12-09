import type { HeightMap, HeightMapCoordinate } from '.';
import { getHeightMapValue } from './getHeightMapValue';

export function getLowPoints(heightMap: HeightMap) {
  const lowPoints: HeightMapCoordinate[] = [];

  const heightMapValue = getHeightMapValue(heightMap);

  for (let row = 0; row < heightMap.length; row++) {
    for (let col = 0; col < heightMap[row].length; col++) {
      const lowestAdjacent = Math.min(
        heightMapValue(row, col - 1),
        heightMapValue(row, col + 1),
        heightMapValue(row - 1, col),
        heightMapValue(row + 1, col),
      );

      if (heightMap[row][col] < lowestAdjacent) {
        lowPoints.push({ row, col });
      }
    }
  }

  return lowPoints;
}
