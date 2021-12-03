import { Instruction } from '.';

export function getBasementInstruction(instructions: string) {
  let currentFloor = 0;

  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i] === Instruction.Up) {
      currentFloor++;
    } else {
      currentFloor--;
    }

    if (currentFloor === -1) {
      return i + 1;
    }
  }
}
