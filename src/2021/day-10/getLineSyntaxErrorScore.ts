import { CHUNK_STARTS, CHUNK_ENDS } from '.';

const badChunkScores: { [key: string]: number } = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

export function getLineSyntaxErrorScore(line: string) {
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
        return badChunkScores[line[i]];
      }
    }
  }

  return 0;
}
