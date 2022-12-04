import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';

type SectionRange = [start: number, end: number];
export type AssignedPair = [SectionRange, SectionRange];

export function pairsWithContainedRanges(pairs: AssignedPair[]) {
  let containedRangeCount = 0;

  for (const [a, b] of pairs) {
    if ((a[0] >= b[0] && a[1] <= b[1]) || (b[0] >= a[0] && b[1] <= a[1])) {
      containedRangeCount++;
    }
  }

  return containedRangeCount;
}
export function pairsWithOverlappingRanges(pairs: AssignedPair[]) {
  let overlappingRangeCount = 0;

  for (const [a, b] of pairs) {
    if ((a[0] >= b[0] && a[0] <= b[1]) || (b[0] >= a[0] && b[0] <= a[1])) {
      overlappingRangeCount++;
    }
  }

  return overlappingRangeCount;
}

function partOne(pairs: AssignedPair[]) {
  const result = pairsWithContainedRanges(pairs);

  return result;
}

function partTwo(pairs: AssignedPair[]) {
  const result = pairsWithOverlappingRanges(pairs);

  return result;
}

async function main() {
  const input = await getInput(__dirname);
  const pairs = input.split('\n').map((pair): AssignedPair => {
    const [a, b] = pair.split(',').map((assignedSections) => {
      const [start, end] = assignedSections.split('-');

      return [Number(start), Number(end)];
    });

    return [a as SectionRange, b as SectionRange];
  });
  console.log(pairs);

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
