const CHUNK_STARTS = ['(', '[', '{', '<'];
const CHUNK_ENDS = [')', ']', '}', '>'];

export function processChunks(
  line: string,
): [openChunks: string[], badChunkEnd: string | null] {
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
        return [openChunks, line[i]];
      }
    }
  }

  return [openChunks, null];
}
