import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { countActivePoints } from './countActivePoints';
import { executeRebootSteps } from './executeRebootSteps';
import { parseRebootSteps } from './parseRebootSteps';

export type AxisBounds = {
  min: number;
  max: number;
};
export type Cuboid = {
  x: AxisBounds;
  y: AxisBounds;
  z: AxisBounds;
};

export type RebootStep = {
  action: Action;
  bounds: Cuboid;
};
export enum Action {
  On = 'on',
  Off = 'off',
}

function partOne(rebootSteps: RebootStep[]) {
  const cuboidsInBounds = executeRebootSteps(rebootSteps);

  const activePointCount = countActivePoints(cuboidsInBounds, {
    x: { min: -50, max: 50 },
    y: { min: -50, max: 50 },
    z: { min: -50, max: 50 },
  });

  return activePointCount;
}

function partTwo(rebootSteps: RebootStep[]) {
  const cuboids = executeRebootSteps(rebootSteps);

  const activePointCount = countActivePoints(cuboids);

  return activePointCount;
}

async function main() {
  const input = await getInput(__dirname);
  const rebootSteps = parseRebootSteps(input);

  runDay(
    2021,
    22,
    'Reactor Reboot',
    () => partOne(rebootSteps),
    () => partTwo(rebootSteps),
    true,
  );
}

if (process.argv.includes('run')) {
  main();
}
