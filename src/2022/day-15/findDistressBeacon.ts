import { getManhattanDistance } from './getManhattanDistance';
import { ScanResult } from './index';

export function findDistressBeacon(
  scanResults: ScanResult[],
  minX: number,
  minY: number,
  maxX: number,
  maxY: number,
) {
  const currentPoint = { x: minX, y: minY };

  while (true) {
    if (currentPoint.x > maxX && currentPoint.y > maxY) {
      throw new Error('No beacon found.');
    }

    // find a sensor that scans the current x & y
    const sensor = scanResults.find(
      ({ sensorLocation, distanceFromSensorToBeacon }) =>
        distanceFromSensorToBeacon >=
        getManhattanDistance(
          sensorLocation.x,
          sensorLocation.y,
          currentPoint.x,
          currentPoint.y,
        ),
    );

    // a sensor was found - we need to find out how much more of this row it can
    // see and move past that
    if (sensor !== undefined) {
      const { sensorLocation, distanceFromSensorToBeacon } = sensor;

      const distanceFromSensorToPoint = getManhattanDistance(
        sensorLocation.x,
        sensorLocation.y,
        currentPoint.x,
        currentPoint.y,
      );

      // set our current x just past the point that the sensor can see to
      currentPoint.x +=
        distanceFromSensorToBeacon - distanceFromSensorToPoint + 1;

      // if this pushes us out of bounds then the x value should be reset to
      // minX and we can start scanning the next y value instead
      if (currentPoint.x > maxX) {
        currentPoint.x = minX;
        currentPoint.y++;
      }
    }

    // no sensor that could detect this point was found, so it must be the
    // distress beacon
    else {
      return currentPoint;
    }
  }

  throw new Error('No result found');
}
