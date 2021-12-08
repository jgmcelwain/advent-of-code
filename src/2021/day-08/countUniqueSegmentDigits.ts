import type { DisplayDataEntry } from '.';

export function countUniqueSegmentDigits(entries: DisplayDataEntry[]) {
  let count = 0;

  for (let i = 0; i < entries.length; i++) {
    const uniqueSegmentDigits = entries[i].outputValue.filter((segments) =>
      [2, 4, 3, 7].includes(segments.length),
    );

    count += uniqueSegmentDigits.length;
  }

  return count;
}
