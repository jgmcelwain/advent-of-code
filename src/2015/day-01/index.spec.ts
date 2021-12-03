import { getDestinationFloor } from './getDestinationFloor';
import { getBasementInstruction } from './getBasementInstruction';

test('getDestinationFloor', () => {
  expect(getDestinationFloor('(())')).toBe(0);
  expect(getDestinationFloor('()()')).toBe(0);
  expect(getDestinationFloor('(((')).toBe(3);
  expect(getDestinationFloor('(()(()(')).toBe(3);
  expect(getDestinationFloor('))(((((')).toBe(3);
  expect(getDestinationFloor('())')).toBe(-1);
  expect(getDestinationFloor('))(')).toBe(-1);
  expect(getDestinationFloor(')))')).toBe(-3);
  expect(getDestinationFloor(')())())')).toBe(-3);
});

test('getBasementInstruction', () => {
  expect(getBasementInstruction(')')).toBe(1);
  expect(getBasementInstruction('()())')).toBe(5);
});
