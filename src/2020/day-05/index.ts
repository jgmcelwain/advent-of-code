import { getInput } from '@/lib/getInput';

type Seat = { row: number; col: number; id: number };

function getSeats(boardingPasses: string[]) {
  const seats: Seat[] = [];

  for (let i = 0; i < boardingPasses.length; i++) {
    const row = Number(`0b${boardingPasses[i].slice(0, 7)}`);
    const col = Number(`0b${boardingPasses[i].slice(7, 10)}`);

    seats.push({ row, col, id: row * 8 + col });
  }

  return seats;
}

function partOne(boardingPasses: string[]) {
  const seats = getSeats(boardingPasses);
  const result = Math.max(...seats.map((seat) => seat.id));

  console.log('Part One: ', result);
}

function partTwo(boardingPasses: string[]) {
  const seats = getSeats(boardingPasses);
  const seatIDs = seats.map((seat) => seat.id);

  let result: number | null = null;
  let id = Math.min(...seatIDs);

  while (result === null && id < seats.length) {
    if (seatIDs.includes(id) === false) {
      result = id;
    } else {
      id++;
    }
  }

  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);
  const boardingPasses = input
    .split('\n')
    .map((pass) =>
      pass
        .replace(/F/g, '0')
        .replace(/B/g, '1')
        .replace(/L/g, '0')
        .replace(/R/g, '1'),
    );

  console.log('AoC 2020 - Day 05: Binary Boarding');
  partOne(boardingPasses);
  partTwo(boardingPasses);
}

if (process.argv.includes('run')) {
  void main();
}
