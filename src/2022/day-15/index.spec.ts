import type { ScanResult } from '.';

import { getManhattanDistance } from './getManhattanDistance';
import { nonBeaconXValuesAtYValue } from './nonBeaconXValuesAtYValue';
import { findDistressBeacon } from './findDistressBeacon';

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
].map(({ sensorLocation, beaconLocation }) => ({
  sensorLocation,
  beaconLocation,
  distanceFromSensorToBeacon: getManhattanDistance(
    sensorLocation.x,
    sensorLocation.y,
    beaconLocation.x,
    beaconLocation.y,
  ),
}));

describe('getManhattanDistance', () => {
  it('calculates the manhattan distance between two points', () => {
    expect(getManhattanDistance(0, 0, 10, 10)).toBe(20);
    expect(getManhattanDistance(2, 18, -2, 15)).toBe(7);
    expect(getManhattanDistance(-1, 5, 1, 6)).toBe(3);
  });
});

describe('nonBeaconXValuesAtYValue', () => {
  it('finds the number of x values at a given y level that cannot contain a beacon', () => {
    expect(nonBeaconXValuesAtYValue(testScan, 10).size).toBe(26);
  });
});

describe('findDistressBeacon', () => {
  it('finds the location of a distress beacon, given the constraint x and y values', () => {
    const location = findDistressBeacon(testScan, 0, 0, 20, 20);

    expect(location.x).toBe(14);
    expect(location.y).toBe(11);
  });
});
