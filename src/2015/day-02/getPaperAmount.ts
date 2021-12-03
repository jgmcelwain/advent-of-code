import type { Box } from '.';

export function getPaperAmount(boxes: Box[]) {
  let paperAmount = 0;

  for (let i = 0; i < boxes.length; i++) {
    const [l, w, h] = boxes[i];
    const boxSides = [l * w, l * h, w * h];

    for (let j = 0; j < boxSides.length; j++) {
      paperAmount += boxSides[j] * 2;
    }

    paperAmount += Math.min(...boxSides);
  }

  return paperAmount;
}
