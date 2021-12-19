import { snailNumberQuery } from './snailNumberQuery';
import { SnailNumberCharacters } from '.';
import { buildSnailNumber } from './buildSnailNumber';

function isNumber(str: string) {
  return /\d/.test(str);
}

function explode(snailNumber: string): string {
  let currentDepth = 0;

  for (const [charIndex, snailChar] of snailNumber.split('').entries()) {
    if (snailChar === SnailNumberCharacters.Open && currentDepth >= 4) {
      const [pairAtStart, pairSize, a, b] = snailNumberQuery.findPair(
        snailNumber.slice(charIndex),
      );

      if (pairSize > 0 && pairAtStart) {
        const [nextValue, nextSize, nextStart] = snailNumberQuery.firstNumber(
          snailNumber.slice(charIndex + pairSize),
        );
        const [prevValue, prevSize, prevStart, prevEnd] =
          snailNumberQuery.lastNumber(snailNumber.slice(0, charIndex));

        const nextIndex = nextStart + charIndex + pairSize;

        if (prevSize === 0) {
          return buildSnailNumber(
            snailNumber.slice(0, charIndex),
            0,
            snailNumber.slice(charIndex + pairSize, nextIndex),
            b + nextValue,
            snailNumber.slice(nextIndex + nextSize),
          );
        } else if (nextSize === 0) {
          return buildSnailNumber(
            snailNumber.slice(0, prevStart),
            a + prevValue,
            snailNumber.slice(prevEnd, charIndex),
            0,
            snailNumber.slice(charIndex + pairSize),
          );
        } else {
          return buildSnailNumber(
            snailNumber.slice(0, prevStart),
            a + prevValue,
            snailNumber.slice(prevEnd, charIndex),
            0,
            snailNumber.slice(charIndex + pairSize, nextIndex),
            b + nextValue,
            snailNumber.slice(nextIndex + nextSize),
          );
        }
      }
    }

    if (snailChar === SnailNumberCharacters.Open) currentDepth += 1;
    else if (snailChar === SnailNumberCharacters.Close) currentDepth -= 1;
  }

  return snailNumber;
}

function split(snailNumber: string): string {
  for (let i = 0; i < snailNumber.length; i += 1) {
    const snailChar = snailNumber[i];
    const nextChar = snailNumber[i + 1];

    if (isNumber(snailChar) && isNumber(nextChar)) {
      const value = Number(snailChar + nextChar);

      return buildSnailNumber(
        snailNumber.slice(0, i),
        SnailNumberCharacters.Open,
        Math.floor(value / 2),
        SnailNumberCharacters.Separator,
        Math.ceil(value / 2),
        SnailNumberCharacters.Close,
        snailNumber.slice(i + 2),
      );
    }
  }

  return snailNumber;
}

export const reducers = { explode, split };
