import type { SeaFloor } from '.';
import { SeaFloorTile } from '.';

export function parseSeaFloor(input: string): SeaFloor {
  return input
    .trim()
    .split('\n')
    .map((row) =>
      row
        .trim()
        .split('')
        .map((tile) => {
          switch (tile) {
            case '>':
              return SeaFloorTile.CucumberEast;
            case 'v':
              return SeaFloorTile.CucumberSouth;
            default:
              return null;
          }
        }),
    );
}
