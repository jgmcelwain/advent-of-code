import type { DiagnosticReport, BitCount, BitValue } from '.';

function getDigitBitCounts(diagnosticReport: DiagnosticReport) {
  const digitBitCounts: { [index: number]: BitCount } = {};

  for (let i = 0; i < diagnosticReport.length; i++) {
    for (let j = 0; j < diagnosticReport[i].length; j++) {
      if (digitBitCounts[j] === undefined) {
        digitBitCounts[j] = { 0: 0, 1: 0 };
      }

      const digit = diagnosticReport[i][j] as BitValue;
      digitBitCounts[j][digit]++;
    }
  }

  return digitBitCounts;
}

export function getPowerConsumption(diagnosticReport: DiagnosticReport) {
  const digitBitCounts = getDigitBitCounts(diagnosticReport);

  let gamma = '';
  let epsilon = '';
  for (const i in digitBitCounts) {
    gamma += digitBitCounts[i][1] > digitBitCounts[i][0] ? '1' : '0';
    epsilon += digitBitCounts[i][1] > digitBitCounts[i][0] ? '0' : '1';
  }

  const gammaValue = parseInt(gamma, 2);
  const epsilonValue = parseInt(epsilon, 2);

  return gammaValue * epsilonValue;
}
