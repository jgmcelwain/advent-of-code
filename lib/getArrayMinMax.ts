export function getArrayMinMax(values: number[]): [min: number, max: number] {
  const min = Math.min(...values);
  const max = Math.max(...values);

  return [min, max];
}
