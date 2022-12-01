import { clone2DArray } from '@/lib/clone2DArray';
import type { SeaFloor } from '.';
import { SeaFloorTile } from '.';

export function updateSeaFloor(
  seaFloor: SeaFloor,
): [updatedSeaFloor: SeaFloor, moveCount: number] {
  const [eastMovesApplied, eastMoveCount] =
    moveEastFacingSeaCucumbers(seaFloor);

  const [southMovesApplied, southMoveCount] =
    moveSouthFacingSeaCucumbers(eastMovesApplied);

  return [southMovesApplied, eastMoveCount + southMoveCount];
}

export function moveEastFacingSeaCucumbers(
  seaFloor: SeaFloor,
): [updatedSeaFloor: SeaFloor, moveCount: number] {
  const updatedSeaFloor = clone2DArray(seaFloor);
  let moveCount = 0;

  for (let y = 0; y < seaFloor.length; y++) {
    for (let x = 0; x < seaFloor[y].length; x++) {
      if (seaFloor[y][x] === SeaFloorTile.CucumberEast) {
        const nx = (x + 1) % seaFloor[y].length;

        if (seaFloor[y][nx] === null) {
          moveCount++;

          updatedSeaFloor[y][nx] = SeaFloorTile.CucumberEast;
          updatedSeaFloor[y][x] = null;
        }
      }
    }
  }

  return [updatedSeaFloor, moveCount];
}

export function moveSouthFacingSeaCucumbers(
  seaFloor: SeaFloor,
): [updatedSeaFloor: SeaFloor, moveCount: number] {
  const updatedSeaFloor = clone2DArray(seaFloor);
  let moveCount = 0;

  for (let y = 0; y < seaFloor.length; y++) {
    for (let x = 0; x < seaFloor[y].length; x++) {
      if (seaFloor[y][x] === SeaFloorTile.CucumberSouth) {
        const ny = (y + 1) % seaFloor.length;

        if (seaFloor[ny][x] === null) {
          moveCount++;

          updatedSeaFloor[ny][x] = SeaFloorTile.CucumberSouth;
          updatedSeaFloor[y][x] = null;
        }
      }
    }
  }

  return [updatedSeaFloor, moveCount];
}
