import { getInput } from '../../../lib/getInput';
import { sumArray } from '../../../lib/sumArray';
import { simulateFishPopulationGrowth } from './simulateFishPopulationGrowth';

function partOne(startingFish: number[]) {
  const result = sumArray(simulateFishPopulationGrowth(startingFish, 80));

  console.log('Part One: ', result);
}

function partTwo(startingFish: number[]) {
  const result = sumArray(simulateFishPopulationGrowth(startingFish, 256));

  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);
  const fishClocks = input.split(',').map(Number);

  console.log('AoC 2021 - Day 06: Lanternfish');
  partOne(fishClocks);
  partTwo(fishClocks);
}

if (process.argv.includes('run')) {
  main();
}
