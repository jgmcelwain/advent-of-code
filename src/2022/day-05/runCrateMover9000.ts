import type { CrateStack, CraneInstruction } from '.';

import { clone2DArray } from '@/lib/clone2DArray';

export function runCrateMover9000(
  stacks: CrateStack[],
  instructions: CraneInstruction[],
) {
  const updatedStacks = clone2DArray(stacks);

  for (const { from, to, count } of instructions) {
    const fromStack = updatedStacks[from];
    const toStack = updatedStacks[to];

    if (fromStack !== undefined && toStack !== undefined) {
      for (let i = 0; i < count; i++) {
        const crateToMove = fromStack.pop();
        if (crateToMove !== undefined) {
          toStack.push(crateToMove);
        }
      }
    }
  }

  return updatedStacks.reduce(
    (acc, curr) => (acc += curr[curr.length - 1]),
    '',
  );
}
