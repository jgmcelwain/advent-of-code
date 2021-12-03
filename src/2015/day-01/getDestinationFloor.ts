import { Instruction } from '.';

export function getDestinationFloor(instructions: string) {
  let floor = 0;

  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i] === Instruction.Up) {
      floor++;
    } else {
      floor--;
    }
  }

  return floor;
}
