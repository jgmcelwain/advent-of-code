import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { getLowPoints } from './getLowPoints';
import { getBasin } from './getBasin';

export type HeightMap = number[][];
export type HeightMapCoordinate = { row: number; col: number };

function partOne(heightMap: HeightMap) {
  const lowPoints = getLowPoints(heightMap);

  return lowPoints.reduce(
    (acc, { row, col }) => (acc += 1 + heightMap[row][col]),
    0,
  );
}

function partTwo(heightMap: HeightMap) {
  const lowPoints = getLowPoints(heightMap);
  const basins = lowPoints.map((lowPoint) => getBasin(heightMap, [lowPoint]));

  return basins
    .map((basin) => basin.length)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, curr) => (acc *= curr), 1);
}

async function main() {
  const input = await getInput(__dirname);
  const heightMap: HeightMap = input
    .split('\n')
    .map((row) => row.split('').map((n) => Number(n)));

  runDay(
    2021,
    9,
    'Smoke Basin',
    () => partOne(heightMap),
    () => partTwo(heightMap),
    true,
  );
}

if (process.argv.includes('run')) {
  main();
}
