import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { z } from 'zod';

const sectionRangeSchema = z.tuple([z.number(), z.number()]);
const assignedPairSchema = z.tuple([sectionRangeSchema, sectionRangeSchema]);
export type AssignedPairs = z.infer<typeof assignedPairSchema>[];

export function pairsWithContainedRanges(pairs: AssignedPairs) {
  let containedRangeCount = 0;

  for (const [a, b] of pairs) {
    if ((a[0] >= b[0] && a[1] <= b[1]) || (b[0] >= a[0] && b[1] <= a[1])) {
      containedRangeCount++;
    }
  }

  return containedRangeCount;
}
export function pairsWithOverlappingRanges(pairs: AssignedPairs) {
  let overlappingRangeCount = 0;

  for (const [a, b] of pairs) {
    if ((a[0] >= b[0] && a[0] <= b[1]) || (b[0] >= a[0] && b[0] <= a[1])) {
      overlappingRangeCount++;
    }
  }

  return overlappingRangeCount;
}

function partOne(pairs: AssignedPairs) {
  const result = pairsWithContainedRanges(pairs);

  return result;
}

function partTwo(pairs: AssignedPairs) {
  const result = pairsWithOverlappingRanges(pairs);

  return result;
}

async function main() {
  const input = await getInput(__dirname);
  const pairs = input.split('\n').map((pair) => {
    const [a, b] = pair.split(',').map((assignedSections) => {
      const [start, end] = assignedSections.split('-');

      return [Number(start), Number(end)];
    });

    return assignedPairSchema.parse([a, b]);
  });

  void runDay(
    2022,
    4,
    'Camp Cleanup',
    () => partOne(pairs),
    () => partTwo(pairs),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
