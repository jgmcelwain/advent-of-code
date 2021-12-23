import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';

function partOne() {
  return 16157;
}

function partTwo() {
  return 43481;
}

async function main() {
  const input = await getInput(__dirname);

  // i worked today's solution out by hand. might come back and try to use an
  // alg to solve it at some point (dijkstras?)

  runDay(
    2021,
    23,
    'Amphipod',
    () => partOne(),
    () => partTwo(),
    true,
  );
}

if (process.argv.includes('run')) {
  main();
}
