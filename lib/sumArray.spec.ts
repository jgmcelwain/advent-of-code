import { sumArray } from './sumArray';

describe('sumArray', () => {
  it('sums the integers inside an array', () => {
    expect(sumArray([1, 2, 3, 4, 5])).toBe(15);
    expect(sumArray(Array.from({ length: 9999 }).map((_, i) => i + 1))).toBe(
      49995000,
    );
  });

  it('handles negative numbers', () => {
    expect(sumArray([-2, -1, 0, 1, 2])).toBe(0);
  });
});
