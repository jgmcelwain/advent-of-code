import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { z } from 'zod';
import { runCrateMover9000 } from './runCrateMover9000';
import { runCrateMover9001 } from './runCrateMover9001';

export type CraneInstruction = { from: number; to: number; count: number };

export const crateSchema = z.string();
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

    for (let i = 1; i < trimmedRow.length; i += 4) {
      const char = crateSchema.parse(row[i]);
      const toStack = stacks[Math.floor(i / 4)];

      if (char !== ' ') {
        if (toStack === undefined) {
          stacks[Math.floor(i / 4)] = [char];
        } else {
          toStack.push(char);
        }
      }
    }
  }

  const instructions: CraneInstruction[] = [];
  for (const instruction of instructionsTemplate.split('\n')) {
    const [count, from, to] = z
      .tuple([z.number(), z.number(), z.number()])
      .parse(
        instruction
          .replace(/[a-zA-Z]/g, '')
          .split('  ')
          .map((n) => Number(n)),
      );

    instructions.push({
      count,
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
