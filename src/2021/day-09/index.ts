import { getInput } from '../../../lib/getInput';
import { getLowPoints } from './getLowPoints';
import { getBasin } from './getBasin';

export type HeightMap = number[][];
export type HeightMapCoordinate = { row: number; col: number };

function partOne(heightMap: HeightMap) {
  const lowPoints = getLowPoints(heightMap);

  const result = lowPoints.reduce(
    (acc, { row, col }) => (acc += 1 + heightMap[row][col]),
    0,
  );

  console.log('Part One: ', result);
}

function partTwo(heightMap: HeightMap) {
  const lowPoints = getLowPoints(heightMap);
  const basins = lowPoints.map((lowPoint) => getBasin(heightMap, [lowPoint]));

  const result = basins
    .map((basin) => basin.length)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, curr) => (acc *= curr), 1);

  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);
  const heightMap: HeightMap = input
    .split('\n')
    .map((row) => row.split('').map((n) => Number(n)));

  console.log('AoC 2021 - Day 09: Smoke Basin');
  partOne(heightMap);
  partTwo(heightMap);
}

if (process.argv.includes('run')) {
  main();
}
