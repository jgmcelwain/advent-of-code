import { transpose } from '@/lib/transpose';

export function calculateTreeGroupViewingDistance(
  group: number[],
  tree: number,
) {
  let score = 0;

  for (const groupTree of group) {
    score++;

    if (groupTree >= tree) {
      break;
    }
  }

  return score;
}

export function getHighestScenicScore(trees: number[][]) {
  const transposedTrees = transpose(trees);

  let highestScenicScore = -Infinity;

  for (const [rowIndex, row] of trees.entries()) {
    for (const [colIndex, tree] of row.entries()) {
      const column = transposedTrees[colIndex] ?? [];

      const previousInRow = row.slice(0, colIndex).reverse();
      const nextInRow = row.slice(colIndex + 1);
      const previousInColumn = column.slice(0, rowIndex).reverse();
      const nextInColumn = column.slice(rowIndex + 1);

      const scenicScore =
        calculateTreeGroupViewingDistance(previousInColumn, tree) *
        calculateTreeGroupViewingDistance(previousInRow, tree) *
        calculateTreeGroupViewingDistance(nextInRow, tree) *
        calculateTreeGroupViewingDistance(nextInColumn, tree);

      highestScenicScore = Math.max(highestScenicScore, scenicScore);
    }
  }

  return highestScenicScore;
}
