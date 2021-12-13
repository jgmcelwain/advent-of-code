import { clone2DArray } from '../../../lib/clone2DArray';
import type { PaperMatrix, Instruction } from './index';

const combinedCellValue = (...cells: number[]) =>
  cells.some((cell) => cell === 1) ? 1 : 0;

export function foldMatrix(matrix: PaperMatrix, instruction: Instruction) {
  if (instruction.axis === 'y') {
    const outputMatrix = clone2DArray(matrix).slice(0, instruction.position);

    for (let y = instruction.position + 1; y < matrix.length; y++) {
      const outputY = matrix.length - y - 1;

      for (let x = 0; x < matrix[y].length; x++) {
        outputMatrix[outputY][x] = combinedCellValue(
          matrix[outputY][x],
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
        const outputX = matrix[y].length - x - 1;

        outputMatrix[y][outputX] = combinedCellValue(
          matrix[y][outputX],
          matrix[y][x],
        );
      }
    }

    return outputMatrix;
  }
}
