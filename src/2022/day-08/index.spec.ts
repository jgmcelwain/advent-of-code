import {
  calculateTreeGroupViewingDistance,
  getHighestScenicScore,
} from './getHighestScenicScore';
import { getPerimeterVisibleTreeCount } from './getPerimeterVisibleTreeCount';

const testTrees: number[][] = [
  [3, 0, 3, 7, 3],
  [2, 5, 5, 1, 2],
  [6, 5, 3, 3, 2],
  [3, 3, 5, 4, 9],
  [3, 5, 3, 9, 0],
];

describe('getPerimeterVisibleTreeCount', () => {
  it('works out how many trees are visible from outside the perimeter', () => {
    expect(getPerimeterVisibleTreeCount(testTrees)).toBe(21);
  });
});

describe('getHighestScenicScore', () => {
  describe('calculateTreeGroupViewingDistance', () => {
    it('finds the viewing distance for a tree looking at a group', () => {
      expect(calculateTreeGroupViewingDistance([3, 5, 3], 5)).toBe(2);
      expect(calculateTreeGroupViewingDistance([3, 5, 6], 5)).toBe(2);
      expect(calculateTreeGroupViewingDistance([4, 9], 5)).toBe(2);
      expect(calculateTreeGroupViewingDistance([3], 5)).toBe(1);

      expect(calculateTreeGroupViewingDistance([], 9)).toBe(0);
    });
  });

  describe('getHighestScenicScore', () => {
    it('finds the highest scenic score in a matrix of trees', () => {
      expect(getHighestScenicScore(testTrees)).toBe(8);
    });
  });
});
