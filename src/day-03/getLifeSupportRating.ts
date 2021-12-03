import type { DiagnosticReport } from '.';

function getMostCommonBitAtIndex(
  diagnosticReport: DiagnosticReport,
  bitIndex: number,
): '0' | '1' {
  const indexBitCounts: { zero: number; one: number } = { zero: 0, one: 0 };

  for (let i = 0; i < diagnosticReport.length; i++) {
    if (diagnosticReport[i][bitIndex] === '1') {
      indexBitCounts.one++;
    } else {
      indexBitCounts.zero++;
    }
  }

  return indexBitCounts.zero > indexBitCounts.one ? '0' : '1';
}

function getRating(
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
