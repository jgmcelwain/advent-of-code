import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { particlesUntilOneFallsOutOfBounds } from './particlesUntilOneFallsOutOfBounds';
import { particlesUntilOneReachesEntryPoint } from './particlesUntilOneReachesEntryPoint';

export type CoordinateKey = `${number},${number}`;
export type CavernBounds = {
  x: { min: number; max: number };
  y: { min: number; max: number };
};

function partOne(wallPoints: Set<CoordinateKey>, bounds: CavernBounds) {
  const result = particlesUntilOneFallsOutOfBounds(wallPoints, bounds, 500, 0);

  return result;
}

function partTwo(wallPoints: Set<CoordinateKey>, bounds: CavernBounds) {
  const result = particlesUntilOneReachesEntryPoint(wallPoints, bounds, 500, 0);

  return result;
}

async function main() {
  const input = await getInput(__dirname);

  const wallPoints = new Set<CoordinateKey>();
  const bounds: CavernBounds = {
    x: { min: Infinity, max: -Infinity },
    y: { min: Infinity, max: -Infinity },
  };

  const addWallPoint = (x: number, y: number) => {
    wallPoints.add(`${x},${y}`);

    if (x < bounds.x.min) bounds.x.min = x;
    if (x > bounds.x.max) bounds.x.max = x;
    if (y > bounds.y.max) bounds.y.max = y;
  };

  for (const line of input.split('\n')) {
    const pointMarkers = line
      .split(' -> ')
      .map(
        (point) => point.split(',').map((n) => Number(n)) as [number, number],
      );

    for (const [index, [px, py]] of pointMarkers.entries()) {
      if (typeof px === 'number' && typeof py === 'number') {
        const previousPoint = pointMarkers[index - 1];

        if (previousPoint !== undefined) {
          const [qx, qy] = previousPoint;

          const lineMinX = Math.min(px, qx);
          const lineMaxX = Math.max(px, qx);
          const lineMinY = Math.min(py, qy);
          const lineMaxY = Math.max(py, qy);

          for (let x = lineMinX; x <= lineMaxX; x++) {
            for (let y = lineMinY; y <= lineMaxY; y++) {
              addWallPoint(x, y);
            }
          }
        }
      }
    }
  }

  void runDay(
    2022,
    14,
    '',
    () => partOne(wallPoints, bounds),
    () => partTwo(wallPoints, bounds),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
