import type { Instruction, Position } from '.';
import { Direction } from '.';

export function getPositionAfterAimCourse(
  instructions: Instruction[],
): Position {
  const position: Position = { horizontal: 0, depth: 0 };
  let aim = 0;

  for (let i = 0; i < instructions.length; i++) {
    switch (instructions[i].direction) {
      case Direction.Up: {
        aim -= instructions[i].amount;
        break;
      }
      case Direction.Down: {
        aim += instructions[i].amount;
        break;
      }
      case Direction.Forward: {
        position.horizontal += instructions[i].amount;
        position.depth += aim * instructions[i].amount;
        break;
      }
      default: {
        break;
      }
    }
  }

  return position;
}
