import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { calculateOutputValue } from './calculateOutputValue';
import { countUniqueSegmentDigits } from './countUniqueSegmentDigits';

export type DisplayDataEntry = {
  signalPatterns: string[];
  outputValue: [string, string, string, string];
};

function partOne(entries: DisplayDataEntry[]) {
  return countUniqueSegmentDigits(entries);
}

function partTwo(entries: DisplayDataEntry[]) {
  return calculateOutputValue(entries);
}

async function main() {
  const input = await getInput(__dirname);
  const entries = input.split('\n').map((entry): DisplayDataEntry => {
    const [signalPatterns, outputValue] = entry
      .split(' | ')
      .map((n) => n.split(' '));

    return {
      signalPatterns,
      outputValue: outputValue as [string, string, string, string],
    };
  });

  runDay(
    2021,
    8,
    'Seven Segment Search',
    () => partOne(entries),
    () => partTwo(entries),
    true,
  );
}

if (process.argv.includes('run')) {
  main();
}
