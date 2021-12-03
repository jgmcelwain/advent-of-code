import { findMD5LeadingZeroGeneratingInt } from './findMD5LeadingZeroGeneratingInt';

test('findMD5LeadingZeroGeneratingInt', () => {
  expect(findMD5LeadingZeroGeneratingInt('abcdef', 5)).toBe(609043);
  expect(findMD5LeadingZeroGeneratingInt('pqrstuv', 5)).toBe(1048970);
});
