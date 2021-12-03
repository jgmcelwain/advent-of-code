import type { Instruction, Position } from '.';
import { Direction } from '.';

export function getPositionAfterCourse(instructions: Instruction[]): Position {
  const position: Position = { horizontal: 0, depth: 0 };

  for (let i = 0; i < instructions.length; i++) {
    switch (instructions[i].direction) {
      case Direction.Forward: {
        position.horizontal += instructions[i].amount;
        break;
      }
      case Direction.Up: {
        position.depth -= instructions[i].amount;
        break;
      }
      case Direction.Down: {
        position.depth += instructions[i].amount;
        break;
      }
      default: {
        break;
      }
    }
  }

  return position;
}
