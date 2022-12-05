import { Instruction } from '.';

export function getDestinationFloor(instructions: string) {
  let floor = 0;

  for (const instruction of instructions) {
    if (instruction === Instruction.Up) {
      floor++;
    } else {
      floor--;
    }
  }

  return floor;
}
