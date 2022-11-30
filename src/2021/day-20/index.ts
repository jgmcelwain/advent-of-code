import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { countDisplayedPixels } from './countDisplayedPixels';
import { enhanceImage } from './enhanceImage';

export type Pixel = '1' | '0';
export type Image = Pixel[][];
export type EnhancementMap = Pixel[];

function partOne(image: Image, enhancementMap: EnhancementMap) {
  let currentImage = image;

  for (let i = 0; i < 2; i++) {
    currentImage = enhanceImage(currentImage, enhancementMap, i);
  }

  return countDisplayedPixels(currentImage);
}

function partTwo(image: Image, enhancementMap: EnhancementMap) {
  let currentImage = image;

  for (let i = 0; i < 50; i++) {
    currentImage = enhanceImage(currentImage, enhancementMap, i);
  }

  return countDisplayedPixels(currentImage);
}

async function main() {
  const input = (await getInput(__dirname)).split('\n\n');
  const enhancementMap = input[0]
    .split('')
    .map((char) => (char === '#' ? '1' : '0'));
  const image = input[1]
    .split('\n')
    .map((row) => row.split('').map((pixel) => (pixel === '#' ? '1' : '0')));

  void runDay(
    2021,
    20,
    'Trench Map',
    () => partOne(image, enhancementMap),
    () => partTwo(image, enhancementMap),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
