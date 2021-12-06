export function simulateFishPopulationGrowth(
  startingFish: number[],
  daysToSimulate: number,
) {
  let fishStates = Array<number>(9).fill(0);
  startingFish.forEach((fishState) => fishStates[fishState]++);

  for (let day = 0; day < daysToSimulate; day++) {
    const [reproducing, ...nextGeneration] = fishStates;

    nextGeneration[8] = reproducing;
    nextGeneration[6] += reproducing;

    fishStates = nextGeneration;
  }

  return fishStates;
}
