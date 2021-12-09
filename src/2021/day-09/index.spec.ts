import type { HeightMap } from '.';
import { getAdjacentPoints } from './getAdjacentPoints';
import { getBasin } from './getBasin';
import { getHeightMapValue } from './getHeightMapValue';
import { getLowPoints } from './getLowPoints';

const testHeightMap: HeightMap = [
  [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
  [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
  [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
  [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
  [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
];

describe('getHeightMapValue', () => {
  const heightMapValue = getHeightMapValue(testHeightMap);

  it('finds values', () => {
    expect(heightMapValue(3, 4)).toBe(8);

    expect(heightMapValue(0, 9)).toBe(0);
  });

  it('returns the default value if the requested column or row do not exist', () => {
    expect(heightMapValue(0, 10)).toBe(Infinity);
    expect(heightMapValue(12, 4)).toBe(Infinity);
  });
});

describe('getAdjacentPoints', () => {
  it('finds the adjacent points for a given point', () => {
    expect(getAdjacentPoints(testHeightMap, 1, 1)).toStrictEqual([
      { row: 1, col: 0 },
      { row: 1, col: 2 },
      { row: 0, col: 1 },
      { row: 2, col: 1 },
    ]);
  });

  it('ignores points that do not exist on the height map', () => {
    expect(getAdjacentPoints(testHeightMap, 4, 9)).toStrictEqual([
      { col: 8, row: 4 },
      { col: 9, row: 3 },
    ]);
    expect(getAdjacentPoints(testHeightMap, 0, 2)).toStrictEqual([
      { col: 1, row: 0 },
      { col: 3, row: 0 },
      { col: 2, row: 1 },
    ]);
  });
});

describe('getLowPoints', () => {
  it('identifies points lower than their adjacent points', () => {
    expect(getLowPoints(testHeightMap)).toStrictEqual([
      { col: 1, row: 0 },
      { col: 9, row: 0 },
      { col: 2, row: 2 },
      { col: 6, row: 4 },
    ]);
  });
});

describe('getBasin', () => {
  const lowPoints = getLowPoints(testHeightMap);
  const basins = lowPoints
    .map((lowPoints) => getBasin(testHeightMap, [lowPoints]))
    .filter(Boolean);

  it('finds a basin for each low point', () => {
    expect(basins.length).toBe(4);
  });

  it('correctly finds all the points in each basin', () => {
    expect(basins.map((basin) => basin.length)).toStrictEqual([3, 9, 14, 9]);
  });
});
