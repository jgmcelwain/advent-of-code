import type { Board } from '.';
import { getBoardScore } from './getBoardScore';
import { getFinalWinner } from './getFinalWinner';
import { getWinner } from './getWinner';
import { hasBoardWon } from './hasBoardWon';
import { updateBoard } from './updateBoard';

test('updateBoard', () => {
  const boardToUpdate: Board = [
    [22, 13, 17, 11, 0],
    [8, 2, 23, 4, 24],
    [21, 9, 14, 16, 7],
    [6, 10, 3, 18, 5],
    [1, 12, 20, 15, 19],
  ];

  updateBoard(boardToUpdate, 14);

  expect(boardToUpdate[0]).toEqual([22, 13, 17, 11, 0]);
  expect(boardToUpdate[1]).toEqual([8, 2, 23, 4, 24]);
  expect(boardToUpdate[2]).toContain(-1);
  expect(boardToUpdate[3]).toEqual([6, 10, 3, 18, 5]);
  expect(boardToUpdate[4]).toEqual([1, 12, 20, 15, 19]);
});

test('hasBoardWon', () => {
  const nonWinningBoard: Board = [
    [22, 13, 17, 11, 0],
    [8, 2, 23, 4, 24],
    [21, 9, 14, 16, 7],
    [6, 10, 3, 18, 5],
    [1, 12, 20, 15, 19],
  ];
  const rowWinningBoard: Board = [
    [-1, -1, -1, -1, -1],
    [8, 2, 23, 4, 24],
    [21, 9, 14, 16, 7],
    [6, 10, 3, 18, 5],
    [1, 12, 20, 15, 19],
  ];
  const colWinningBoard: Board = [
    [22, 13, 17, -1, 0],
    [8, 2, 23, -1, 24],
    [21, 9, 14, -1, 7],
    [6, 10, 3, -1, 5],
    [1, 12, 20, -1, 19],
  ];

  expect(hasBoardWon(nonWinningBoard)).toBe(false);
  expect(hasBoardWon(rowWinningBoard)).toBe(true);
  expect(hasBoardWon(colWinningBoard)).toBe(true);
});

test('getBoardScore', () => {
  const board: Board = [
    [22, -1, 17, -1, -1],
    [8, 2, 23, -1, 24],
    [-1, 9, 14, -1, -1],
    [6, -1, 3, -1, 5],
    [1, 12, 20, -1, 19],
  ];

  expect(getBoardScore(board, 13)).toBe(2405);
});

const winTestBoards: Board[] = [
  [
    [22, 13, 17, 11, 0],
    [8, 2, 23, 4, 24],
    [21, 9, 14, 16, 7],
    [6, 10, 3, 18, 5],
    [1, 12, 20, 15, 19],
  ],
  [
    [3, 15, 0, 2, 22],
    [9, 18, 13, 17, 5],
    [19, 8, 7, 25, 23],
    [20, 11, 10, 24, 4],
    [14, 21, 16, 12, 6],
  ],
  [
    [14, 21, 17, 24, 4],
    [10, 16, 15, 9, 19],
    [18, 8, 23, 26, 20],
    [22, 11, 13, 6, 5],
    [2, 0, 12, 3, 7],
  ],
];
const winTestCalledNumbers = [
  7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
  20, 8, 19, 3, 26, 1,
];

test('getWinner', () => {
  expect(getWinner(winTestBoards, winTestCalledNumbers)).toEqual([
    winTestBoards[2],
    24,
  ]);
});

test('getFinalWinner', () => {
  expect(getFinalWinner(winTestBoards, winTestCalledNumbers)).toEqual([
    winTestBoards[1],
    13,
  ]);
});
