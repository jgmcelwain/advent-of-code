import { TargetAreaBounds } from './index';

export function simVelocity(
  vx: number,
  vy: number,
  targetArea: TargetAreaBounds,
) {
  const { x1, x2, y1, y2 } = targetArea;

  let x = 0;
  let y = 0;

  while (y > y1) {
    x += vx;
    y += vy;

    vx = Math.max(0, vx - 1);
    vy -= 1;

    if (x1 <= x && x <= x2 && y1 <= y && y <= y2) {
      return true;
    }
  }

  return false;
}
