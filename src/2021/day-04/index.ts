import { getInput } from '../../../lib/getInput';

import { getBoardScore } from './getBoardScore';
import { getFinalWinner } from './getFinalWinner';
import { getWinner } from './getWinner';

export type Board = BoardRow[];
export type BoardRow = [number, number, number, number, number];

function partOne(calledNumbers: number[], boards: Board[]) {
  const [winningBoard, finalNumber] = getWinner(boards, calledNumbers);

  const result = getBoardScore(winningBoard, finalNumber);
  console.log('Part One: ', result);
}

function partTwo(calledNumbers: number[], boards: Board[]) {
  const [finalWinningBoard, finalNumber] = getFinalWinner(
    boards,
    calledNumbers,
  );

  const result = getBoardScore(finalWinningBoard, finalNumber);
  console.log('Part Two: ', result);
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

  console.log('AoC 2021 - Day 04: Giant Squid');
  partOne(calledNumbers, boards.concat());
  partTwo(calledNumbers, boards.concat());
}

if (process.argv.includes('run')) {
  main();
}
