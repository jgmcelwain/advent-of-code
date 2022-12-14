import type { CavernBounds, CoordinateKey } from './index';

export function particlesUntilOneReachesEntryPoint(
  wallPoints: Set<CoordinateKey>,
  bounds: CavernBounds,
  entryX: number,
  entryY: number,
) {
  const sandPoints = new Set<CoordinateKey>();

  sandGenerationLoop: while (true) {
    const sandParticle = { x: entryX, y: entryY };

    sandFallLoop: while (true) {
      // If the particle is not at the bottom of the map, try to move it down
      if (sandParticle.y < bounds.y.max + 1) {
        const newY = sandParticle.y + 1;

        for (const dx of [0, -1, 1]) {
          const newX = sandParticle.x + dx;

          // if the particle's new position is not a wall or sand, move it there
          // and continue falling
          if (
            wallPoints.has(`${newX},${newY}`) === false &&
            sandPoints.has(`${newX},${newY}`) === false
          ) {
            sandParticle.x = newX;
            sandParticle.y = newY;

            continue sandFallLoop;
          }
        }
      }

      // the particle can no longe fall, add it to the sandPoints so that it can
      // influence further generations of particles
      sandPoints.add(`${sandParticle.x},${sandParticle.y}`);

      // if this particle's final position is equal to our new particle entry
      // point then we have found our answer
      if (sandParticle.x === entryX && sandParticle.y === entryY) {
        return sandPoints.size;
      }

      continue sandGenerationLoop;
    }
  }
}
