import type { DepthReport } from '.';
import { calculateDepthIncreases } from './calculateDepthIncreases';
import { calculateWindowSumIncreases } from './calculateWindowSumIncreases';

const exampleDepthReport: DepthReport = [
  199, 200, 208, 210, 200, 207, 240, 269, 260, 263,
];

test('calculateDepthIncreases', () => {
  expect(calculateDepthIncreases(exampleDepthReport)).toEqual(7);
});

test('calculateWindowSumIncreases', () => {
  expect(calculateWindowSumIncreases(exampleDepthReport)).toEqual(5);
});
