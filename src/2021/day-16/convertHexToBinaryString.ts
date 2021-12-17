export function convertHexToBinaryString(input: string) {
  return input
    .split('')
    .map((i) => parseInt(i, 16).toString(2).padStart(4, '0'))
    .join('');
}
