import { getInput } from '../../../lib/getInput';
import { simulateFishPopulationGrowth } from './simulateFishPopulationGrowth';

function partOne(startingFish: number[]) {
  const endFish = simulateFishPopulationGrowth(startingFish, 80);
  const result = endFish.reduce((acc, curr) => (acc += curr), 0);

  console.log('Part One: ', result);
}

function partTwo(startingFish: number[]) {
  const endFish = simulateFishPopulationGrowth(startingFish, 256);
  const result = endFish.reduce((acc, curr) => (acc += curr), 0);

  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);
  const fishClocks = input.split(',').map(Number);

  console.log('AoC 2021 - Day 05: Lanternfish');
  partOne(fishClocks);
  partTwo(fishClocks);
}

if (process.argv.includes('run')) {
  main();
}
