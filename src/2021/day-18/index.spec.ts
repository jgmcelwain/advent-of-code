import { addSnailNumbers, reducers } from './addSnailNumbers';
import { buildSnailNumber } from './buildSnailNumber';
import { calculateSnailNumberMagnitude } from './calculateSnailNumberMagnitude';
import { snailNumberQuery } from './snailNumberQuery';

describe('buildSnailNumber', () => {
  it('creates a snail number from supplied parts', () => {
    expect(buildSnailNumber('[', 3, ',', '[', 4, ',', 5, ']', ']')).toBe(
      '[3,[4,5]]',
    );
  });
});

describe('snailNumberQuery', () => {
  describe('findFirstPair', () => {
    it.each([
      { snailNumber: '[1,2]', pair: [1, 2] },
      { snailNumber: '[[1,2],3]', pair: [1, 2] },
      { snailNumber: '[9,[8,7]]', pair: [8, 7] },
      { snailNumber: '[[1,9],[8,5]]', pair: [1, 9] },
      { snailNumber: '[[[[1,2],[3,4]],[[5,6],[7,8]]],9]', pair: [1, 2] },
      {
        snailNumber:
          '[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]',
        pair: [1, 3],
      },
    ])(
      'finds the first numeric pair in a snail number',
      ({ snailNumber, pair }) => {
        const [, , a, b] = snailNumberQuery.firstPair(snailNumber);
        expect(a).toBe(pair[0]);
        expect(b).toBe(pair[1]);
      },
    );

    it.each([
      { snailNumber: '[1,2]', isAtStart: true },
      { snailNumber: '[[1,2],3]', isAtStart: false },
      { snailNumber: '[9,[8,7]]', isAtStart: false },
      { snailNumber: '[[1,9],[8,5]]', isAtStart: false },
      { snailNumber: '[[[[1,2],[3,4]],[[5,6],[7,8]]],9]', isAtStart: false },
      {
        snailNumber:
          '[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]',
        isAtStart: false,
      },
    ])(
      'identifies if the pair is at the start',
      ({ snailNumber, isAtStart }) => {
        const [pairAtStart] = snailNumberQuery.firstPair(snailNumber);
        expect(pairAtStart).toBe(isAtStart);
      },
    );
  });

  describe('findFirstNumber', () => {
    it.each([
      { snailNumber: '[1,2]', number: 1 },
      { snailNumber: '[[1,2],3]', number: 1 },
      { snailNumber: '[9,[8,7]]', number: 9 },
      { snailNumber: '[[1,9],[8,5]]', number: 1 },
      { snailNumber: '[[[[1,2],[3,4]],[[5,6],[7,8]]],9]', number: 1 },
      {
        snailNumber:
          '[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]',
        number: 1,
      },
    ])(
      'finds the first number in a snail number',
      ({ snailNumber, number }) => {
        const [value] = snailNumberQuery.firstNumber(snailNumber);
        expect(value).toBe(number);
      },
    );
  });

  describe('findLastNumber', () => {
    it.each([
      { snailNumber: '[1,2]', number: 2 },
      { snailNumber: '[[1,2],3]', number: 3 },
      { snailNumber: '[9,[8,7]]', number: 7 },
      { snailNumber: '[[1,9],[8,5]]', number: 5 },
      { snailNumber: '[[[[1,2],[3,4]],[[5,6],[7,8]]],9]', number: 9 },
      {
        snailNumber:
          '[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]',
        number: 3,
      },
    ])(
      'finds the first number in a snail number',
      ({ snailNumber, number }) => {
        const [value] = snailNumberQuery.lastNumber(snailNumber);
        expect(value).toBe(number);
      },
    );
  });
});

describe('addSnailNumbers', () => {
  describe('reduceSnailNumber', () => {
    describe('explode', () => {
      it.each([
        { start: '[[[[[9,8],1],2],3],4]', end: '[[[[0,9],2],3],4]' },
        { start: '[7,[6,[5,[4,[3,2]]]]]', end: '[7,[6,[5,[7,0]]]]' },
        { start: '[[6,[5,[4,[3,2]]]],1]', end: '[[6,[5,[7,0]]],3]' },
        {
          start: '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]',
          end: '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]',
        },
        {
          start: '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]',
          end: '[[3,[2,[8,0]]],[9,[5,[7,0]]]]',
        },
      ])('explodes a snail number', ({ start, end }) => {
        expect(reducers.explode(start)).toBe(end);
      });
    });

    describe('split', () => {
      it.each([
        { start: '10', end: '[5,5]' },
        { start: '11', end: '[5,6]' },
        { start: '12', end: '[6,6]' },
      ])('explodes a snail number', ({ start, end }) => {
        expect(reducers.split(start)).toBe(end);
      });
    });
  });

  it.each([
    {
      a: '[[[[4,3],4],4],[7,[[8,4],9]]]',
      b: '[1,1]',
      result: '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]',
    },
    {
      a: '[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]',
      b: '[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]',
      result: '[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]',
    },
    {
      a: '[[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]',
      b: '[[[[4,2],2],6],[8,7]]',
      result: '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]',
    },
  ])('adds two snail numbers together', ({ a, b, result }) => {
    expect(addSnailNumbers(a, b)).toBe(result);
  });
});

describe('calculateSnailNumberMagnitude', () => {
  it.each([
    { snailNumber: '[[1,2],[[3,4],5]]', magnitude: 143 },
    { snailNumber: '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]', magnitude: 1384 },
    { snailNumber: '[[[[1,1],[2,2]],[3,3]],[4,4]]', magnitude: 445 },
    { snailNumber: '[[[[5,0],[7,4]],[5,5]],[6,6]]', magnitude: 1137 },
    {
      snailNumber: '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]',
      magnitude: 3488,
    },
  ])(
    'calculates the magnitude of a snail number',
    ({ snailNumber, magnitude }) => {
      expect(calculateSnailNumberMagnitude(snailNumber)).toBe(magnitude);
    },
  );
});
