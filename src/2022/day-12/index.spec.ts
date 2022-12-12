import type { MatrixNode } from '.';
import { findShortestPath } from './findShortestPath';

const testMatrix: MatrixNode[][] = [
  [
    { key: '0,0', raw: 'S', x: 0, y: 0, height: 1 },
    { key: '1,0', raw: 'a', x: 1, y: 0, height: 1 },
    { key: '2,0', raw: 'b', x: 2, y: 0, height: 2 },
    { key: '3,0', raw: 'q', x: 3, y: 0, height: 17 },
    { key: '4,0', raw: 'p', x: 4, y: 0, height: 16 },
    { key: '5,0', raw: 'o', x: 5, y: 0, height: 15 },
    { key: '6,0', raw: 'n', x: 6, y: 0, height: 14 },
    { key: '7,0', raw: 'm', x: 7, y: 0, height: 13 },
  ],
  [
    { key: '0,1', raw: 'a', x: 0, y: 1, height: 1 },
    { key: '1,1', raw: 'b', x: 1, y: 1, height: 2 },
    { key: '2,1', raw: 'c', x: 2, y: 1, height: 3 },
    { key: '3,1', raw: 'r', x: 3, y: 1, height: 18 },
    { key: '4,1', raw: 'y', x: 4, y: 1, height: 25 },
    { key: '5,1', raw: 'x', x: 5, y: 1, height: 24 },
    { key: '6,1', raw: 'x', x: 6, y: 1, height: 24 },
    { key: '7,1', raw: 'l', x: 7, y: 1, height: 12 },
  ],
  [
    { key: '0,2', raw: 'a', x: 0, y: 2, height: 1 },
    { key: '1,2', raw: 'c', x: 1, y: 2, height: 3 },
    { key: '2,2', raw: 'c', x: 2, y: 2, height: 3 },
    { key: '3,2', raw: 's', x: 3, y: 2, height: 19 },
    { key: '4,2', raw: 'z', x: 4, y: 2, height: 26 },
    { key: '5,2', raw: 'E', x: 5, y: 2, height: 26 },
    { key: '6,2', raw: 'x', x: 6, y: 2, height: 24 },
    { key: '7,2', raw: 'k', x: 7, y: 2, height: 11 },
  ],
  [
    { key: '0,3', raw: 'a', x: 0, y: 3, height: 1 },
    { key: '1,3', raw: 'c', x: 1, y: 3, height: 3 },
    { key: '2,3', raw: 'c', x: 2, y: 3, height: 3 },
    { key: '3,3', raw: 't', x: 3, y: 3, height: 20 },
    { key: '4,3', raw: 'u', x: 4, y: 3, height: 21 },
    { key: '5,3', raw: 'v', x: 5, y: 3, height: 22 },
    { key: '6,3', raw: 'w', x: 6, y: 3, height: 23 },
    { key: '7,3', raw: 'j', x: 7, y: 3, height: 10 },
  ],
  [
    { key: '0,4', raw: 'a', x: 0, y: 4, height: 1 },
    { key: '1,4', raw: 'b', x: 1, y: 4, height: 2 },
    { key: '2,4', raw: 'd', x: 2, y: 4, height: 4 },
    { key: '3,4', raw: 'e', x: 3, y: 4, height: 5 },
    { key: '4,4', raw: 'f', x: 4, y: 4, height: 6 },
    { key: '5,4', raw: 'g', x: 5, y: 4, height: 7 },
    { key: '6,4', raw: 'h', x: 6, y: 4, height: 8 },
    { key: '7,4', raw: 'i', x: 7, y: 4, height: 9 },
  ],
];

describe('findShortestPath', () => {
  it('finds the shortest path length from a start point to an end point', () => {
    const start = testMatrix.flat().find((n) => n.raw === 'S') as MatrixNode;
    const end = testMatrix.flat().find((n) => n.raw === 'E') as MatrixNode;

    expect(findShortestPath(testMatrix, start, end)).toEqual(31);
  });
});
