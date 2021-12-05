import type { Line } from './index';
import { getPositionTraversedCounts } from './getPositionTraversedCounts';

const exampleLines: Line[] = [
  { start: { x: 0, y: 9 }, end: { x: 5, y: 9 }, kind: 0 },
  { start: { x: 8, y: 0 }, end: { x: 0, y: 8 }, kind: 2 },
  { start: { x: 9, y: 4 }, end: { x: 3, y: 4 }, kind: 0 },
  { start: { x: 2, y: 2 }, end: { x: 2, y: 1 }, kind: 1 },
  { start: { x: 7, y: 0 }, end: { x: 7, y: 4 }, kind: 1 },
  { start: { x: 6, y: 4 }, end: { x: 2, y: 0 }, kind: 2 },
  { start: { x: 0, y: 9 }, end: { x: 2, y: 9 }, kind: 0 },
  { start: { x: 3, y: 4 }, end: { x: 1, y: 4 }, kind: 0 },
  { start: { x: 0, y: 0 }, end: { x: 8, y: 8 }, kind: 2 },
  { start: { x: 5, y: 5 }, end: { x: 8, y: 2 }, kind: 2 },
];

test('getPositionTraversedCounts', () => {
  expect(
    getPositionTraversedCounts(exampleLines)
      .flat(2)
      .filter((n) => n > 1).length,
  ).toBe(5);
});
test('getPositionTraversedCounts', () => {
  expect(
    getPositionTraversedCounts(exampleLines, true)
      .flat(2)
      .filter((n) => n > 1).length,
  ).toBe(12);
});
