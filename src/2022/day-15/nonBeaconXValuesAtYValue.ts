import type { ScanResult } from '.';

type XRange = [start: number, end: number];

export function nonBeaconXValuesAtYValue(
  scanResults: ScanResult[],
  targetYValue: number,
) {
  const ranges: XRange[] = [];

  for (const { sensorLocation, distanceFromSensorToBeacon } of scanResults) {
    const distanceFromSensorToTargetY = Math.abs(
      sensorLocation.y - targetYValue,
    );

    // if the beacon is further from the sensor than the target y value then
    // there cannot be a beacon at the target y value for any x value that
    // the sensor would scan
    if (distanceFromSensorToBeacon > distanceFromSensorToTargetY) {
      // x and y scan ranges are the same so we can use the difference to find
      // the x scan range that is "remaining" at this y value
      const scanRadiusAtYValue =
        distanceFromSensorToBeacon - distanceFromSensorToTargetY;

      ranges.push([
        sensorLocation.x - scanRadiusAtYValue,
        sensorLocation.x + scanRadiusAtYValue,
      ]);
    }
  }

  const xValuesThatAreNotBeacons = new Set<number>();
  for (const [start, end] of ranges) {
    for (let x = start; x < end + 1; x++) {
      xValuesThatAreNotBeacons.add(x);
    }
  }

  for (const { beaconLocation } of scanResults) {
    if (beaconLocation.y === targetYValue) {
      xValuesThatAreNotBeacons.delete(beaconLocation.x);
    }
  }

  return xValuesThatAreNotBeacons;
}
