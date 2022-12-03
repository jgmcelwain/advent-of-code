import { commonCompartmentItemPrioritySum } from './commonCompartmentItemPrioritySum';
import { getItemPriority } from './getItemPriority';
import { groupBadgePrioritySum } from './groupBadgePrioritySum';

describe('getItemPriority', () => {
  it('converts an item to its priority value', () => {
    expect(getItemPriority('a')).toBe(1);
    expect(getItemPriority('j')).toBe(10);
    expect(getItemPriority('z')).toBe(26);
    expect(getItemPriority('A')).toBe(27);
    expect(getItemPriority('J')).toBe(36);
    expect(getItemPriority('Z')).toBe(52);
  });
});

const testRucksacks = [
  'vJrwpWtwJgWrhcsFMMfFFhFp',
  'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
  'PmmdzqPrVvPwwTWBwg',
  'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
  'ttgJtRGJQctTZtZT',
  'CrZsJsPPZsGzwwsLwLmpwMDw',
] as [string, string, string, string, string, string];

describe('commonCompartmentItemPrioritySum', () => {
  it('finds the priority sum of items that are in both compartments of a rucksack', () => {
    expect(commonCompartmentItemPrioritySum([testRucksacks[0]])).toBe(16);
    expect(commonCompartmentItemPrioritySum([testRucksacks[1]])).toBe(38);
    expect(commonCompartmentItemPrioritySum(testRucksacks)).toBe(157);
  });
});

describe('groupBadgePrioritySum', () => {
  it('finds the priority sum of the badge item in each group', () => {
    expect(groupBadgePrioritySum(testRucksacks.slice(0, 3))).toBe(18);
    expect(groupBadgePrioritySum(testRucksacks.slice(3))).toBe(52);
    expect(groupBadgePrioritySum(testRucksacks)).toBe(70);
  });
});
