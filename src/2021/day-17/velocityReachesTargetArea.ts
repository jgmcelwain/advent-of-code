import type { TargetAreaBounds } from '.';
import { inBounds } from './inBounds';

export function velocityReachesTargetArea(
  vx: number,
  vy: number,
  targetArea: TargetAreaBounds,
) {
  let x = 0;
  let y = 0;

  while (y > targetArea.y1) {
    x += vx;
    y += vy;

    vx = Math.max(0, vx - 1);
    vy -= 1;

    if (inBounds(x, y, targetArea)) return true;
  }

  return false;
}
