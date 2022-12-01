import type { Scanner, PlacedScanner } from '.';
import { clone2DArray } from '@/lib/clone2DArray';
import { attemptOrientation } from './attemptOrientation';

export function placeScanners(scannerData: Scanner[]) {
  const placedScanners: PlacedScanner[] = [
    { position: { x: 0, y: 0, z: 0 }, beacons: scannerData[0] },
  ];

  const unplacedBeaconScans = clone2DArray(scannerData).slice(1);

  while (unplacedBeaconScans.length > 0) {
    for (let i = 0; i < placedScanners.length; ++i) {
      for (let j = unplacedBeaconScans.length - 1; j >= 0; --j) {
        const beaconsInScan = unplacedBeaconScans[j];

        const [foundPosition, reorientatedBeacons] = attemptOrientation(
          beaconsInScan,
          placedScanners[i],
        );
        if (foundPosition !== null && reorientatedBeacons !== null) {
          placedScanners.push({
            position: foundPosition,
            beacons: reorientatedBeacons,
          });

          unplacedBeaconScans.splice(j, 1);
        }
      }
    }
  }

  return placedScanners;
}
