import type { Line } from '.';
import { LineKind } from '.';
import { getPositionTraversedCounts } from './getPositionTraversedCounts';

const exampleLines: Line[] = [
  { start: { x: 0, y: 9 }, end: { x: 5, y: 9 }, kind: LineKind.Horizontal },
  { start: { x: 8, y: 0 }, end: { x: 0, y: 8 }, kind: LineKind.Diagonal },
  { start: { x: 9, y: 4 }, end: { x: 3, y: 4 }, kind: LineKind.Horizontal },
  { start: { x: 2, y: 2 }, end: { x: 2, y: 1 }, kind: LineKind.Vertical },
  { start: { x: 7, y: 0 }, end: { x: 7, y: 4 }, kind: LineKind.Vertical },
  { start: { x: 6, y: 4 }, end: { x: 2, y: 0 }, kind: LineKind.Diagonal },
  { start: { x: 0, y: 9 }, end: { x: 2, y: 9 }, kind: LineKind.Horizontal },
  { start: { x: 3, y: 4 }, end: { x: 1, y: 4 }, kind: LineKind.Horizontal },
  { start: { x: 0, y: 0 }, end: { x: 8, y: 8 }, kind: LineKind.Diagonal },
  { start: { x: 5, y: 5 }, end: { x: 8, y: 2 }, kind: LineKind.Diagonal },
];

describe('getPositionTraversedCounts', () => {
  it('works with horizontal and vertical lines', () => {
    expect(
      getPositionTraversedCounts(exampleLines)
        .flat(2)
        .filter((n) => n > 1).length,
    ).toBe(5);
  });

  test('works with diagonal lines', () => {
    expect(
      getPositionTraversedCounts(exampleLines, true)
        .flat(2)
        .filter((n) => n > 1).length,
    ).toBe(12);
  });
});
