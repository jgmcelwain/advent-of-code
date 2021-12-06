import type { DiagnosticReport } from '.';
import { getLifeSupportRating, getRating } from './getLifeSupportRating';
import { getPowerConsumption } from './getPowerConsumption';

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

describe('getPowerConsumption', () => {
  it('calculates power consumption', () => {
    expect(getPowerConsumption(exampleDiagnosticReport)).toEqual(198);
  });
});

describe('getRating', () => {
  it('calculates oxygen rating', () => {
    expect(getRating('oxygen', exampleDiagnosticReport)).toEqual(23);
  });

  it('calculates co2 rating', () => {
    expect(getRating('co2', exampleDiagnosticReport)).toEqual(10);
  });
});

describe('getLifeSupportRating', () => {
  it('combines co2 and oxygen ratings', () => {
    expect(getLifeSupportRating(exampleDiagnosticReport)).toEqual(230);
  });
});
