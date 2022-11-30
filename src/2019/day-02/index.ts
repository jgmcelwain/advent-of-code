import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';

import { executeIntcode } from '../executeIntcode';

function partOne(intcode: number[]) {
  const intcodeCopy = [...intcode];

  intcodeCopy[1] = 12;
  intcodeCopy[2] = 2;

  const result = executeIntcode(intcodeCopy);

  return result;
}

function partTwo(intcode: number[]) {
  for (let i = 1; i < 100; i++) {
    for (let j = 1; j < 100; j++) {
      const intcodeCopy = [...intcode];
      intcodeCopy[1] = i;
      intcodeCopy[2] = j;

      const result = executeIntcode(intcodeCopy);
      if (result === 19690720) {
        return 100 * i + j;
      }
    }
  }

  throw new Error('no noun/verb combo found!');
}

async function main() {
  const input = await getInput(__dirname);
  const intcode = input.split(',').map((n) => Number(n));

  void runDay(
    2021,
    1,
    '',
    () => partOne(intcode),
    () => partTwo(intcode),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
