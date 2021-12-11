import type { OctopiGrid } from '.';
import { clone2DArray } from '../../../lib/clone2DArray';

function getNeighbors(state: OctopiGrid, row: number, col: number) {
  return [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ].filter(([r, c]) => state[r]?.[c] !== undefined);
}

export function runOctopiSimulation(
  startState: OctopiGrid,
): [state: OctopiGrid, flashCount: number] {
  const state = clone2DArray(startState);

  // increase the energy of each octopus by 1
  for (let row = 0; row < state.length; row++) {
    for (let col = 0; col < state[row].length; col++) {
      state[row][col]++;
    }
  }

  // whilst there are octopi with excess energy we need to have them increase
  // their neighbors energy and flash. this has to be a while loop so that it
  // carries on for flashes caused by other flashes
  while (state.flat().some((octopus) => octopus > 9)) {
    for (let row = 0; row < state.length; row++) {
      for (let col = 0; col < state[row].length; col++) {
        if (state[row][col] > 9) {
          state[row][col] = 0;

          // find all the neighbors of this octopus
          const neighborOctopi = getNeighbors(state, row, col);

          // any neighbor which hasn't already flashed in this iteration should
          // have its energy increased by one
          neighborOctopi
            .filter(([i, j]) => state[i][j] > 0)
            .forEach(([i, j]) => state[i][j]++);
        }
      }
    }
  }

  // any octopus at 0 energy after all energy changes have been computed has
  // flashed in this simulation iteration
  const flashCount = state.flat().filter((octopus) => octopus === 0).length;

  return [state, flashCount];
}
