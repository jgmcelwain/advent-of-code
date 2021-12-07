export function calculateCrabFuel(
  crabPositions: number[],
  exponentialFuel = false,
): [minFuel: number, alignAtIndex: number] {
  const minCrab = Math.min(...crabPositions);
  const maxCrab = Math.max(...crabPositions);

  const fuelCosts = [];

  for (let i = minCrab; i <= maxCrab; i++) {
    fuelCosts[i] = 0;

    for (let j = 0; j < crabPositions.length; j++) {
      const diff = Math.abs(crabPositions[j] - i);

      if (exponentialFuel) {
        for (let k = 1; k <= diff; k++) {
          fuelCosts[i] += k;
        }
      } else {
        fuelCosts[i] += diff;
      }
    }
  }

  const minFuel = Math.min(...fuelCosts);

  return [minFuel, fuelCosts.indexOf(minFuel)];
}
