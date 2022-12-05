import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { z } from 'zod';
import { runCrateMover9000 } from './runCrateMover9000';
import { runCrateMover9001 } from './runCrateMover9001';

export type CraneInstruction = { from: number; to: number; count: number };

export const crateSchema = z.string().refine((value) => value !== ' ');
export const crateStackSchema = z.array(crateSchema);
export type CrateStack = z.infer<typeof crateStackSchema>;

function partOne(stacks: CrateStack[], instructions: CraneInstruction[]) {
  const result = runCrateMover9000(stacks, instructions);

  return result;
}

function partTwo(stacks: CrateStack[], instructions: CraneInstruction[]) {
  const result = runCrateMover9001(stacks, instructions);

  return result;
}

async function main() {
  const input = await getInput(__dirname, false);
  const [stackTemplate, instructionsTemplate] = z
    .tuple([z.string(), z.string()])
    .parse(input.split('\n\n'));

  const stacks: CrateStack[] = [];
  for (const row of stackTemplate.split('\n').reverse().slice(1)) {
    const trimmedRow = row.trimEnd();

    // iterate over each row, 4 characters at a time. the input is of format
    // [A] [B]     [C], so every 4th character starting at index 1 is either
    // a crate we should add to a stack or a space that should be ignored.
    for (let i = 1; i < trimmedRow.length; i += 4) {
      const parsedCrate = crateSchema.safeParse(row[i]);

      // if this is a valid crate (and not a space, indicating an absence of
      // crate), add it to the stack
      if (parsedCrate.success) {
        const toStack = stacks[Math.floor(i / 4)];

        // if the crate's stack doesn't exist yet in our state, create it
        if (toStack === undefined) {
          stacks[Math.floor(i / 4)] = [parsedCrate.data];
        } else {
          toStack.push(parsedCrate.data);
        }
      }
    }
  }

  const instructions: CraneInstruction[] = [];
  const parsedInstructionSchema = z.tuple([z.number(), z.number(), z.number()]);
  for (const instruction of instructionsTemplate.split('\n')) {
    // converts "move 1 from 2 to 3" to [1, 2, 3]
    const [count, from, to] = parsedInstructionSchema.parse(
      instruction
        .replace(/[a-zA-Z]/g, '')
        .split('  ')
        .map((n) => Number(n)),
    );

    instructions.push({
      count,
      // subtract 1 from the from/to values because the input is 1-indexed and
      // we want to just use them as array indexes
      from: from - 1,
      to: to - 1,
    });
  }

  void runDay(
    2022,
    5,
    'Supply Stacks',
    () => partOne(stacks, instructions),
    () => partTwo(stacks, instructions),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
