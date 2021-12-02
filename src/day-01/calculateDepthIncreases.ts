export function calculateDepthIncreases(depthReport: number[]): number | null {
  try {
    let depthIncreases = 0;
    for (let i = 0; i < depthReport.length; i++) {
      if (depthReport[i] > depthReport[i - 1]) {
        depthIncreases++;
      }
    }

    return depthIncreases;
  } catch (err) {
    console.error(err);

    return null;
  }
}
