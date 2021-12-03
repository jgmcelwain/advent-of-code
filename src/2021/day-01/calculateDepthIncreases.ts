import type { DepthReport } from '.';

export function calculateDepthIncreases(depthReport: DepthReport): number {
  let depthIncreases = 0;

  for (let i = 0; i < depthReport.length; i++) {
    if (depthReport[i] > depthReport[i - 1]) {
      depthIncreases++;
    }
  }

  return depthIncreases;
}
