import { getInput } from '../../lib/getInput';

import { getPositionAfterCourse } from './getPositionAfterCourse';
import { getPositionAfterAimCourse } from './getPositionAfterAimCourse';

export type Instruction = {
  direction: Direction;
  amount: number;
};
export type Position = {
  horizontal: number;
  depth: number;
};

export enum Direction {
  Forward = 'forward',
  Down = 'down',
  Up = 'up',
}

function partOne(instructions: Instruction[]) {
  const result = getPositionAfterCourse(instructions);
  console.log('Part One: ', result.depth * result.horizontal);
}
function partTwo(instructions: Instruction[]) {
  const result = getPositionAfterAimCourse(instructions);
  console.log('Part Two: ', result.depth * result.horizontal);
}

async function main() {
  const input = await getInput(__dirname);
  const instructions: Instruction[] = input.map((line) => {
    const [direction, amount] = line.split(' ') as [Direction, string];

    return { direction, amount: Number(amount) };
  });

  console.log('Day 02 - Dive!');
  partOne(instructions);
  partTwo(instructions);
}

if (process.argv.includes('run')) {
  main();
}
