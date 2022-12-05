import type { CrateStack, CraneInstruction } from '.';

import { clone2DArray } from '@/lib/clone2DArray';

export function runCrateMover9001(
  stacks: CrateStack[],
  instructions: CraneInstruction[],
) {
  const updatedStacks = clone2DArray(stacks);

  for (const { from, to, count } of instructions) {
    const fromStack = updatedStacks[from];
    const toStack = updatedStacks[to];

    if (fromStack !== undefined && toStack !== undefined) {
      const toMove = fromStack.splice(-count);

      toStack.push(...toMove);
    }
  }

  return updatedStacks.reduce(
    (acc, curr) => (acc += curr[curr.length - 1]),
    '',
  );
}
