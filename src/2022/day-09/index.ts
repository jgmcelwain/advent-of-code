import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { z } from 'zod';
import { runRopeSimulation } from './runRopeSimulation';

export const instructionSchema = z.tuple([z.string(), z.number()]);
export type Instruction = z.infer<typeof instructionSchema>;

function partOne(instructions: Instruction[]) {
  const result = runRopeSimulation(2, instructions);

  return result;
}

function partTwo(instructions: Instruction[]) {
  const result = runRopeSimulation(10, instructions);

  return result;
}

async function main() {
  const input = await getInput(__dirname);
  const instructions = z.array(instructionSchema).parse(
    input.split('\n').map((instruction) => {
      const [direction, distance] = instruction.split(' ');

      return [direction, Number(distance)];
    }),
  );

  void runDay(
    2022,
    9,
    'Rope Bridge',
    () => partOne(instructions),
    () => partTwo(instructions),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
