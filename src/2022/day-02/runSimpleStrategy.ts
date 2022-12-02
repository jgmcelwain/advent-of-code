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
const resultScore: Record<Result, number> = {
  [Result.Loss]: 0,
  [Result.Tie]: 3,
  [Result.Win]: 6,
};

enum PlayerMove {
  Rock = 'X',
  Paper = 'Y',
  Scissors = 'Z',
}
const moveScore: Record<PlayerMove, number> = {
  [PlayerMove.Rock]: 1,
  [PlayerMove.Paper]: 2,
  [PlayerMove.Scissors]: 3,
};

const gameResultScoreMap: Record<PlayerMove, Record<OpponentMove, number>> = {
  [PlayerMove.Rock]: {
    [OpponentMove.Rock]: resultScore[Result.Tie],
    [OpponentMove.Paper]: resultScore[Result.Loss],
    [OpponentMove.Scissors]: resultScore[Result.Win],
  },
  [PlayerMove.Paper]: {
    [OpponentMove.Rock]: resultScore[Result.Win],
    [OpponentMove.Paper]: resultScore[Result.Tie],
    [OpponentMove.Scissors]: resultScore[Result.Loss],
  },
  [PlayerMove.Scissors]: {
    [OpponentMove.Rock]: resultScore[Result.Loss],
    [OpponentMove.Paper]: resultScore[Result.Win],
    [OpponentMove.Scissors]: resultScore[Result.Tie],
  },
};

export function runSimpleStrategy(games: Game[]) {
  let totalScore = 0;

  for (const [opponentMove, playerMove] of games) {
    totalScore += gameResultScoreMap[playerMove][opponentMove];
    totalScore += moveScore[playerMove];
  }

  return totalScore;
}
