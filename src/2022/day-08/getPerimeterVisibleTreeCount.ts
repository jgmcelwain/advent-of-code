import { transpose } from '@/lib/transpose';

export function getPerimeterVisibleTreeCount(trees: number[][]) {
  const transposedTrees = transpose(trees);

  let visibleTreeCount = 0;

  for (const [rowIndex, row] of trees.entries()) {
    for (const [colIndex, tree] of row.entries()) {
      const column = transposedTrees[colIndex] ?? [];

      const previousInRow = row.slice(0, colIndex);
      const nextInRow = row.slice(colIndex + 1);
      const previousInColumn = column.slice(0, rowIndex).reverse();
      const nextInColumn = column.slice(rowIndex + 1);

      if (
        previousInRow.every((rowTree) => rowTree < tree) ||
        nextInRow.every((rowTree) => rowTree < tree) ||
        previousInColumn.every((colTree) => colTree < tree) ||
        nextInColumn.every((colTree) => colTree < tree)
      ) {
        visibleTreeCount++;
      }
    }
  }

  return visibleTreeCount;
}
