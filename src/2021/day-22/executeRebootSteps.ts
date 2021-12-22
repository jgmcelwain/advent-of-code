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

    for (const cuboid of cuboids) {
      const intersects = doCuboidsIntersect(newCuboid, cuboid);

      // if our two cuboids don't intersect we can just add the new one to the
      // array
      if (!intersects) {
        cuboidsFromStep.push(cuboid);
      }

      // otherwise, we need to "shave off" any overlap between our cuboids. this
      // is achieved by creating a new cuboid, based on the existing one, that
      // is cut off when it reaches the boundary of our new cuboid. we need to
      // do this for all six faces
      else {
        if (cuboid.x.min < newCuboid.x.min) {
          cuboidsFromStep.push({
            x: { min: cuboid.x.min, max: newCuboid.x.min },
            y: { min: cuboid.y.min, max: cuboid.y.max },
            z: { min: cuboid.z.min, max: cuboid.z.max },
            on: cuboid.on,
          });

          cuboid.x.min = newCuboid.x.min;
        }

        if (cuboid.y.min < newCuboid.y.min) {
          cuboidsFromStep.push({
            x: { min: cuboid.x.min, max: cuboid.x.max },
            y: { min: cuboid.y.min, max: newCuboid.y.min },
            z: { min: cuboid.z.min, max: cuboid.z.max },
            on: cuboid.on,
          });

          cuboid.y.min = newCuboid.y.min;
        }

        if (cuboid.z.min < newCuboid.z.min) {
          cuboidsFromStep.push({
            x: { min: cuboid.x.min, max: cuboid.x.max },
            y: { min: cuboid.y.min, max: cuboid.y.max },
            z: { min: cuboid.z.min, max: newCuboid.z.min },
            on: cuboid.on,
          });

          cuboid.z.min = newCuboid.z.min;
        }

        if (cuboid.x.max > newCuboid.x.max) {
          cuboidsFromStep.push({
            x: { min: newCuboid.x.max, max: cuboid.x.max },
            y: { min: cuboid.y.min, max: cuboid.y.max },
            z: { min: cuboid.z.min, max: cuboid.z.max },
            on: cuboid.on,
          });

          cuboid.x.max = newCuboid.x.max;
        }

        if (cuboid.y.max > newCuboid.y.max) {
          cuboidsFromStep.push({
            x: { min: cuboid.x.min, max: cuboid.x.max },
            y: { min: newCuboid.y.max, max: cuboid.y.max },
            z: { min: cuboid.z.min, max: cuboid.z.max },
            on: cuboid.on,
          });

          cuboid.y.max = newCuboid.y.max;
        }

        if (cuboid.z.max > newCuboid.z.max) {
          cuboidsFromStep.push({
            x: { min: cuboid.x.min, max: cuboid.x.max },
            y: { min: cuboid.y.min, max: cuboid.y.max },
            z: { min: newCuboid.z.max, max: cuboid.z.max },
            on: cuboid.on,
          });

          cuboid.z.max = newCuboid.z.max;
        }
      }
    }

    cuboids = cuboidsFromStep;
  }

  return cuboids;
}
