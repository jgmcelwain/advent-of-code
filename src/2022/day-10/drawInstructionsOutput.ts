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
      const cursorX = Math.floor(i % DISPLAY_WIDTH);
      const cursorY = Math.floor(i / DISPLAY_WIDTH);

      // if the cursor is within one pixel of x, the center of the sprite, then
      // we should fill in the cursor's position on the display.
      if (Math.abs(cursorX - x) <= 1) {
        const displayRow = display[cursorY];

        if (displayRow !== undefined) {
          displayRow[cursorX] = PIXEL_FILLED;
        }
      }
    },
  );

  return '\n' + display.map((row) => row.join('')).join('\n');
}
