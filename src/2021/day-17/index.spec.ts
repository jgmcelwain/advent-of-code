import { getValidVelocities } from './getValidVelocities';
import { maxPossibleHeight } from './maxPossibleHeight';
import { velocityReachesTargetArea } from './velocityReachesTargetArea';

const testBounds = { x1: 20, x2: 30, y1: -10, y2: -5 };

describe('maxPossibleHeight', () => {
  it('finds the max height for a given y bound', () => {
    expect(maxPossibleHeight(-10)).toBe(45);
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
