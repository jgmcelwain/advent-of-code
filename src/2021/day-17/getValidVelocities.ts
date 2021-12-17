import type { TargetAreaBounds } from '.';
import { simVelocity } from './simVelocity';

export function getValidVelocities(targetArea: TargetAreaBounds) {
  const vxMin = 1;
  const vxMax = targetArea.x2 + 1;
  const vyMin = targetArea.y1 - 1;
  const vyMax = targetArea.y1 * -1;

  const validVelocities = [];

  for (let vx = vxMin; vx < vxMax; vx++) {
    for (let vy = vyMin; vy < vyMax; vy++) {
      const velocityWorks = simVelocity(vx, vy, targetArea);

      if (velocityWorks === true) {
        validVelocities.push({ vx, vy });
      }
    }
  }

  return validVelocities;
}
