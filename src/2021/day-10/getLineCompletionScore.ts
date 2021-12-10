import { CHUNK_ENDS, CHUNK_STARTS } from '.';

const chunkCloseScores: { [key: string]: number } = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
};

export function getLineCompletionScore(line: string) {
  const openChunks: string[] = [];

  for (let i = 0; i < line.length; i++) {
    if (CHUNK_STARTS.includes(line[i])) {
      openChunks.push(line[i]);
    } else {
      const latestChunk = openChunks[openChunks.length - 1];
      const neededEnd = CHUNK_ENDS[CHUNK_STARTS.indexOf(latestChunk)];

      if (neededEnd === line[i]) {
        openChunks.pop();
      } else {
        return 0;
      }
    }
  }

  const score = openChunks.reverse().reduce((acc, chunk) => {
    acc *= 5;
    acc += chunkCloseScores[chunk];

    return acc;
  }, 0);

  return score;
}
