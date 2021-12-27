import { SnailNumberCharacters } from '.';

export function buildSnailNumber(
  ...parts: (SnailNumberCharacters | number | string)[]
) {
  return parts.join('');
}
