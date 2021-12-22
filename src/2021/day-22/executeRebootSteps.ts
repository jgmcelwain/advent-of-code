import type { Cuboid, RebootStep } from '.';
import { Action } from '.';

import { doCuboidsIntersect } from './doCuboidsIntersect';

export function executeRebootSteps(rebootSteps: RebootStep[]) {
  let cuboids: Cuboid[] = [];

  for (const step of rebootSteps) {
    const newCuboid: Cuboid = {
      x: { min: step.bounds.x.min, max: step.bounds.x.max },
      y: { min: step.bounds.y.min, max: step.bounds.y.max },
      z: { min: step.bounds.z.min, max: step.bounds.z.max },
      on: step.action === Action.On,
    };

    const cuboidsFromStep: Cuboid[] = [newCuboid];

    for (const existingCuboid of cuboids) {
      const intersects = doCuboidsIntersect(newCuboid, existingCuboid);

      // if our two cuboids don't intersect we can just add the new one to the
      // array
      if (!intersects) {
        cuboidsFromStep.push(existingCuboid);
      }

      // otherwise, we need to "shave off" any overlap between our cuboids. this
      // is achieved by creating a new cuboid, based on the existing one, that
      // is cut off when it reaches the boundary of our new cuboid. we need to
      // do this for all six faces
      else {
        if (existingCuboid.x.min < newCuboid.x.min) {
          cuboidsFromStep.push({
            x: { min: existingCuboid.x.min, max: newCuboid.x.min },
            y: { min: existingCuboid.y.min, max: existingCuboid.y.max },
            z: { min: existingCuboid.z.min, max: existingCuboid.z.max },
            on: existingCuboid.on,
          });

          existingCuboid.x.min = newCuboid.x.min;
        }

        if (existingCuboid.y.min < newCuboid.y.min) {
          cuboidsFromStep.push({
            x: { min: existingCuboid.x.min, max: existingCuboid.x.max },
            y: { min: existingCuboid.y.min, max: newCuboid.y.min },
            z: { min: existingCuboid.z.min, max: existingCuboid.z.max },
            on: existingCuboid.on,
          });

          existingCuboid.y.min = newCuboid.y.min;
        }

        if (existingCuboid.z.min < newCuboid.z.min) {
          cuboidsFromStep.push({
            x: { min: existingCuboid.x.min, max: existingCuboid.x.max },
            y: { min: existingCuboid.y.min, max: existingCuboid.y.max },
            z: { min: existingCuboid.z.min, max: newCuboid.z.min },
            on: existingCuboid.on,
          });

          existingCuboid.z.min = newCuboid.z.min;
        }

        if (existingCuboid.x.max > newCuboid.x.max) {
          cuboidsFromStep.push({
            x: { min: newCuboid.x.max, max: existingCuboid.x.max },
            y: { min: existingCuboid.y.min, max: existingCuboid.y.max },
            z: { min: existingCuboid.z.min, max: existingCuboid.z.max },
            on: existingCuboid.on,
          });

          existingCuboid.x.max = newCuboid.x.max;
        }

        if (existingCuboid.y.max > newCuboid.y.max) {
          cuboidsFromStep.push({
            x: { min: existingCuboid.x.min, max: existingCuboid.x.max },
            y: { min: newCuboid.y.max, max: existingCuboid.y.max },
            z: { min: existingCuboid.z.min, max: existingCuboid.z.max },
            on: existingCuboid.on,
          });

          existingCuboid.y.max = newCuboid.y.max;
        }

        if (existingCuboid.z.max > newCuboid.z.max) {
          cuboidsFromStep.push({
            x: { min: existingCuboid.x.min, max: existingCuboid.x.max },
            y: { min: existingCuboid.y.min, max: existingCuboid.y.max },
            z: { min: newCuboid.z.max, max: existingCuboid.z.max },
            on: existingCuboid.on,
          });

          existingCuboid.z.max = newCuboid.z.max;
        }
      }
    }

    cuboids = cuboidsFromStep;
  }

  return cuboids;
}
