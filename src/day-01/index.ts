import { getInput } from '../../lib/getInput';
import { calculateDepthIncreases } from './calculateDepthIncreases';

function partOne(input: string) {
  const depthReport = input
    .trim()
    .split('\n')
    .map((entry) => Number(entry));

  const result = calculateDepthIncreases(depthReport);
  console.log('Part 1: ', result);
}

async function main() {
  const input = await getInput(__dirname);

  partOne(input);
}

main();
