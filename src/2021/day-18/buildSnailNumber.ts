import { SnailNumberCharacters } from './index';

export function buildSnailNumber(
  ...parts: (SnailNumberCharacters | number | string)[]
) {
  return parts.join('');
}
