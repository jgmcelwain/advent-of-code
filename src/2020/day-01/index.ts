import { getInput } from '../../../lib/getInput';

function partOne(entries: number[]) {
  console.time('p1');
  let result: number | null = null;

  for (let i = 0; i < entries.length; i++) {
    if (result !== null) {
      break;
    }

    for (let j = i + 1; j < entries.length; j++) {
      if (entries[i] + entries[j] === 2020) {
        result = entries[i] * entries[j];

        break;
      }
    }
  }
  console.timeEnd('p1');

  console.log('Part One: ', result);
}

function partTwo(entries: number[]) {
  console.time('p2');
  let result: number | null = null;

  for (let i = 0; i < entries.length; i++) {
    if (result !== null) {
      break;
    }

    for (let j = i + 1; j < entries.length; j++) {
      if (result !== null) {
        break;
      }

      for (let k = j + 1; k < entries.length; k++) {
        if (entries[i] + entries[j] + entries[k] === 2020) {
          result = entries[i] * entries[j] * entries[k];

          break;
        }
      }
    }
  }
  console.timeEnd('p2');

  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);
  const entries = input.split('\n').map((n) => Number(n));

  console.log('AoC 2020 - Day 01: Report Repair');
  partOne(entries);
  partTwo(entries);
}

if (process.argv.includes('run')) {
  void main();
}
