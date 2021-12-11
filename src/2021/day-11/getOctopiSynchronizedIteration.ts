import type { OctopiGrid } from '.';
import { runOctopiSimulation } from './runOctopiSimulation';

export function getOctopiSynchronizedIteration(startState: OctopiGrid): number {
  let state = startState;

  let currentIteration = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    currentIteration++;

    const [nextState] = runOctopiSimulation(state);

    if (nextState.flat().every((octopus) => octopus === 0)) {
      return currentIteration;
    }

    state = nextState;
  }
}
