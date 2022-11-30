import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { parseSeaFloor } from './parseSeaFloor';
import { updateSeaFloor } from './updateSeaFloor';

export type SeaFloor = (SeaFloorTile | null)[][];

export enum SeaFloorTile {
  CucumberEast = '>',
  CucumberSouth = 'v',
}

function partOne(seaFloor: SeaFloor) {
  let current = seaFloor;
  let moveCount = 0;

  let i = 0;

  while (true) {
    i++;

    [current, moveCount] = updateSeaFloor(current);

    if (moveCount === 0) return i;
  }
}

async function main() {
  const input = await getInput(__dirname);
  const seaFloor = parseSeaFloor(input);

  void runDay(
    2021,
    25,
    'Sea Cucumber',
    () => partOne(seaFloor),
    () => 'Merry Christmas!',
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
