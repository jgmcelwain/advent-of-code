import type { DisplayDataEntry } from '.';
import { getValueSortedPatterns } from './getValueSortedPatterns';

function sortString(str: string) {
  return str
    .split('')
    .sort((a, b) => a.localeCompare(b))
    .join('');
}

export function calculateOutputValue(entries: DisplayDataEntry[]) {
  let count = 0;

  for (let i = 0; i < entries.length; i++) {
    const { signalPatterns, outputValue } = entries[i];

    const valueSortedPatterns = getValueSortedPatterns(
      signalPatterns.map((pattern) => sortString(pattern)),
    );

    const values = Object.fromEntries(
      valueSortedPatterns.map((pattern, i) => [pattern, i]),
    );

    const entryOutput = outputValue.reduce(
      (acc, pattern, i) =>
        (acc +=
          values[sortString(pattern)] *
          Math.pow(10, outputValue.length - (i + 1))),
      0,
    );

    count += entryOutput;
  }

  return count;
}
