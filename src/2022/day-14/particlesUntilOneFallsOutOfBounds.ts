import type { CavernBounds, CoordinateKey } from './index';

export function particlesUntilOneFallsOutOfBounds(
  wallPoints: Set<CoordinateKey>,
  bounds: CavernBounds,
  entryX: number,
  entryY: number,
) {
  const sandPoints = new Set<CoordinateKey>();

  sandGenerationLoop: while (true) {
    const sandParticle = { x: entryX, y: entryY };

    sandFallLoop: while (true) {
      const newY = sandParticle.y + 1;

      for (const dx of [0, -1, 1]) {
        const newX = sandParticle.x + dx;

        // if the particle's new position is outside of the bounds we have set
        // then we have found our answer
        if (newX < bounds.x.min || newX > bounds.x.max || newY > bounds.y.max) {
          return sandPoints.size;
        }

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

      // the particle can no longe fall, add it to the sandPoints so that it can
      // influence further generations of particles
      sandPoints.add(`${sandParticle.x},${sandParticle.y}`);

      continue sandGenerationLoop;
    }
  }
}
