import type { Game } from '.';

enum OpponentMove {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C',
}

enum Result {
  Loss = 'X',
  Tie = 'Y',
  Win = 'Z',
}
const resultScore: Record<Result, number> = {
  [Result.Loss]: 0,
  [Result.Tie]: 3,
  [Result.Win]: 6,
};

enum PlayerMove {
  Rock,
  Paper,
  Scissors,
}
const playerMoveScore: Record<PlayerMove, number> = {
  [PlayerMove.Rock]: 1,
  [PlayerMove.Paper]: 2,
  [PlayerMove.Scissors]: 3,
};

const moveScoreMap: Record<Result, Record<OpponentMove, number>> = {
  [Result.Win]: {
    [OpponentMove.Rock]: playerMoveScore[PlayerMove.Paper],
    [OpponentMove.Paper]: playerMoveScore[PlayerMove.Scissors],
    [OpponentMove.Scissors]: playerMoveScore[PlayerMove.Rock],
  },
  [Result.Loss]: {
    [OpponentMove.Rock]: playerMoveScore[PlayerMove.Scissors],
    [OpponentMove.Paper]: playerMoveScore[PlayerMove.Rock],
    [OpponentMove.Scissors]: playerMoveScore[PlayerMove.Paper],
  },
  [Result.Tie]: {
    [OpponentMove.Rock]: playerMoveScore[PlayerMove.Rock],
    [OpponentMove.Paper]: playerMoveScore[PlayerMove.Paper],
    [OpponentMove.Scissors]: playerMoveScore[PlayerMove.Scissors],
  },
};

export function runSmartStrategy(games: Game[]) {
  let totalScore = 0;

  for (const [opponentMove, desiredResult] of games) {
    totalScore += resultScore[desiredResult];
    totalScore += moveScoreMap[desiredResult][opponentMove];
  }

  return totalScore;
}
