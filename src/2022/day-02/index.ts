import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { runSimpleStrategy } from './runSimpleStrategy';
import { runSmartStrategy } from './runSmartStrategy';

export type Game = readonly ['A' | 'B' | 'C', 'X' | 'Y' | 'Z'];

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
  const games = input.split('\n').map((game): Game => {
    const [a, b] = game.split(' ');

    return [a as 'A' | 'B' | 'C', b as 'X' | 'Y' | 'Z'];
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
