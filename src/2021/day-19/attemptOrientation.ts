import type { Beacon, PlacedScanner, Position } from './index';

export const mutations: ((position: Position) => Position)[] = [
  ({ x, y, z }) => ({ x: x, y: y, z: z }),
  ({ x, y, z }) => ({ x: x, y: -y, z: -z }),
  ({ x, y, z }) => ({ x: -x, y: y, z: -z }),
  ({ x, y, z }) => ({ x: -x, y: -y, z: z }),
  ({ x, y, z }) => ({ x: y, y: z, z: x }),
  ({ x, y, z }) => ({ x: y, y: -z, z: -x }),
  ({ x, y, z }) => ({ x: -y, y: z, z: -x }),
  ({ x, y, z }) => ({ x: -y, y: -z, z: x }),
  ({ x, y, z }) => ({ x: z, y: x, z: y }),
  ({ x, y, z }) => ({ x: z, y: -x, z: -y }),
  ({ x, y, z }) => ({ x: -z, y: x, z: -y }),
  ({ x, y, z }) => ({ x: -z, y: -x, z: y }),
  ({ x, y, z }) => ({ x: x, y: z, z: -y }),
  ({ x, y, z }) => ({ x: x, y: -z, z: y }),
  ({ x, y, z }) => ({ x: -x, y: z, z: y }),
  ({ x, y, z }) => ({ x: -x, y: -z, z: -y }),
  ({ x, y, z }) => ({ x: y, y: x, z: -z }),
  ({ x, y, z }) => ({ x: y, y: -x, z: z }),
  ({ x, y, z }) => ({ x: -y, y: x, z: z }),
  ({ x, y, z }) => ({ x: -y, y: -x, z: -z }),
  ({ x, y, z }) => ({ x: z, y: y, z: -x }),
  ({ x, y, z }) => ({ x: z, y: -y, z: x }),
  ({ x, y, z }) => ({ x: -z, y: y, z: x }),
  ({ x, y, z }) => ({ x: -z, y: -y, z: -x }),
];

export function attemptOrientation(
  beacons: Beacon[],
  orientTo: PlacedScanner,
): [position: Position | null, beacons: Beacon[] | null] {
  for (let k = 0; k < mutations.length; k++) {
    const mutatedBeacons = beacons.map((beacon) => mutations[k](beacon));

    const beaconPairDistances: Record<string, number> = {};

    for (let l = 0; l < orientTo.beacons.length; l++) {
      for (let m = 0; m < mutatedBeacons.length; m++) {
        const dx = orientTo.beacons[l].x - mutatedBeacons[m].x;
        const dy = orientTo.beacons[l].y - mutatedBeacons[m].y;
        const dz = orientTo.beacons[l].z - mutatedBeacons[m].z;

        const beaconPairDistanceKey = `${dx} ${dy} ${dz}`;

        if (beaconPairDistances[beaconPairDistanceKey] === undefined) {
          beaconPairDistances[beaconPairDistanceKey] = 0;
        }

        beaconPairDistances[beaconPairDistanceKey]++;

        if (beaconPairDistances[beaconPairDistanceKey] >= 12) {
          return [
            {
              x: orientTo.position.x + dx,
              y: orientTo.position.y + dy,
              z: orientTo.position.z + dz,
            },
            mutatedBeacons,
          ];
        }
      }
    }
  }

  return [null, null];
}
