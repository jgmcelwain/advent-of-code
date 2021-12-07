import { calculateCrabFuel } from './calculateCrabFuel';

describe('calculateCrabFuel', () => {
  const crabPositions = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
  it('calculates with linear fuel', () => {
    expect(calculateCrabFuel(crabPositions)).toEqual([37, 2]);
  });

  it('calculates with exponential fuel', () => {
    expect(calculateCrabFuel(crabPositions, true)).toEqual([168, 5]);
  });
});
