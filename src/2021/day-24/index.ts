import type { AluInstruction, AluKey } from './alu';
import { AluInstructionKind } from './alu';

import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { checkModelNumber } from './checkModelNumber';

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
  const instructions: AluInstruction[] = input
    .split('\n')
    .map((instruction) => {
      const split = instruction.split(' ');

      const kind = split[0] as AluInstructionKind;
      const a = split[1] as AluKey;

      if (kind === AluInstructionKind.Input) {
        return { kind, a };
      } else {
        const b = isNaN(Number(split[2]))
          ? (split[2] as AluKey)
          : Number(split[2]);

        return { kind, a, b };
      }
    });

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
