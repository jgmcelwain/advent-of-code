import type { CavernBounds, PointKey } from '.';
import { particlesUntilOneFallsOutOfBounds } from './particlesUntilOneFallsOutOfBounds';
import { particlesUntilOneReachesEntryPoint } from './particlesUntilOneReachesEntryPoint';

const testBounds: CavernBounds = {
  x: { min: 494, max: 503 },
  y: { min: Infinity, max: 9 },
};
const testWalls = new Set<PointKey>([
  '498,4',
  '498,5',
  '498,6',
  '496,6',
  '497,6',
  '502,4',
  '503,4',
  '502,5',
  '502,6',
  '502,7',
  '502,8',
  '502,9',
  '494,9',
  '495,9',
  '496,9',
  '497,9',
  '498,9',
  '499,9',
  '500,9',
  '501,9',
]);

describe('particlesUntilOneFallsOut', () => {
  it('finds the number of particles that fall before one falls out of bounds', () => {
    expect(
      particlesUntilOneFallsOutOfBounds(testWalls, testBounds, 500, 0),
    ).toBe(24);
  });
});

describe('particlesUntilOneReachesEntryPoint', () => {
  it('finds the number of particles that need to fall before they fill up to the entry point', () => {
    expect(
      particlesUntilOneReachesEntryPoint(testWalls, testBounds, 500, 0),
    ).toBe(93);
  });
});
