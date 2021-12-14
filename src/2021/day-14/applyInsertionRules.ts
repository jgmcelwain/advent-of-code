import type { CharacterCounts, InsertionRules, PolymerChunkCounts } from '.';

export function applyInsertionRules(
  polymerChunks: PolymerChunkCounts,
  characterCounts: CharacterCounts,
  insertionRules: InsertionRules,
): [polymerChunks: PolymerChunkCounts, characterCounts: CharacterCounts] {
  const chunks: PolymerChunkCounts = {};
  const characters: CharacterCounts = { ...characterCounts };

  for (const key in polymerChunks) {
    const toInsert = insertionRules[key];
    characters[toInsert] = (characters[toInsert] ?? 0) + polymerChunks[key];

    const [first, last] = key.split('');

    const firstKey = first + toInsert;
    chunks[firstKey] = (chunks[firstKey] ?? 0) + polymerChunks[key];

    const lastKey = toInsert + last;
    chunks[lastKey] = (chunks[lastKey] ?? 0) + polymerChunks[key];
  }

  return [chunks, characters];
}
