import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { commonCompartmentItemPrioritySum } from './commonCompartmentItemPrioritySum';
import { groupBadgePrioritySum } from './groupBadgePrioritySum';

function partOne(rucksacks: string[]) {
  const result = commonCompartmentItemPrioritySum(rucksacks);

  return result;
}

function partTwo(rucksacks: string[]) {
  const result = groupBadgePrioritySum(rucksacks);

  return result;
}

async function main() {
  const input = await getInput(__dirname);
  const rucksacks = input.split('\n');

  void runDay(
    2022,
    3,
    'Rucksack Reorganization',
    () => partOne(rucksacks),
    () => partTwo(rucksacks),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
