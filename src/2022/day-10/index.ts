import type { CPUInstruction } from './cpu';

import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { parseCPUInstructions } from './cpu';
import { sumInterestingSignals } from './sumInterestingSignals';
import { drawInstructionsOutput } from './drawInstructionsOutput';

function partOne(instructions: CPUInstruction[]) {
  const result = sumInterestingSignals(instructions);

  return result;
}

function partTwo(instructions: CPUInstruction[]) {
  const result = drawInstructionsOutput(instructions);

  return result;
}

async function main() {
  const input = await getInput(__dirname);

  const instructions = parseCPUInstructions(input.split('\n'));

  void runDay(
    2022,
    10,
    'Cathode-Ray Tube',
    () => partOne(instructions),
    () => partTwo(instructions),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
