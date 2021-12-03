import { getInput } from '../../../lib/getInput';
import { findMD5LeadingZeroGeneratingInt } from './findMD5LeadingZeroGeneratingInt';

function partOne(secretKey: string) {
  const result = findMD5LeadingZeroGeneratingInt(secretKey, 5);
  console.log('Part One: ', result);
}

function partTwo(secretKey: string) {
  const result = findMD5LeadingZeroGeneratingInt(secretKey, 6);
  console.log('Part One: ', result);
}

async function main() {
  const input = await getInput(__dirname);

  console.log('AoC 2015 - Day 04: The Ideal Stocking Stuffer');
  partOne(input);
  partTwo(input);
}

if (process.argv.includes('run')) {
  main();
}
