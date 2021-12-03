import type { Box } from '.';

export function getRibbonLength(boxes: Box[]) {
  let ribbonAmount = 0;

  for (let i = 0; i < boxes.length; i++) {
    const [l, w, h] = boxes[i];
    const [smallest, middle] = [l, w, h].sort((a, b) => a - b);

    const perimeterRibbon = 2 * smallest + 2 * middle;
    const bowRibbon = l * w * h;

    ribbonAmount += perimeterRibbon;
    ribbonAmount += bowRibbon;
  }

  return ribbonAmount;
}
