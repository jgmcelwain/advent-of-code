import type { FS } from './buildFileSystem';

import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { sumArray } from '@/lib/sumArray';
import { buildFileSystem } from './buildFileSystem';
import { getDirSize, getAllDirSizes } from './dirSizes';

function partOne(fileSystem: FS) {
  const dirSizes = getAllDirSizes(fileSystem);

  return sumArray(dirSizes.filter((value) => value <= 100000));
}

function partTwo(fileSystem: FS) {
  const dirSizes = getAllDirSizes(fileSystem);

  const TOTAL_SPACE = 70000000;
  const REQUIRED_SPACE = 30000000;
  const USED_SPACE = getDirSize(fileSystem);
  const TO_FREE_UP = REQUIRED_SPACE - (TOTAL_SPACE - USED_SPACE);

  return dirSizes
    .filter((value) => value > TO_FREE_UP)
    .sort((a, b) => a - b)
    .shift();
}

async function main() {
  const input = await getInput(__dirname);

  const fileSystem = buildFileSystem(input);

  void runDay(
    2022,
    7,
    'No Space Left On Device',
    () => partOne(fileSystem),
    () => partTwo(fileSystem),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
