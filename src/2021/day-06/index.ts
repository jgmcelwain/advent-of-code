import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { sumArray } from '../../../lib/sumArray';
import { simulateFishPopulationGrowth } from './simulateFishPopulationGrowth';

function partOne(startingFish: number[]) {
  return sumArray(simulateFishPopulationGrowth(startingFish, 80));
}

function partTwo(startingFish: number[]) {
  return sumArray(simulateFishPopulationGrowth(startingFish, 256));
}

async function main() {
  const input = await getInput(__dirname);
  const fishClocks = input.split(',').map(Number);

  void runDay(
    2021,
    6,
    'Lanternfish',
    () => partOne(fishClocks),
    () => partTwo(fishClocks),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
