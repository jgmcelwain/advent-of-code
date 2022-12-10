import type { CPUInstruction } from './cpu';

import { executeCPUInstructions } from './cpu';

export function sumInterestingSignals(instructions: CPUInstruction[]) {
  let interestingSignalSum = 0;

  executeCPUInstructions(instructions, 220, (i, x) => {
    const iterationNumber = i + 1;

    // interesting signals occur every 40 iterations, starting at the 20th
    if ((iterationNumber - 20) % 40 === 0) {
      const signalValue = x * iterationNumber;

      interestingSignalSum += signalValue;
    }
  });

  return interestingSignalSum;
}
