import { Direction } from '.';
import { mutatePositionWithDirection } from './mutatePositionWithDirection';

export function getSantaAndRobotHouseVisits(directions: Direction[]) {
  const santaPosition = { x: 0, y: 0 };
  const roboSantaPosition = { x: 0, y: 0 };

  const houseVisitCounts: Record<string, number> = { '0:0': 1 };

  for (const [index, direction] of directions.entries()) {
    const activeSantaPosition =
      index % 2 === 0 ? santaPosition : roboSantaPosition;

    mutatePositionWithDirection(activeSantaPosition, direction);

    const currentHouseKey = `${activeSantaPosition.x}:${activeSantaPosition.y}`;
    if (houseVisitCounts[currentHouseKey] === undefined) {
      houseVisitCounts[currentHouseKey] = 1;
    } else {
      houseVisitCounts[currentHouseKey]++;
    }
  }

  return Object.keys(houseVisitCounts).length;
}
