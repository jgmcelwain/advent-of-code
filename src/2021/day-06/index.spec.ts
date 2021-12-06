import { simulateFishPopulationGrowth } from './simulateFishPopulationGrowth';

function sumArray(array: number[]) {
  return array.reduce((acc, curr) => (acc += curr), 0);
}

const fish = [3, 4, 3, 1, 2];

test('simulateFishPopulationGrowth', () => {
  expect(sumArray(simulateFishPopulationGrowth(fish, 18))).toBe(26);

  expect(sumArray(simulateFishPopulationGrowth(fish, 80))).toBe(5934);

  expect(sumArray(simulateFishPopulationGrowth(fish, 256))).toBe(26984457539);
});
