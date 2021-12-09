import type { HeightMap, HeightMapCoordinate } from '.';
import { getAdjacentPoints } from './getAdjacentPoints';
import { getHeightMapValue } from './getHeightMapValue';

export function getBasin(
  heightMap: HeightMap,
  basinPoints: HeightMapCoordinate[],
): HeightMapCoordinate[] {
  const heightMapValue = getHeightMapValue(heightMap);

  const foundBasinPoints = [...basinPoints];

  basinPoints.forEach((basinPoint) => {
    const pointsToAdd = getAdjacentPoints(
      heightMap,
      basinPoint.row,
      basinPoint.col,
    ).filter((candidate) => {
      const existingPoint = foundBasinPoints.some(
        (basinPoint) =>
          basinPoint.row === candidate.row && basinPoint.col === candidate.col,
      );

      return (
        !existingPoint &&
        heightMapValue(candidate.row, candidate.col) < 9 &&
        heightMapValue(candidate.row, candidate.col) >
          heightMapValue(basinPoint.row, basinPoint.col)
      );
    });

    foundBasinPoints.push(...pointsToAdd);
  });

  // if this iteration didn't find any new points then we are done
  if (foundBasinPoints.length === basinPoints.length) {
    return foundBasinPoints;
  }
  // otherwise we go again
  else {
    return getBasin(heightMap, foundBasinPoints);
  }
}
