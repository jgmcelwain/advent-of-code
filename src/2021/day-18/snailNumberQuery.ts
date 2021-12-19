function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

function findFirstPair(
  snailNumber: string,
): [pairAtStart: boolean, size: number, a: number, b: number] {
  const match = snailNumber.match(/\[(\d+),(\d+)\]/);

  return match?.index !== undefined
    ? [match.index === 0, match[0].length, Number(match[1]), Number(match[2])]
    : [false, 0, 0, 0];
}

function findFirstNumber(
  str: string,
): [value: number, size: number, startIndex: number, endIndex: number] {
  const match = str.match(/\d+/);

  if (match?.index === undefined) return [0, 0, -1, -1];

  const value = Number(match[0]);
  const size = match[0].length;
  const startIndex = match.index;
  const endIndex = startIndex + size;

  return [value, size, startIndex, endIndex];
}

function findLastNumber(
  snailNumber: string,
): [value: number, size: number, startIndex: number, endIndex: number] {
  const match = reverseString(snailNumber).match(/\d+/);

  if (match?.index === undefined) return [0, 0, -1, -1];

  const value = Number(reverseString(match[0]));
  const size = match[0].length;
  const startIndex = snailNumber.length - match.index - match[0].length;
  const endIndex = startIndex + size;

  return [value, size, startIndex, endIndex];
}

export const snailNumberQuery = {
  firstNumber: findFirstNumber,
  lastNumber: findLastNumber,
  firstPair: findFirstPair,
};
