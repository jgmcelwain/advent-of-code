import type { DepthReport } from '.';
import { calculateDepthIncreases } from './calculateDepthIncreases';
import { calculateWindowSumIncreases } from './calculateWindowSumIncreases';

const exampleDepthReport: DepthReport = [
  199, 200, 208, 210, 200, 207, 240, 269, 260, 263,
];

describe('calculateDepthIncreases', () => {
  it('counts depth increases', () => {
    expect(calculateDepthIncreases(exampleDepthReport)).toEqual(7);
  });
});

describe('calculateWindowSumIncreases', () => {
  it('counts "window" score increases', () => {
    expect(calculateWindowSumIncreases(exampleDepthReport)).toEqual(5);
  });
});
