import { getValidVelocities } from './getValidVelocities';
import { inBounds } from './inBounds';
import { maxPossibleHeight } from './maxPossibleHeight';
import { velocityReachesTargetArea } from './velocityReachesTargetArea';

const testBounds = { x1: 20, x2: 30, y1: -10, y2: -5 };

describe('maxPossibleHeight', () => {
  it('finds the max height for a given y bound', () => {
    expect(maxPossibleHeight(-10)).toBe(45);
  });
});

describe('inBounds', () => {
  it('finds if a point lies within a bounding box', () => {
    expect(inBounds(20, -10, testBounds)).toBe(true);
    expect(inBounds(24, -7, testBounds)).toBe(true);
    expect(inBounds(30, -2, testBounds)).toBe(false);
    expect(inBounds(100, -7, testBounds)).toBe(false);
  });
});

describe('velocityReachesTargetArea', () => {
  it('checks if a given velocity ends up in the bounding box', () => {
    expect(velocityReachesTargetArea(15, -2, testBounds)).toBe(true);
    expect(velocityReachesTargetArea(6, 9, testBounds)).toBe(true);
    expect(velocityReachesTargetArea(20, -9, testBounds)).toBe(true);
    expect(velocityReachesTargetArea(30, -5, testBounds)).toBe(true);
    expect(velocityReachesTargetArea(7, 4, testBounds)).toBe(true);
  });
});

describe('getValidVelocities', () => {
  it('finds all valid velocities for a given bounding box', () => {
    const validVelocities = getValidVelocities(testBounds);

    expect(validVelocities).toHaveLength(112);
  });
});
