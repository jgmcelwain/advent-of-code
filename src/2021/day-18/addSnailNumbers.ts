import { SnailNumberCharacters } from '.';
import { reducers } from './reducers';
import { buildSnailNumber } from './buildSnailNumber';

export function reduceSnailNumber(snailNumber: string): string {
  const explodedSnailNumber = reducers.explode(snailNumber);
  if (explodedSnailNumber !== snailNumber) {
    return reduceSnailNumber(explodedSnailNumber);
  }

  const splitSnailNumber = reducers.split(snailNumber);
  if (splitSnailNumber !== snailNumber) {
    return reduceSnailNumber(splitSnailNumber);
  }

  return snailNumber;
}

export function addSnailNumbers(a: string, b: string) {
  return reduceSnailNumber(
    buildSnailNumber(
      SnailNumberCharacters.Open,
      a,
      SnailNumberCharacters.Separator,
      b,
      SnailNumberCharacters.Close,
    ),
  );
}
