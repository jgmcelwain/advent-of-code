import { CharacterCounts, InsertionRules, PolymerChunkCounts } from '.';
import { applyInsertionRules } from './applyInsertionRules';

export function getInitialCharacterCounts(polymerTemplate: string) {
  const characterCounts: CharacterCounts = {};

  for (let i = 0; i < polymerTemplate.length; i++) {
    const key = polymerTemplate[i];
    if (key !== undefined) {
      characterCounts[key] = (characterCounts[key] ?? 0) + 1;
    }
  }

  return characterCounts;
}

export function getInitialPolymerChunkCounts(polymerTemplate: string) {
  const polymerChunkCounts: PolymerChunkCounts = {};

  for (let i = 0; i < polymerTemplate.length - 1; i++) {
    const chars = polymerTemplate.slice(i, i + 2);

    polymerChunkCounts[chars] = (polymerChunkCounts[chars] ?? 0) + 1;
  }

  return polymerChunkCounts;
}

export function getFinalCharacterCounts(
  polymerTemplate: string,
  insertionRules: InsertionRules,
  iterations: number,
) {
  let polymerChunkCounts = getInitialPolymerChunkCounts(polymerTemplate);
  let characterCounts = getInitialCharacterCounts(polymerTemplate);

  for (let i = 0; i < iterations; i++) {
    [polymerChunkCounts, characterCounts] = applyInsertionRules(
      polymerChunkCounts,
      characterCounts,
      insertionRules,
    );
  }

  return characterCounts;
}
