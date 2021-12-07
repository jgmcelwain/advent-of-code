export function calculateCrabFuel(
  crabPositions: number[],
  exponentialFuel = false,
): [minFuel: number, alignAtIndex: number] {
  const minCrab = Math.min(...crabPositions);
  const maxCrab = Math.max(...crabPositions);

  const fuelCosts = [];

  for (let target = minCrab; target <= maxCrab; target++) {
    fuelCosts[target] = crabPositions.reduce((acc, pos) => {
      let diff = Math.abs(pos - target);

      if (!exponentialFuel) {
        return acc + diff;
      } else {
        while (diff > 0) {
          acc += diff;
          diff--;
        }

        return acc;
      }
    }, 0);
  }

  const minFuel = Math.min(...fuelCosts);

  return [minFuel, fuelCosts.indexOf(minFuel)];
}
