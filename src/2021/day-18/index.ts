import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { addSnailNumbers } from './addSnailNumbers';
import { calculateSnailNumberMagnitude } from './calculateSnailNumberMagnitude';

export enum SnailNumberCharacters {
  Open = '[',
  Close = ']',
  Separator = ',',
}

function partOne(snailNumbers: string[]) {
  const added = snailNumbers
    .slice(1)
    .reduce((acc, curr) => addSnailNumbers(acc, curr), snailNumbers[0]);

  const result = calculateSnailNumberMagnitude(added);

  return result;
}

function partTwo(snailNumbers: string[]) {
  let result = -Infinity;

  for (let i = 0; i < snailNumbers.length; i++) {
    for (let j = i + 1; j < snailNumbers.length; j++) {
      const sum = addSnailNumbers(snailNumbers[i], snailNumbers[j]);
      const magnitude = calculateSnailNumberMagnitude(sum);

      if (magnitude > result) {
        result = magnitude;
      }
    }
  }

  return result;
}

async function main() {
  const input = await getInput(__dirname);
  const snailNumbers = input.split('\n');

  runDay(
    2021,
    18,
    'Snailfish',
    () => partOne(snailNumbers),
    () => partTwo(snailNumbers),
    true,
  );
}

if (process.argv.includes('run')) {
  main();
}
