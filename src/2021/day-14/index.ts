import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { getArrayMinMax } from '@/lib/getArrayMinMax';
import { getFinalCharacterCounts } from './getFinalCharacterCounts';

export type InsertionRules = Record<string, string>;
export type PolymerChunkCounts = Record<string, number>;
export type CharacterCounts = Record<string, number>;

function partOne(polymerTemplate: string, insertionRules: InsertionRules) {
  const characterCounts = getFinalCharacterCounts(
    polymerTemplate,
    insertionRules,
    10,
  );

  const [minCount, maxCount] = getArrayMinMax(Object.values(characterCounts));

  return maxCount - minCount;
}

function partTwo(polymerTemplate: string, insertionRules: InsertionRules) {
  const characterCounts = getFinalCharacterCounts(
    polymerTemplate,
    insertionRules,
    40,
  );

  const [minCount, maxCount] = getArrayMinMax(Object.values(characterCounts));

  return maxCount - minCount;
}

async function main() {
  const input = await getInput(__dirname);
  const [polymerTemplate, pairInsertionRules] = input.split('\n\n');

  const insertionRules: InsertionRules = {};
  pairInsertionRules.split('\n').forEach((rule) => {
    const [find, insert] = rule.split(' -> ');

    insertionRules[find] = insert;
  });

  void runDay(
    2021,
    14,
    'Extended Polymerization',
    () => partOne(polymerTemplate, insertionRules),
    () => partTwo(polymerTemplate, insertionRules),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
