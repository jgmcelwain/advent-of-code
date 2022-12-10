import type { CPUInstruction } from './cpu';

import { executeCPUInstructions } from './cpu';

const DISPLAY_HEIGHT = 6;
const DISPLAY_WIDTH = 40;

const PIXEL_BLANK = ' ';
const PIXEL_FILLED = '█';

export function drawInstructionsOutput(instructions: CPUInstruction[]) {
  const display = Array.from({ length: DISPLAY_HEIGHT }).map(() =>
    Array.from({ length: DISPLAY_WIDTH }).fill(PIXEL_BLANK),
  );

  executeCPUInstructions(
    instructions,
    DISPLAY_HEIGHT * DISPLAY_WIDTH,
    (i, x) => {
      const spriteX = Math.floor(i % DISPLAY_WIDTH);
      const spriteY = Math.floor(i / DISPLAY_WIDTH);

      // if x is within one pixel of the center of the sprite we should fill the
      // center pixel in on the display
      if (Math.abs(spriteX - x) <= 1) {
        const displayRow = display[spriteY];

        if (displayRow !== undefined) {
          displayRow[spriteX] = PIXEL_FILLED;
        }
      }
    },
  );

  return '\n' + display.map((row) => row.join('')).join('\n');
}
