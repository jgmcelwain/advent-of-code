import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { countPaths } from './countPaths';

export type PathMap = Record<string, string[]>;

function partOne(pathMap: PathMap) {
  return countPaths(pathMap, false);
}

function partTwo(pathMap: PathMap) {
  return countPaths(pathMap, true);
}

async function main() {
  const input = await getInput(__dirname);
  const pathMap: PathMap = {};
  input.split('\n').forEach((path) => {
    const [pathStart, pathEnd] = path.split('-');

    if (pathMap[pathStart] === undefined) {
      pathMap[pathStart] = [pathEnd];
    } else {
      pathMap[pathStart].push(pathEnd);
    }

    if (pathMap[pathEnd] === undefined) {
      pathMap[pathEnd] = [pathStart];
    } else {
      pathMap[pathEnd].push(pathStart);
    }
  });

  void runDay(
    2021,
    12,
    'Passage Pathing',
    () => partOne(pathMap),
    () => partTwo(pathMap),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
