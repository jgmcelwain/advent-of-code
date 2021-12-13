import { getInput } from '../../../lib/getInput';
import { foldMatrix } from './foldMatrix';

export type PaperMatrix = (0 | 1)[][];
export type Instruction = { axis: 'x' | 'y'; position: number };

function partOne(matrix: PaperMatrix, instructions: Instruction[]) {
  const outputMatrix = foldMatrix(matrix, instructions[0]);
  const result = outputMatrix.flat().filter((point) => point === 1).length;

  console.log('Part One: ', result);
}

function partTwo(matrix: PaperMatrix, instructions: Instruction[]) {
  let currentMatrix = matrix;

  for (let i = 0; i < instructions.length; i++) {
    currentMatrix = foldMatrix(currentMatrix, instructions[i]);
  }

  const result = `\n${currentMatrix
    .map((row) => row.map((n) => (n === 1 ? '█' : ' ')).join(''))
    .join('\n')}`;

  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);
  const [rawCoordinates, rawInstructions] = input
    .split('\n\n')
    .map((n) => n.split('\n'));

  const coordinates = rawCoordinates.map((c) =>
    c.split(',').map((n) => Number(n)),
  );
  const maxX = Math.max(...coordinates.map(([x]) => x));
  const maxY = Math.max(...coordinates.map(([, y]) => y));

  const matrix: PaperMatrix = Array.from({ length: maxY + 1 }).map(() =>
    Array(maxX + 1).fill(0),
  );
  coordinates.forEach(([x, y]) => (matrix[y][x] = 1));

  const instructions = rawInstructions.map((str): Instruction => {
    const [axis, position] = str.split('fold along ')[1].split('=');

    return { axis: axis === 'x' ? 'x' : 'y', position: Number(position) };
  });

  console.log('AoC 2021 - Day 13: Transparent Origami');
  partOne(matrix, instructions);
  partTwo(matrix, instructions);
}

if (process.argv.includes('run')) {
  main();
}
