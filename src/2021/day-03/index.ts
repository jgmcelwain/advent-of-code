import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { getLifeSupportRating } from './getLifeSupportRating';
import { getPowerConsumption } from './getPowerConsumption';

export type DiagnosticReport = string[];
export type BitValue = '0' | '1';
export type BitCount = { [K in BitValue]: number };

function partOne(diagnosticReport: DiagnosticReport) {
  return getPowerConsumption(diagnosticReport);
}

function partTwo(diagnosticReport: DiagnosticReport) {
  return getLifeSupportRating(diagnosticReport);
}

async function main() {
  const input = await getInput(__dirname);
  const diagnosticReport: DiagnosticReport = input.split('\n');

  runDay(
    2021,
    3,
    'Binary Diagnostic',
    () => partOne(diagnosticReport),
    () => partTwo(diagnosticReport),
    true,
  );
}

if (process.argv.includes('run')) {
  main();
}
