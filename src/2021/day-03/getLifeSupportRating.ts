import type { DiagnosticReport, BitValue, BitCount } from '.';

function getMostCommonBitAtIndex(
  diagnosticReport: DiagnosticReport,
  bitIndex: number,
): BitValue {
  const bitCountAtIndex: BitCount = { 0: 0, 1: 0 };

  for (let i = 0; i < diagnosticReport.length; i++) {
    const value = diagnosticReport[i][bitIndex] as BitValue;

    bitCountAtIndex[value]++;
  }

  return bitCountAtIndex[0] > bitCountAtIndex[1] ? '0' : '1';
}

export function getRating(
  kind: 'oxygen' | 'co2',
  diagnosticReport: DiagnosticReport,
  currentBitIndex = 0,
): number {
  const mostCommon = getMostCommonBitAtIndex(diagnosticReport, currentBitIndex);

  const filteredReport = diagnosticReport.filter((entry) =>
    kind === 'oxygen'
      ? entry[currentBitIndex] === mostCommon
      : entry[currentBitIndex] !== mostCommon,
  );

  if (filteredReport.length === 1) {
    return parseInt(filteredReport[0], 2);
  } else {
    return getRating(kind, filteredReport, currentBitIndex + 1);
  }
}

export function getLifeSupportRating(diagnosticReport: DiagnosticReport) {
  const oxygenGeneratorRating = getRating('oxygen', diagnosticReport);
  const co2ScrubberRating = getRating('co2', diagnosticReport);

  return oxygenGeneratorRating * co2ScrubberRating;
}
