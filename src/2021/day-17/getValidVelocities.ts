import type { TargetAreaBounds } from '.';
import { velocityReachesTargetArea } from './velocityReachesTargetArea';

export function getValidVelocities(targetArea: TargetAreaBounds) {
  const vxMin = 1;
  const vxMax = targetArea.x2;
  const vyMin = targetArea.y1;
  const vyMax = targetArea.y1 * -1;

  const validVelocities = [];

  for (let vx = vxMin; vx <= vxMax; vx++) {
    for (let vy = vyMin; vy <= vyMax; vy++) {
      if (velocityReachesTargetArea(vx, vy, targetArea)) {
        validVelocities.push({ vx, vy });
      }
    }
  }

  return validVelocities;
}
