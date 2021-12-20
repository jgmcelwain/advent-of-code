import type { EnhancementMap, Image } from '.';
import { countDisplayedPixels } from './countDisplayedPixels';
import { enhanceImage } from './enhanceImage';

const testEnhancementMap: EnhancementMap =
  '00101001111101010101110110000011101101001110111100111110010000100100110011100111111011100011110010011111001100101111100011010100101100101000000101110111111011101111000101101100100100111110000010100001110010110000001000001001001001100100011011111101111011110101000100000001001010100011110110100000010010001101011001000110101100111010000001010000000101010111101110110001000001111010010010110100001100101111000011000110010001000000101000000010000000110011110010001010100011001010011100111110000000010011110000001001'
    .split('')
    .map((c) => (c === '0' ? '0' : '1'));

const testImage: Image = [
  ['1', '0', '0', '1', '0'],
  ['1', '0', '0', '0', '0'],
  ['1', '1', '0', '0', '1'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '1', '1', '1'],
];

describe('enhanceImage', () => {
  it('enhances an image with a given enhancement map', () => {
    const enhancedOnce = enhanceImage(testImage, testEnhancementMap, 0);
    expect(enhancedOnce.flat().join('')).toBe(
      '0110110100101011010011111001010011000110010001010',
    );

    const enhancedTwice = enhanceImage(enhancedOnce, testEnhancementMap, 1);
    expect(enhancedTwice.flat().join('')).toBe(
      '000000010010010100101000111100011010100000101010111110001011111000110110000011100',
    );
  });
});

describe('countDisplayedPixels', () => {
  it.each([
    { iterations: 2, outputPixelCount: 35 },
    { iterations: 50, outputPixelCount: 3351 },
  ])(
    'counts the number of pixels in an image that are "on" ($iterations iterations)',
    ({ iterations, outputPixelCount }) => {
      let image = testImage;

      for (let i = 0; i < iterations; i++) {
        image = enhanceImage(image, testEnhancementMap, i);
      }

      expect(countDisplayedPixels(image)).toBe(outputPixelCount);
    },
  );
});
