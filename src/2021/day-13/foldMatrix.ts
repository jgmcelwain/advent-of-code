import { clone2DArray } from '../../../lib/clone2DArray';
import type { Instruction } from './index';

export function foldMatrix(matrix: number[][], instruction: Instruction) {
  if (instruction.axis === 'y') {
    const outputMatrix = clone2DArray(matrix).slice(0, instruction.position);

    for (let y = instruction.position + 1; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        const distanceFromEdge = matrix.length - y;

        outputMatrix[distanceFromEdge - 1][x] = Math.max(
          matrix[distanceFromEdge - 1][x],
          matrix[y][x],
        );
      }
    }

    return outputMatrix;
  } else {
    const outputMatrix = clone2DArray(matrix).map((row) =>
      row.slice(0, instruction.position),
    );

    for (let y = 0; y < matrix.length; y++) {
      for (let x = instruction.position + 1; x < matrix[y].length; x++) {
        const distanceFromEdge = matrix[y].length - x;

        outputMatrix[y][distanceFromEdge - 1] = Math.max(
          matrix[y][distanceFromEdge - 1],
          matrix[y][x],
        );
      }
    }

    return outputMatrix;
  }
}
