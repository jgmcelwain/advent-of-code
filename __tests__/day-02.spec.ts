import type { Instruction } from '../src/day-02';
import { Direction } from '../src/day-02';

import { getPositionAfterCourse } from '../src/day-02/getPositionAfterCourse';
import { getPositionAfterAimCourse } from '../src/day-02/getPositionAfterAimCourse';

const exampleInstructions: Instruction[] = [
  { direction: Direction.Forward, amount: 5 },
  { direction: Direction.Down, amount: 5 },
  { direction: Direction.Forward, amount: 8 },
  { direction: Direction.Up, amount: 3 },
  { direction: Direction.Down, amount: 8 },
  { direction: Direction.Forward, amount: 2 },
];

test('getPositionAfterCourse', () => {
  expect(getPositionAfterCourse(exampleInstructions)).toEqual({
    horizontal: 15,
    depth: 10,
  });
});

test('getPositionAfterAimCourse', () => {
  expect(getPositionAfterAimCourse(exampleInstructions)).toEqual({
    horizontal: 15,
    depth: 60,
  });
});
