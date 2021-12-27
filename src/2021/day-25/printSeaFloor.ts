import type { SeaFloor } from '.';

export function printSeaFloor(seaFloor: SeaFloor) {
  return seaFloor
    .map((row) => row.map((tile) => (tile === null ? '.' : tile)).join(''))
    .join('\n');
}
