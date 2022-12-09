import { z } from 'zod';
import { instructionSchema } from '.';
import { runRopeSimulation } from './runRopeSimulation';

const testInstructionsA = z.array(instructionSchema).parse([
  ['R', 4],
  ['U', 4],
  ['L', 3],
  ['D', 1],
  ['R', 4],
  ['D', 1],
  ['L', 5],
  ['R', 2],
]);
const testInstructionsB = z.array(instructionSchema).parse([
  ['R', 5],
  ['U', 8],
  ['L', 8],
  ['D', 3],
  ['R', 17],
  ['D', 10],
  ['L', 25],
  ['U', 20],
]);

describe('runRopeSimulation', () => {
  it('simulates the movements of a rope of length 2', () => {
    expect(runRopeSimulation(2, testInstructionsA)).toBe(13);
  });

  it('simulates the movements of a rope of length 10', () => {
    expect(runRopeSimulation(10, testInstructionsA)).toBe(1);
    expect(runRopeSimulation(10, testInstructionsB)).toBe(36);
  });
});
