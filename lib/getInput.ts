import { readFile } from 'fs/promises';
import path from 'path';

export function getInput(dirname: string) {
  return readFile(path.join(dirname, 'input.txt'), {
    encoding: 'utf-8',
  });
}
