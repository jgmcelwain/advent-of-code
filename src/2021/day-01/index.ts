import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';

import { calculateDepthIncreases } from './calculateDepthIncreases';
import { calculateWindowSumIncreases } from './calculateWindowSumIncreases';

export type DepthEntry = number;
export type DepthReport = DepthEntry[];

function partOne(depthReport: DepthReport) {
  return calculateDepthIncreases(depthReport);
}

function partTwo(depthReport: DepthReport) {
  return calculateWindowSumIncreases(depthReport);
}

async function main() {
  const input = await getInput(__dirname);

  const depthReport: DepthReport = input
    .split('\n')
    .map((entry): DepthEntry => Number(entry));

  void runDay(
    2021,
    1,
    'Sonar Sweep',
    () => partOne(depthReport),
    () => partTwo(depthReport),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
