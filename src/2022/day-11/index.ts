import { getInput } from '@/lib/getInput';
import { runDay } from '@/lib/runDay';
import { z } from 'zod';
import {
  type Monkey,
  monkeySchema,
  processMonkeyInput,
} from './processMonkeyInput';
import { runMonkeySimulation } from './runMonkeySimulation';
import { levelOfMonkeyBusiness } from './levelOfMonkeyBusiness';

function partOne(monkeys: Monkey[]) {
  const counts = runMonkeySimulation(monkeys, 20, (worryLevel) =>
    Math.floor(worryLevel / 3),
  );

  return levelOfMonkeyBusiness(counts);
}

function partTwo(monkeys: Monkey[]) {
  let modulo = 1;
  for (const { test } of Object.values(monkeys)) {
    modulo *= test.divisibleBy;
  }

  const counts = runMonkeySimulation(
    monkeys,
    10000,
    (worryLevel) => worryLevel % modulo,
  );

  return levelOfMonkeyBusiness(counts);
}

async function main() {
  const input = await getInput(__dirname);

  const monkeys = processMonkeyInput(input);

  const partOneMonkeys = z.array(monkeySchema).parse(monkeys);
  const partTwoMonkeys = z.array(monkeySchema).parse(monkeys);

  void runDay(
    2022,
    11,
    'Monkey in the Middle',
    () => partOne(partOneMonkeys),
    () => partTwo(partTwoMonkeys),
    true,
  );
}

if (process.argv.includes('run')) {
  void main();
}
