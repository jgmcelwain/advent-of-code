import { getInput } from '@/lib/getInput';

enum Entity {
  Tree = '#',
  Blank = '.',
}

type TreeMap = Entity[][];

function getTreeEncounters(treeMap: TreeMap, vx: number, vy: number) {
  let encounters = 0;
  let px = 0;
  let py = 0;

  while (py < treeMap.length - 1) {
    px += vx;
    py += vy;

    const nx = px % treeMap[py].length;

    if (treeMap[py][nx] === Entity.Tree) {
      encounters++;
    }
  }

  return encounters;
}

function partOne(treeMap: TreeMap) {
  const result = getTreeEncounters(treeMap, 3, 1);

  console.log('Part One: ', result);
}

function partTwo(treeMap: TreeMap) {
  const velocities: [vx: number, vy: number][] = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  const result = velocities.reduce(
    (acc, [vx, vy]) => (acc *= getTreeEncounters(treeMap, vx, vy)),
    1,
  );

  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);
  const treeMap = input.split('\n').map((row) => row.split('') as Entity[]);

  console.log('AoC 2020 - Day 03: Toboggan Trajectory');
  partOne(treeMap);
  partTwo(treeMap);
}

if (process.argv.includes('run')) {
  void main();
}
