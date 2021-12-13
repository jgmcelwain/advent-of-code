import type { PathMap } from '.';
import { countPaths } from './countPaths';

const testPathMap: PathMap = {
  start: ['A', 'b'],
  A: ['start', 'c', 'b', 'end'],
  b: ['start', 'A', 'd', 'end'],
  c: ['A'],
  d: ['b'],
  end: ['A', 'b'],
};

describe('countPaths', () => {
  it('counts the number of paths if lowercase points can only be visited once', () => {
    expect(countPaths(testPathMap, false)).toBe(10);
  });
  it('counts the number of paths if a single lowercase point can be visited twice', () => {
    expect(countPaths(testPathMap, true)).toBe(36);
  });
});
