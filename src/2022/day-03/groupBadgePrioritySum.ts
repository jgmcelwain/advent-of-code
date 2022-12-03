import { getItemPriority } from './getItemPriority';

export function groupBadgePrioritySum(rucksacks: string[]) {
  let prioritySum = 0;

  const rucksackGroups = Array.from({ length: rucksacks.length / 3 }).map(
    (_, i) => rucksacks.slice(i * 3, i * 3 + 3) as [string, string, string],
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
