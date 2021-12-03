import type { DiagnosticReport } from '../src/day-03';
import { getLifeSupportRating } from '../src/day-03/getLifeSupportRating';
import { getPowerConsumption } from '../src/day-03/getPowerConsumption';

const exampleDiagnosticReport: DiagnosticReport = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
];

test('getPowerConsumption', () => {
  expect(getPowerConsumption(exampleDiagnosticReport)).toEqual(198);
});

test('getLifeSupportRating', () => {
  expect(getLifeSupportRating(exampleDiagnosticReport)).toEqual(230);
});