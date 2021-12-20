import type { PlacedScanner } from '.';

export function countUniqueBeacons(scanners: PlacedScanner[]) {
  const beaconPositions = new Set<string>();

  for (let i = 0; i < scanners.length; i++) {
    for (let j = 0; j < scanners[i].beacons.length; j++) {
      const beaconX = scanners[i].position.x + scanners[i].beacons[j].x;
      const beaconY = scanners[i].position.y + scanners[i].beacons[j].y;
      const beaconZ = scanners[i].position.z + scanners[i].beacons[j].z;

      beaconPositions.add(`${beaconX}, ${beaconY}, ${beaconZ}`);
    }
  }

  return beaconPositions.size;
}
