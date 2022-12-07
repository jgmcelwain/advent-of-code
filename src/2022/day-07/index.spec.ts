import { buildFileSystem } from './buildFileSystem';
import { getAllDirSizes, getDirSize } from './dirSizes';

const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const fileSystem = buildFileSystem(input);

describe('buildFileSystem', () => {
  it('builds a file system tree', () => {
    expect(buildFileSystem(input)).toStrictEqual({
      a: { e: { i: 584 }, f: 29116, g: 2557, 'h.lst': 62596 },
      'b.txt': 14848514,
      'c.dat': 8504156,
      d: { 'd.ext': 5626152, 'd.log': 8033020, j: 4060174, k: 7214296 },
    });
  });
});

describe('dirSizes', () => {
  describe('getDirSize', () => {
    it('finds the total size of a directory', () => {
      expect(getDirSize(fileSystem)).toEqual(48381165);
    });
  });

  describe('getAllDirSizes', () => {
    it('finds the sizes of all directories in a file system', () => {
      const dirSizes = getAllDirSizes(fileSystem);

      [584, 94853, 24933642, 48381165].forEach((dirSize) =>
        expect(dirSizes).toContain(dirSize),
      );
    });
  });
});
