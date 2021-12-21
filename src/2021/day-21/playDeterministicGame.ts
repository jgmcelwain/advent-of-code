type PlayerID = number;
type Player = { position: number; score: number };

export function playDeterministicGame(p1Start: number, p2Start: number) {
  const players: Record<PlayerID, Player> = {
    1: { position: p1Start, score: 0 },
    2: { position: p2Start, score: 0 },
  };

  let dice = 0;
  let turn = 0;

  while (players[1].score < 1000 && players[2].score < 1000) {
    const t = turn % 2 === 0 ? 1 : 2;

    players[t].position = (players[t].position + 3 * (dice + 2)) % 10;
    if (players[t].position === 0) players[t].position = 10;

    players[t].score += players[t].position;

    turn++;
    dice += 3;
  }

  return { players, dice };
}
