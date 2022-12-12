import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { findShortestPath } from './findShortestPath';

export type MatrixNode = {
  key: string;
  x: number;
  y: number;
  raw: string;
  height: number;
};

function partOne(matrix: MatrixNode[][]) {
  const startNode = matrix.flat().find((node) => node.raw === 'S');
  if (startNode === undefined) {
    throw new Error('Could not find start node.');
  }

  const endNode = matrix.flat().find((node) => node.raw === 'E');
  if (endNode === undefined) {
    throw new Error('Could not find end node.');
  }

  const shortestPath = findShortestPath(matrix, startNode, endNode);

  return shortestPath;
}

function partTwo(matrix: MatrixNode[][]) {
  const startNodes = matrix.flat().filter((node) => node.height === 1);

  const endNode = matrix.flat().find((node) => node.raw === 'E');
  if (endNode === undefined) {
    throw new Error('Could not find end node.');
  }

  const shortestPaths = startNodes
    .map((startNode) => findShortestPath(matrix, startNode, endNode))
    .filter((pathLength): pathLength is number => pathLength !== null);

  return Math.min(...shortestPaths);
}

async function main() {
  const input = await getInput(__dirname);

  const matrix = input.split('\n').map((row, y) =>
    row.split('').map((n, x) => {
      const height = n === 'S' ? 1 : n === 'E' ? 26 : n.charCodeAt(0) - 96;

      return {
        key: `${x},${y}`,
        raw: n,
        x,
        y,
        height,
      };
    }),
  );

  console.log(matrix);

  void runDay(
    2022,
    12,
    'Hill Climbing Algorithm',
    () => partOne(matrix),
    () => partTwo(matrix),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
