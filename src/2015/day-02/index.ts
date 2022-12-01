import { getInput } from '@/lib/getInput';

import { getPaperAmount } from './getPaperAmount';
import { getRibbonLength } from './getRibbonLength';

export type Box = [l: number, w: number, h: number];

function partOne(boxes: Box[]) {
  const result = getPaperAmount(boxes);
  console.log('Part One: ', result);
}

function partTwo(boxes: Box[]) {
  const result = getRibbonLength(boxes);
  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);
  const boxes = input
    .split('\n')
    .map(
      (box): Box =>
        box.split('x').map((n) => Number(n)) as [number, number, number],
    );

  console.log('AoC 2015 - Day 02: I Was Told There Would Be No Math');
  partOne(boxes);
  partTwo(boxes);
}

if (process.argv.includes('run')) {
  void main();
}
