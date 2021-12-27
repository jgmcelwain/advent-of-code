import type { CavernNode } from '.';

export function buildCavern(
  matrix: number[][],
  xInstances: number,
  yInstances: number,
) {
  const cavern: CavernNode[][] = [];

  for (let yc = 0; yc < yInstances; yc++) {
    cavern.push(
      ...matrix.map((row, y) => {
        const cavernRow: CavernNode[] = [];

        for (let xc = 0; xc < xInstances; xc++) {
          cavernRow.push(
            ...row.map((v, x) => {
              let value = v + yc + xc;
              if (value > 9) value -= 9;

              return {
                x: xc * matrix[0].length + x,
                y: yc * matrix.length + y,
                value,
                weight: Infinity,
                visited: false,
              };
            }),
          );
        }

        return cavernRow;
      }),
    );
  }

  cavern[0][0].weight = 0;

  return cavern;
}
