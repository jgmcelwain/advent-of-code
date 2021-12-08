import type { DisplayDataEntry } from '.';
import { calculateOutputValue } from './calculateOutputValue';
import { countUniqueSegmentDigits } from './countUniqueSegmentDigits';
import { getValueSortedPatterns } from './getValueSortedPatterns';

const testData: DisplayDataEntry[] = [
  {
    signalPatterns: [
      'be',
      'abcdefg',
      'bcdefg',
      'acdefg',
      'bceg',
      'cdefg',
      'abdefg',
      'bcdef',
      'abcdf',
      'bde',
    ],
    outputValue: ['abcdefg', 'bcdef', 'bcdefg', 'bceg'],
  },
  {
    signalPatterns: [
      'abdefg',
      'bcdeg',
      'bcg',
      'cg',
      'abcdefg',
      'bdefg',
      'abcdfg',
      'abcde',
      'bcdefg',
      'cefg',
    ],
    outputValue: ['bcdefg', 'bcg', 'abcdefg', 'cg'],
  },
  {
    signalPatterns: [
      'abdefg',
      'cg',
      'abcde',
      'abdfg',
      'abcdfg',
      'bcdefg',
      'abcdg',
      'acfg',
      'bcg',
      'abcdefg',
    ],
    outputValue: ['cg', 'cg', 'abcdfg', 'bcg'],
  },
  {
    signalPatterns: [
      'bcdefg',
      'bcd',
      'abcdef',
      'abdeg',
      'abcf',
      'bc',
      'acdef',
      'abcde',
      'acdefg',
      'abcdefg',
    ],
    outputValue: ['abcdef', 'abcde', 'acdefg', 'bc'],
  },
  {
    signalPatterns: [
      'abcdefg',
      'bfg',
      'fg',
      'abefg',
      'abdef',
      'cefg',
      'abceg',
      'abcefg',
      'abcdeg',
      'abcdfg',
    ],
    outputValue: ['cefg', 'abcdefg', 'bfg', 'abefg'],
  },
  {
    signalPatterns: [
      'abefg',
      'ac',
      'abcefg',
      'abcdefg',
      'acdefg',
      'bcdfg',
      'abce',
      'abdefg',
      'abcfg',
      'acf',
    ],
    outputValue: ['abcdefg', 'abce', 'ac', 'abcdefg'],
  },
  {
    signalPatterns: [
      'bcdfg',
      'dfg',
      'abcdefg',
      'cefg',
      'abdefg',
      'abcdef',
      'bcdef',
      'abcdg',
      'bcdefg',
      'fg',
    ],
    outputValue: ['cefg', 'bcdef', 'cefg', 'abcdefg'],
  },
  {
    signalPatterns: [
      'bcdefg',
      'abcefg',
      'bcefg',
      'acdefg',
      'abcdg',
      'de',
      'bdef',
      'cde',
      'abcdefg',
      'bcdeg',
    ],
    outputValue: ['de', 'abcefg', 'abcdg', 'bcefg'],
  },
  {
    signalPatterns: [
      'abdefg',
      'bcdefg',
      'cdeg',
      'abcef',
      'bcg',
      'abcdefg',
      'cg',
      'abcdfg',
      'bdefg',
      'bcefg',
    ],
    outputValue: ['abcdefg', 'bcg', 'cg', 'bcg'],
  },
  {
    signalPatterns: [
      'abcfg',
      'cfg',
      'abcdefg',
      'abceg',
      'fg',
      'abcdeg',
      'aefg',
      'abcefg',
      'abcdf',
      'bcdefg',
    ],
    outputValue: ['aefg', 'abcfg', 'fg', 'abceg'],
  },
];

describe('countUniqueSegmentDigits', () => {
  it('ignores five and six segment digits', () => {
    expect(
      countUniqueSegmentDigits([
        {
          signalPatterns: [],
          outputValue: ['cdfeb', 'fcadb', 'cdfeb', 'cdbaf'],
        },
        {
          signalPatterns: [],
          outputValue: ['cefabd', 'cdfbe', 'cdfgeb', 'cagedb'],
        },
      ]),
    ).toBe(0);
  });

  it('counts two, three, four and seven segment digits', () => {
    expect(countUniqueSegmentDigits(testData)).toBe(26);
  });
});

describe('getValueSortedPatterns', () => {
  it('sorts patterns into value order', () => {
    expect(
      getValueSortedPatterns([
        'acedgfb',
        'cdfbe',
        'gcdfa',
        'fbcad',
        'dab',
        'cefabd',
        'cdfgeb',
        'eafb',
        'cagedb',
        'ab',
      ]),
    ).toEqual([
      'cagedb',
      'ab',
      'gcdfa',
      'fbcad',
      'eafb',
      'cdfbe',
      'cdfgeb',
      'dab',
      'acedgfb',
      'cefabd',
    ]);
  });
});

describe('calculateOutputValue', () => {
  it('calculates the output for a set of entries', () => {
    expect(calculateOutputValue(testData)).toBe(61229);
  });
});
