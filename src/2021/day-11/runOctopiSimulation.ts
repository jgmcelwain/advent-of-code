import type { OctopiGrid } from '.';
import { clone2DArray } from '../../../lib/clone2DArray';

export function runOctopiSimulation(
  start: OctopiGrid,
): [state: OctopiGrid, flashCount: number] {
  let flashCount = 0;

  const nextState = clone2DArray(start);

  // increase the energy of each octopus by 1
  for (let row = 0; row < nextState.length; row++) {
    for (let col = 0; col < nextState[row].length; col++) {
      nextState[row][col]++;
    }
  }

  // whilst there are octopi with excess energy we need to have them increase
  // their neighbors energy and flash. this has to be a while loop so that it
  // carries on for flashes caused by other flashes
  while (nextState.flat().some((octopus) => octopus > 9)) {
    for (let row = 0; row < nextState.length; row++) {
      for (let col = 0; col < nextState[row].length; col++) {
        if (nextState[row][col] > 9) {
          flashCount++;
          nextState[row][col] = 0;

          // find all the neighbors of this octopus
          const neighborOctopi = [
            [row - 1, col - 1],
            [row - 1, col],
            [row - 1, col + 1],
            [row, col - 1],
            [row, col + 1],
            [row + 1, col - 1],
            [row + 1, col],
            [row + 1, col + 1],
          ].filter(([i, j]) => nextState[i]?.[j] !== undefined);

          // any neighbor which hasn't already flashed in this iteration should
          // have its energy increased by one
          neighborOctopi
            .filter(([i, j]) => nextState[i][j] > 0)
            .forEach(([i, j]) => nextState[i][j]++);
        }
      }
    }
  }

  return [nextState, flashCount];
}
