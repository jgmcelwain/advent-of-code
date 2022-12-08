export function getPerimeterVisibleTreeCount(trees: number[][]) {
  let visibleTreeCount = 0;

  for (const [rowIndex, row] of trees.entries()) {
    for (const [colIndex, tree] of row.entries()) {
      if (
        rowIndex === 0 ||
        rowIndex === trees.length - 1 ||
        colIndex === 0 ||
        colIndex === row.length - 1
      ) {
        visibleTreeCount++;

        continue;
      } else {
        const previousInRow = row.slice(0, colIndex);
        const nextInRow = row.slice(colIndex + 1);

        if (
          previousInRow.every((rowTree) => rowTree < tree) ||
          nextInRow.every((rowTree) => rowTree < tree)
        ) {
          visibleTreeCount++;
        } else {
          const column = trees
            .map((row) => row[colIndex])
            .filter((colTree): colTree is number => colTree !== undefined);

          const previousInColumn = column.slice(0, rowIndex).reverse();
          const nextInColumn = column.slice(rowIndex + 1);

          if (
            previousInColumn.every((colTree) => colTree < tree) ||
            nextInColumn.every((colTree) => colTree < tree)
          ) {
            visibleTreeCount++;
          }
        }
      }
    }
  }

  return visibleTreeCount;
}
