import { getInput } from '../../../lib/getInput';
import { calculateOutputValue } from './calculateOutputValue';
import { countUniqueSegmentDigits } from './countUniqueSegmentDigits';

export type DisplayDataEntry = {
  signalPatterns: string[];
  outputValue: [string, string, string, string];
};

function partOne(entries: DisplayDataEntry[]) {
  const result = countUniqueSegmentDigits(entries);

  console.log('Part One: ', result);
}

function partTwo(entries: DisplayDataEntry[]) {
  const result = calculateOutputValue(entries);

  console.log('Part Two: ', result);
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

  console.log('AoC 2021 - Day 08: Seven Segment Search');
  partOne(entries);
  partTwo(entries);
}

if (process.argv.includes('run')) {
  main();
}
