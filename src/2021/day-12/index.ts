import { getInput } from '../../../lib/getInput';
import { countPaths } from './countPaths';

export type PathMap = Record<string, string[]>;

function partOne(pathMap: PathMap) {
  const result = countPaths(pathMap, false);

  console.log('Part One: ', result);
}

function partTwo(pathMap: PathMap) {
  const result = countPaths(pathMap, true);

  console.log('Part Two: ', result);
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

  console.log('AoC 2021 - Day 12: Passage Pathing');
  partOne(pathMap);
  partTwo(pathMap);
}

if (process.argv.includes('run')) {
  main();
}
