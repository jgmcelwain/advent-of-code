import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { calculateCrabFuel } from './calculateCrabFuel';

function partOne(crabPositions: number[]) {
  const [result] = calculateCrabFuel(crabPositions);

  return result;
}

function partTwo(crabPositions: number[]) {
  const [result] = calculateCrabFuel(crabPositions, true);

  return result;
}

async function main() {
  const input = await getInput(__dirname);
  const crabPositions: number[] = input.split(',').map(Number);

  runDay(
    2021,
    7,
    'The Treachery of Whales',
    () => partOne(crabPositions),
    () => partTwo(crabPositions),
    true,
  );
}

if (process.argv.includes('run')) {
  main();
}
