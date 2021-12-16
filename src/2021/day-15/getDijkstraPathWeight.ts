import type { CavernNode } from '.';

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

    const adjacentNodePositions = [
      { x: currentNode.x - 1, y: currentNode.y },
      { x: currentNode.x + 1, y: currentNode.y },
      { x: currentNode.x, y: currentNode.y - 1 },
      { x: currentNode.x, y: currentNode.y + 1 },
    ];

    for (const { x, y } of adjacentNodePositions) {
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
