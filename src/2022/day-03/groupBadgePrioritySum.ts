import { z } from 'zod';
import { getItemPriority } from './getItemPriority';

const rucksackGroup = z.tuple([z.string(), z.string(), z.string()]);

export function groupBadgePrioritySum(rucksacks: string[]) {
  let prioritySum = 0;

  const rucksackGroups = Array.from({ length: rucksacks.length / 3 }).map(
    (_, i) => rucksackGroup.parse(rucksacks.slice(i * 3, i * 3 + 3)),
  );

  for (const group of rucksackGroups) {
    const rucksack = group[0];

    for (const item of rucksack) {
      if (group.every((rucksack) => rucksack.includes(item))) {
        prioritySum += getItemPriority(item);

        break;
      }
    }
  }

  return prioritySum;
}
