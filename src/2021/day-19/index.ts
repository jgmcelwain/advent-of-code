/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { placeScanners } from './placeScanners';
import { countUniqueBeacons } from './countUniqueBeacons';
import { getMaxManhattanDistance } from './getMaxManhattanDistance';

export type Position = { x: number; y: number; z: number };
export type Beacon = Position;
export type Scanner = Beacon[];
export type PlacedScanner = {
  position: Position;
  beacons: Beacon[];
};

function partOne(scanners: PlacedScanner[]) {
  const result = countUniqueBeacons(scanners);

  return result;
}

function partTwo(scanners: PlacedScanner[]) {
  const result = getMaxManhattanDistance(scanners);

  return result;
}

async function main() {
  const input = await getInput(__dirname);
  const inputScanners = input.split('\n\n').map((scannerInput): Scanner => {
    const beacons = scannerInput
      .split('\n')
      .slice(1)
      .map((row): Position => {
        const [x, y, z] = row.split(',').map((n) => parseInt(n, 10));

        return { x, y, z };
      });

    return beacons;
  });

  // this is such a slow/expensive step that i only want it to run once
  console.time('Input Processing');
  const scanners = placeScanners(inputScanners);
  console.timeEnd('Input Processing');

  runDay(
    2021,
    19,
    'Beacon Scanner',
    () => partOne(scanners),
    () => partTwo(scanners),
    true,
  );
}

if (process.argv.includes('run')) {
  main();
}
