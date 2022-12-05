import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';

function fuelForModule(mass: number, freeFuel = false): number {
  const fuel = Math.floor(mass / 3) - 2;

  return freeFuel || fuel <= 7 ? fuel : fuel + fuelForModule(fuel);
}

function partOne(rocketModules: number[]) {
  const result = rocketModules.reduce(
    (acc, moduleMass) => acc + fuelForModule(moduleMass, true),
    0,
  );

  return result;
}

function partTwo(rocketModules: number[]) {
  const result = rocketModules.reduce(
    (acc, moduleMass) => acc + fuelForModule(moduleMass),
    0,
  );

  return result;
}

async function main() {
  const input = await getInput(__dirname);
  const rocketModules = input.split('\n').map((n) => Number(n));

  void runDay(
    2019,
    1,
    '',
    () => partOne(rocketModules),
    () => partTwo(rocketModules),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
