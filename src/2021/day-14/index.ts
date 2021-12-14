import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { applyInsertionRules } from './applyInsertionRules';
import { getInitialChunkCounts } from './getInitialChunkCounts';
import { getInitialCharacterCounts } from './getInitialCharacterCounts';

export type InsertionRules = Record<string, string>;
export type PolymerChunkCounts = Record<string, number>;
export type CharacterCounts = Record<string, number>;

function partOne(polymerTemplate: string, insertionRules: InsertionRules) {
  let polymerChunkCounts = getInitialChunkCounts(polymerTemplate);
  let characterCounts = getInitialCharacterCounts(polymerTemplate);

  for (let i = 0; i < 10; i++) {
    [polymerChunkCounts, characterCounts] = applyInsertionRules(
      polymerChunkCounts,
      characterCounts,
      insertionRules,
    );
  }

  const minCount = Math.min(...Object.values(characterCounts));
  const maxCount = Math.max(...Object.values(characterCounts));

  return maxCount - minCount;
}

function partTwo(polymerTemplate: string, insertionRules: InsertionRules) {
  let polymerChunkCounts = getInitialChunkCounts(polymerTemplate);
  let characterCounts = getInitialCharacterCounts(polymerTemplate);

  for (let i = 0; i < 40; i++) {
    [polymerChunkCounts, characterCounts] = applyInsertionRules(
      polymerChunkCounts,
      characterCounts,
      insertionRules,
    );
  }

  const minCount = Math.min(...Object.values(characterCounts));
  const maxCount = Math.max(...Object.values(characterCounts));

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

  runDay(
    2021,
    14,
    'Extended Polymerization',
    () => partOne(polymerTemplate, insertionRules),
    () => partTwo(polymerTemplate, insertionRules),
    true,
  );
}

if (process.argv.includes('run')) {
  main();
}
