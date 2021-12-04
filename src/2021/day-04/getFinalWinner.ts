import type { Board } from '.';
import { hasBoardWon } from './hasBoardWon';
import { updateBoard } from './updateBoard';

export function getFinalWinner(
  boards: Board[],
  calledNumbers: number[],
): [finalWinningBoard: Board, finalNumber: number] {
  const winningBoardIndexes: number[] = [];

  for (let i = 0; i < calledNumbers.length; i++) {
    for (let j = 0; j < boards.length; j++) {
      // skip over boards that have already won
      if (winningBoardIndexes.includes(j)) {
        continue;
      }

      updateBoard(boards[j], calledNumbers[i]);

      if (hasBoardWon(boards[j])) {
        winningBoardIndexes.push(j);

        // check if all boards have won - if they have, we've just found the
        // final board and can return
        if (winningBoardIndexes.length === boards.length) {
          return [boards[j], calledNumbers[i]];
        }
      }
    }
  }

  throw new Error('No winner found');
}
