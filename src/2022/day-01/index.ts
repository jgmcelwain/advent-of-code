import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';

export function findLargestPayload(elfCaloriePayloads: number[]) {
  let largest = -Infinity;

  for (const payload of elfCaloriePayloads) {
    if (payload > largest) largest = payload;
  }

  return largest;
}

export function largestThreePayloadSum(elfCaloriePayloads: number[]) {
  let largest = [-Infinity, -Infinity, -Infinity] as const;

  for (const payload of elfCaloriePayloads) {
    if (payload > largest[0]) largest = [payload, largest[0], largest[1]];
    else if (payload > largest[1]) largest = [largest[0], payload, largest[1]];
    else if (payload > largest[2]) largest = [largest[0], largest[1], payload];
  }

  return largest[0] + largest[1] + largest[2];
}

function partOne(elfCaloriePayloads: number[]) {
  return findLargestPayload(elfCaloriePayloads);
}

function partTwo(elfCaloriePayloads: number[]) {
  return largestThreePayloadSum(elfCaloriePayloads);
}

async function main() {
  const input = await getInput(__dirname);
  const elfCaloriePayloads = input.split('\n\n').map((calorieRecords) =>
    calorieRecords
      .split('\n')
      .map((calorieRecord) => Number(calorieRecord))
      .reduce((acc, curr) => (acc += curr)),
  );

  void runDay(
    2022,
    1,
    'Calorie Counting',
    () => partOne(elfCaloriePayloads),
    () => partTwo(elfCaloriePayloads),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
