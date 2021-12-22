import type { Cuboid, CuboidBounds } from '.';

export function countActivePoints(cuboids: Cuboid[], bounds?: CuboidBounds) {
  return cuboids
    .filter((cuboid) => cuboid.on)
    .filter((cuboid) => {
      if (bounds === undefined) return true;

      return (
        cuboid.x.min < bounds.x.max &&
        cuboid.x.max > bounds.x.min &&
        cuboid.y.min < bounds.y.max &&
        cuboid.y.max > bounds.y.min &&
        cuboid.z.min < bounds.z.max &&
        cuboid.z.max > bounds.z.min
      );
    })
    .reduce(
      (acc, curr) =>
        (acc +=
          (curr.x.max - curr.x.min) *
          (curr.y.max - curr.y.min) *
          (curr.z.max - curr.z.min)),
      0,
    );
}
