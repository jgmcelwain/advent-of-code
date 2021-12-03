import { Direction } from '.';
import { mutatePositionWithDirection } from './mutatePositionWithDirection';

export function getSantaAndRobotHouseVisits(directions: Direction[]) {
  const santaPosition = { x: 0, y: 0 };
  const roboSantaPosition = { x: 0, y: 0 };

  const houseVisitCounts: { [key: string]: number } = { '0:0': 1 };

  for (let i = 0; i < directions.length; i++) {
    const activeSantaPosition = i % 2 === 0 ? santaPosition : roboSantaPosition;

    mutatePositionWithDirection(activeSantaPosition, directions[i]);

    const currentHouseKey = `${activeSantaPosition.x}:${activeSantaPosition.y}`;
    if (houseVisitCounts[currentHouseKey] === undefined) {
      houseVisitCounts[currentHouseKey] = 1;
    } else {
      houseVisitCounts[currentHouseKey]++;
    }
  }

  return Object.keys(houseVisitCounts).length;
}
