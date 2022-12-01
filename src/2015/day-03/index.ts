import { getInput } from '@/lib/getInput';

import { getSantaHouseVisits } from './getSantaHouseVisits';
import { getSantaAndRobotHouseVisits } from './getSantaAndRobotHouseVisits';

export enum Direction {
  North = '^',
  South = 'v',
  East = '>',
  West = '<',
}

function partOne(directions: Direction[]) {
  const result = getSantaHouseVisits(directions);
  console.log('Part One: ', result);
}

function partTwo(directions: Direction[]) {
  const result = getSantaAndRobotHouseVisits(directions);
  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);
  const directions: Direction[] = input.split('') as Direction[];

  console.log('AoC 2015 - Day 03: Perfectly Spherical Houses in a Vacuum');
  partOne(directions);
  partTwo(directions);
}

if (process.argv.includes('run')) {
  void main();
}
