import type { CraneInstruction, CrateStack } from '.';
import { runCrateMover9000 } from './runCrateMover9000';
import { runCrateMover9001 } from './runCrateMover9001';

const testStacks: CrateStack[] = [['Z', 'N'], ['M', 'C', 'D'], ['P']];

const testInstructions: CraneInstruction[] = [
  { count: 1, from: 1, to: 0 },
  { count: 3, from: 0, to: 2 },
  { count: 2, from: 1, to: 0 },
  { count: 1, from: 0, to: 1 },
];

describe('runCrateMover9000', () => {
  it('executes the instructions on a crate mover 9000 crane', () => {
    expect(runCrateMover9000(testStacks, testInstructions)).toBe('CMZ');
  });
});

describe('runCrateMover9001', () => {
  it('executes the instructions on a crate mover 9000 crane', () => {
    expect(runCrateMover9001(testStacks, testInstructions)).toBe('MCD');
  });
});
