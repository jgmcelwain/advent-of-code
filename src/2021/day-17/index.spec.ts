import { getValidVelocities } from './getValidVelocities';
import { maxPossibleHeight } from './maxPossibleHeight';
import { simVelocity } from './simVelocity';

const testBounds = { x1: 20, x2: 30, y1: -10, y2: -5 };

describe('maxPossibleHeight', () => {
  it('finds the max height for a given y bound', () => {
    expect(maxPossibleHeight(-10)).toBe(45);
  });
});

describe('simVelocity', () => {
  it('checks if a given velocity ends up in the bounding box', () => {
    expect(simVelocity(15, -2, testBounds)).toBe(true);
    expect(simVelocity(6, 9, testBounds)).toBe(true);
    expect(simVelocity(20, -9, testBounds)).toBe(true);
    expect(simVelocity(30, -5, testBounds)).toBe(true);
    expect(simVelocity(7, 4, testBounds)).toBe(true);
  });
});

describe('getValidVelocities', () => {
  it('finds all valid velocities for a given bounding box', () => {
    const validVelocities = getValidVelocities(testBounds);

    expect(validVelocities).toHaveLength(112);
  });
});
