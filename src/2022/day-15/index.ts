import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { z } from 'zod';
import { nonBeaconXValuesAtYValue } from './nonBeaconXValuesAtYValue';

const scanResultSchema = z.object({
  sensorLocation: z.object({ x: z.number(), y: z.number() }),
  beaconLocation: z.object({ x: z.number(), y: z.number() }),
  distanceFromSensorToBeacon: z.number(),
});
export type ScanResult = z.infer<typeof scanResultSchema>;

function partOne(scanResults: ScanResult[]) {
  const result = nonBeaconXValuesAtYValue(scanResults, 2_000_000);

  return result.size;
}

function partTwo(scanResults: ScanResult[]) {
  return null;
}

async function main() {
  const input = await getInput(__dirname);

  const scanResults = z.array(scanResultSchema).parse(
    input.split('\n').map((line) => {
      const [sensor, beacon] = z
        .tuple([
          z.tuple([z.number(), z.number()]),
          z.tuple([z.number(), z.number()]),
        ])
        .parse(
          line
            .replace(/[^,-:0-9]/g, '')
            .split(':')
            .map((coords) => coords.split(',').map(Number)),
        );

      const sensorLocation = { x: sensor[0], y: sensor[1] };
      const beaconLocation = { x: beacon[0], y: beacon[1] };
      const distanceFromSensorToBeacon =
        Math.abs(sensorLocation.x - beaconLocation.x) +
        Math.abs(sensorLocation.y - beaconLocation.y);

      return {
        sensorLocation,
        beaconLocation,
        distanceFromSensorToBeacon,
      };
    }),
  );

  void runDay(
    2022,
    15,
    'Beacon Exclusion Zone',
    () => partOne(scanResults),
    () => partTwo(scanResults),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
