import type { Game } from '.';

enum OpponentMove {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C',
}

enum Result {
  Loss,
  Tie,
  Win,
}
const resultScoreMap: Record<Result, number> = {
  [Result.Loss]: 0,
  [Result.Tie]: 3,
  [Result.Win]: 6,
};

enum PlayerMove {
  Rock = 'X',
  Paper = 'Y',
  Scissors = 'Z',
}
const moveScoreMap: Record<PlayerMove, number> = {
  [PlayerMove.Rock]: 1,
  [PlayerMove.Paper]: 2,
  [PlayerMove.Scissors]: 3,
};

const gameResultValueMap: Record<PlayerMove, Record<OpponentMove, number>> = {
  [PlayerMove.Rock]: {
    [OpponentMove.Rock]: resultScoreMap[Result.Tie],
    [OpponentMove.Paper]: resultScoreMap[Result.Loss],
    [OpponentMove.Scissors]: resultScoreMap[Result.Win],
  },
  [PlayerMove.Paper]: {
    [OpponentMove.Rock]: resultScoreMap[Result.Win],
    [OpponentMove.Paper]: resultScoreMap[Result.Tie],
    [OpponentMove.Scissors]: resultScoreMap[Result.Loss],
  },
  [PlayerMove.Scissors]: {
    [OpponentMove.Rock]: resultScoreMap[Result.Loss],
    [OpponentMove.Paper]: resultScoreMap[Result.Win],
    [OpponentMove.Scissors]: resultScoreMap[Result.Tie],
  },
};

export function runSimpleStrategy(games: Game[]) {
  let totalScore = 0;

  for (const [opponentMove, playerMove] of games) {
    totalScore += gameResultValueMap[playerMove][opponentMove];
    totalScore += moveScoreMap[playerMove];
  }

  return totalScore;
}
