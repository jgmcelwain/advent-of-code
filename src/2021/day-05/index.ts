import { getInput } from '../../../lib/getInput';
import { getPositionTraversedCounts } from './getPositionTraversedCounts';

export type Point = { x: number; y: number };
export type Line = { start: Point; end: Point; kind: LineKind };

export enum LineKind {
  Horizontal,
  Vertical,
  Diagonal,
}

function partOne(lines: Line[]) {
  const positionTraversedCounts = getPositionTraversedCounts(lines);
  const result = positionTraversedCounts.flat(2).filter((n) => n > 1).length;

  console.log('Part One: ', result);
}

function partTwo(lines: Line[]) {
  const positionTraversedCounts = getPositionTraversedCounts(lines, true);
  const result = positionTraversedCounts.flat(2).filter((n) => n > 1).length;

  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);
  const lines: Line[] = input.split('\n').map((n) => {
    const [start, end] = n.split(' -> ').map((n) => {
      const [x, y] = n.split(',').map(Number);

      return { x, y };
    });

    const kind =
      start.y === end.y
        ? LineKind.Horizontal
        : start.x === end.x
        ? LineKind.Vertical
        : LineKind.Diagonal;

    return { start, end, kind };
  });

  console.log('AoC 2021 - Day 05: Hydrothermal Venture');
  partOne(lines);
  partTwo(lines);
}

if (process.argv.includes('run')) {
  main();
}
