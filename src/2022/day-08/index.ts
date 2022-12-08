import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { getPerimeterVisibleTreeCount } from './getPerimeterVisibleTreeCount';
import { getHighestScenicScore } from './getHighestScenicScore';

function partOne(trees: number[][]) {
  const result = getPerimeterVisibleTreeCount(trees);

  return result;
}

function partTwo(trees: number[][]) {
  const result = getHighestScenicScore(trees);

  return result;
}

async function main() {
  const input = await getInput(__dirname);
  const trees = input
    .split('\n')
    .map((row) => row.split('').map((tree) => Number(tree)));

  void runDay(
    2022,
    8,
    'Treetop Tree House',
    () => partOne(trees),
    () => partTwo(trees),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
