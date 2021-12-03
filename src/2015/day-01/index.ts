import { getInput } from '../../../lib/getInput';

import { getBasementInstruction } from './getBasementInstruction';
import { getDestinationFloor } from './getDestinationFloor';

export enum Instruction {
  Up = '(',
  Down = ')',
}

function partOne(input: string) {
  const result = getDestinationFloor(input);
  console.log('Part One: ', result);
}

function partTwo(input: string) {
  const result = getBasementInstruction(input);
  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);

  console.log('AoC 2015 - Day 01: Not Quite Lisp');
  partOne(input);
  partTwo(input);
}

if (process.argv.includes('run')) {
  main();
}
