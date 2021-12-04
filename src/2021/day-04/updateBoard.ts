import type { Board } from '.';

export function updateBoard(board: Board, calledNumber: number) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === calledNumber) {
        // set called numbers to -1
        board[i][j] = -1;
      }
    }
  }
}
