import type { CavernSquare } from '.';

export function getDijkstraPathWeight(nodes: CavernSquare[][]) {
  const queue = [nodes[0][0]];
  function addNodeToQueue(node: CavernSquare) {
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
    const currentNode = queue.shift() ?? ({} as CavernSquare);

    nodes[currentNode.y][currentNode.x].visited = true;

    const adjacentNodePositions = [
      { x: currentNode.x - 1, y: currentNode.y },
      { x: currentNode.x + 1, y: currentNode.y },
      { x: currentNode.x, y: currentNode.y - 1 },
      { x: currentNode.x, y: currentNode.y + 1 },
    ];

    for (const { x, y } of adjacentNodePositions) {
      if (nodes[y]?.[x] === undefined || nodes[y]?.[x].visited === true) {
        continue;
      } else {
        const newWeight = currentNode.weight + nodes[y][x].value;

        if (newWeight < nodes[y][x].weight) {
          nodes[y][x].weight = newWeight;
          addNodeToQueue(nodes[y][x]);
        }
      }
    }
  }

  return nodes[nodes.length - 1][nodes[0].length - 1].weight;
}
