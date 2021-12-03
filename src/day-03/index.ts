import { getInput } from '../../lib/getInput';
import { getLifeSupportRating } from './getLifeSupportRating';
import { getPowerConsumption } from './getPowerConsumption';

export type DiagnosticReport = string[];
export type BitValue = '0' | '1';
export type BitCount = { [K in BitValue]: number };

function partOne(diagnosticReport: DiagnosticReport) {
  const result = getPowerConsumption(diagnosticReport);
  console.log('Part One: ', result);
}

function partTwo(diagnosticReport: DiagnosticReport) {
  const result = getLifeSupportRating(diagnosticReport);
  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);

  console.log('Day 03 - Binary Diagnostic');
  partOne(input);
  partTwo(input);
}

if (process.argv.includes('run')) {
  main();
}
