import type { Box } from '.';

export function getRibbonLength(boxes: Box[]) {
  let ribbonAmount = 0;

  for (const box of boxes) {
    const [l, w, h] = box;
    const [smallest, middle] = [l, w, h].sort((a, b) => a - b);

    if (smallest !== undefined && middle !== undefined) {
      const perimeterRibbon = 2 * smallest + 2 * middle;
      const bowRibbon = l * w * h;

      ribbonAmount += perimeterRibbon;
      ribbonAmount += bowRibbon;
    }
  }

  return ribbonAmount;
}
