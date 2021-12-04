import type { Board } from '.';
import { BOARD_COLS, MARKED_NUMBER } from '.';

export function hasBoardWon(board: Board) {
  // if a row is full of marked numbers then it has won
  if (board.some((row) => row.every((n) => n === MARKED_NUMBER))) {
    return true;
  }

  for (let i = 0; i < BOARD_COLS; i++) {
    const col = board.map((row) => row[i]).flat();

    // if a col is full of marked numbers then it has won
    if (col.every((n) => n === MARKED_NUMBER)) {
      return true;
    }
  }

  return false;
}
