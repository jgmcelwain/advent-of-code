import type { DiagnosticReport } from '.';

function getDigitBitCounts(diagnosticReport: DiagnosticReport) {
  const digitBitCounts: { [index: number]: { zero: number; one: number } } = {};

  for (let i = 0; i < diagnosticReport.length; i++) {
    for (let j = 0; j < diagnosticReport[i].length; j++) {
      const digit = diagnosticReport[i][j];
      if (digitBitCounts[j] === undefined) {
        digitBitCounts[j] = { zero: 0, one: 0 };
      }

      digitBitCounts[j][digit === '0' ? 'zero' : 'one']++;
    }
  }

  return digitBitCounts;
}

export function getPowerConsumption(diagnosticReport: DiagnosticReport) {
  const digitBitCounts = getDigitBitCounts(diagnosticReport);

  let gamma = '';
  let epsilon = '';
  for (const i in digitBitCounts) {
    gamma += digitBitCounts[i].one > digitBitCounts[i].zero ? '1' : '0';
    epsilon += digitBitCounts[i].one > digitBitCounts[i].zero ? '0' : '1';
  }

  const gammaValue = parseInt(gamma, 2);
  const epsilonValue = parseInt(epsilon, 2);

  return gammaValue * epsilonValue;
}
