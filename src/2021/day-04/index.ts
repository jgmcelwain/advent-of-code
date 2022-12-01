import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';

import { getBoardScore } from './getBoardScore';
import { getFinalWinner } from './getFinalWinner';
import { getWinner } from './getWinner';

export type Board = BoardRow[];
export type BoardRow = [number, number, number, number, number];

export const BOARD_ROWS = 5;
export const BOARD_COLS = 5;
export const MARKED_NUMBER = -1;

function partOne(calledNumbers: number[], boards: Board[]) {
  const [winningBoard, finalNumber] = getWinner(boards, calledNumbers);

  return getBoardScore(winningBoard, finalNumber);
}

function partTwo(calledNumbers: number[], boards: Board[]) {
  const [finalWinningBoard, finalNumber] = getFinalWinner(
    boards,
    calledNumbers,
  );

  return getBoardScore(finalWinningBoard, finalNumber);
}

async function main() {
  const input = await getInput(__dirname);

  const [inputNumbers, ...inputBoards] = input.split('\n\n');

  const calledNumbers = inputNumbers.split(',').map(Number);

  const boards = inputBoards.map((inputBoard): Board => {
    const rows = inputBoard.split('\n');

    return rows.map((row) => {
      const n = row.split(' ').filter(Boolean).map(Number);

      return [n[0], n[1], n[2], n[3], n[4]];
    });
  });

  void runDay(
    2021,
    4,
    'Giant Squid',
    () => partOne(calledNumbers, boards.concat()),
    () => partTwo(calledNumbers, boards.concat()),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
