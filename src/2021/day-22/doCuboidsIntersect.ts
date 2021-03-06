import { Cuboid } from '.';

export function doCuboidsIntersect(a: Cuboid, b: Cuboid) {
  return (
    a.x.max > b.x.min &&
    a.y.max > b.y.min &&
    a.z.max > b.z.min &&
    a.x.min < b.x.max &&
    a.y.min < b.y.max &&
    a.z.min < b.z.max
  );
}
