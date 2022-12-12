import type { MatrixNode } from '.';

const neighborMutations: [dy: number, dx: number][] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function getNodeNeighbors(node: MatrixNode, matrix: MatrixNode[][]) {
  return neighborMutations.map(
    ([dy, dx]) => matrix[node.y + dy]?.[node.x + dx],
  );
}

export function findShortestPath(
  matrix: MatrixNode[][],
  startNode: MatrixNode,
  endNode: MatrixNode,
) {
  const queue: { node: MatrixNode; steps: number }[] = [
    { node: startNode, steps: 0 },
  ];
  const visitedNodes = new Set<MatrixNode['key']>(startNode.key);

  while (queue.length > 0) {
    const shifted = queue.shift();

    // this should never happen but :shrug: let's keep the ts compiler happy
    if (shifted === undefined) throw new Error();

    const { node: currentNode, steps } = shifted;

    if (currentNode.key === endNode.key) {
      return steps;
    }

    const nodeNeighbors = getNodeNeighbors(currentNode, matrix);

    for (const neighbor of nodeNeighbors) {
      if (neighbor == undefined || visitedNodes.has(neighbor.key)) {
        continue;
      }

      if (neighbor.height - currentNode.height <= 1) {
        queue.push({ node: neighbor, steps: steps + 1 });
        visitedNodes.add(neighbor.key);
      }
    }
  }

  return null;
}
