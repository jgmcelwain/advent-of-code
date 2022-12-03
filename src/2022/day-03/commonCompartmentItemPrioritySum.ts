import { getItemPriority } from './getItemPriority';

export function commonCompartmentItemPrioritySum(rucksacks: string[]) {
  let prioritySum = 0;

  const compartmentalizedRucksacks = rucksacks.map((rucksack) => {
    const firstCompartment = rucksack.slice(0, rucksack.length / 2);
    const secondCompartment = rucksack.slice(rucksack.length / 2);

    return [firstCompartment, secondCompartment] as const;
  });

  for (const [
    firstCompartment,
    secondCompartment,
  ] of compartmentalizedRucksacks) {
    for (const item of firstCompartment) {
      if (secondCompartment.includes(item)) {
        prioritySum += getItemPriority(item);

        break;
      }
    }
  }

  return prioritySum;
}
