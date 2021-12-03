import { getInput } from '../../../lib/getInput';

import { calculateDepthIncreases } from './calculateDepthIncreases';
import { calculateWindowSumIncreases } from './calculateWindowSumIncreases';

export type DepthEntry = number;
export type DepthReport = DepthEntry[];

function partOne(depthReport: DepthReport) {
  const result = calculateDepthIncreases(depthReport);
  console.log('Part One: ', result);
}

function partTwo(depthReport: DepthReport) {
  const result = calculateWindowSumIncreases(depthReport);
  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);

  const depthReport: DepthReport = input
    .split('\n')
    .map((entry): DepthEntry => Number(entry));

  console.log('AoC 2021 - Day 01: Sonar Sweep');
  partOne(depthReport);
  partTwo(depthReport);
}

if (process.argv.includes('run')) {
  main();
}
