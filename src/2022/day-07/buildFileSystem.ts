import { z } from 'zod';

export type FS = { [key: string]: number | FS };

export type Command = [
  userInput: [$: string, ...args: unknown[]],
  ...commandOutput: string[]
];

function parseCommands(input: string): Command[] {
  const userInputSchema = z.tuple([z.string()]).rest(z.unknown());
  const commandOutputSchema = z.string();

  const commandSchema = z.tuple([userInputSchema]).rest(commandOutputSchema);

  return z.array(commandSchema).parse(
    input
      .split('$')
      .filter(Boolean)
      .map((n) => {
        const [userInput, ...commandOutput] = n.trim().split('\n');

        return [userInput?.split(' '), ...commandOutput];
      }),
  );
}

export function buildFileSystem(input: string) {
  const commands = parseCommands(input);

  const fileSystem: FS = {};

  let currentPathKey = '';
  let currentPath = fileSystem;

  for (const [[$, ...args], ...output] of commands) {
    switch ($) {
      case 'ls': {
        for (const path of output) {
          const [value, name] = z
            .tuple([z.string(), z.string()])
            .parse(path.split(' '));

          if (value === 'dir') {
            currentPath[name] = {};
          } else {
            currentPath[name] = Number(value);
          }
        }

        break;
      }
      case 'cd': {
        const dir = z.string().parse(args[0]);

        switch (dir) {
          case '/': {
            currentPath = fileSystem;
            currentPathKey = '/';
            break;
          }
          case '..': {
            let newCurrentPath = fileSystem;

            const pathChunks = currentPathKey.split('/').filter(Boolean);
            pathChunks.pop();

            for (const chunk of pathChunks) {
              const next = newCurrentPath[chunk];

              if (next === undefined || typeof next === 'number') {
                throw new Error(
                  `Could not execute 'cd ..', chunk '${chunk}' is not a valid destination.`,
                );
              } else {
                newCurrentPath = next;
              }
            }

            currentPathKey = pathChunks.join('/');
            currentPath = newCurrentPath;
            break;
          }
          default: {
            const destination = currentPath[dir];

            if (destination === undefined) {
              throw new Error(
                `Cannot cd into destination '${dir}' because it does not exist.`,
              );
            } else if (typeof destination === 'number') {
              throw new Error(
                `Cannot cd into destination '${dir}' because it is a file`,
              );
            } else {
              currentPath = destination;
              currentPathKey += currentPathKey.length > 0 ? `/${dir}` : dir;
            }
            break;
          }
        }

        break;
      }
      default: {
        throw new Error(`Unknown command ${$}`);
      }
    }
  }

  return fileSystem;
}
