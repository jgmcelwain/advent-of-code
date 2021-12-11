import { getInput } from '../../../lib/getInput';
import { clone2DArray } from '../../../lib/clone2DArray';
import { getOctopiFlashCount } from './getOctopiFlashCount';
import { getOctopiSynchronizedIteration } from './getOctopiSynchronizedIteration';

export type OctopiGrid = number[][];

function partOne(octopi: OctopiGrid) {
  const result = getOctopiFlashCount([...octopi], 100);

  console.log('Part One: ', result);
}

function partTwo(octopi: OctopiGrid) {
  const result = getOctopiSynchronizedIteration([...octopi]);

  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);
  const octopi: OctopiGrid = input
    .split('\n')
    .map((row) => row.split('').map((o) => Number(o)));

  console.log('AoC 2021 - Day 11: Dumbo Octopus');
  partOne(clone2DArray(octopi));
  partTwo(clone2DArray(octopi));
}

if (process.argv.includes('run')) {
  main();
}
