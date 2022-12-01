import { sumArray } from '@/lib/sumArray';
import { simulateFishPopulationGrowth } from './simulateFishPopulationGrowth';

const fish = [3, 4, 3, 1, 2];

describe('simulateFishPopulationGrowth', () => {
  it.each([
    { days: 18, expected: 26 },
    { days: 80, expected: 5934 },
    { days: 256, expected: 26984457539 },
  ])('simulates growth correctly ($days days)', ({ days, expected }) => {
    expect(sumArray(simulateFishPopulationGrowth(fish, days))).toBe(expected);
  });
});
