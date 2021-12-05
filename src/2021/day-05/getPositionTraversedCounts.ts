import type { Line, Point } from '.';
import { LineKind } from '.';

export function getPositionTraversedCounts(
  lines: Line[],
  includeDiagonals = false,
) {
  const positionTraversedCounts: number[][] = [];

  function traversePoint(point: Point) {
    if (positionTraversedCounts[point.y] === undefined) {
      positionTraversedCounts[point.y] = [];
    }
    if (!positionTraversedCounts[point.y][point.x]) {
      positionTraversedCounts[point.y][point.x] = 1;
    } else {
      positionTraversedCounts[point.y][point.x]++;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.kind === LineKind.Diagonal) {
      if (includeDiagonals) {
        const xDirection = line.start.x < line.end.x ? 1 : -1;
        const yDirection = line.start.y < line.end.y ? 1 : -1;
        const steps = Math.abs(line.start.x - line.end.x);

        for (let i = 0; i <= steps; i++) {
          traversePoint({
            x: line.start.x + i * xDirection,
            y: line.start.y + i * yDirection,
          });
        }
      }
    } else {
      const d = line.kind === LineKind.Vertical ? 'y' : 'x';
      const dStart = Math.min(line.start[d], line.end[d]);
      const dEnd = Math.max(line.start[d], line.end[d]);

      for (let j = dStart; j <= dEnd; j++) {
        traversePoint({
          x: line.kind === LineKind.Vertical ? line.start.x : j,
          y: line.kind === LineKind.Horizontal ? line.start.y : j,
        });
      }
    }
  }

  return positionTraversedCounts;
}
