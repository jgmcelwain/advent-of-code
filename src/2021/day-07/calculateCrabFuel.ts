export function calculateCrabFuel(
  crabPositions: number[],
  exponentialFuel = false,
): [minFuel: number, alignAtIndex: number] {
  const fuelCosts = crabPositions.map((_, i) =>
    crabPositions.reduce((acc, curr) => {
      let diff = Math.abs(curr - i);

      if (!exponentialFuel) {
        return acc + diff;
      } else {
        while (diff > 0) {
          acc += diff;
          diff--;
        }

        return acc;
      }
    }, 0),
  );

  const minFuel = Math.min(...fuelCosts);

  return [minFuel, fuelCosts.indexOf(minFuel)];
}
