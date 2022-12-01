import type { OctopiMatrix } from '.';
import { clone2DArray } from '@/lib/clone2DArray';

function getNeighbors(matrix: OctopiMatrix, row: number, col: number) {
  return [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ].filter(
    ([neighborRow, neighborCol]) =>
      matrix[neighborRow]?.[neighborCol] !== undefined,
  );
}

export function runOctopiSimulation(
  inputMatrix: OctopiMatrix,
): [matrix: OctopiMatrix, flashCount: number] {
  const matrix = clone2DArray(inputMatrix);

  // increase the energy of each octopus by 1
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      matrix[row][col]++;
    }
  }

  // whilst there are octopi with excess energy we need to have them increase
  // their neighbors energy and flash. this has to be a while loop so that it
  // carries on for flashes caused by other flashes
  while (matrix.flat().some((octopus) => octopus > 9)) {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] > 9) {
          matrix[row][col] = 0;

          // find all the neighbors of this octopus
          const neighborOctopi = getNeighbors(matrix, row, col);

          // any neighbor which hasn't already flashed in this iteration should
          // have its energy increased by one
          neighborOctopi
            .filter(([i, j]) => matrix[i][j] > 0)
            .forEach(([i, j]) => matrix[i][j]++);
        }
      }
    }
  }

  // any octopus at 0 energy after all energy changes have been computed has
  // flashed in this simulation iteration
  const flashCount = matrix.flat().filter((octopus) => octopus === 0).length;

  return [matrix, flashCount];
}
