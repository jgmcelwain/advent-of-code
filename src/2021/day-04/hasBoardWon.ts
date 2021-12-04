import type { Board } from '.';

export function hasBoardWon(board: Board) {
  // if a row is full of marked numbers (-1) then it has won
  if (board.some((row) => row.every((n) => n === -1))) {
    return true;
  }

  for (let i = 0; i < 5; i++) {
    const col = board.map((row) => row[i]).flat();

    // if a col is full of marked numbers (-1) then it has won
    if (col.every((n) => n === -1)) {
      return true;
    }
  }

  return false;
}
