import type { OctopiGrid } from '.';
import { runOctopiSimulation } from './runOctopiSimulation';

export function getOctopiFlashCount(
  startState: OctopiGrid,
  iterations: number,
) {
  let state = startState;

  let flashCount = 0;

  for (let i = 0; i < iterations; i++) {
    const [nextState, simulationIterationFlashes] = runOctopiSimulation(state);
    flashCount += simulationIterationFlashes;

    state = nextState;
  }

  return flashCount;
}
