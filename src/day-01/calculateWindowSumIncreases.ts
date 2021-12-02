import type { DepthReport } from '.';
import { calculateDepthIncreases } from './calculateDepthIncreases';

export function calculateWindowSumIncreases(depthReport: DepthReport): number {
  const windowSums: number[] = [];

  for (let i = 0; i < depthReport.length - 2; i++) {
    windowSums.push(depthReport[i] + depthReport[i + 1] + depthReport[i + 2]);
  }

  return calculateDepthIncreases(windowSums);
}
