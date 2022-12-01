import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { buildCavern } from './buildCavern';
import { getDijkstraPathWeight } from './getDijkstraPathWeight';

export type CavernNode = {
  x: number;
  y: number;
  value: number;
  weight: number;
  visited: boolean;
};

function partOne(matrix: number[][]) {
  const cavern: CavernNode[][] = buildCavern(matrix, 1, 1);

  return getDijkstraPathWeight(cavern);
}

function partTwo(matrix: number[][]) {
  const cavern: CavernNode[][] = buildCavern(matrix, 5, 5);

  return getDijkstraPathWeight(cavern);
}

async function main() {
  const input = await getInput(__dirname);
  const matrix = input
    .split('\n')
    .map((row) => row.split('').map((n) => Number(n)));

  void runDay(
    2021,
    15,
    'Chiton',
    () => partOne(matrix),
    () => partTwo(matrix),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
