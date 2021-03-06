import type { HeightMap, HeightMapCoordinate } from '.';
import { getAdjacentPoints } from './getAdjacentPoints';
import { getHeightMapValue } from './getHeightMapValue';

export function getLowPoints(heightMap: HeightMap) {
  const lowPoints: HeightMapCoordinate[] = [];

  const heightMapValue = getHeightMapValue(heightMap);

  for (let row = 0; row < heightMap.length; row++) {
    for (let col = 0; col < heightMap[row].length; col++) {
      const lowestAdjacent = Math.min(
        ...getAdjacentPoints(heightMap, row, col).map(({ row, col }) =>
          heightMapValue(row, col),
        ),
      );

      if (heightMap[row][col] < lowestAdjacent) {
        lowPoints.push({ row, col });
      }
    }
  }

  return lowPoints;
}
