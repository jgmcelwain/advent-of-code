import { Direction } from '.';

export function getSantaHouseVisits(directions: Direction[]) {
  const position = { x: 0, y: 0 };
  const houseVisitCounts: { [key: string]: number } = { '0:0': 1 };

  for (let i = 0; i < directions.length; i++) {
    if (directions[i] === Direction.North) position.y--;
    if (directions[i] === Direction.South) position.y++;
    if (directions[i] === Direction.East) position.x++;
    if (directions[i] === Direction.West) position.x--;

    const currentHouseKey = `${position.x}:${position.y}`;
    if (houseVisitCounts[currentHouseKey] === undefined) {
      houseVisitCounts[currentHouseKey] = 1;
    } else {
      houseVisitCounts[currentHouseKey]++;
    }
  }

  return Object.keys(houseVisitCounts).length;
}
