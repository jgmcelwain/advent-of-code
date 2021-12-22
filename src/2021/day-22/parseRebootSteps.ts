import type { AxisBounds, RebootStep } from '.';
import { Action } from '.';

export function parseRebootSteps(input: string): RebootStep[] {
  return input.split('\n').map((step) => {
    const [action, bounds] = step.split(' ') as [Action, string];

    const [x, y, z] = bounds.split(',').map((bound): AxisBounds => {
      const values = bound.split('=')[1];
      const [min, max] = values.split('..').map((v) => Number(v));

      // bump max by 1 so > / < checks are a little simpler
      return { min, max: max + 1 };
    });

    return { action, bounds: { x, y, z } };
  });
}
