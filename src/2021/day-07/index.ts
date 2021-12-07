import { getInput } from '../../../lib/getInput';
import { calculateCrabFuel } from './calculateCrabFuel';

function partOne(crabPositions: number[]) {
  const [result] = calculateCrabFuel(crabPositions);

  console.log('Part One: ', result);
}

function partTwo(crabPositions: number[]) {
  const [result] = calculateCrabFuel(crabPositions, true);

  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);
  const crabPositions: number[] = input.split(',').map(Number);

  console.log('AoC 2021 - Day 07: The Treachery of Whales');
  partOne(crabPositions);
  partTwo(crabPositions);
}

if (process.argv.includes('run')) {
  main();
}
