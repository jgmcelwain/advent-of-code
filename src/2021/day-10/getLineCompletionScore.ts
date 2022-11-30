import { processChunks } from './processChunks';

const chunkCloseScores: Record<string, number> = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
};

export function getLineCompletionScore(line: string) {
  const [openChunks, badChunkEnd] = processChunks(line);

  if (badChunkEnd !== null) {
    return 0;
  } else {
    const score = openChunks.reverse().reduce((acc, chunk) => {
      acc *= 5;
      acc += chunkCloseScores[chunk];

      return acc;
    }, 0);

    return score;
  }
}
