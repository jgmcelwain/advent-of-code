import type { Box } from '.';

export function getPaperAmount(boxes: Box[]) {
  let paperAmount = 0;

  for (const box of boxes) {
    const [l, w, h] = box;
    const boxSides = [l * w, l * h, w * h];

    for (const boxSide of boxSides) {
      paperAmount += boxSide * 2;
    }

    paperAmount += Math.min(...boxSides);
  }

  return paperAmount;
}
