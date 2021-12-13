import type { PathMap } from '.';

export function countPaths(
  pathMap: PathMap,
  canDoubleVisitOnce: boolean,
  position = 'start',
  currentPath: string[] = [],
): number {
  const isStart = position === 'start';
  const isEnd = position === 'end';

  if (isEnd) {
    return 1;
  } else {
    // lowercase caves can only be visited once - unless the special
    // "canDoubleVisitOnce" flag has been set
    const isSingleVisitCave = position === position.toLowerCase();
    const requiresDoubleVisit =
      isSingleVisitCave && currentPath.includes(position);

    if (requiresDoubleVisit) {
      // if we require a double visit and haven't used it let then let's cash it
      // in and prevent any future traversals on this path from using it
      if (canDoubleVisitOnce && !isStart) {
        canDoubleVisitOnce = false;
      }

      // if we don't have a double visit then we can't use this path and
      // should exclude it from our counts
      else {
        return 0;
      }
    }

    // recursively add all the possible paths starting from our current path
    // point
    let pathCounts = 0;
    for (let i = 0; i < pathMap[position].length; i++) {
      pathCounts += countPaths(
        pathMap,
        canDoubleVisitOnce,
        pathMap[position][i],
        currentPath.concat(position),
      );
    }

    return pathCounts;
  }
}
