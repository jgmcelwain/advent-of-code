import type { Monkey } from './processMonkeyInput';

export function runMonkeySimulation(
  monkeys: Monkey[],
  iterations: number,
  manageWorryLevel: (worryLevel: number) => number,
) {
  const counts: Record<string, number> = {};

  for (let i = 0; i < iterations; i++) {
    for (const [monkeyId, monkey] of monkeys.entries()) {
      while (monkey.items.length > 0) {
        counts[monkeyId] = (counts[monkeyId] ?? 0) + 1;

        let worryLevel = monkey.items.shift() as number;
        worryLevel = manageWorryLevel(monkey.operation(worryLevel));

        const destinationMonkey =
          monkeys[
            monkey.test[
              worryLevel % monkey.test.divisibleBy === 0
                ? 'passDestination'
                : 'failDestination'
            ]
          ];

        if (!destinationMonkey) {
          throw new Error('Destination monkey does not exist');
        }

        destinationMonkey.items.push(worryLevel);
      }
    }
  }

  return counts;
}
