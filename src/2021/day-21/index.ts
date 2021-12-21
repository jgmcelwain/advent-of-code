import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { playDeterministicGame } from './playDeterministicGame';
import { playQuantumGames } from './playQuantumGames';

function partOne(p1Start: number, p2Start: number) {
  const outcome = playDeterministicGame(p1Start, p2Start);

  const losingScore = Math.min(
    outcome.players[1].score,
    outcome.players[2].score,
  );

  return losingScore * outcome.dice;
}

function partTwo(p1Start: number, p2Start: number) {
  const result = playQuantumGames(p1Start, p2Start);

  return Math.max(result.playerOneWins, result.playerTwoWins);
}

async function main() {
  const input = await getInput(__dirname);

  const [p1Start, p2Start] = input
    .split('\n')
    .map((r) => Number(r.split(': ')[1]));

  runDay(
    2021,
    21,
    'Dirac Dice',
    () => partOne(p1Start, p2Start),
    () => partTwo(p1Start, p2Start),
    true,
  );
}

if (process.argv.includes('run')) {
  main();
}
