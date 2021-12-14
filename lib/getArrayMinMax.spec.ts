import { getArrayMinMax } from './getArrayMinMax';

describe('getArrayMinMax', () => {
  it('gets the min and max values from an array of numbers', () => {
    expect(getArrayMinMax([1, 4, 3, 5, 2])).toStrictEqual([1, 5]);
    expect(getArrayMinMax([-Infinity, 12, Math.PI, Infinity, 0])).toStrictEqual(
      [-Infinity, Infinity],
    );
    expect(getArrayMinMax([NaN, 0, Infinity, Math.E])).toStrictEqual([
      NaN,
      NaN,
    ]);
  });
});
