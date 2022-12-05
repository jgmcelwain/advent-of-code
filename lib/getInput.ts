import { readFile } from 'fs/promises';
import path from 'path';

export async function getInput(dirname: string, trim = true) {
  const result = await readFile(path.join(dirname, 'input.txt'), {
    encoding: 'utf-8',
  });

  return trim ? result.trim() : result;
}
