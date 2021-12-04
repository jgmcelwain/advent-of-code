import type { Board } from '.';
import { hasBoardWon } from './hasBoardWon';
import { updateBoard } from './updateBoard';

export function getWinner(
  boards: Board[],
  calledNumbers: number[],
): [winningBoard: Board, finalNumber: number] {
  for (let i = 0; i < calledNumbers.length; i++) {
    for (let j = 0; j < boards.length; j++) {
      updateBoard(boards[j], calledNumbers[i]);

      if (hasBoardWon(boards[j])) {
        return [boards[j], calledNumbers[i]];
      }
    }
  }

  throw new Error('No winner found');
}
