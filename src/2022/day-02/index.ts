import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { z } from 'zod';
import { runSimpleStrategy } from './runSimpleStrategy';
import { runSmartStrategy } from './runSmartStrategy';

const gameSchema = z.tuple([
  z.union([z.literal('A'), z.literal('B'), z.literal('C')]),
  z.union([z.literal('X'), z.literal('Y'), z.literal('Z')]),
]);
export type Game = z.infer<typeof gameSchema>;

function partOne(games: Game[]) {
  const result = runSimpleStrategy(games);

  return result;
}

function partTwo(games: Game[]) {
  const result = runSmartStrategy(games);

  return result;
}

async function main() {
  const input = await getInput(__dirname);
  const games = input.split('\n').map((game) => {
    const [a, b] = game.split(' ');

    return gameSchema.parse([a, b]);
  });

  void runDay(
    2022,
    2,
    '',
    () => partOne(games),
    () => partTwo(games),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
