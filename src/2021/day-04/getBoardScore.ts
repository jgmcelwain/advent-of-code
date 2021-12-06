import type { Board } from '.';
import { MARKED_NUMBER } from '.';
import { sumArray } from '../../../lib/sumArray';

export function getBoardScore(board: Board, finalNumber: number) {
  const remainingBoardSum = sumArray(
    board.flat().filter((n) => n !== MARKED_NUMBER),
  );

  return remainingBoardSum * finalNumber;
}
