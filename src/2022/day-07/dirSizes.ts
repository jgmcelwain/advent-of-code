import type { FS } from './buildFileSystem';

export function getDirSize(dir: FS) {
  let dirSize = 0;

  for (const key in dir) {
    const value = dir[key];
    if (value === undefined) {
      throw new Error(`Could not find ${key} in dir`);
    }

    if (typeof value === 'number') {
      dirSize += value;
    } else {
      dirSize += getDirSize(value);
    }
  }

  return dirSize;
}

export function getAllDirSizes(fileSystem: FS) {
  const dirSizes: number[] = [];

  function addDirSizes(dir: FS) {
    dirSizes.push(getDirSize(dir));

    for (const key in dir) {
      const value = dir[key];

      if (value !== undefined && typeof value !== 'number') {
        addDirSizes(value);
      }
    }
  }

  addDirSizes(fileSystem);

  return dirSizes;
}
