import type { Instruction } from '.';
import { Direction } from '.';

import { getPositionAfterCourse } from './getPositionAfterCourse';
import { getPositionAfterAimCourse } from './getPositionAfterAimCourse';

const exampleInstructions: Instruction[] = [
  { direction: Direction.Forward, amount: 5 },
  { direction: Direction.Down, amount: 5 },
  { direction: Direction.Forward, amount: 8 },
  { direction: Direction.Up, amount: 3 },
  { direction: Direction.Down, amount: 8 },
  { direction: Direction.Forward, amount: 2 },
];

describe('getPositionAfterCourse', () => {
  it('calculates horizontal and vertical position', () => {
    expect(getPositionAfterCourse(exampleInstructions)).toEqual({
      horizontal: 15,
      depth: 10,
    });
  });
});

describe('getPositionAfterAimCourse', () => {
  it('calculates horizontal and vertical position', () => {
    expect(getPositionAfterAimCourse(exampleInstructions)).toEqual({
      horizontal: 15,
      depth: 60,
    });
  });
});
