import { InsertionRules } from '.';
import { applyInsertionRules } from './applyInsertionRules';
import { getInitialCharacterCounts } from './getInitialCharacterCounts';
import { getInitialChunkCounts } from './getInitialChunkCounts';

describe('getInitialChunkCounts', () => {
  it.each([
    { template: 'NNCB', output: { CB: 1, NC: 1, NN: 1 } },
    {
      template: 'NCNBCHB',
      output: { BC: 1, CH: 1, CN: 1, HB: 1, NB: 1, NC: 1 },
    },
    {
      template: 'NBCCNBBBCBHCB',
      output: { BB: 2, BC: 2, BH: 1, CB: 2, CC: 1, CN: 1, HC: 1, NB: 2 },
    },
    {
      template: 'NBBBCNCCNBBNBNBBCHBHHBCHB',
      output: {
        BB: 4,
        BC: 3,
        BH: 1,
        BN: 2,
        CC: 1,
        CH: 2,
        CN: 2,
        HB: 3,
        HH: 1,
        NB: 4,
        NC: 1,
      },
    },
    {
      template: 'NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB',
      output: {
        BB: 9,
        BC: 4,
        BH: 3,
        BN: 6,
        CB: 5,
        CC: 2,
        CN: 3,
        HC: 3,
        HH: 1,
        HN: 1,
        NB: 9,
        NC: 1,
        NH: 1,
      },
    },
  ])('splits and counts chunks', ({ template, output }) => {
    expect(getInitialChunkCounts(template)).toStrictEqual(output);
  });
});

describe('getInitialCharacterCounts', () => {
  it.each([
    { template: 'NNCB', output: { B: 1, C: 1, N: 2 } },
    {
      template: 'NCNBCHB',
      output: { B: 2, C: 2, H: 1, N: 2 },
    },
    {
      template: 'NBCCNBBBCBHCB',
      output: { B: 6, C: 4, H: 1, N: 2 },
    },
    {
      template: 'NBBBCNCCNBBNBNBBCHBHHBCHB',
      output: { B: 11, C: 5, H: 4, N: 5 },
    },
    {
      template: 'NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB',
      output: { B: 23, C: 10, H: 5, N: 11 },
    },
  ])('splits and counts chunks', ({ template, output }) => {
    expect(getInitialCharacterCounts(template)).toStrictEqual(output);
  });
});

const testPolymer = 'NNCB';
const testRules: InsertionRules = {
  CH: 'B',
  HH: 'N',
  CB: 'H',
  NH: 'C',
  HB: 'C',
  HC: 'B',
  HN: 'C',
  NN: 'C',
  BH: 'H',
  NC: 'B',
  NB: 'B',
  BN: 'B',
  BB: 'N',
  BC: 'B',
  CC: 'N',
  CN: 'C',
};

describe('applyInsertionRules', () => {
  it.each([
    { iterationCount: 1, outputCounts: { B: 2, C: 2, H: 1, N: 2 } },
    { iterationCount: 10, outputCounts: { B: 1749, C: 298, H: 161, N: 865 } },
    {
      iterationCount: 40,
      outputCounts: {
        B: 2192039569602,
        C: 6597635301,
        H: 3849876073,
        N: 1096047802353,
      },
    },
  ])(
    'applies the polymer insertion rules',
    ({ iterationCount, outputCounts }) => {
      let polymerChunkCounts = getInitialChunkCounts(testPolymer);
      let characterCounts = getInitialCharacterCounts(testPolymer);

      for (let i = 0; i < iterationCount; i++) {
        [polymerChunkCounts, characterCounts] = applyInsertionRules(
          polymerChunkCounts,
          characterCounts,
          testRules,
        );
      }

      expect(characterCounts).toStrictEqual(outputCounts);
    },
  );
});
