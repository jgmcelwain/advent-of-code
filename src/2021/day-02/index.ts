import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
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
  const { depth, horizontal } = getPositionAfterCourse(instructions);

  return depth * horizontal;
}
function partTwo(instructions: Instruction[]) {
  const { depth, horizontal } = getPositionAfterAimCourse(instructions);

  return depth * horizontal;
}

async function main() {
  const input = await getInput(__dirname);
  const instructions: Instruction[] = input.split('\n').map((line) => {
    const [direction, amount] = line.split(' ') as [Direction, string];

    return { direction, amount: Number(amount) };
  });

  void runDay(
    2021,
    2,
    'Dive!',
    () => partOne(instructions),
    () => partTwo(instructions),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
