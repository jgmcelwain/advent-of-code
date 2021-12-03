import { Direction } from '.';

export function mutatePositionWithDirection(
  position: { x: number; y: number },
  direction: Direction,
) {
  if (direction === Direction.North) position.y--;
  if (direction === Direction.South) position.y++;
  if (direction === Direction.East) position.x++;
  if (direction === Direction.West) position.x--;
}
