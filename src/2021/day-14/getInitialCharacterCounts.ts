import type { CharacterCounts } from '.';

export function getInitialCharacterCounts(polymerTemplate: string) {
  const characterCounts: CharacterCounts = {};

  for (let i = 0; i < polymerTemplate.length; i++) {
    characterCounts[polymerTemplate[i]] =
      (characterCounts[polymerTemplate[i]] ?? 0) + 1;
  }

  return characterCounts;
}
