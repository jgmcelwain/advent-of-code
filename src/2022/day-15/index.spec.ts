import type { ScanResult } from '.';

import { nonBeaconXValuesAtYValue } from './nonBeaconXValuesAtYValue';

const testScan: ScanResult[] = [
  { sensorLocation: { x: 2, y: 18 }, beaconLocation: { x: -2, y: 15 } },
  { sensorLocation: { x: 9, y: 16 }, beaconLocation: { x: 10, y: 16 } },
  { sensorLocation: { x: 13, y: 2 }, beaconLocation: { x: 15, y: 3 } },
  { sensorLocation: { x: 12, y: 14 }, beaconLocation: { x: 10, y: 16 } },
  { sensorLocation: { x: 10, y: 20 }, beaconLocation: { x: 10, y: 16 } },
  { sensorLocation: { x: 14, y: 17 }, beaconLocation: { x: 10, y: 16 } },
  { sensorLocation: { x: 8, y: 7 }, beaconLocation: { x: 2, y: 10 } },
  { sensorLocation: { x: 2, y: 0 }, beaconLocation: { x: 2, y: 10 } },
  { sensorLocation: { x: 0, y: 11 }, beaconLocation: { x: 2, y: 10 } },
  { sensorLocation: { x: 20, y: 14 }, beaconLocation: { x: 25, y: 17 } },
  { sensorLocation: { x: 17, y: 20 }, beaconLocation: { x: 21, y: 22 } },
  { sensorLocation: { x: 16, y: 7 }, beaconLocation: { x: 15, y: 3 } },
  { sensorLocation: { x: 14, y: 3 }, beaconLocation: { x: 15, y: 3 } },
  { sensorLocation: { x: 20, y: 1 }, beaconLocation: { x: 15, y: 3 } },
];

describe('nonBeaconXValuesAtYValue', () => {
  it('exists', () => {
    expect(nonBeaconXValuesAtYValue(testScan, 10).size).toBe(26);
  });
});
