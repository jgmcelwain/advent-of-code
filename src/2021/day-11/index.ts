import { getInput } from '../../../lib/getInput';
import { clone2DArray } from '../../../lib/clone2DArray';
import { getOctopiFlashCount } from './getOctopiFlashCount';
import { getOctopiSynchronizedIteration } from './getOctopiSynchronizedIteration';

export type OctopiMatrix = number[][];

function partOne(inputMatrix: OctopiMatrix) {
  const result = getOctopiFlashCount(inputMatrix, 100);

  console.log('Part One: ', result);
}

function partTwo(inputMatrix: OctopiMatrix) {
  const result = getOctopiSynchronizedIteration(inputMatrix);

  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);
  const inputMatrix: OctopiMatrix = input
    .split('\n')
    .map((row) => row.split('').map((o) => Number(o)));

  console.log('AoC 2021 - Day 11: Dumbo Octopus');
  partOne(clone2DArray(inputMatrix));
  partTwo(clone2DArray(inputMatrix));
}

if (process.argv.includes('run')) {
  main();
}
