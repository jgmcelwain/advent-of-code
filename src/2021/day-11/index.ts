import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { getOctopiFlashCount } from './getOctopiFlashCount';
import { getOctopiSynchronizedIteration } from './getOctopiSynchronizedIteration';

export type OctopiMatrix = number[][];

function partOne(inputMatrix: OctopiMatrix) {
  return getOctopiFlashCount(inputMatrix, 100);
}

function partTwo(inputMatrix: OctopiMatrix) {
  return getOctopiSynchronizedIteration(inputMatrix);
}

async function main() {
  const input = await getInput(__dirname);
  const inputMatrix: OctopiMatrix = input
    .split('\n')
    .map((row) => row.split('').map((o) => Number(o)));

  runDay(
    2021,
    11,
    'Dumbo Octopus',
    () => partOne(inputMatrix),
    () => partTwo(inputMatrix),
    true,
  );
}

if (process.argv.includes('run')) {
  main();
}
