import type { Image } from '.';

export function countDisplayedPixels(image: Image): number {
  return image.flat().filter((pixel) => pixel === '1').length;
}
