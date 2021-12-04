import type { Board } from '.';
import { MARKED_NUMBER } from '.';

export function getBoardScore(board: Board, finalNumber: number) {
  const remainingBoardSum = board
    .flat()
    .filter((n) => n !== MARKED_NUMBER)
    .reduce((acc, curr) => (acc += curr), 0);

  return remainingBoardSum * finalNumber;
}
