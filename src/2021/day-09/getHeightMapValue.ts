import type { HeightMap } from '.';

export function getHeightMapValue(
  heightMap: HeightMap,
  defaultValue = Infinity,
) {
  function heightMapValue(row: number, col: number) {
    return heightMap[row]?.[col] ?? defaultValue;
  }

  return heightMapValue;
}
