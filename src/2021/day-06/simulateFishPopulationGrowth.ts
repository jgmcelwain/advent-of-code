export function simulateFishPopulationGrowth(
  startingFish: number[],
  daysToSimulate: number,
) {
  let fishStates: number[] = Array(9).fill(0);
  for (let i = 0; i < startingFish.length; i++) {
    fishStates[startingFish[i]]++;
  }

  for (let day = 0; day < daysToSimulate; day++) {
    const [reproducing, ...nextGeneration] = fishStates;

    nextGeneration[8] = reproducing;
    nextGeneration[6] += reproducing;

    fishStates = nextGeneration;
  }

  return fishStates;
}
