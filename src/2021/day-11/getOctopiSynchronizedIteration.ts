import type { OctopiMatrix } from '.';
import { clone2DArray } from '@/lib/clone2DArray';
import { runOctopiSimulation } from './runOctopiSimulation';

export function getOctopiSynchronizedIteration(
  inputMatrix: OctopiMatrix,
): number {
  let currentMatrix = clone2DArray(inputMatrix);

  let currentIteration = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    currentIteration++;

    const [outputMatrix] = runOctopiSimulation(currentMatrix);

    if (outputMatrix.flat().every((octopus) => octopus === 0)) {
      return currentIteration;
    }

    currentMatrix = outputMatrix;
  }
}
