import { findLargestPayload, largestThreePayloadSum } from '.';

const payloads = [6000, 4000, 11000, 24000, 10000];

describe('findLargestPayload', () => {
  it('finds the largest payload', () => {
    expect(findLargestPayload(payloads)).toBe(24000);
  });
});

describe('largestThreePayloadSum', () => {
  it('adds up the three largest payloads', () => {
    expect(largestThreePayloadSum(payloads)).toBe(45000);
  });
});
