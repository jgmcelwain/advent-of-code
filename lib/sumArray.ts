export function sumArray(array: number[]) {
  return array.reduce((acc, curr) => (acc += curr), 0);
}
