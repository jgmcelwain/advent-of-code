import { processChunks } from './processChunks';

const badChunkScores: Record<string, number> = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

export function getLineSyntaxErrorScore(line: string) {
  const [, badChunkEnd] = processChunks(line);

  return badChunkEnd !== null ? badChunkScores[badChunkEnd] : 0;
}
