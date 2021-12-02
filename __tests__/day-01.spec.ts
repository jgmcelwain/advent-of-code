import { calculateDepthIncreases } from '../src/day-01/calculateDepthIncreases';

test('calculateDepthIncreases', () => {
  expect(
    calculateDepthIncreases([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]),
  ).toEqual(7);
});
