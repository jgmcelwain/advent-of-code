import { z } from 'zod';

export const instructionSchema = z.tuple([
  z.literal('noop').or(z.literal('addx')),
  z.number(),
]);
export type CPUInstruction = z.infer<typeof instructionSchema>;

export function parseCPUInstructions(
  rawInstructions: string[],
): CPUInstruction[] {
  return z.array(instructionSchema).parse(
    rawInstructions
      .map((instruction) => {
        const [operation, value] = instruction.split(' ');

        if (operation === 'addx') {
          // buffer all add operations with an additional noop to simulate their
          // 2-tick nature
          return [
            ['noop', 0],
            ['addx', Number(value)],
          ];
        } else {
          return [['noop', 0]];
        }
      })
      .flat(1),
  );
}

export function executeCPUInstructions(
  instructions: CPUInstruction[],
  iterationCount: number,
  afterEachIteration?: (iteration: number, x: number) => void,
) {
  let x = 1;

  const pendingOperations: Record<number, number> = {};

  for (let i = 0; i < iterationCount; i++) {
    const instruction = instructions[i % instructions.length];

    if (instruction === undefined) throw new Error();

    const [operation, value] = instruction;

    if (operation !== 'noop') {
      pendingOperations[i + 1] = value;
    }

    const toExecute = pendingOperations[i];
    if (toExecute !== undefined) {
      x += toExecute;
    }

    afterEachIteration?.(i, x);
  }

  return x;
}
