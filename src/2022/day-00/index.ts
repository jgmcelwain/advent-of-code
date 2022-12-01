import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';

function partOne() {
  return null;
}

function partTwo() {
  return null;
}

async function main() {
  const input = await getInput(__dirname);

  void runDay(
    0,
    0,
    '',
    () => partOne(),
    () => partTwo(),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
