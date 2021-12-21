const potentialRolls: Record<number, number> = {
  3: 1,
  4: 3,
  5: 6,
  6: 7,
  7: 6,
  8: 3,
  9: 1,
};

export function playQuantumGames(
  playerOneStartPosition: number,
  playerTwoStartPosition: number,
) {
  // sets up a map to track how many wins are achieved from a given state.
  // since it's very common for multiple moves to result in the same state this
  // saves a lot of computation time if we ever come across the same state again
  const stateWinCache = new Map<
    string,
    { playerOneWins: number; playerTwoWins: number }
  >();

  function getWinsFromState(
    playerOnePosition: number,
    playerTwoPosition: number,
    playerOneScore = 0,
    playerTwoScore = 0,
  ) {
    const stateKey = `${playerOnePosition},${playerTwoPosition},${playerOneScore},${playerTwoScore}`;

    // if we've already run the simulation for this state then it's pointless
    // doing it again - just return from the cache
    const cachedValueForState = stateWinCache.get(stateKey);
    if (cachedValueForState !== undefined) {
      return cachedValueForState;
    }

    const stateWinCount: { playerOneWins: number; playerTwoWins: number } = {
      playerOneWins: 0,
      playerTwoWins: 0,
    };

    for (const roll in potentialRolls) {
      const rollCount = potentialRolls[roll];

      let updatedPlayerOnePosition = (playerOnePosition + Number(roll)) % 10;
      if (updatedPlayerOnePosition === 0) updatedPlayerOnePosition = 10;

      const updatedPlayerOneScore = playerOneScore + updatedPlayerOnePosition;

      if (updatedPlayerOneScore >= 21) {
        stateWinCount.playerOneWins += rollCount;
      } else {
        // if nobody has won then we need to rerun the sim from the current
        // state, inverting the players so that the player who didn't just have
        // their turn gets to go
        const result = getWinsFromState(
          playerTwoPosition,
          updatedPlayerOnePosition,
          playerTwoScore,
          updatedPlayerOneScore,
        );

        stateWinCount.playerOneWins += result.playerTwoWins * rollCount;
        stateWinCount.playerTwoWins += result.playerOneWins * rollCount;
      }
    }

    stateWinCache.set(stateKey, stateWinCount);

    return stateWinCount;
  }

  return getWinsFromState(playerOneStartPosition, playerTwoStartPosition);
}
