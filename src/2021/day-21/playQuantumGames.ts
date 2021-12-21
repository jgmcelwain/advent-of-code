const potentialRolls: Record<number, number> = {
  3: 1,
  4: 3,
  5: 6,
  6: 7,
  7: 6,
  8: 3,
  9: 1,
};

type TrackedWins = { activePlayerWins: number; inactivePlayerWins: number };

export function playQuantumGames(
  playerOneStartPosition: number,
  playerTwoStartPosition: number,
) {
  // sets up a map to track how many wins are achieved from a given state.
  // since it's very common for multiple moves to result in the same state this
  // saves a lot of computation time if we ever come across the same state again
  const stateWinCache = new Map<string, TrackedWins>();

  function getWinsFromState(
    activePlayerPosition: number,
    inactivePlayerPosition: number,
    activePlayerScore = 0,
    inactivePlayerScore = 0,
  ) {
    const stateKey = `${activePlayerPosition},${activePlayerScore},${inactivePlayerPosition},${inactivePlayerScore}`;

    // if we've already run the simulation for this state then it's pointless
    // doing it again - just return from the cache
    const cachedValueForState = stateWinCache.get(stateKey);
    if (cachedValueForState !== undefined) {
      return cachedValueForState;
    }

    const stateWinCount: TrackedWins = {
      activePlayerWins: 0,
      inactivePlayerWins: 0,
    };

    for (const roll in potentialRolls) {
      const rollCount = potentialRolls[roll];

      let updatedActivePlayerPosition =
        (activePlayerPosition + Number(roll)) % 10;
      if (updatedActivePlayerPosition === 0) updatedActivePlayerPosition = 10;

      const updatedActivePlayerScore =
        activePlayerScore + updatedActivePlayerPosition;

      if (updatedActivePlayerScore >= 21) {
        stateWinCount.activePlayerWins += rollCount;
      } else {
        // if nobody has won then we need to rerun the sim from the current
        // state, inverting the players so that the player who didn't just have
        // their turn gets to go
        const result = getWinsFromState(
          inactivePlayerPosition,
          updatedActivePlayerPosition,
          inactivePlayerScore,
          updatedActivePlayerScore,
        );

        stateWinCount.activePlayerWins += result.inactivePlayerWins * rollCount;
        stateWinCount.inactivePlayerWins += result.activePlayerWins * rollCount;
      }
    }

    stateWinCache.set(stateKey, stateWinCount);

    return stateWinCount;
  }

  return getWinsFromState(playerOneStartPosition, playerTwoStartPosition);
}
