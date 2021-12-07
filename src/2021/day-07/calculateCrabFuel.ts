export function calculateCrabFuel(
  crabPositions: number[],
  exponentialFuel = false,
): [minFuel: number, alignAtIndex: number] {
  const minCrab = Math.min(...crabPositions);
  const maxCrab = Math.max(...crabPositions);

  const fuelCosts = [];

  for (let target = minCrab; target <= maxCrab; target++) {
    fuelCosts[target] = crabPositions.reduce((acc, pos) => {
      const diff = Math.abs(pos - target);

      return acc + (exponentialFuel ? (diff * (diff + 1)) / 2 : diff);
    }, 0);
  }

  const minFuel = Math.min(...fuelCosts);

  return [minFuel, fuelCosts.indexOf(minFuel)];
}
