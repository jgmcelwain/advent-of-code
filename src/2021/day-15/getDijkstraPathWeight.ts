import type { CavernNode } from '.';

const neighborMutations = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export function getDijkstraPathWeight(cavern: CavernNode[][]) {
  const queue = [cavern[0][0]];
  function addNodeToQueue(node: CavernNode) {
    const insertIndex = queue.findIndex(
      (queuedNode) => queuedNode.weight > node.weight,
    );

    if (insertIndex === -1) {
      queue.push(node);
    } else {
      queue.splice(insertIndex, 0, node);
    }
  }

  while (queue.length > 0) {
    const currentNode = queue.shift() ?? ({} as CavernNode);

    cavern[currentNode.y][currentNode.x].visited = true;

    const neighborNodePositions = neighborMutations.map(([x, y]) => ({
      x: currentNode.x + x,
      y: currentNode.y + y,
    }));

    for (const { x, y } of neighborNodePositions) {
      if (cavern[y]?.[x] === undefined || cavern[y]?.[x].visited === true) {
        continue;
      } else {
        const newWeight = currentNode.weight + cavern[y][x].value;

        if (newWeight < cavern[y][x].weight) {
          cavern[y][x].weight = newWeight;
          addNodeToQueue(cavern[y][x]);
        }
      }
    }
  }

  return cavern[cavern.length - 1][cavern[0].length - 1].weight;
}
