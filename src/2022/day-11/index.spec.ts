import { z } from 'zod';
import { levelOfMonkeyBusiness } from './levelOfMonkeyBusiness';
import { monkeySchema, processMonkeyInput } from './processMonkeyInput';
import { runMonkeySimulation } from './runMonkeySimulation';

const testInput = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

describe('processMonkeyInput', () => {
  it('processes the monkey input correctly', () => {
    expect(
      z.array(monkeySchema).safeParse(processMonkeyInput(testInput)).success,
    ).toBe(true);
  });
});

describe('runMonkeySimulation', () => {
  it('runs a monkey simulation, 20 iterations', () => {
    const monkeys = processMonkeyInput(testInput);

    const counts = runMonkeySimulation(monkeys, 20, (worryLevel) =>
      Math.floor(worryLevel / 3),
    );

    expect(counts[0]).toBe(101);
    expect(counts[1]).toBe(95);
    expect(counts[2]).toBe(7);
    expect(counts[3]).toBe(105);
  });

  it('runs a monkey simulation, 10000 iterations', () => {
    const monkeys = processMonkeyInput(testInput);

    let modulo = 1;
    for (const { test } of Object.values(monkeys)) {
      modulo *= test.divisibleBy;
    }

    const counts = runMonkeySimulation(
      monkeys,
      10000,
      (worryLevel) => worryLevel % modulo,
    );

    expect(counts[0]).toBe(52166);
    expect(counts[1]).toBe(47830);
    expect(counts[2]).toBe(1938);
    expect(counts[3]).toBe(52013);
  });
});

describe('levelOfMonkeyBusiness', () => {
  it('calculates the level of monkey business for a record of counts', () => {
    expect(levelOfMonkeyBusiness({ 0: 101, 1: 95, 2: 7, 3: 105 })).toBe(10605);
    expect(
      levelOfMonkeyBusiness({ 0: 52166, 1: 47830, 2: 1938, 3: 52013 }),
    ).toBe(2713310158);
  });
});
