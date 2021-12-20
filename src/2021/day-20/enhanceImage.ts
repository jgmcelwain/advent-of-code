import { Image, EnhancementMap, Pixel } from '.';

export function enhanceImage(
  image: Image,
  enhancementMap: EnhancementMap,
  iterationNumber: number,
): Image {
  // enhancement maps that start with a '1' will cause the "border" of the
  // image, where new pixels have to be generated, to alternate between '1' and
  // '0'.
  const isAlternatingInfiniteMap = enhancementMap[0] === '1';
  const isOddIteration = iterationNumber % 2 === 1;
  const iterationDefault: Pixel =
    isAlternatingInfiniteMap && isOddIteration ? '1' : '0';

  const output: Image = [];

  for (let y = -1; y <= image.length; y++) {
    const outputRow: Pixel[] = [];

    for (let x = -1; x <= image.length; x++) {
      let enhancementMapIndex = '';

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          enhancementMapIndex += image[y + dy]?.[x + dx] ?? iterationDefault;
        }
      }

      const enhancedPixel = enhancementMap[parseInt(enhancementMapIndex, 2)];

      outputRow.push(enhancedPixel);
    }

    output.push(outputRow);
  }

  return output;
}
