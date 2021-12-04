import type { Board } from '.';

export function getBoardScore(board: Board, finalNumber: number) {
  const remainingBoardSum = board
    .flat()
    .filter((n) => n > -1)
    .reduce((acc, curr) => (acc += curr), 0);

  return remainingBoardSum * finalNumber;
}
