export function transpose<T>(matrix: T[][]): T[][] {
  const firstRow = matrix[0];

  if (firstRow === undefined) {
    return [];
  } else {
    return firstRow.map((_, i) => matrix.map((row) => row[i] as T));
  }
}
