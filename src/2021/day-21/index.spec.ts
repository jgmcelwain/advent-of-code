import { playDeterministicGame } from './playDeterministicGame';
import { playQuantumGames } from './playQuantumGames';

describe('playDeterministicGame', () => {
  it('gets the correct score for a deterministic game', () => {
    const outcome = playDeterministicGame(4, 8);

    expect(outcome.diceRolls).toBe(993);
    expect(outcome.players[1].position).toBe(10);
    expect(outcome.players[1].score).toBe(1000);
    expect(outcome.players[2].position).toBe(3);
    expect(outcome.players[2].score).toBe(745);
  });
});

describe('playQuantumGames', () => {
  it('gets the correct number of wins for a quantum game(s?)', () => {
    const result = playQuantumGames(4, 8);

    expect(result.playerOneWins).toBe(444356092776315);
    expect(result.playerTwoWins).toBe(341960390180808);
  });
});
