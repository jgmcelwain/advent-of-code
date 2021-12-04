import { Board, MARKED_NUMBER } from '.';
import { BOARD_COLS, BOARD_ROWS } from '.';

export function updateBoard(board: Board, calledNumber: number) {
  for (let i = 0; i < BOARD_ROWS; i++) {
    for (let j = 0; j < BOARD_COLS; j++) {
      if (board[i][j] === calledNumber) {
        board[i][j] = MARKED_NUMBER;
      }
    }
  }
}
