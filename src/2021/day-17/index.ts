import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { getValidVelocities } from './getValidVelocities';
import { maxPossibleHeight } from './maxPossibleHeight';

export type TargetAreaBounds = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

function partOne(targetArea: TargetAreaBounds) {
  return maxPossibleHeight(targetArea.y1);
}

function partTwo(targetArea: TargetAreaBounds) {
  const validVelocities = getValidVelocities(targetArea);

  return validVelocities.length;
}

async function main() {
  const input = await getInput(__dirname);
  const targetArea: TargetAreaBounds = input
    .slice(13)
    .split(', ')
    .map((dim, i) => {
      const [start, end] = dim.slice(2).split('..').map(Number);

      if (i === 0) {
        return { x1: start, x2: end };
      } else {
        return { y1: start, y2: end };
      }
    })
    .reduce((acc, curr) => Object.assign(acc, curr), {
      x1: Infinity,
      y1: Infinity,
      x2: Infinity,
      y2: Infinity,
    });

  void runDay(
    2021,
    17,
    'Trick Shot',
    () => partOne(targetArea),
    () => partTwo(targetArea),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
