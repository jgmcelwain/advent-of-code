import type { PlacedScanner } from '.';

export function getMaxManhattanDistance(scanners: PlacedScanner[]) {
  let maxManhattanDistance = -Infinity;

  for (let i = 0; i < scanners.length; i++) {
    for (let j = 0; j < scanners.length; j++) {
      const dx = Math.abs(scanners[i].position.x - scanners[j].position.x);
      const dy = Math.abs(scanners[i].position.y - scanners[j].position.y);
      const dz = Math.abs(scanners[i].position.z - scanners[j].position.z);

      maxManhattanDistance = Math.max(dx + dy + dz, maxManhattanDistance);
    }
  }

  return maxManhattanDistance;
}
