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
const resultScoreMap: Record<Result, number> = {
  [Result.Loss]: 0,
  [Result.Tie]: 3,
  [Result.Win]: 6,
};

enum PlayerMove {
  Rock,
  Paper,
  Scissors,
}
const playerMoveScoreMap: Record<PlayerMove, number> = {
  [PlayerMove.Rock]: 1,
  [PlayerMove.Paper]: 2,
  [PlayerMove.Scissors]: 3,
};

const moveScoreMap = {
  [Result.Win]: {
    [OpponentMove.Rock]: playerMoveScoreMap[PlayerMove.Paper],
    [OpponentMove.Paper]: playerMoveScoreMap[PlayerMove.Scissors],
    [OpponentMove.Scissors]: playerMoveScoreMap[PlayerMove.Rock],
  },
  [Result.Loss]: {
    [OpponentMove.Rock]: playerMoveScoreMap[PlayerMove.Scissors],
    [OpponentMove.Paper]: playerMoveScoreMap[PlayerMove.Rock],
    [OpponentMove.Scissors]: playerMoveScoreMap[PlayerMove.Paper],
  },
  [Result.Tie]: {
    [OpponentMove.Rock]: playerMoveScoreMap[PlayerMove.Rock],
    [OpponentMove.Paper]: playerMoveScoreMap[PlayerMove.Paper],
    [OpponentMove.Scissors]: playerMoveScoreMap[PlayerMove.Scissors],
  },
};

export function runSmartStrategy(games: Game[]) {
  let totalScore = 0;

  for (const [opponentMove, desiredResult] of games) {
    totalScore += resultScoreMap[desiredResult];
    totalScore += moveScoreMap[desiredResult][opponentMove];
  }

  return totalScore;
}
