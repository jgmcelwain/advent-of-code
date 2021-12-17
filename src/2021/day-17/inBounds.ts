import { TargetAreaBounds } from './index';

export function inBounds(x: number, y: number, bounds: TargetAreaBounds) {
  return x >= bounds.x1 && x <= bounds.x2 && y >= bounds.y1 && y <= bounds.y2;
}
