import type { AluInstruction } from './alu';

import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { checkModelNumber } from './checkModelNumber';
import { parseAluInstructions } from './parseAluInstructions';

// another "done by hand" day, since it was easier to figure out constraints
// based on patterns in the input than to brute force (even with decent caching)
// my way to the answer. i have seen some solutions that don't use brute force
// that i may try to implement in the future

function partOne(instructions: AluInstruction[]) {
  const result = checkModelNumber(99598963999971, instructions);

  return result;
}

function partTwo(instructions: AluInstruction[]) {
  const result = checkModelNumber(93151411711211, instructions);

  return result;
}

async function main() {
  const input = await getInput(__dirname);
  const instructions = parseAluInstructions(input);

  runDay(
    2021,
    24,
    'Arithmetic Logic Unit',
    () => partOne(instructions),
    () => partTwo(instructions),
    true,
  );
}

if (process.argv.includes('run')) {
  main();
}
