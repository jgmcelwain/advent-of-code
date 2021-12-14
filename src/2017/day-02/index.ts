import { getArrayMinMax } from '../../../lib/getArrayMinMax';
import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';

function partOne(rows: number[][]) {
  let checksum = 0;

  for (let i = 0; i < rows.length; i++) {
    const [smallest, largest] = getArrayMinMax(rows[i]);
    checksum += largest - smallest;
  }

  return checksum;
}

function partTwo(rows: number[][]) {
  let resultSum = 0;

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      for (let k = 0; k < rows[i].length; k++) {
        if (j !== k && (rows[i][j] / rows[i][k]) % 1 === 0) {
          resultSum += rows[i][j] / rows[i][k];
        }
      }
    }
  }

  return resultSum;
}

async function main() {
  const input = await getInput(__dirname);
  const rows = input
    .split('\n')
    .map((row) => row.split('	').map((n) => Number(n)));

  runDay(
    2017,
    2,
    'Corruption Checksum',
    () => partOne(rows),
    () => partTwo(rows),
    true,
  );
}

if (process.argv.includes('run')) {
  main();
}
