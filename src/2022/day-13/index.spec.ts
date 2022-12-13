import { checkPacketsAreInCorrectOrder } from './checkPacketsAreInCorrectOrder';

describe('checkPacketsAreInCorrectOrder', () => {
  it('uses the packet order rules to check if two packets are in the correct order', () => {
    expect(
      checkPacketsAreInCorrectOrder([1, 1, 3, 1, 1], [1, 1, 5, 1, 1]),
    ).toBe(true);

    expect(checkPacketsAreInCorrectOrder([[1], [2, 3, 4]], [[1], 4])).toBe(
      true,
    );

    expect(checkPacketsAreInCorrectOrder([9], [[8, 7, 6]])).toBe(false);

    expect(
      checkPacketsAreInCorrectOrder([[4, 4], 4, 4], [[4, 4], 4, 4, 4]),
    ).toBe(true);

    expect(checkPacketsAreInCorrectOrder([7, 7, 7, 7], [7, 7, 7])).toBe(false);

    expect(checkPacketsAreInCorrectOrder([], [3])).toBe(true);

    expect(checkPacketsAreInCorrectOrder([[[]]], [[]])).toBe(false);

    expect(
      checkPacketsAreInCorrectOrder(
        [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
        [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
      ),
    ).toBe(false);
  });
});
