import type { PolymerChunkCounts } from '.';

export function getInitialChunkCounts(polymerTemplate: string) {
  const polymerChunkCounts: PolymerChunkCounts = {};

  for (let i = 0; i < polymerTemplate.length - 1; i++) {
    const chars = polymerTemplate.slice(i, i + 2);

    polymerChunkCounts[chars] = (polymerChunkCounts[chars] ?? 0) + 1;
  }

  return polymerChunkCounts;
}
