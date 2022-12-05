import { Direction } from '.';
import { mutatePositionWithDirection } from './mutatePositionWithDirection';

export function getSantaHouseVisits(directions: Direction[]) {
  const position = { x: 0, y: 0 };
  const houseVisitCounts: Record<string, number> = { '0:0': 1 };

  for (const direction of directions) {
    mutatePositionWithDirection(position, direction);

    const currentHouseKey = `${position.x}:${position.y}`;
    if (houseVisitCounts[currentHouseKey] === undefined) {
      houseVisitCounts[currentHouseKey] = 1;
    } else {
      houseVisitCounts[currentHouseKey]++;
    }
  }

  return Object.keys(houseVisitCounts).length;
}
