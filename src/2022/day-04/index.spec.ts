import type { AssignedPairs } from '.';

import { pairsWithContainedRanges, pairsWithOverlappingRanges } from '.';

const testData: AssignedPairs = [
  [
    [2, 4],
    [6, 8],
  ],
  [
    [2, 3],
    [4, 5],
  ],
  [
    [5, 7],
    [7, 9],
  ],
  [
    [2, 8],
    [3, 7],
  ],
  [
    [6, 6],
    [4, 6],
  ],
  [
    [2, 6],
    [4, 8],
  ],
];

describe('overlappingRanges', () => {
  it('finds the number of pairs that have one of their ranges contained within the other', () => {
    expect(pairsWithContainedRanges(testData)).toBe(2);
  });
});

describe('overlappingRanges', () => {
  it('finds the number of pairs that have overlapping ranges', () => {
    expect(pairsWithOverlappingRanges(testData)).toBe(4);
  });
});
