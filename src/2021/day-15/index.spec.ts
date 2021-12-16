import { buildCavern } from './buildCavern';
import { getDijkstraPathWeight } from './getDijkstraPathWeight';

const testData = [
  [1, 1, 6, 3, 7, 5, 1, 7, 4, 2],
  [1, 3, 8, 1, 3, 7, 3, 6, 7, 2],
  [2, 1, 3, 6, 5, 1, 1, 3, 2, 8],
  [3, 6, 9, 4, 9, 3, 1, 5, 6, 9],
  [7, 4, 6, 3, 4, 1, 7, 1, 1, 1],
  [1, 3, 1, 9, 1, 2, 8, 1, 3, 7],
  [1, 3, 5, 9, 9, 1, 2, 4, 2, 1],
  [3, 1, 2, 5, 4, 2, 1, 6, 3, 9],
  [1, 2, 9, 3, 1, 3, 8, 5, 2, 1],
  [2, 3, 1, 1, 9, 4, 4, 5, 8, 1],
];

describe('buildCavern', () => {
  it('initializes a 1x1 cavern', () => {
    const cavern = buildCavern(testData, 1, 1);

    expect(cavern[0][0].value).toBe(1);
    expect(cavern[3][4].value).toBe(9);
    expect(cavern[8][7].value).toBe(5);
    expect(cavern[5][2].value).toBe(1);
    expect(cavern[9][9].value).toBe(1);
  });

  it('initializes a 5x5 cavern', () => {
    const cavern = buildCavern(testData, 5, 5);

    expect(cavern[0][0].value).toBe(1);
    expect(cavern[7][42].value).toBe(6);
    expect(cavern[21][31].value).toBe(8);
    expect(cavern[34][9].value).toBe(4);
    expect(cavern[49][49].value).toBe(9);
  });
});

describe('getDijkstraPathWeight', () => {
  it.each([
    { xRepeats: 1, yRepeats: 1, pathWeight: 40 },
    { xRepeats: 5, yRepeats: 5, pathWeight: 315 },
  ])(
    'finds the lowest path weight ($xRepeats x $yRepeats)',
    ({ xRepeats, yRepeats, pathWeight }) => {
      const cavern = buildCavern(testData, xRepeats, yRepeats);

      expect(getDijkstraPathWeight(cavern)).toBe(pathWeight);
    },
  );
});
