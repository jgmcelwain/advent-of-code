import { getInput } from '@/lib/getInput';

function partOne(entries: number[]) {
  console.time('p1');
  let result: number | null = null;

  for (const [i, iEntry] of entries.entries()) {
    if (result !== null) {
      break;
    }

    for (const jEntry of entries.slice(i)) {
      if (iEntry + jEntry === 2020) {
        result = iEntry * jEntry;

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

  for (const [i, iEntry] of entries.entries()) {
    if (result !== null) {
      break;
    }

    for (const [j, jEntry] of entries.slice(i).entries()) {
      if (result !== null) {
        break;
      }

      for (const kEntry of entries.slice(j + 1)) {
        if (iEntry + jEntry + kEntry === 2020) {
          result = iEntry * jEntry * kEntry;

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
