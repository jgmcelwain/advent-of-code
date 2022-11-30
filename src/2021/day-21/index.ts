import { getInput } from '../../../lib/getInput';
import { runDay } from '../../../lib/runDay';
import { playDeterministicGame } from './playDeterministicGame';
import { playQuantumGames } from './playQuantumGames';

function partOne(
  playerOneStartPosition: number,
  playerTwoStartPosition: number,
) {
  const outcome = playDeterministicGame(
    playerOneStartPosition,
    playerTwoStartPosition,
  );

  const losingScore = Math.min(
    outcome.players[1].score,
    outcome.players[2].score,
  );

  return losingScore * outcome.diceRolls;
}

function partTwo(
  playerOneStartPosition: number,
  playerTwoStartPosition: number,
) {
  const result = playQuantumGames(
    playerOneStartPosition,
    playerTwoStartPosition,
  );

  return Math.max(...Object.values(result));
}

async function main() {
  const input = await getInput(__dirname);

  const [playerOneStartPosition, playerTwoStartPosition] = input
    .split('\n')
    .map((r) => Number(r.split(': ')[1]));

  void runDay(
    2021,
    21,
    'Dirac Dice',
    () => partOne(playerOneStartPosition, playerTwoStartPosition),
    () => partTwo(playerOneStartPosition, playerTwoStartPosition),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
