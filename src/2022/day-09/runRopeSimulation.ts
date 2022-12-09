import type { Instruction } from './index';

type Position = { x: number; y: number };

export function runRopeSimulation(
  ropeLength: number,
  instructions: Instruction[],
) {
  const rope: Position[] = Array.from({ length: ropeLength }).map(() => ({
    x: 0,
    y: 0,
  }));

  if (rope.length === 0) {
    throw new Error('Rope length must be at least 1');
  }

  // typecast here is safe because we already checked that the rope will be of
  // at least length 1
  const tail = rope[rope.length - 1] as Position;

  // store positions as a set so we don't have to manually check if a position
  // has already been visited
  const tailVisitedPositions = new Set<string>();

  for (const [direction, distance] of instructions) {
    for (let i = 0; i < distance; i++) {
      for (const [knotIndex, knot] of rope.entries()) {
        const follow = rope[knotIndex - 1];

        // if there is no previous knot to follow that means we are working with
        // the lead knot - or "head" - which just moves according to the
        // instruction's direction
        if (follow === undefined) {
          switch (direction) {
            case 'U':
              knot.y++;
              break;

            case 'D':
              knot.y--;
              break;

            case 'R':
              knot.x++;
              break;

            case 'L':
              knot.x--;
              break;
          }
        }

        // this knot should move if the knot it's following is > 1 unit away in
        // any direction
        else if (
          Math.abs(knot.x - follow.x) > 1 ||
          Math.abs(knot.y - follow.y) > 1
        ) {
          if (knot.x > follow.x) {
            knot.x--;
          } else if (knot.x < follow.x) {
            knot.x++;
          }

          if (knot.y > follow.y) {
            knot.y--;
          } else if (knot.y < follow.y) {
            knot.y++;
          }
        }
      }

      tailVisitedPositions.add(`${tail.x}.${tail.y}`);
    }
  }

  return tailVisitedPositions.size;
}
