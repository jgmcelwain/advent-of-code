import type { OctopiMatrix } from '.';
import { clone2DArray } from '../../../lib/clone2DArray';
import { runOctopiSimulation } from './runOctopiSimulation';

export function getOctopiFlashCount(
  inputMatrix: OctopiMatrix,
  iterations: number,
) {
  let currentMatrix = clone2DArray(inputMatrix);

  let flashCount = 0;

  for (let i = 0; i < iterations; i++) {
    const [outputMatrix, flashes] = runOctopiSimulation(currentMatrix);

    flashCount += flashes;
    currentMatrix = outputMatrix;
  }

  return flashCount;
}
