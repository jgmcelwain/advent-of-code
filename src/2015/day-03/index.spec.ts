import { Direction } from '.';
import { getSantaAndRobotHouseVisits } from './getSantaAndRobotHouseVisits';
import { getSantaHouseVisits } from './getSantaHouseVisits';

test('getSantaHouseVisits', () => {
  expect(getSantaHouseVisits([Direction.East])).toBe(2);
  expect(
    getSantaHouseVisits([
      Direction.North,
      Direction.East,
      Direction.South,
      Direction.West,
    ]),
  ).toBe(4);
  expect(
    getSantaHouseVisits([
      Direction.North,
      Direction.South,
      Direction.North,
      Direction.South,
      Direction.North,
      Direction.South,
      Direction.North,
      Direction.South,
      Direction.North,
      Direction.South,
    ]),
  ).toBe(2);
});

test('getSantaAndRobotHouseVisits', () => {
  expect(getSantaAndRobotHouseVisits([Direction.North, Direction.South])).toBe(
    3,
  );
  expect(
    getSantaAndRobotHouseVisits([
      Direction.North,
      Direction.East,
      Direction.South,
      Direction.West,
    ]),
  ).toBe(3);
  expect(
    getSantaAndRobotHouseVisits([
      Direction.North,
      Direction.South,
      Direction.North,
      Direction.South,
      Direction.North,
      Direction.South,
      Direction.North,
      Direction.South,
      Direction.North,
      Direction.South,
    ]),
  ).toBe(11);
});
